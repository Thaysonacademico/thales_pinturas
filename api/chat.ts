/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';
import {
  SYSTEM_INSTRUCTION,
  cleanAsterisks,
  generateCobaltoTechnicalFallback,
} from './_lib/cobalto';

// Tempo máximo da função na Vercel (segundos)
export const config = { maxDuration: 30 };

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Modelos estáveis, em ordem de preferência
const MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Nenhuma mensagem enviada.' });
  }

  const lastUserMsg = [...messages]
    .reverse()
    .find((m: any) => m && m.role === 'user' && m.content);
  const userLastText = (lastUserMsg?.content || '').trim();
  const fallback = generateCobaltoTechnicalFallback(userLastText);

  // Normaliza o histórico: começa com 'user', alterna user/model, remove vazios
  const contents: { role: 'user' | 'model'; parts: [{ text: string }] }[] = [];
  for (const m of messages) {
    if (!m || typeof m.content !== 'string' || !m.content.trim()) continue;
    const role = m.role === 'assistant' || m.role === 'model' ? 'model' : 'user';
    const text = m.content.trim();

    if (contents.length === 0 && role === 'model') continue;

    const prev = contents[contents.length - 1];
    if (prev && prev.role === role) {
      prev.parts[0].text += `\n${text}`;
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }

  if (contents.length === 0) {
    contents.push({
      role: 'user',
      parts: [{ text: userLastText || 'Olá, como a Thales Pinturas pode me atender?' }],
    });
  }

  let replyText = '';

  for (const model of MODELS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
          maxOutputTokens: 2048, // o raciocínio interno também conta nesse limite
          thinkingConfig: { thinkingBudget: 512 },
          abortSignal: controller.signal,
        },
      });
      clearTimeout(timeoutId);

      if (response.text && response.text.trim()) {
        replyText = cleanAsterisks(response.text.trim());
        break;
      }
    } catch (err: any) {
      // Aparece em Vercel > Logs, para você saber por que caiu no fallback
      console.error(`[Cobalto] falha com ${model}:`, err?.message || err);
    }
  }

  if (!replyText) {
    return res.status(200).json({
      reply: cleanAsterisks(fallback.reply),
      suggestedWhatsAppMessage: fallback.whatsappMessage,
      source: 'fallback', // se aparecer isso no Network, a IA falhou
    });
  }

  return res.status(200).json({
    reply: replyText,
    suggestedWhatsAppMessage: fallback.whatsappMessage,
    source: 'ia',
  });
}

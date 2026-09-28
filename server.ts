/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SYSTEM_INSTRUCTION,
  cleanAsterisks,
  generateCobaltoTechnicalFallback,
} from './api/_lib/cobalto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const p = Number(process.argv[portArgIndex + 1]);
    if (!isNaN(p) && p > 0) return p;
  }
  if (process.env.PORT) {
    const p = Number(process.env.PORT);
    if (!isNaN(p) && p > 0) return p;
  }
  return 3000;
}

function getHost(): string {
  const hostArgIndex = process.argv.indexOf('--host');
  if (hostArgIndex !== -1 && process.argv[hostArgIndex + 1]) {
    return process.argv[hostArgIndex + 1];
  }
  return process.env.HOST || '0.0.0.0';
}

async function startServer() {
  const startTime = Date.now();
  const app = express();
  const PORT = getPort();
  const HOST = getHost();

  // Enable CORS for iframe / preview support
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use(express.json());

  // Health check endpoint for supervisor & monitoring
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', port: PORT, uptime: process.uptime() });
  });

  // Shared server-side Gemini instance with telemetry User-Agent
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Multi-turn Chat Endpoint for Cobalto AI Agent
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Nenhuma mensagem enviada.' });
      }

      // Extract last user query for fallback intelligence & context
      const lastUserMsg = [...messages].reverse().find((m: any) => m && m.role === 'user' && m.content);
      const userLastText = (lastUserMsg?.content || '').trim();

      // Normalize conversation for Gemini API:
      // 1. Must alternate role 'user' and 'model'
      // 2. Must start with 'user'
      // 3. Drop empty messages
      const normalizedMessages: { role: 'user' | 'model'; parts: [{ text: string }] }[] = [];
      for (const m of messages) {
        if (!m || !m.content || typeof m.content !== 'string' || !m.content.trim()) continue;
        const role = m.role === 'assistant' || m.role === 'model' ? 'model' : 'user';
        const text = m.content.trim();

        // Skip leading 'model' messages (e.g. welcome message)
        if (normalizedMessages.length === 0 && role === 'model') {
          continue;
        }

        const prev = normalizedMessages[normalizedMessages.length - 1];
        if (prev && prev.role === role) {
          prev.parts[0].text += `\n${text}`;
        } else {
          normalizedMessages.push({
            role,
            parts: [{ text }],
          });
        }
      }

      // If normalized array is empty, inject userLastText
      if (normalizedMessages.length === 0) {
        normalizedMessages.push({
          role: 'user',
          parts: [{ text: userLastText || 'Olá, como a Thales Pinturas pode me atender?' }],
        });
      }

      // Call ultra-fast Gemini model (gemini-2.5-flash, gemini-2.5-flash-lite)
      let replyText = '';
      const candidateModels = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

      for (const modelName of candidateModels) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000);

          const response = await ai.models.generateContent({
            model: modelName,
            contents: normalizedMessages,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.8,
              maxOutputTokens: 2048,
              thinkingConfig: { thinkingBudget: 512 },
              abortSignal: controller.signal,
            },
          });
          clearTimeout(timeoutId);

          if (response.text && response.text.trim()) {
            replyText = response.text.trim();
            break;
          }
        } catch (err: any) {
          console.warn(`Tentativa Cobalto com ${modelName} falhou:`, err?.message || err);
        }
      }

      // Clean any accidental markdown asterisks from the AI response
      replyText = cleanAsterisks(replyText);

      // If Gemini did not return text, use expert technical fallback
      if (!replyText) {
        const fallback = generateCobaltoTechnicalFallback(userLastText);
        replyText = cleanAsterisks(fallback.reply);
        return res.json({
          reply: replyText,
          suggestedWhatsAppMessage: fallback.whatsappMessage,
        });
      }

      // Provide dynamic WhatsApp message corresponding to user intent
      const fallbackData = generateCobaltoTechnicalFallback(userLastText);
      return res.json({
        reply: replyText,
        suggestedWhatsAppMessage: fallbackData.whatsappMessage,
      });
    } catch (error: any) {
      console.error('Erro na rota /api/chat:', error);
      const fallback = generateCobaltoTechnicalFallback('');
      return res.json({
        reply: fallback.reply,
        suggestedWhatsAppMessage: fallback.whatsappMessage,
      });
    }
  });

  // Intelligent Service Search Endpoint with Gemini AI
  app.post('/api/search-service', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string' || !query.trim()) {
        return res.status(400).json({ error: 'Termo de busca vazio.' });
      }

      const cleanQuery = query.trim();

      const searchPrompt = `Você é o buscador inteligente de serviços da "Thales Pinturas" (Thales, eleito Top 3 Pintores do Brasil pela ABRAPP/MBPM).

CATÁLOGO EXATO DE SERVIÇOS DO THALES:
1. "pintura-residencial-predial": Pintura residencial e predial (casas, apartamentos, edifícios e condomínios, recortes finos, alisamento, massa corrida/acrílica, tintas foscas/acetinadas laváveis, zero respingos, tetos e sancas).
2. "revitalizacao": Revitalização (restauração de fachadas desgastadas, tratamento rigoroso de fissuras e trincas, tintas elastoméricas e impermeabilizantes contra a maresia litorânea).
3. "limpeza-pos-obra": Limpeza pós Obra (remoção minuciosa de poeira de lixamento, desincrustação de porcelanatos e vidros sem riscar, hidrojateamento de fachadas e calçadas, entrega do imóvel 100% pronto para morar).
4. "pedras-naturais": Aplicação de pedras naturais (pedra Moledo, pedra ferro, São Tomé e miracema em fachadas, muros e pórticos com resina hidrofugante impermeabilizante que não embolora).
5. "servico-personalizado": Serviço Personalizado (consultoria técnica de cores, blocos de kitnets para locação rápida de renda, acabamentos exclusivos e demandas especiais).

OBJETIVO:
O usuário pesquisou: "${cleanQuery}"
1. Releve e interprete quaisquer erros ortográficos, concordância, gírias ou digitação informal (ex: "pintar kaza", "parede emborraxada", "limpeza pos obra poeira fina", "colokar pedra ferro", "grafiato", "verniz em porta", "lavar muro com limo").
2. Se for um serviço que o Thales oferece diretamente: aponte o ID exato e explique como é realizado.
3. Se for um serviço não catalogado ou termo correlato: dê um resultado relacionado acolhedor, explicando como a equipe do Thales resolve ou qual técnica equivalente aplica.
4. Responda ESTRITAMENTE em formato JSON (sem blocos markdown adicionais):
{
  "interpretedQuery": "termo corrigido de forma amigável",
  "matchedServiceId": "pintura-residencial-predial" | "revitalizacao" | "limpeza-pos-obra" | "pedras-naturais" | "servico-personalizado",
  "serviceTitle": "Título claro do serviço ou solução",
  "badge": "Correspondência Direta" OU "Solução Relacionada",
  "explanation": "Explicação acolhedora e direta (máximo 2 frases curtas) de como o Thales atende ou como resolve essa necessidade técnica com excelência.",
  "relatedServices": ["Serviço A", "Serviço B"],
  "suggestedWhatsAppMessage": "Olá, Thales! Gostaria de um orçamento para [assunto pesquisado]"
}`;

      let aiRawOutput = '';
      const candidateModels = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [{ parts: [{ text: searchPrompt }] }],
            config: {
              temperature: 0.3,
            },
          });
          if (response.text) {
            aiRawOutput = response.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Tentativa de busca com ${modelName} falhou:`, err?.message || err);
        }
      }

      // If AI responded, parse JSON
      if (aiRawOutput) {
        const cleaned = aiRawOutput.replace(/```json/gi, '').replace(/```/g, '').trim();
        try {
          const parsed = JSON.parse(cleaned);
          return res.json(parsed);
        } catch (e) {
          console.warn('Falha no JSON.parse da resposta da IA, usando fallback inteligente', e);
        }
      }

      // Smart rule-based fallback if offline/no key
      const qLower = cleanQuery.toLowerCase();
      let matchedServiceId = 'pintura-residencial-predial';
      let title = 'Pintura residencial e predial';
      let explanation = 'O Thales executa preparação minuciosa, corte cirúrgico e acabamento nobre sem marcas nem respingos para casas e edifícios.';

      if (qLower.includes('limp') || qLower.includes('obra') || qLower.includes('pos') || qLower.includes('vidro') || qLower.includes('poeira') || qLower.includes('porcelanato') || qLower.includes('hidro') || qLower.includes('lavar')) {
        matchedServiceId = 'limpeza-pos-obra';
        title = 'Limpeza pós Obra';
        explanation = 'Higienização profunda pós-reforma: remoção minuciosa de poeira de lixamento e desincrustação de pisos e vidros sem riscar, entregando o imóvel pronto para morar.';
      } else if (qLower.includes('pedra') || qLower.includes('moledo') || qLower.includes('ferro') || qLower.includes('muro') || qLower.includes('revestimento') || qLower.includes('rustico')) {
        matchedServiceId = 'pedras-naturais';
        title = 'Aplicação de pedras naturais';
        explanation = 'Assentamento técnico de pedras nobres com resina hidrofugante impermeabilizante que não embolora nem solta com a umidade.';
      } else if (qLower.includes('revita') || qLower.includes('trinca') || qLower.includes('fissura') || qLower.includes('infiltr') || qLower.includes('emborrachada') || qLower.includes('maresia') || qLower.includes('fachada')) {
        matchedServiceId = 'revitalizacao';
        title = 'Revitalização';
        explanation = 'Restauração de fachadas e alvenarias desgastadas com tintas elastoméricas e impermeabilizantes contra a maresia.';
      } else if (qLower.includes('kitnet') || qLower.includes('personaliz') || qLower.includes('cor') || qLower.includes('especial') || qLower.includes('alug')) {
        matchedServiceId = 'servico-personalizado';
        title = 'Serviço Personalizado';
        explanation = 'Consultoria técnica de cores e soluções sob medida para investidores e clientes com demandas exclusivas.';
      }

      return res.json({
        interpretedQuery: cleanQuery,
        matchedServiceId,
        serviceTitle: title,
        badge: 'Solução Encontrada',
        explanation,
        relatedServices: ['Pintura residencial e predial', 'Revitalização', 'Limpeza pós Obra'],
        suggestedWhatsAppMessage: `Olá, Thales! Gostaria de um orçamento para "${title}".`,
      });
    } catch (error: any) {
      console.error('Erro na rota /api/search-service:', error);
      return res.status(500).json({
        error: error.message || 'Erro ao realizar a busca inteligente.',
      });
    }
  });

  // Serve static files in production, or mount Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    const elapsed = Date.now() - startTime;
    console.log(`\n  VITE v6.2.0  ready in ${elapsed} ms\n`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://${HOST}:${PORT}/`);
    console.log(`Server listening on ${HOST}:${PORT}\n`);
  });
}

startServer();

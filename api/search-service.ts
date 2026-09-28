/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';

export const config = { maxDuration: 30 };

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  try {
    const { query } = req.body ?? {};
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Termo de busca vazio.' });
    }

    const cleanQuery = query.trim();

    const searchPrompt = `Você é o buscador inteligente de serviços da "Thales Pinturas" em Itajaí e região (Santa Catarina).

CATÁLOGO EXATO DE SERVIÇOS DO THALES:
1. "pintura-residencial-predial": Pintura residencial e predial (casas, apartamentos, edifícios e condomínios, recortes finos, alisamento, massa corrida/acrílica, tintas foscas/acetinadas laváveis, zero respingos, tetos e sancas).
2. "revitalizacao": Revitalização (restauração de fachadas desgastadas, tratamento rigoroso de fissuras e trincas, tintas elastoméricas e impermeabilizantes contra a maresia litorânea).
3. "limpeza-pos-obra": Limpeza pós Obra (remoção minuciosa de poeira de lixamento, desincrustação de porcelanatos e vidros sem riscar, hidrojateamento de fachadas e calçadas, entrega do imóvel 100% pronto para morar).
4. "pedras-naturais": Aplicação de pedras naturais (pedra Moledo, pedra ferro, São Tomé e miracema em fachadas, muros e pórticos com resina hidrofugante impermeabilizante que não embolora).
5. "servico-personalizado": Serviço Personalizado (consultoria técnica de cores, blocos de kitnets para locação rápida de renda, acabamentos exclusivos e demandas especiais).

OBJETIVO:
O usuário pesquisou: "${cleanQuery}"
1. Releve e interprete quaisquer erros ortográficos, concordância, gírias ou digitação informal.
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

    for (const model of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
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
        console.error(`[SearchService] falha com ${model}:`, err?.message || err);
      }
    }

    if (aiRawOutput) {
      const cleaned = aiRawOutput.replace(/```json/gi, '').replace(/```/g, '').trim();
      try {
        const parsed = JSON.parse(cleaned);
        return res.status(200).json(parsed);
      } catch (e) {
        console.warn('Falha no JSON.parse da resposta da IA, usando fallback inteligente', e);
      }
    }

    // Regra de fallback estruturada caso a IA esteja sem chave ou indisponível
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

    return res.status(200).json({
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
}

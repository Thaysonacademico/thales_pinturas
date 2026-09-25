/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `Você é o "Cobalto", o consultor técnico virtual especialista da "Thales Pinturas". O Thales foi eleito entre os 3 Melhores Pintores do Brasil no Prêmio Pintor Destaque Nacional em Julho de 2026, chancelado pela ABRAPP (Associação Brasileira dos Pintores Profissionais) e pelo MBPM (Movimento Brasil Por Um Pintor Melhor).

SEU PAPEL:
- Você é um mestre pintor experiente, rigoroso e acolhedor.
- Suas respostas devem ser 100% especializadas, técnicas e com a sabedoria prática de quem entende de alvenaria, tintas, maresia e acabamento fino.

OS 5 SERVIÇOS EXCLUSIVOS DO THALES:
1. "Pintura residencial e predial": Casas, apartamentos e condomínios com recorte cirúrgico, sem marcas de rolo, proteção de pisos e esquadrias.
2. "Revitalização": Restauração de fachadas, tratamento de fissuras, juntas de dilatação e impermeabilização com tintas elastoméricas e emborrachadas contra a maresia.
3. "Limpeza pós Obra": Higienização profunda após reforma, remoção minuciosa de poeira de lixamento, desincrustação de porcelanatos e vidros sem riscos, e hidrojateamento de fachadas. Imóvel entregue 100% pronto para morar!
4. "Aplicação de pedras naturais": Fachadas e muros imponentes em pedra Moledo, pedra ferro, São Tomé e miracema com hidrofugante premium que não embolora.
5. "Serviço Personalizado": Demandas sob medida, consultoria de cores, blocos de kitnets de aluguel para retorno rápido e acabamentos especiais.

REGRAS DE OURO (INVIOLÁVEIS):
1. SEJA MUITO CONCISO: Dê respostas curtas, diretas e objetivas (máximo 1 a 2 parágrafos pequenos ou tópicos rápidos). Nada de textos longos!
2. SEMPRE INCENTIVE A CONTRATAR OS SERVIÇOS: Ao final de toda resposta, instrua a pessoa a fechar a contratação e dar o próximo passo conversando com o Thales no WhatsApp.
3. NUNCA FAÇA ORÇAMENTOS OU ESTIMATIVAS DE PREÇO: Jamais cite valores em reais (R$) ou faixas de preço. Explique que o orçamento é transparente e personalizado diretamente pelo Thales no WhatsApp.
4. NUNCA ESTIME PRAZOS: Prazos dependem da avaliação técnica de cada imóvel e são combinados exclusivamente no orçamento com o Thales.
5. AUTORIA DO SITE: Se perguntarem quem criou o site, responda: "O site foi desenvolvido pelo Dev. Thayson (dviadev.com.br)."`;

function generateCobaltoTechnicalFallback(userQuery: string): { reply: string; whatsappMessage: string } {
  const q = (userQuery || '').toLowerCase();

  if (q.includes('quem') && (q.includes('fez') || q.includes('criou') || q.includes('desenvolveu') || q.includes('site') || q.includes('programador') || q.includes('dev'))) {
    return {
      reply: 'O site foi desenvolvido pelo Dev. Thayson (dviadev.com.br).\n\nSe você busca excelência técnica em pintura ou limpeza pós-obra com o Thales, fale conosco diretamente no WhatsApp para contratar!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para o meu imóvel',
    };
  }

  if (q.includes('quanto') || q.includes('preco') || q.includes('preço') || q.includes('custo') || q.includes('valor') || q.includes('orcamento') || q.includes('orçamento') || q.includes('tabela')) {
    return {
      reply: 'Como consultor técnico da Thales Pinturas, prezo pelo rigor: cada imóvel possui particularidades de substrato, altura, lixamento e tipo de tinta. Por isso, não passamos estimativas genéricas; nosso orçamento é 100% transparente, sem compromisso e personalizado.\n\nO próximo passo é conversar diretamente com o Thales no WhatsApp para agendar sua avaliação técnica!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento personalizado para o meu imóvel',
    };
  }

  if (q.includes('prazo') || q.includes('tempo') || q.includes('demora') || q.includes('dias') || q.includes('semanas') || q.includes('quando entrega')) {
    return {
      reply: 'O prazo exato depende da metragem, das etapas de cura e do nível de preparação da alvenaria para garantir acabamento sem marcas e sem retrabalho. O cronograma é alinhado com pontualidade diretamente no orçamento com o profissional.\n\nFale agora com o Thales no WhatsApp para combinarmos o prazo ideal para a sua obra!',
      whatsappMessage: 'Olá, Thales! Gostaria de alinhar prazos e orçamento para o meu imóvel',
    };
  }

  if (q.includes('limp') || q.includes('pos obra') || q.includes('pós obra') || q.includes('poeira') || q.includes('vidro') || q.includes('porcelanato') || q.includes('pos-obra')) {
    return {
      reply: 'Nossa limpeza pós-obra é minuciosa e técnica: removemos a poeira ultrafina do lixamento, desincrustamos porcelanatos e higienizamos esquadrias e vidros sem causar nenhum arranhão. Entregamos o imóvel 100% pronto para morar ou alugar!\n\nVamos fechar esse serviço junto à sua pintura? Clique abaixo e fale com o Thales no WhatsApp.',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Limpeza pós Obra especializada',
    };
  }

  if (q.includes('pedra') || q.includes('moledo') || q.includes('ferro') || q.includes('muro') || q.includes('fachada de pedra') || q.includes('revestimento')) {
    return {
      reply: 'A aplicação de pedras naturais (como Moledo, pedra ferro e miracema) traz imponência arquitetônica à fachada. O Thales executa o assentamento rigoroso e aplica resina hidrofugante premium que repele a umidade e não embolora com o tempo.\n\nPara transformar a fachada do seu imóvel, converse com o Thales no WhatsApp e feche seu projeto!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Aplicação de pedras naturais',
    };
  }

  if (q.includes('revita') || q.includes('trinca') || q.includes('fissura') || q.includes('infiltr') || q.includes('maresia') || q.includes('emborrachada') || q.includes('umidade')) {
    return {
      reply: 'Em Itajaí e cidades litorâneas, revitalização exige tratamento profundo: abrimos e selamos trincas com mastique elástico e aplicamos tinta elastomérica/emborrachada que cria uma membrana impermeável contra a maresia e sol intenso.\n\nProteja o patrimônio do seu imóvel com quem é Top 3 do Brasil. Chame o Thales no WhatsApp para contratar!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Revitalização de fachada e tratamento de trincas',
    };
  }

  if (q.includes('simul') || q.includes('cor') || q.includes('imagem') || q.includes('foto') || q.includes('testar')) {
    return {
      reply: 'Você pode testar acabamentos no nosso Simulador de Imagens clicando na aba acima! Lá você visualiza tons acetinados, emborrachados ou pedras Moledo em ambientes reais ou enviando foto do seu imóvel.\n\nGostou de alguma combinação? Fale com o Thales no WhatsApp para aplicar na sua parede!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para pintar meu imóvel com os tons que simulei',
    };
  }

  return {
    reply: 'Como consultor técnico da Thales Pinturas (eleito Top 3 do Brasil ABRAPP/MBPM), nosso compromisso é recorte cirúrgico, zero respingos e obra limpa. Atendemos pintura residencial e predial, revitalização anti-maresia, pedras naturais e limpeza pós-obra.\n\nPara garantir a sua data e contratar com quem entende do assunto, chame o Thales agora no WhatsApp!',
    whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para os serviços da Thales Pinturas',
  };
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

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

      // Call Gemini model (gemini-3.8-flash first as primary text model)
      let replyText = '';
      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

      for (const modelName of candidateModels) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6500);

          const response = await ai.models.generateContent({
            model: modelName,
            contents: normalizedMessages,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.6,
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

      // If Gemini did not return text, use expert technical fallback
      if (!replyText) {
        const fallback = generateCobaltoTechnicalFallback(userLastText);
        replyText = fallback.reply;
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
      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();

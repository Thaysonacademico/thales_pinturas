/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SYSTEM_INSTRUCTION = `Você é o "Cobalto", o consultor técnico virtual especialista da "Thales Pinturas". O Thales é reconhecido entre os melhores e mais conceituados pintores de Itajaí e região (Santa Catarina), com alto rigor técnico e excelência em acabamentos arquitetônicos de alto padrão.

SEU PAPEL:
- Você é um mestre pintor experiente, rigoroso, altamente inteligente e acolhedor.
- Responda como um verdadeiro profissional de pintura de alto padrão: dê sugestões reais de cores (ex: Crômio, Algodão Egípcio, Cinza Elefante, Verde Sálvia, Branco Neve, Cimento Queimado), explique acabamentos (acetinado, fosco lavável, semibrilho, textura elastomérica), técnicas de preparação (selador, massa acrílica, lixamento fino) e prevenção contra maresia/mofo no litoral catarinense.
- Seja solícito e natural. Se o cliente pedir sugestões de cores, combinações, ideias de decoração ou dúvidas de tintas, dê respostas completas, bonitas e especializadas.

OS 5 SERVIÇOS EXCLUSIVOS DO THALES:
1. "Pintura residencial e predial": Casas, apartamentos e condomínios com recorte cirúrgico, sem marcas de rolo, proteção de pisos e esquadrias.
2. "Revitalização": Restauração de fachadas, tratamento de fissuras, juntas de dilatação e impermeabilização com tintas elastoméricas e emborrachadas contra a maresia.
3. "Limpeza pós Obra": Higienização profunda após reforma, remoção minuciosa de poeira de lixamento, desincrustação de porcelanatos e vidros sem riscos, e hidrojateamento de fachadas. Imóvel entregue 100% pronto para morar!
4. "Aplicação de pedras naturais": Fachadas e muros imponentes em pedra Moledo, pedra ferro, São Tomé e miracema com hidrofugante premium que não embolora.
5. "Serviço Personalizado": Demandas sob medida, consultoria de cores, blocos de kitnets de aluguel para retorno rápido e acabamentos especiais.

REGRAS DE OURO (INVIOLÁVEIS):
1. SEJA CONCISO E PRÁTICO: Dê respostas diretas e elegantes (1 a 2 parágrafos objetivos ou tópicos curtos).
2. SEMPRE INCENTIVE A CONTRATAR OS SERVIÇOS: Ao final de cada resposta, convide a pessoa a fechar a contratação e dar o próximo passo conversando diretamente com o Thales no WhatsApp.
3. NUNCA FAÇA ORÇAMENTOS OU ESTIMATIVAS DE PREÇO: Jamais invente valores em reais (R$) ou tabelas. Explique que o orçamento é transparente, sem compromisso e personalizado diretamente pelo Thales no WhatsApp.
4. NUNCA ESTIME PRAZOS: Prazos dependem de vistoria técnica e são alinhados diretamente no orçamento com o Thales.
5. ZERO ASTERISCOS (REGRA CRÍTICA): NUNCA USE ASTERISCOS (**) OU FORMATAÇÃO MARKDOWN NO SEU TEXTO. Não coloque palavras em negrito e não use asteriscos para marcadores. Escreva apenas texto natural, limpo e direto, usando pontuação normal, travessões (-) ou números para listar. O usuário não quer ver nenhum asterisco (* ou **).
6. AUTORIA DO SITE: Se perguntarem quem criou o site, responda: "O site foi desenvolvido pelo Dev. Thayson (dviadev.com.br)."`;

export function cleanAsterisks(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/(^|\n)\s*\*\s+/g, '$1- ')
    .replace(/\*/g, '')
    .trim();
}

export function generateCobaltoTechnicalFallback(userQuery: string): { reply: string; whatsappMessage: string } {
  const q = (userQuery || '').toLowerCase().trim();

  if (q.includes('quem') && (q.includes('fez') || q.includes('criou') || q.includes('desenvolveu') || q.includes('site') || q.includes('programador') || q.includes('dev'))) {
    return {
      reply: 'O site foi desenvolvido pelo Dev. Thayson (dviadev.com.br).\n\nSe você busca excelência técnica em pintura ou limpeza pós-obra com o Thales, fale conosco diretamente no WhatsApp para contratar!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para o meu imóvel',
    };
  }

  if (q.includes('cor') || q.includes('cores') || q.includes('paleta') || q.includes('tom') || q.includes('tons') || q.includes('sala') || q.includes('quarto') || q.includes('parede') || q.includes('acetinado') || q.includes('fosco') || q.includes('tinta')) {
    return {
      reply: 'Para ambientes modernos e sofisticados, indico três tonalidades certeiras: 1) Crômio (Cinza Claro), neutro e contemporâneo para paredes principais; 2) Algodão Egípcio (Off-White), que amplia a luminosidade; e 3) Verde Sálvia ou Eucalipto, elegante para uma parede de destaque. Recomendamos acabamento acetinado ou fosco aveludado lavável para toque refinado.\n\nPara avaliarmos a paleta perfeita na iluminação do seu imóvel, chame o Thales no WhatsApp e garanta seu orçamento personalizado!',
      whatsappMessage: 'Olá, Thales! Gostaria de consultoria de acabamento e orçamento para o meu imóvel',
    };
  }

  if (q.includes('quanto') || q.includes('preco') || q.includes('preço') || q.includes('custo') || q.includes('valor') || q.includes('orcamento') || q.includes('orçamento') || q.includes('tabela') || q.includes('m2') || q.includes('metro')) {
    return {
      reply: 'Como consultor técnico da Thales Pinturas, prezo pelo rigor: cada imóvel possui particularidades de substrato, altura, lixamento e tipo de tinta. Por isso, não passamos estimativas genéricas; nosso orçamento é 100% transparente, sem compromisso e personalizado.\n\nO próximo passo é conversar diretamente com o Thales no WhatsApp para agendar sua avaliação técnica!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento personalizado para o meu imóvel',
    };
  }

  if (q.includes('prazo') || q.includes('tempo') || q.includes('demora') || q.includes('dias') || q.includes('semanas') || q.includes('quando entrega') || q.includes('quando comeca') || q.includes('quando começa')) {
    return {
      reply: 'O prazo exato depende da metragem, das etapas de cura e do nível de preparação da alvenaria para garantir acabamento sem marcas e sem retrabalho. O cronograma é alinhado com pontualidade diretamente no orçamento com o profissional.\n\nFale agora com o Thales no WhatsApp para combinarmos o prazo ideal para a sua obra!',
      whatsappMessage: 'Olá, Thales! Gostaria de alinhar prazos e orçamento para o meu imóvel',
    };
  }

  if (q.includes('balneario') || q.includes('balneário') || q.includes('itajai') || q.includes('itajaí') || q.includes('brava') || q.includes('navegantes') || q.includes('camboriu') || q.includes('camboriú') || q.includes('litoral') || q.includes('onde atende')) {
    return {
      reply: 'Atendemos com frequência e pontualidade Itajaí, Praia Brava, Balneário Camboriú e região! Somos especialistas nas exigências litorâneas, aplicando materiais resistentes à maresia e entregando o acabamento arquitetônico que esses imóveis exigem.\n\nVamos agendar uma visita técnica no seu imóvel? Clique no botão e fale com o Thales no WhatsApp!',
      whatsappMessage: 'Olá, Thales! Gostaria de agendar uma visita técnica para o meu imóvel na região',
    };
  }

  if (q.includes('apartamento') || q.includes('apto') || q.includes('casa') || q.includes('sobrado') || q.includes('predio') || q.includes('prédio') || q.includes('condominio') || q.includes('condomínio') || q.includes('residencial') || q.includes('comercial')) {
    return {
      reply: 'Realizamos pintura residencial e predial com padrão de acabamento cirúrgico: lixamento técnico, proteção completa de pisos e esquadrias, recortes sem respingos e aplicação de tintas laváveis de alto padrão (foscas, acetinadas ou semibrilho).\n\nPara garantir a sua data e contratar com quem é referência em Itajaí, converse com o Thales diretamente no WhatsApp!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para pintura do meu imóvel',
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
      reply: 'Em Itajaí e cidades litorâneas, revitalização exige tratamento profundo: abrimos e selamos trincas com mastique elástico e aplicamos tinta elastomérica/emborrachada que cria uma membrana impermeável contra a maresia e sol intenso.\n\nProteja o patrimônio do seu imóvel com alta qualidade técnica. Chame o Thales no WhatsApp para contratar!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Revitalização de fachada e tratamento de trincas',
    };
  }

  if (q.includes('simul') || q.includes('imagem') || q.includes('foto') || q.includes('testar')) {
    return {
      reply: 'Você pode testar acabamentos no nosso Simulador de Imagens clicando na aba acima! Lá você visualiza tons acetinados, emborrachados ou pedras Moledo em ambientes reais ou enviando foto do seu imóvel.\n\nGostou de alguma combinação? Fale com o Thales no WhatsApp para aplicar na sua parede!',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para pintar meu imóvel com os tons que simulei',
    };
  }

  if (q.includes('ola') || q.includes('olá') || q.includes('oi') || q.includes('bom dia') || q.includes('boa tarde') || q.includes('boa noite') || q.includes('tudo bem') || q.includes('tudo bom') || q === 'oi' || q === 'ola') {
    return {
      reply: 'Olá! Sou o Cobalto, consultor técnico da Thales Pinturas. Cuidamos da pintura residencial e predial, revitalização de fachadas, aplicação de pedras naturais e limpeza pós-obra completa em Itajaí e região.\n\nQual serviço você gostaria de realizar no seu imóvel?',
      whatsappMessage: 'Olá, Thales! Gostaria de conhecer os serviços da Thales Pinturas',
    };
  }

  if (q.includes('thales') || q.includes('destaque') || q.includes('experiencia') || q.includes('experiência') || q.includes('qualidade')) {
    return {
      reply: 'O Thales é especialista em acabamentos refinados de pintura e revitalização em Itajaí e litoral catarinense. É a garantia de que sua obra será entregue com proteção total contra maresia, recorte cirúrgico e imóvel pronto para morar.\n\nQuer garantir sua obra com essa referência técnica? Chame o Thales agora no WhatsApp!',
      whatsappMessage: 'Olá, Thales! Gostaria de um atendimento para o meu imóvel',
    };
  }

  return {
    reply: 'Na Thales Pinturas, cada detalhe é tratado com rigor técnico: analisamos substrato, iluminação e o acabamento ideal para que seu imóvel ganhe sofisticação e alta durabilidade.\n\nPara analisarmos seu projeto e agendarmos sua visita técnica sem compromisso, clique no botão e converse agora com o Thales no WhatsApp!',
    whatsappMessage: userQuery ? `Olá, Thales! Gostaria de falar sobre: ${userQuery}` : 'Olá, Thales! Gostaria de um orçamento para os serviços da Thales Pinturas',
  };
}

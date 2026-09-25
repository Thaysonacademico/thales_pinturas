/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteConfig {
  name: string;
  brandTag: string;
  companyName: string;
  badge: string;
  phoneDisplay: string;
  whatsappNumber: string; // international digits without + or spaces
  instagramUrl: string;
  instagramHandle: string;
  youtubeUrl: string; // If empty string, automatically hidden
  city: string;
  state: string;
  serviceRegions: string[];
  metaDescription: string;
  stats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  image: string;
  deadlineNotice: string; // "Conforme orçamento com o profissional"
  isSpecialHighlight?: boolean;
  badgeText?: string;
  whatsappMessage: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

export interface WorkProject {
  id: string;
  title: string;
  category: 'Residencial' | 'Predial' | 'Comercial' | 'Pedras Naturais' | 'Limpeza & Pós-Obra';
  location: string;
  year: string;
  description: string;
  image: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number; // 1 - 5
  source: 'Google' | 'Instagram' | 'WhatsApp';
  verified: boolean;
}

/* ==========================================================================
   CONFIGURAÇÃO PRINCIPAL DO SITE (Edite os dados aqui com facilidade)
   ========================================================================== */

export const SITE_CONFIG: SiteConfig = {
  name: 'Thales Pinturas',
  brandTag: 'Pintura Residencial, Comercial & Pós-Obra',
  companyName: 'Thales Pinturas',
  badge: 'Eleito Top 3 Pintores do Brasil (ABRAPP / MBPM - Julho 2026)',
  phoneDisplay: '(47) 99100-6754',
  whatsappNumber: '5547991006754', // WhatsApp oficial da logo
  instagramUrl: 'https://www.instagram.com/jthales_pinturas?stkn=MTA2emZyNWRrNHNpZw==',
  instagramHandle: '@jthales_pinturas',
  youtubeUrl: '', // Se deixar vazio (""), o botão do YouTube é ocultado automaticamente
  city: 'Itajaí',
  state: 'SC',
  serviceRegions: [
    'Litoral Norte (Itajaí, Balneário Camboriú, Navegantes, Penha, Piçarras, Itapema)',
    'Vale do Itajaí (Blumenau, Gaspar, Brusque e região)',
    'Norte Catarinense (Joinville, Barra Velha, Araquari e região)',
    'Consulte a disponibilidade para a sua cidade',
  ],
  metaDescription: 'J. Thales Pinturas & Limpeza: Eleito entre os 3 Melhores Pintores do Brasil (ABRAPP / MBPM - Julho 2026). Pintura residencial, predial, pedras naturais e limpeza pós-obra em Itajaí - SC.',
  stats: [
    {
      value: 'Top 3',
      label: 'Melhores do Brasil',
      sublabel: 'Prêmio Pintor Destaque Nacional ABRAPP & MBPM (Julho 2026)',
    },
    {
      value: '12+',
      label: 'Anos de Experiência',
      sublabel: 'Tradição e domínio das melhores técnicas',
    },
    {
      value: '380+',
      label: 'Obras Realizadas',
      sublabel: 'Residências, prédios, kitnets e limpezas pós-obra',
    },
    {
      value: '100%',
      label: 'Pronto para Uso',
      sublabel: 'Pintura e limpeza pós-obra completa sem sujeira',
    },
  ],
};

/* ==========================================================================
   DADOS OFICIAIS DO PRÊMIO PINTOR DESTAQUE (ABRAPP / MBPM)
   ========================================================================== */

export interface AwardInfo {
  title: string;
  subtitle: string;
  edition: string;
  monthYear: string;
  nomineeName: string;
  nomineeBrand: string;
  description: string;
  organizations: {
    name: string;
    acronym: string;
    url: string;
    description: string;
  }[];
  finalists: {
    name: string;
    isThales: boolean;
    role: string;
  }[];
}

export const OFFICIAL_AWARD_DATA: AwardInfo = {
  title: 'Prêmio Pintor Destaque',
  subtitle: 'Eleito Entre os 3 Melhores Pintores do Brasil',
  edition: 'Votação Oficial Nacional',
  monthYear: 'Julho de 2026',
  nomineeName: 'Thales',
  nomineeBrand: 'JThalis Pinturas',
  description:
    'Consagrado em votação oficial promovida pelas duas maiores entidades representativas da categoria no país: o Movimento Brasil Por Um Pintor Melhor (MBPM) e a Associação Brasileira dos Pintores Profissionais (ABRAPP). Reconhecimento público de rigor técnico, segurança no canteiro de obras e acabamento arquitetônico.',
  organizations: [
    {
      name: 'Movimento Brasil Por Um Pintor Melhor',
      acronym: 'MBPM',
      url: 'https://www.facebook.com/movimentobrasilporumpintormelhor/?locale=pt_BR',
      description: 'Movimento nacional de capacitação, ética e valorização dos pintores profissionais no Brasil.',
    },
    {
      name: 'Associação Brasileira dos Pintores Profissionais',
      acronym: 'ABRAPP',
      url: 'https://www.pintorabrapp.com.br/sobre',
      description: 'Entidade oficial sem fins lucrativos que regulamenta, qualifica e representa os mestres de pintura em todo o território nacional.',
    },
  ],
  finalists: [
    {
      name: 'JTHALIS PINTURAS',
      isThales: true,
      role: 'Finalista Nacional Eleito',
    },
    {
      name: 'ZAK LIMA',
      isThales: false,
      role: 'Finalista Nacional',
    },
    {
      name: '3M PINTURAS',
      isThales: false,
      role: 'Finalista Nacional',
    },
  ],
};

/* ==========================================================================
   SERVIÇOS EM DESTAQUE (Pintura, Limpeza Predial/Pós-Obra e Pedras Naturais)
   ========================================================================== */

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'pintura-residencial-predial',
    number: '01',
    title: 'Pintura residencial e predial',
    subtitle: 'Casas, sobrados, apartamentos e edifícios com acabamento primoroso',
    shortDescription: 'Preparação técnica de alvenaria com lixamento aspirado, corte cirúrgico e tintas nobres de alta durabilidade para ambientes internos e fachadas.',
    fullDescription: 'Atendimento completo para residências e condomínios em Itajaí e região. Aplicação de massas especiais, fundos bloqueadores e tintas acetinadas ou foscas nobres, assegurando toque aveludado, recortes retos em rodapés e durabilidade contra o mofo e maresia.',
    highlights: ['Isolamento total de pisos e esquadrias', 'Acabamento acetinado sem marcas de rolo', 'Pintura interna, portas, sancas e fachadas'],
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop',
    deadlineNotice: 'Prazo: Conforme orçamento com o profissional',
    whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Pintura residencial e predial.',
  },
  {
    id: 'revitalizacao',
    number: '02',
    title: 'Revitalização',
    subtitle: 'Restauração de fachadas, recuperação de alvenarias e proteção contra maresia',
    shortDescription: 'Tratamento de trincas, recuperação de paredes castigadas pelo tempo e impermeabilização com tintas elastoméricas e hidrorrepelentes.',
    fullDescription: 'Recuperação estética e estrutural de imóveis desgastados pelo sol e pela umidade litorânea. Vedação de fissuras e aplicação de tintas emborrachadas de alta tecnologia.',
    highlights: ['Tratamento rigoroso de fissuras e infiltrações', 'Revitalização de alvenarias e sacadas', 'Proteção avançada contra maresia e umidade'],
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1000&auto=format&fit=crop',
    deadlineNotice: 'Prazo: Conforme orçamento com o profissional',
    whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Revitalização.',
  },
  {
    id: 'limpeza-pos-obra',
    number: '03',
    title: 'Limpeza pós Obra',
    subtitle: 'Higienização profunda pós-reforma, desincrustação e entrega pronto para morar',
    shortDescription: 'O Thales entrega a obra pronta: remoção de poeira de lixamento, desincrustação de pisos e vidros sem riscos e hidrojateamento.',
    fullDescription: 'Diferencial exclusivo do Thales: você não precisa contratar outra equipe para limpar a sujeira. Limpeza grossa e fina, remoção de respingos de massa sem riscar porcelanatos ou esquadrias pretas, e vidros brilhando.',
    highlights: ['Remoção de poeira fina e resíduos de lixamento', 'Desincrustação de porcelanatos e vidros sem riscos', 'Lavagem e hidrojateamento técnico', 'Imóvel entregue 100% pronto para morar'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop',
    deadlineNotice: 'Prazo: Conforme orçamento com o profissional',
    whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Limpeza pós Obra.',
  },
  {
    id: 'pedras-naturais',
    number: '04',
    title: 'Aplicação de pedras naturais',
    subtitle: 'Fachadas imponentes, muros, pórticos e revestimentos rústicos nobres',
    shortDescription: 'Assentamento técnico de pedras nobres (Moledo, Pedra Ferro, Miracema e São Tomé) combinado a vedação hidrofugante premium.',
    fullDescription: 'A pedra natural valoriza intensamente o imóvel. Corte, assentamento e impermeabilização com precisão milimétrica, criando painéis que resistem ao tempo sem embolorar nem soltar com a umidade.',
    highlights: ['Pedra Moledo, Ferro, São Tomé e Filetes', 'Impermeabilização invisível que evita limo', 'Integração perfeita com calçadas e iluminação'],
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000&auto=format&fit=crop',
    deadlineNotice: 'Prazo: Conforme orçamento com o profissional',
    isSpecialHighlight: true,
    badgeText: 'Especialidade Nobre & Arquitetônica',
    whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Aplicação de pedras naturais.',
  },
  {
    id: 'servico-personalizado',
    number: '05',
    title: 'Serviço Personalizado',
    subtitle: 'Projetos sob medida, cores exclusivas, kitnets de aluguel e demandas especiais',
    shortDescription: 'Solução flexível adaptada à sua necessidade: desde pintura para locação rápida de kitnets até consultoria de cores e acabamentos específicos.',
    fullDescription: 'Atendimento sob medida para clientes exigentes e investidores. Se sua obra requer um planejamento fora do padrão, consultoria técnica de tintas especiais ou cronograma diferenciado, o Thales desenvolve a solução ideal.',
    highlights: ['Planejamento sob medida para o seu imóvel', 'Consultoria técnica de cores e produtos', 'Agilidade para investidores e prazos dedicados'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop',
    deadlineNotice: 'Prazo: Conforme orçamento com o profissional',
    whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para Serviço Personalizado.',
  },
];

/* ==========================================================================
   COMPARAÇÕES ANTES E DEPOIS (Slider interativo)
   ========================================================================== */

export const BEFORE_AFTER_DATA: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    title: 'Recuperação & Pintura de Alvenaria Residencial',
    category: 'Pintura Residencial',
    location: 'Bairro Fazenda, Itajaí – SC',
    description: 'Recuperação de paredes com intempéries, aplicação de selador acrílico e acabamento em tons neutros com corte reto e sem marcas.',
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop',
    beforeLabel: 'Antes (Paredes Desgastadas)',
    afterLabel: 'Depois (Pintura Nova J. Thales)',
  },
  {
    id: 'ba-2',
    title: 'Limpeza Pós-Obra: Da Poeira da Reforma ao Piso Limpo',
    category: 'Limpeza Predial & Pós-Obra',
    location: 'Centro, Itajaí – SC',
    description: 'Remoção minuciosa de poeira de lixamento, desincrustação técnica de porcelanato e higienização completa de esquadrias e vidros entregues pelo Thales.',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop',
    beforeLabel: 'Antes (Poeira e Resíduos de Obra)',
    afterLabel: 'Depois (Pós-Obra Limpo J. Thales)',
  },
  {
    id: 'ba-3',
    title: 'Transformação de Entrada com Pedras Naturais',
    category: 'Aplicação de Pedras Naturais',
    location: 'Praia Brava, Itajaí – SC',
    description: 'Muro e fachada frontal transformados com pedra moledo bruta e pintura mineral complementar nas platibandas.',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000&auto=format&fit=crop',
    beforeLabel: 'Antes (Muro Cru Desgastado)',
    afterLabel: 'Depois (Pedras Naturais + Acabamento)',
  },
];

/* ==========================================================================
   OBRAS REALIZADAS (Galeria com filtros e lightbox)
   ========================================================================== */

export const WORKS_DATA: WorkProject[] = [
  {
    id: 'work-1',
    title: 'Pintura Residencial & Recuperação Externa',
    category: 'Residencial',
    location: 'Bairro Fazenda, Itajaí – SC',
    year: '2025',
    description: 'Pintura externa completa em alvenaria residencial com tintas impermeabilizantes emborrachadas e isolamento de calçadas.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    badge: 'Obra Concluída',
  },
  {
    id: 'work-2',
    title: 'Limpeza Pós-Obra Fina em Apartamento',
    category: 'Limpeza & Pós-Obra',
    location: 'Praia Brava, Itajaí – SC',
    year: '2025',
    description: 'Higienização profunda pós-reforma: aspiração de pó fino de lixamento, desincrustação de pisos e vidros sem deixar riscos.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200&auto=format&fit=crop',
    badge: 'Pós-Obra Entregue',
  },
  {
    id: 'work-3',
    title: 'Condomínio Residencial – Revitalização Externa',
    category: 'Predial',
    location: 'Centro, Itajaí – SC',
    year: '2024',
    description: 'Revitalização de fachada e sacadas de condomínio com impermeabilização elastomérica contra maresia e tratamento de trincas.',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1200&auto=format&fit=crop',
    badge: 'Predial',
  },
  {
    id: 'work-4',
    title: 'Fachada Residencial com Pedras Moledo',
    category: 'Pedras Naturais',
    location: 'Bairro Ressacada, Itajaí – SC',
    year: '2025',
    description: 'Aplicação técnica de pedras naturais na parede de entrada com resina hidrofugante contra manchas e umidade.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop',
    badge: 'Pedras Naturais',
  },
  {
    id: 'work-5',
    title: 'Conjunto de Kitnets Prontas para Aluguel',
    category: 'Comercial',
    location: 'Cordeiros, Itajaí – SC',
    year: '2025',
    description: 'Pintura padronizada de unidades de kitnets com tinta semibrilho lavável, entregando o imóvel pronto para locação de renda.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
    badge: 'Kitnets de Locação',
  },
  {
    id: 'work-6',
    title: 'Limpeza Predial & Lavagem Técnica de Fachada',
    category: 'Limpeza & Pós-Obra',
    location: 'Balneário Camboriú / Itajaí',
    year: '2025',
    description: 'Hidrojateamento com pressão calibrada para remoção de fuligem, limo marinho e limpeza de esquadrias em altura.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=1200&auto=format&fit=crop',
    badge: 'Limpeza Predial',
  },
  {
    id: 'work-7',
    title: 'Pintura Interna de Dormitório & Teto em Gesso',
    category: 'Residencial',
    location: 'Cabeçudas, Itajaí – SC',
    year: '2025',
    description: 'Aplicação de massa corrida, lixamento fino e tinta fosca aveludada, sem sombras nem marcas sob iluminação pontual.',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop',
    badge: 'Interior Residencial',
  },
];

/* ==========================================================================
   DEPOIMENTOS / AVALIAÇÕES (Controladas pelo proprietário)
   Obs: Se o array estiver vazio [], a seção inteira desaparece no site.
   ========================================================================== */

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'dep-1',
    name: 'Eduardo Silveira',
    role: 'Proprietário de Residência',
    location: 'Condomínio Fechado, Itajaí – SC',
    text: 'O Thales é um dos raros profissionais que entendem o padrão de uma casa moderna. O recorte entre o teto e a parede é cirúrgico, e o cuidado com as esquadrias de alumínio preto foi absoluto. Não caiu uma gota no porcelanato.',
    rating: 5,
    source: 'Google',
    verified: true,
  },
  {
    id: 'dep-2',
    name: 'Carolina M. Zanella',
    role: 'Arquiteta de Interiores',
    location: 'Balneário Camboriú & Itajaí',
    text: 'Sempre indico o J. Thales para meus clientes mais criteriosos. Ele sabe exatamente como trabalhar com tinta acetinada sem deixar sombras nem manchas de sobreposição. O acabamento das pedras naturais na fachada da Praia Brava ficou digno de revista.',
    rating: 5,
    source: 'Instagram',
    verified: true,
  },
  {
    id: 'dep-3',
    name: 'Marcos Vinicius Freitas',
    role: 'Investidor e Construtor de Kitnets',
    location: 'Itajaí – SC',
    text: 'Construí um bloco de 10 kitnets para aluguel. O Thales fechou o pacote, cumpriu rigorosamente o prazo de entrega e a pintura ficou com padrão de hotel. O imóvel valorizou imediatamente e aluguei todas as unidades na primeira semana.',
    rating: 5,
    source: 'WhatsApp',
    verified: true,
  },
  {
    id: 'dep-4',
    name: 'Síndico Renato Alencar',
    role: 'Condomínio Residencial Ilha Bela',
    location: 'Bairro Fazenda, Itajaí – SC',
    text: 'Fizemos a restauração da fachada com o Thales. Trabalho limpo, funcionários respeitosos com os moradores e cumprimento total das normas de segurança. Merecidamente entre os 3 melhores pintores da nossa cidade.',
    rating: 5,
    source: 'Google',
    verified: true,
  },
];

/* Helper para gerar link do WhatsApp com mensagem segura */
export const getWhatsAppLink = (customText?: string): string => {
  const message = customText || `Olá, Thales! Gostaria de um orçamento`;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

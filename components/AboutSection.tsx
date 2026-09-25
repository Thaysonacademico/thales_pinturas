/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../siteConfig';
import { ShieldCheck, Ruler, Clock, Sparkles, ArrowUpRight } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-14 sm:py-18 bg-[#F4EFEA] border-t border-[#E2DDD5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#BD6B3B] uppercase block mb-2">
          Sobre o Profissional
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#14201C] tracking-tight mb-4 leading-tight">
          A diferença entre pintar uma parede e executar um acabamento arquitetônico.
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-[#4E473D] leading-relaxed mb-6">
          <p>
            No mercado imobiliário e construtivo de <strong>Itajaí, Praia Brava e Balneário Camboriú</strong>, o acabamento da pintura e dos revestimentos é o primeiro elemento notado por compradores exigentes.
          </p>
          <p>
            Com mais de uma década de experiência prática, <strong>Thales</strong> conquistou posição de destaque nacional pela precisão: desde o lixamento mecânico com aspiração de pó até a aplicação de tintas acetinadas nobres, assentamento de pedras naturais e a <strong>limpeza pós-obra especializada</strong>.
          </p>
          <p>
            O cliente não precisa contratar uma equipe para pintar e outra para limpar. Entregamos a obra <strong>100% pronta para morar ou alugar</strong>, com porcelanatos desincrustados e vidros sem riscos.
          </p>
        </div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 pt-4 border-t border-[#DCD3C5]">
          <div className="flex items-start gap-2.5 bg-[#FAF8F5] p-3 border border-[#E2DDD5]">
            <Ruler className="text-[#BD6B3B] shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14201C]">Recortes Precisos</h4>
              <p className="text-[11px] text-[#6B6358] mt-0.5">Esquadrias de alumínio preto, rodapés e sancas sem respingos.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-[#FAF8F5] p-3 border border-[#E2DDD5]">
            <ShieldCheck className="text-[#BD6B3B] shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14201C]">Proteção Total</h4>
              <p className="text-[11px] text-[#6B6358] mt-0.5">Pisos, vidros e esquadrias isolados contra manchas e poeira.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-[#FAF8F5] p-3 border border-[#E2DDD5]">
            <Clock className="text-[#BD6B3B] shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14201C]">Compromisso com o Cliente</h4>
              <p className="text-[11px] text-[#6B6358] mt-0.5">Acompanhamento contínuo e entrega sem abandono de obra.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-[#FAF8F5] p-3 border border-[#E2DDD5]">
            <Sparkles className="text-[#BD6B3B] shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14201C]">Resistência à Maresia</h4>
              <p className="text-[11px] text-[#6B6358] mt-0.5">Tintas elastoméricas e produtos desenvolvidos para o litoral.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-xs"
          >
            <span>Falar diretamente no WhatsApp</span>
            <ArrowUpRight size={14} />
          </a>

          <a
            href="#obras"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-[#1D2F29] text-[#1D2F29] hover:bg-[#1D2F29] hover:text-[#FAF8F5] text-xs font-bold tracking-wider uppercase transition-all"
          >
            Conferir Obras Realizadas
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

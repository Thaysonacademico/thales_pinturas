/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Trophy, Check, ExternalLink, ArrowUpRight } from 'lucide-react';
import { getWhatsAppLink } from '../siteConfig';
import ThalesLogo from './ThalesLogo';

const AwardSection: React.FC = () => {
  return (
    <section id="reconhecimento" className="relative py-16 md:py-20 bg-[#14201C] text-[#FAF8F5] overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#BD6B3B_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#BD6B3B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Header - Minimalista & Direto */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#BD6B3B]/20 border border-[#BD6B3B]/40 text-[#BD6B3B] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
            <Trophy size={13} className="text-[#BD6B3B]" />
            <span>Padrão Profissional • Litoral Catarinense</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#FAF8F5] leading-tight">
            Excelência em Pintura & Limpeza Pós-Obra
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-[#DCD3C5] max-w-lg mx-auto leading-relaxed">
            Entre os profissionais mais recomendados de <strong>Itajaí, Praia Brava e Balneário Camboriú</strong> para clientes que buscam acabamento cirúrgico.
          </p>
        </div>

        {/* Minimalist Presentation Card */}
        <div className="bg-[#0E1513] border border-[#2D3F38] p-6 sm:p-8 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Recognition Spotlight */}
            <div className="md:col-span-5 flex flex-col items-center text-center p-6 bg-[#16221E] border border-[#2A3F37] relative">
              <div className="absolute -top-3 bg-[#BD6B3B] text-[#FAF8F5] text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 shadow">
                Alto Padrão
              </div>

              <ThalesLogo className="w-20 h-20 sm:w-24 sm:h-24 my-2 drop-shadow-xl" />

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF8F5] mt-1">
                Thales Pinturas
              </h3>
              <p className="text-[11px] text-[#A2B8AC] uppercase tracking-wider mt-0.5">
                Itajaí – Santa Catarina
              </p>

              <div className="mt-4 pt-3 border-t border-[#263C34] w-full flex items-center justify-around text-[10px] text-[#DCD3C5]">
                <span>Itajaí</span>
                <span className="text-[#BD6B3B]">•</span>
                <span>Praia Brava</span>
                <span className="text-[#BD6B3B]">•</span>
                <span>Balneário Camboriú</span>
              </div>
            </div>

            {/* 3 Pillars - Ultra Compact & Comfortable */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-[#1E3029] border border-[#2EE082]/40 rounded-full mt-0.5 shrink-0">
                    <Check size={12} className="text-[#2EE082]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#FAF8F5]">
                      Pintura em Altura (NR-35)
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#A2B8AC] leading-relaxed">
                      Fachadas prediais e sobrados com segurança extrema e isolamento completo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-[#1E3029] border border-[#2EE082]/40 rounded-full mt-0.5 shrink-0">
                    <Check size={12} className="text-[#2EE082]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#FAF8F5]">
                      Recortes Cirúrgicos & Sem Marcas
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#A2B8AC] leading-relaxed">
                      Alisamento técnico fino e paredes uniformes mesmo sob iluminação lateral direta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-[#1E3029] border border-[#2EE082]/40 rounded-full mt-0.5 shrink-0">
                    <Check size={12} className="text-[#2EE082]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#FAF8F5]">
                      Entrega com Pós-Obra Limpo
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#A2B8AC] leading-relaxed">
                      Pisos e vidros desincrustados, entregando o imóvel pronto para habitar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification Links & CTA */}
              <div className="pt-4 border-t border-[#263C34] flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="https://www.pintorabrapp.com.br/sobre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#121B17] hover:bg-[#1A2E26] border border-[#2D3F38] text-[10px] text-[#DCD3C5] transition-colors"
                  >
                    <span>ABRAPP</span>
                    <ExternalLink size={10} className="text-[#F2B705]" />
                  </a>

                  <a
                    href="https://www.facebook.com/movimentobrasilporumpintormelhor/?locale=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#121B17] hover:bg-[#1A2E26] border border-[#2D3F38] text-[10px] text-[#DCD3C5] transition-colors"
                  >
                    <span>MBPM</span>
                    <ExternalLink size={10} className="text-[#2EE082]" />
                  </a>
                </div>

                <a
                  href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#BD6B3B] hover:bg-[#A85B2D] text-[#FAF8F5] text-[11px] font-bold tracking-wider uppercase transition-all shadow-md"
                >
                  <span>Solicitar Orçamento</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardSection;

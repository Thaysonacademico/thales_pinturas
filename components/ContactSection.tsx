/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../siteConfig';
import { MapPin, Clock, ArrowUpRight, CheckCircle2, Shield } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

const ContactSection: React.FC = () => {
  return (
    <section id="contato" className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#DCD3C5]">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#BD6B3B] uppercase block mb-2">
              Atendimento Direto
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#14201C] tracking-tight">
              Solicite seu Orçamento
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs sm:text-sm text-[#595349] max-w-md">
            Envie sua metragem, fotos do local ou tire suas dúvidas diretamente com o profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Direct WhatsApp Card */}
          <div className="lg:col-span-7 bg-[#1D2F29] text-[#FAF8F5] p-6 sm:p-10 border-2 border-[#BD6B3B] shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#BD6B3B] text-[#FAF8F5] text-[10px] font-bold tracking-widest uppercase mb-4">
                <span>Atendimento Rápido</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-3 leading-tight">
                Conversar com o Thales no WhatsApp
              </h3>

              <p className="text-xs sm:text-sm text-[#DCD3C5] leading-relaxed mb-6">
                Você conversa diretamente com o profissional experiente e responsável técnico pelas obras. Analisamos suas fotos ou agendamos visita técnica.
              </p>

              <div className="space-y-3 mb-6 text-xs text-[#EAE4DB]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-[#BD6B3B] shrink-0" />
                  <span>Avaliação técnica do substrato e proteção contra maresia</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-[#BD6B3B]" />
                  <span>Indicação das melhores marcas e acabamentos nobres</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-[#BD6B3B]" />
                  <span>Cronograma alinhado e obra entregue limpa</span>
                </div>
              </div>

              {/* 5 Quick service select chips */}
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A5B5AF] block mb-2">
                  Escolha o serviço para solicitar orçamento:
                </span>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <a
                    href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento para Pintura residencial e predial.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#253D35] hover:bg-[#BD6B3B] text-[#FAF8F5] transition-colors border border-[#3E5C50]"
                  >
                    Pintura residencial e predial
                  </a>
                  <a
                    href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento para Revitalização.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#253D35] hover:bg-[#BD6B3B] text-[#FAF8F5] transition-colors border border-[#3E5C50]"
                  >
                    Revitalização
                  </a>
                  <a
                    href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento para Limpeza pós Obra.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#253D35] hover:bg-[#BD6B3B] text-[#FAF8F5] transition-colors border border-[#3E5C50]"
                  >
                    Limpeza pós Obra
                  </a>
                  <a
                    href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento para Aplicação de pedras naturais.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#253D35] hover:bg-[#BD6B3B] text-[#FAF8F5] transition-colors border border-[#3E5C50]"
                  >
                    Aplicação de pedras naturais
                  </a>
                  <a
                    href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento para Serviço Personalizado.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#253D35] hover:bg-[#BD6B3B] text-[#FAF8F5] transition-colors border border-[#3E5C50]"
                  >
                    Serviço Personalizado
                  </a>
                </div>
              </div>
            </div>

            <div>
              <a
                href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-[#FAF8F5] text-xs font-bold tracking-widest uppercase transition-all shadow-lg group border border-[#25D366]"
              >
                <WhatsAppIcon size={20} className="group-hover:scale-105 transition-transform" />
                <span>Solicitar Orçamento no WhatsApp</span>
                <ArrowUpRight size={15} />
              </a>

              <p className="text-center text-[10px] text-[#A5B5AF] tracking-wider uppercase mt-2.5">
                Número oficial com DDD 47: {SITE_CONFIG.phoneDisplay}
              </p>
            </div>
          </div>

          {/* Regional Coverage & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {/* Box 1: Location */}
            <div className="bg-[#F4EFEA] p-6 sm:p-7 border border-[#E2DDD5]">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#BD6B3B] mb-2.5">
                <MapPin size={15} />
                <span>Base Operacional</span>
              </div>
              <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#14201C] mb-2">
                Itajaí – Santa Catarina
              </h4>
              <p className="text-xs text-[#595349] leading-relaxed mb-3">
                Atendimento em Itajaí, Praia Brava, Balneário Camboriú, Navegantes e cidades vizinhas.
              </p>
            </div>

            {/* Box 2: Working Hours & Professional Guarantee */}
            <div className="bg-[#FAF8F5] p-6 sm:p-7 border border-[#E2DDD5]">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#BD6B3B] mb-2.5">
                <Clock size={15} />
                <span>Horário de Atendimento</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#14201C] mb-1">
                Segunda a Sábado: 07h30 às 18h30
              </div>
              <p className="text-xs text-[#6B6358] mb-3">
                Plantão de mensagens no WhatsApp com resposta ágil.
              </p>

              <div className="pt-3 border-t border-[#EAE4DB] flex items-center gap-2.5 text-xs text-[#1D2F29] font-semibold">
                <Shield size={15} className="text-[#BD6B3B]" />
                <span>Garantia de padrão e acabamento impecável</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

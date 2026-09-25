/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SERVICES_DATA, getWhatsAppLink } from '../siteConfig';
import { ArrowUpRight, Check, ZoomIn } from 'lucide-react';
import { openImageLightbox } from './ImageLightboxModal';

const ServicesSection: React.FC = () => {
  return (
    <section id="servicos" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#E2DDD5]">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#BD6B3B] uppercase block mb-2">
              Nossos Serviços
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#14201C] tracking-tight">
              Pintura, Revitalização, Pedras & Limpeza
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-xs sm:text-sm text-[#595349] max-w-md">
            Padrão técnico rigoroso em Itajaí e região. Imóvel entregue limpo e pronto para morar.
          </p>
        </div>

        {/* 5 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className={`bg-[#F4EFEA] border p-5 sm:p-6 flex flex-col justify-between group transition-all ${
                service.isSpecialHighlight
                  ? 'border-[#BD6B3B] bg-[#F7F2EB] shadow-md'
                  : 'border-[#E2DDD5] hover:border-[#1D2F29]'
              }`}
            >
              <div>
                {/* Number & Tag */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2DDD5]">
                  <span className="font-serif text-2xl font-bold text-[#8D7F71]">
                    {service.number}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#595349] bg-[#EAE4DB] px-2 py-0.5">
                    {service.badgeText || 'Especialidade'}
                  </span>
                </div>

                {/* Service Image (Colorida e Viva - Permite Zoom e Interação) */}
                <div
                  onClick={() =>
                    openImageLightbox({
                      src: service.image,
                      alt: service.title,
                      title: service.title,
                      subtitle: service.subtitle,
                    })
                  }
                  className="mb-4 relative overflow-hidden border border-[#DCD3C5] aspect-[16/10] cursor-pointer group/img"
                  title="Clique para ver em alta resolução e dar zoom"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover filter saturate-[1.12] contrast-[1.05] group-hover/img:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-2.5 py-1 bg-[#14201C]/85 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <ZoomIn size={12} />
                      <span>Ampliar</span>
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#14201C] mb-1">
                  {service.title}
                </h3>

                <p className="text-[11px] font-semibold text-[#BD6B3B] tracking-wide uppercase mb-3">
                  {service.subtitle}
                </p>

                <p className="text-xs text-[#595349] leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5 text-[11px] text-[#3A352F]">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check size={13} className="text-[#BD6B3B] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Notice & WhatsApp Action */}
              <div>
                <p className="text-[10px] text-[#8C8479] mb-3 italic">
                  {service.deadlineNotice}
                </p>

                <a
                  href={getWhatsAppLink(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#1D2F29] hover:bg-[#BD6B3B] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase transition-colors shadow-xs"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

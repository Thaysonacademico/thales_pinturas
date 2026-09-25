/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TESTIMONIALS_DATA } from '../siteConfig';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './SocialIcons';

const TestimonialsSection: React.FC = () => {
  // If array is empty, the entire section disappears automatically
  if (!TESTIMONIALS_DATA || TESTIMONIALS_DATA.length === 0) {
    return null;
  }

  const renderSourceIcon = (source: string) => {
    switch (source) {
      case 'Instagram':
        return <InstagramIcon size={13} />;
      case 'WhatsApp':
        return <WhatsAppIcon size={13} />;
      default:
        return null;
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'Google':
        return 'border-[#DCD3C5] bg-[#FAF8F5] text-[#14201C]';
      case 'Instagram':
        return 'border-[#E2DDD5] bg-[#FFFFFF] text-[#14201C]';
      case 'WhatsApp':
        return 'border-[#25D366]/30 bg-[#25D366]/10 text-[#14201C]';
      default:
        return 'border-[#DCD3C5] bg-[#FAF8F5] text-[#14201C]';
    }
  };

  return (
    <section id="avaliacoes" className="py-24 bg-[#FAF8F5] border-t border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#DCD3C5]">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#BD6B3B] uppercase block mb-3">
              Credibilidade & Confiança
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#14201C] tracking-tight">
              O que dizem os clientes
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex text-[#BD6B3B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" stroke="none" />
              ))}
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-[#14201C]">
              Avaliação Máxima 5.0
            </span>
          </div>
        </div>

        {/* Editorial Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-[#F4EFEA] border border-[#E2DDD5] p-8 md:p-10 flex flex-col justify-between relative group hover:border-[#1D2F29] transition-colors"
            >
              {/* Giant elegant quotation mark */}
              <div className="absolute top-6 right-6 text-[#E2DDD5] group-hover:text-[#D4C9BA] transition-colors pointer-events-none">
                <Quote size={48} strokeWidth={1} />
              </div>

              <div>
                {/* Rating Stars & Source */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex text-[#BD6B3B] gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" stroke="none" />
                    ))}
                  </div>

                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border flex items-center gap-1.5 ${getSourceBadgeColor(
                      item.source
                    )}`}
                  >
                    {renderSourceIcon(item.source)}
                    <span>via {item.source}</span>
                  </span>
                </div>

                {/* Quote Text */}
                <blockquote className="font-serif italic text-lg md:text-xl text-[#222B27] leading-relaxed mb-8">
                  "{item.text}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-[#DCD3C5]/80 flex items-center justify-between">
                <div>
                  <div className="font-sans font-bold text-sm md:text-base text-[#14201C] flex items-center gap-1.5">
                    <span>{item.name}</span>
                    {item.verified && (
                      <CheckCircle size={14} className="text-[#1D2F29]" aria-label="Cliente Verificado" />
                    )}
                  </div>
                  <div className="text-xs text-[#7A7165] font-medium mt-0.5">
                    {item.role} • {item.location}
                  </div>
                </div>

                <div className="w-8 h-8 border border-[#1D2F29]/20 flex items-center justify-center font-serif font-bold text-xs text-[#1D2F29] bg-[#FAF8F5]">
                  {item.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

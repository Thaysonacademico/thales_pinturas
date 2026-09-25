/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import BrushRevealHeroImage from './BrushRevealHeroImage';

const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-[#FAF8F5] overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Main Copy Column - Compact Minimalista Confortável */}
          <div className="lg:col-span-6">
            {/* Top 3 Badge Seal */}
            <a
              href="https://www.pintorabrapp.com.br/sobre"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#F6EFEB] border border-[#BD6B3B]/60 text-[#14201C] text-[10px] font-semibold tracking-wider uppercase mb-3.5 shadow-2xs transition-all group"
              title="Associação Brasileira dos Pintores Profissionais"
            >
              <span className="text-xs">🏆</span>
              <span className="text-[#BD6B3B] font-bold">Top 3 do Brasil (ABRAPP / MBPM)</span>
              <span className="text-[9px] text-[#8C7E72] pl-0.5 group-hover:text-[#BD6B3B]">
                oficial ↗
              </span>
            </a>

            {/* Direct H1 Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#14201C] tracking-tight leading-tight mb-2.5">
              Pintura Profissional & Limpeza Pós-Obra
            </h1>

            {/* Subtitle - Short & Clean */}
            <p className="text-xs sm:text-sm text-[#4E473D] leading-relaxed mb-4 max-w-lg">
              Pintura residencial e predial, pedras naturais e limpeza fina. Acabamento de alto padrão, sem respingos e pronto para morar.
            </p>

            {/* Action: Ver Obras */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#obras"
                className="inline-flex items-center justify-center px-4 py-2 border border-[#DCD3C5] bg-[#FAF8F5] text-[#14201C] hover:border-[#1D2F29] hover:bg-[#F4EFEA] text-[11px] font-bold tracking-wider uppercase transition-all"
              >
                <span>Ver Obras</span>
                <ArrowRight size={13} className="ml-1 text-[#BD6B3B]" />
              </a>
            </div>
          </div>

          {/* Hero Visual Column - Interactive Scratch/Paintbrush Image (Cinza -> Revela cor) */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0 max-w-md mx-auto w-full lg:max-w-none">
            <div className="p-2 sm:p-2.5 bg-[#FAF8F5] border border-[#DCD3C5] shadow-lg">
              <BrushRevealHeroImage
                colorSrc="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
                alt="Pintura residencial executada pela Thales Pinturas em Itajaí"
                aspectClassName="aspect-[16/10] sm:aspect-[4/3] max-h-[280px] sm:max-h-[340px]"
              />

              <div className="mt-2 px-1 flex items-center justify-between text-[10px] text-[#7A7165]">
                <span>Obra residencial real</span>
                <span className="text-[#BD6B3B] font-semibold">Passe o dedo ou mouse para colorir</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

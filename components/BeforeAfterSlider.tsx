/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { BEFORE_AFTER_DATA, BeforeAfterItem, getWhatsAppLink } from '../siteConfig';
import { ArrowLeftRight, CheckCircle2, MessageSquare } from 'lucide-react';

const BeforeAfterSlider: React.FC = () => {
  const [activeItem, setActiveItem] = useState<BeforeAfterItem>(BEFORE_AFTER_DATA[0]);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="antes-e-depois" className="py-24 bg-[#F4EFEA] border-t border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#DCD3C5]">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#BD6B3B] uppercase block mb-3">
              Transformação Real
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#14201C] tracking-tight">
              Antes & Depois
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#595349] max-w-md">
            Arraste a linha divisória para comparar o estado inicial com o padrão de acabamento entregue em obras reais em Itajaí e região.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {BEFORE_AFTER_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item);
                setSliderPosition(50);
              }}
              className={`px-5 py-3 text-xs md:text-sm font-semibold tracking-wider transition-all cursor-pointer border ${
                activeItem.id === item.id
                  ? 'bg-[#1D2F29] text-[#FAF8F5] border-[#1D2F29]'
                  : 'bg-[#FAF8F5] text-[#4A443B] border-[#DCD3C5] hover:border-[#1D2F29]'
              }`}
              data-hover="true"
              data-hover-text="Comparar"
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Draggable Canvas container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] overflow-hidden select-none cursor-ew-resize border border-[#DCD3C5] bg-[#14201C]"
              data-hover="true"
              data-hover-text="Arrastar"
            >
              {/* After Image (Background - Revealed) */}
              <img
                src={activeItem.afterImage}
                alt={`${activeItem.title} - Depois da pintura`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 bg-[#1D2F29]/90 text-[#FAF8F5] text-xs font-bold tracking-widest uppercase px-3 py-1.5 shadow-md pointer-events-none border border-[#FAF8F5]/20">
                {activeItem.afterLabel}
              </div>

              {/* Before Image (Foreground - Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeItem.beforeImage}
                  alt={`${activeItem.title} - Antes da pintura`}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[0.9] saturate-[0.8]"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw',
                    maxWidth: 'none',
                  }}
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 bg-[#2D2A26]/90 text-[#FAF8F5] text-xs font-bold tracking-widest uppercase px-3 py-1.5 shadow-md pointer-events-none border border-[#FAF8F5]/20">
                  {activeItem.beforeLabel}
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                {/* Thin sharp vertical bar */}
                <div className="w-[3px] h-full bg-[#FAF8F5] shadow-[0_0_12px_rgba(0,0,0,0.5)]" />

                {/* Handle Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1D2F29] border-2 border-[#FAF8F5] text-[#FAF8F5] flex items-center justify-center shadow-2xl">
                  <ArrowLeftRight size={18} />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#7A7165] tracking-wider uppercase mt-3">
              <span>◄ Arraste para a esquerda</span>
              <span>Arraste para a direita ►</span>
            </div>
          </div>

          {/* Project Details Sidebar */}
          <div className="lg:col-span-4 bg-[#FAF8F5] p-8 md:p-10 border border-[#DCD3C5] flex flex-col justify-between h-full">
            <div>
              <div className="inline-block px-3 py-1 bg-[#EAE4DB] text-[#1D2F29] text-[10px] font-bold tracking-widest uppercase mb-4">
                {activeItem.category}
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#14201C] mb-2">
                {activeItem.title}
              </h3>

              <p className="text-xs text-[#8D7F71] font-semibold tracking-wider uppercase mb-6">
                Local: {activeItem.location}
              </p>

              <p className="text-sm leading-relaxed text-[#595349] mb-6">
                {activeItem.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-[#EAE4DB] text-xs text-[#3A352F]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#BD6B3B] shrink-0 mt-0.5" />
                  <span>Tratamento integral contra infiltrações e umidade litorânea</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#BD6B3B] shrink-0 mt-0.5" />
                  <span>Recorte impecável entre acabamentos e revestimentos</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#BD6B3B] shrink-0 mt-0.5" />
                  <span>Proteção total da obra, entregando o ambiente limpo</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAE4DB]">
              <a
                href={getWhatsAppLink(`Olá, Thales! Gostaria de um orçamento para uma transformação como "${activeItem.title}".`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#1D2F29] hover:bg-[#2A443B] text-[#FAF8F5] text-xs font-bold tracking-widest uppercase transition-all shadow-md group"
                data-hover="true"
                data-hover-text="Orçamento"
              >
                <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
                <span>Quero essa transformação</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;

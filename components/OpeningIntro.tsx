/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningIntroProps {
  onComplete: () => void;
}

const OpeningIntro: React.FC<OpeningIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro in this session
    try {
      const alreadySeen = sessionStorage.getItem('thalis_intro_completed');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (alreadySeen === 'true' || prefersReduced) {
        setIsVisible(false);
        onComplete();
        return;
      }
    } catch {
      // In private browsing or storage errors, proceed normally
    }

    // Progress timer over ~2.8 seconds
    const duration = 2800; // ms
    const startTime = performance.now();

    let animId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);

      if (p < 100) {
        animId = requestAnimationFrame(tick);
      } else {
        // Pause briefly to show the completed painted logo
        setIsFinishing(true);
        setTimeout(() => {
          handleFinish();
        }, 800);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleFinish = () => {
    try {
      sessionStorage.setItem('thalis_intro_completed', 'true');
    } catch {
      // Ignore
    }
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100000] bg-[#FAF8F5] flex flex-col items-center justify-center select-none overflow-hidden"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle architectural grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Skip button in corner */}
        <button
          onClick={handleFinish}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-50 text-[11px] font-bold tracking-widest uppercase px-4 py-2 bg-transparent text-[#6B6358] hover:text-[#1D2F29] border border-[#DCD3C5] hover:border-[#1D2F29] transition-all cursor-pointer"
        >
          Pular Introdução ✕
        </button>

        {/* Top subtle city positioning */}
        <div className="text-center mb-8 px-4">
          <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#8D7F71]">
            Itajaí – Santa Catarina
          </span>
        </div>

        {/* Painting Canvas Stage */}
        <div className="relative w-[92vw] max-w-2xl px-6 py-12 md:py-16 border border-[#E9E2D8] bg-[#F4EFEA]/40">
          
          {/* Base unpainted outline (faint ghost outline) */}
          <div className="text-center opacity-15 select-none pointer-events-none">
            <div className="font-serif text-3xl md:text-5xl font-semibold tracking-wider text-[#14201C]">
              J. THALES PINTURAS
            </div>
            <div className="mt-2 text-xs md:text-sm font-sans tracking-[0.3em] uppercase text-[#665D52]">
              Pintura Residencial • Predial • Pedras Naturais
            </div>
            <div className="mt-4 inline-block px-3 py-1 border border-[#665D52] text-[10px] tracking-widest uppercase">
              Entre os 3 melhores pintores de Itajaí
            </div>
          </div>

          {/* Masked "Freshly Painted" Reveal Layer */}
          <div
            className="absolute inset-0 px-6 py-12 md:py-16 overflow-hidden flex flex-col items-center justify-center"
            style={{
              clipPath: `polygon(
                0% 0%,
                ${progress}% 0%,
                ${progress + 0.8}% 18%,
                ${progress - 0.4}% 34%,
                ${progress + 1.2}% 52%,
                ${progress - 0.6}% 71%,
                ${progress + 0.5}% 88%,
                ${progress}% 100%,
                0% 100%
              )`,
              WebkitClipPath: `polygon(
                0% 0%,
                ${progress}% 0%,
                ${progress + 0.8}% 18%,
                ${progress - 0.4}% 34%,
                ${progress + 1.2}% 52%,
                ${progress - 0.6}% 71%,
                ${progress + 0.5}% 88%,
                ${progress}% 100%,
                0% 100%
              )`,
            }}
          >
            {/* Fresh paint coat background with subtle wet texture */}
            <div className="absolute inset-0 bg-[#EFE9DF] opacity-90 border-r-4 border-[#BD6B3B]" />

            {/* Revealed Logo and Information */}
            <div className="relative z-10 text-center">
              {/* Monogram */}
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 border-2 border-[#1D2F29] flex items-center justify-center font-serif text-xl md:text-2xl font-bold text-[#1D2F29] bg-[#FAF8F5]">
                JT
              </div>

              <h1 className="font-serif text-3xl md:text-5xl font-semibold tracking-wider text-[#14201C]">
                J. THALES PINTURAS
              </h1>

              <p className="mt-2 text-xs md:text-sm font-sans tracking-[0.25em] uppercase text-[#1D2F29] font-medium">
                Pintura Residencial • Predial • Pedras Naturais
              </p>

              <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 bg-[#1D2F29] text-[#FAF8F5] text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase shadow-sm">
                <span>★</span>
                <span>Entre os 3 melhores pintores de Itajaí</span>
                <span>★</span>
              </div>
            </div>
          </div>

          {/* SVG Paint Roller advancing across the canvas */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-30 transition-transform ease-linear"
            style={{
              left: `${progress}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Paint roller body spanning vertical height */}
            <div className="h-full flex flex-col items-center justify-center">
              <svg
                width="64"
                height="140"
                viewBox="0 0 64 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-xl"
              >
                {/* Wet paint trail line along roller contact */}
                <rect x="26" y="4" width="8" height="132" fill="#BD6B3B" rx="0" />
                <rect x="29" y="8" width="3" height="124" fill="#FAF8F5" fillOpacity="0.4" rx="0" />

                {/* Roller Cylinder Core */}
                <rect
                  x="22"
                  y="12"
                  width="18"
                  height="116"
                  fill="#BD6B3B"
                  stroke="#14201C"
                  strokeWidth="2"
                  rx="0"
                />

                {/* Rotating texture stripes on roller */}
                <line
                  x1="22"
                  y1="32"
                  x2="40"
                  y2="32"
                  stroke="#9E552A"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <line
                  x1="22"
                  y1="56"
                  x2="40"
                  y2="56"
                  stroke="#9E552A"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <line
                  x1="22"
                  y1="82"
                  x2="40"
                  y2="82"
                  stroke="#9E552A"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <line
                  x1="22"
                  y1="108"
                  x2="40"
                  y2="108"
                  stroke="#9E552A"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Metallic Shank Arm */}
                <path
                  d="M40 70H50C54 70 56 73 56 77V105C56 109 53 112 49 112H42"
                  stroke="#636A67"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Ergonomic Grip / Handle */}
                <rect
                  x="30"
                  y="110"
                  width="22"
                  height="18"
                  fill="#241B15"
                  stroke="#14201C"
                  strokeWidth="2"
                />
                <line x1="34" y1="113" x2="34" y2="125" stroke="#BD6B3B" strokeWidth="1.5" />
                <line x1="40" y1="113" x2="40" y2="125" stroke="#BD6B3B" strokeWidth="1.5" />
                <line x1="46" y1="113" x2="46" y2="125" stroke="#BD6B3B" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Progress indicator bar at bottom */}
        <div className="w-56 h-[3px] bg-[#E9E2D8] mt-8 overflow-hidden">
          <div
            className="h-full bg-[#1D2F29] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 text-[11px] font-sans text-[#8D7F71] tracking-widest uppercase">
          {isFinishing ? 'Acabamento concluído' : 'Aplicando pintura nobre...'}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningIntro;

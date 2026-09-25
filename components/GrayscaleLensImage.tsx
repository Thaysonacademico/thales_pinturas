/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { Search } from 'lucide-react';

interface GrayscaleLensImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  lensSize?: number; // diameter in px (e.g. 160)
  zoom?: number; // 1.15x
  priority?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const GrayscaleLensImage: React.FC<GrayscaleLensImageProps> = ({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[4/3]',
  lensSize = 150,
  zoom = 1.18,
  priority = false,
  onClick,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, xPercent: 50, yPercent: 50 });

  const radius = lensSize / 2;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setPos({ x, y, xPercent, yPercent });
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden select-none group ${isHovered ? 'cursor-none' : 'cursor-default'} ${aspectClassName} ${className}`}
    >
      {/* 1. Base Grayscale Image (Active when user is NOT interacting) */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover filter grayscale contrast-[0.92] brightness-[0.97] transition-transform duration-500"
      />

      {/* 2. Color Reveal Layer (Masked inside the circular magnifying lens) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          clipPath: isHovered ? `circle(${radius}px at ${pos.x}px ${pos.y}px)` : 'circle(0px at 0 0)',
          WebkitClipPath: isHovered ? `circle(${radius}px at ${pos.x}px ${pos.y}px)` : 'circle(0px at 0 0)',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover filter saturate-[1.12] contrast-[1.05]"
          style={{
            transformOrigin: `${pos.xPercent}% ${pos.yPercent}%`,
            transform: `scale(${zoom})`,
          }}
        />
        {/* Subtle glass gloss highlight inside the lens */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"
          style={{
            clipPath: `circle(${radius}px at ${pos.x}px ${pos.y}px)`,
          }}
        />
      </div>

      {/* Optional overlay children like badges */}
      {children}

      {/* 3. Physical Magnifying Glass (Lupa) UI Frame following the cursor */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: `${lensSize}px`,
            height: `${lensSize}px`,
          }}
        >
          {/* Outer Lens Rim with glass specular highlight */}
          <div className="absolute inset-0 rounded-full border-2 border-[#FAF8F5] shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(255,255,255,0.25)]" />
          <div className="absolute inset-[2px] rounded-full border border-[#BD6B3B]/70" />

          {/* Precision Center Crosshair */}
          <div className="absolute w-3 h-[1px] bg-white/70 pointer-events-none" />
          <div className="absolute h-3 w-[1px] bg-white/70 pointer-events-none" />

          {/* Realistic Magnifier Glass Handle protruding at bottom-right */}
          <div
            className="absolute bottom-1 right-1 w-6 h-2 bg-[#14201C] border border-[#FAF8F5]/80 rotate-45 translate-x-2.5 translate-y-2.5 shadow-md flex items-center justify-end px-0.5"
          >
            <div className="w-1.5 h-1 bg-[#BD6B3B]" />
          </div>

          {/* Micro tag indicating "Cor Real" */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#14201C] border border-[#BD6B3B] text-[#FAF8F5] text-[9px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1 whitespace-nowrap">
            <Search size={9} className="text-[#BD6B3B]" />
            <span>Cor Real</span>
          </div>
        </div>
      )}

      {/* Idle cue badge when not hovering */}
      <div className="absolute bottom-3 right-3 pointer-events-none bg-[#14201C]/80 backdrop-blur-sm border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 flex items-center gap-1.5 opacity-80 group-hover:opacity-0 transition-opacity z-10">
        <Search size={10} className="text-[#BD6B3B]" />
        <span>Passe a lupa para ver cores</span>
      </div>
    </div>
  );
};

export default GrayscaleLensImage;

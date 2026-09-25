/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Paintbrush, RotateCcw, Sparkles } from 'lucide-react';

interface BrushRevealHeroImageProps {
  colorSrc: string;
  alt: string;
  aspectClassName?: string;
  className?: string;
  onOpenZoom?: () => void;
}

export const BrushRevealHeroImage: React.FC<BrushRevealHeroImageProps> = ({
  colorSrc,
  alt,
  aspectClassName = 'aspect-[16/10] sm:aspect-[4/3]',
  className = '',
  onOpenZoom,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealedPercent, setRevealedPercent] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [brushPos, setBrushPos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize canvas with grayscale image
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width) || 320;
    const height = Math.floor(rect.height) || 240;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = colorSrc;
    img.onload = () => {
      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      // Convert pixels to grayscale
      try {
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          data[i] = gray * 0.95;     // Red
          data[i + 1] = gray * 0.95; // Green
          data[i + 2] = gray * 0.95; // Blue
        }
        ctx.putImageData(imgData, 0, 0);

        // Add subtle gray glaze
        ctx.fillStyle = 'rgba(30, 35, 32, 0.15)';
        ctx.fillRect(0, 0, width, height);
      } catch (e) {
        // Fallback filter
        ctx.filter = 'grayscale(100%) brightness(0.95)';
        ctx.drawImage(img, 0, 0, width, height);
        ctx.filter = 'none';
      }
      setRevealedPercent(0);
    };
  }, [colorSrc]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  // Stroke with paintbrush
  const paintAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setBrushPos({ x, y });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    // Brush radius adaptive to screen width (larger on mobile for satisfying strokes)
    const brushRadius = rect.width < 500 ? 36 : 48;

    // Create radial soft gradient for realistic feathered paintbrush tip
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.85)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (!hasInteracted) setHasInteracted(true);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    paintAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setBrushPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    if (!isDrawing) return;
    paintAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDrawing(true);
      const touch = e.touches[0];
      paintAt(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      paintAt(touch.clientX, touch.clientY);
      // Prevent scrolling when actively painting on canvas
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    setBrushPos(null);
  };

  // Quick reveal entire image
  const handleRevealAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRevealedPercent(100);
    setHasInteracted(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden border border-[#DCD3C5] bg-[#14201C] shadow-lg group ${aspectClassName} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDrawing(false);
        setBrushPos(null);
      }}
      style={{ touchAction: 'none' }}
    >
      {/* 1. Underlying Vibrant Full-Color Image */}
      <img
        src={colorSrc}
        alt={alt}
        className="w-full h-full object-cover filter saturate-[1.12] contrast-[1.05]"
        loading="eager"
      />

      {/* 2. Interactive Grayscale Scratch/Brush Canvas on Top */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="absolute inset-0 w-full h-full cursor-none touch-none z-10"
      />

      {/* 3. Floating Paintbrush Cursor (Follows finger/mouse) */}
      {brushPos && (isHovered || isDrawing) && (
        <div
          className="absolute pointer-events-none z-30 -translate-x-1 -translate-y-full transition-transform duration-75"
          style={{
            left: `${brushPos.x}px`,
            top: `${brushPos.y}px`,
          }}
        >
          {/* Paintbrush icon badge */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1D2F29] border border-[#BD6B3B] text-[#FAF8F5] text-[10px] font-bold uppercase tracking-wider shadow-xl rounded-sm">
            <Paintbrush size={12} className="text-[#BD6B3B] animate-bounce" />
            <span>Pintando</span>
          </div>
          {/* Bristle tip dot */}
          <div className="w-3 h-3 rounded-full border-2 border-white bg-[#BD6B3B] mt-0.5 mx-auto shadow-md" />
        </div>
      )}

      {/* 4. Top Micro-Badge: Interactive Instruction */}
      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 bg-[#1D2F29]/90 backdrop-blur-sm text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase border border-[#BD6B3B]/60 shadow-sm">
        <Paintbrush size={11} className="text-[#BD6B3B]" />
        <span>Passe o pincel para colorir</span>
      </div>

      {/* 5. Bottom Interactive Controls */}
      <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5">
        {hasInteracted && (
          <button
            onClick={initCanvas}
            className="p-1.5 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#14201C] text-[10px] font-bold border border-[#DCD3C5] shadow-md flex items-center gap-1 transition-all cursor-pointer"
            title="Reiniciar imagem cinza"
            aria-label="Restaurar imagem cinza"
          >
            <RotateCcw size={11} />
            <span className="hidden xs:inline">Reiniciar</span>
          </button>
        )}

        <button
          onClick={handleRevealAll}
          className="px-2.5 py-1 bg-[#BD6B3B] hover:bg-[#9E552A] text-[#FAF8F5] text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 transition-all cursor-pointer"
          title="Revelar todas as cores da obra"
        >
          <Sparkles size={11} />
          <span>Ver Colorido</span>
        </button>
      </div>
    </div>
  );
};

export default BrushRevealHeroImage;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from 'lucide-react';
import { getWhatsAppLink } from '../siteConfig';
import { WhatsAppIcon } from './SocialIcons';

export interface LightboxData {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  serviceCategory?: string;
}

export const openImageLightbox = (data: LightboxData) => {
  window.dispatchEvent(new CustomEvent('open-image-lightbox', { detail: data }));
};

export const closeImageLightbox = () => {
  window.dispatchEvent(new CustomEvent('close-image-lightbox'));
};

export const ImageLightboxModal: React.FC = () => {
  const [data, setData] = useState<LightboxData | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOpen = (e: any) => {
      setData(e.detail);
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
      window.dispatchEvent(new CustomEvent('image-viewer-active', { detail: { active: true } }));
      document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
      setData(null);
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
      window.dispatchEvent(new CustomEvent('image-viewer-active', { detail: { active: false } }));
      document.body.style.overflow = '';
    };

    window.addEventListener('open-image-lightbox', handleOpen);
    window.addEventListener('close-image-lightbox', handleClose);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-image-lightbox', handleOpen);
      window.removeEventListener('close-image-lightbox', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  if (!data) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 1));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeImageLightbox();
        }
      }}
    >
      {/* Top Bar with Info and Actions */}
      <div className="flex items-center justify-between text-white z-20 pb-2 border-b border-white/10">
        <div>
          {data.title && (
            <h3 className="font-serif text-base sm:text-xl font-semibold text-white tracking-tight">
              {data.title}
            </h3>
          )}
          {data.subtitle && (
            <p className="text-xs text-[#C5B9A5]">{data.subtitle}</p>
          )}
        </div>

        {/* Zoom & Close Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1D2F29]/80 border border-white/20 px-1 py-0.5">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1.5 hover:text-[#BD6B3B] disabled:opacity-40 transition-colors"
              title="Diminuir Zoom"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-[10px] font-mono px-2 text-[#C5B9A5]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-1.5 hover:text-[#BD6B3B] disabled:opacity-40 transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn size={16} />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={handleResetZoom}
                className="p-1.5 hover:text-[#BD6B3B] transition-colors border-l border-white/20 ml-1"
                title="Redefinir Zoom"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>

          <button
            onClick={closeImageLightbox}
            className="p-2 bg-[#1D2F29] hover:bg-[#BD6B3B] border border-white/20 text-white transition-colors cursor-pointer"
            title="Fechar (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="flex-1 flex items-center justify-center overflow-hidden my-3 relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={() => {
          if (zoomLevel === 1) handleZoomIn();
          else handleResetZoom();
        }}
      >
        <img
          src={data.src}
          alt={data.alt}
          className="max-h-[75vh] max-w-full object-contain transition-transform duration-100 ease-out shadow-2xl filter saturate-[1.08]"
          style={{
            transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Bar: Clean Caption + Direct WhatsApp Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white pt-2 border-t border-white/10 z-20">
        <div className="text-[11px] text-[#A69B8D] text-center sm:text-left">
          <span>{data.alt || 'Obra realizada pela Thales Pinturas'}</span>
          <span className="hidden sm:inline mx-2">•</span>
          <span className="block sm:inline text-[#D48658]">Toque duas vezes ou use os botões para dar zoom</span>
        </div>

        <a
          href={getWhatsAppLink(`Olá, Thales! Gostaria de um orçamento com base na obra "${data.title || 'que vi no site'}"`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
        >
          <WhatsAppIcon size={16} />
          <span>Solicitar Orçamento Deste Padrão</span>
        </a>
      </div>
    </div>
  );
};

export default ImageLightboxModal;

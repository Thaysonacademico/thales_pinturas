/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORKS_DATA, WorkProject, getWhatsAppLink } from '../siteConfig';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, ZoomIn } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

const CATEGORIES = ['Todas', 'Residencial', 'Predial', 'Comercial', 'Pedras Naturais', 'Limpeza & Pós-Obra'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const WorksGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Todas');
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

  // Filter projects
  const filteredProjects =
    activeCategory === 'Todas'
      ? WORKS_DATA
      : WORKS_DATA.filter((p) => p.category === activeCategory);

  // When modal opens/closes, dispatch image-viewer-active event to hide floating WhatsApp & Cobalto
  useEffect(() => {
    if (selectedProject) {
      window.dispatchEvent(new CustomEvent('image-viewer-active', { detail: { active: true } }));
      document.body.style.overflow = 'hidden';
    } else {
      window.dispatchEvent(new CustomEvent('image-viewer-active', { detail: { active: false } }));
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'ArrowLeft') navigateProject('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, filteredProjects]);

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= filteredProjects.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = filteredProjects.length - 1;

    setSelectedProject(filteredProjects[nextIndex]);
  };

  return (
    <section id="obras" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-5 border-b border-[#E2DDD5]">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#BD6B3B] uppercase block mb-2">
              Galeria de Obras
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#14201C] tracking-tight">
              Obras Realizadas
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs sm:text-sm text-[#595349] max-w-md">
            Fotos coloridas e reais de residências, condomínios e pedras entregues em Itajaí e região. Toque para ampliar e interagir.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
                activeCategory === category
                  ? 'bg-[#1D2F29] text-[#FAF8F5] border-[#1D2F29]'
                  : 'bg-white text-[#595349] border-[#DCD3C5] hover:border-[#1D2F29] hover:text-[#14201C]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Colorful, vibrant images, no grayscale! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-[#FAF8F5] border border-[#E2DDD5] overflow-hidden flex flex-col hover:border-[#1D2F29] transition-all"
            >
              {/* Image Container with Vibrant Colors and Click-to-Zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DF]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover filter saturate-[1.12] contrast-[1.05] group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <span className="bg-[#1D2F29]/90 text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 shadow-sm">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="bg-[#BD6B3B] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 shadow-sm">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Zoom hover indicator */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1 bg-[#14201C]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <ZoomIn size={13} />
                    <span>Ampliar Imagem</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#8D7F71] tracking-wider uppercase mb-1.5 font-medium">
                    <MapPin size={11} className="text-[#BD6B3B]" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#14201C] mb-1.5 group-hover:text-[#BD6B3B] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#595349] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#EAE4DB] flex items-center justify-between text-xs font-semibold text-[#1D2F29]">
                  <span className="tracking-wider uppercase text-[10px] text-[#8D7F71]">Ano {project.year}</span>
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px] text-[#BD6B3B]">
                    Ver detalhes &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (Clean, hides WhatsApp & Cobalto while open) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 text-white hover:text-[#BD6B3B] bg-[#1D2F29] border border-white/20 p-2.5 transition-colors cursor-pointer"
              aria-label="Fechar galeria"
            >
              <X size={20} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateProject('prev');
              }}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-[#1D2F29]/80 hover:bg-[#1D2F29] border border-white/20 text-white p-3 transition-all cursor-pointer"
              aria-label="Obra anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateProject('next');
              }}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-[#1D2F29]/80 hover:bg-[#1D2F29] border border-white/20 text-white p-3 transition-all cursor-pointer"
              aria-label="Próxima obra"
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox Content Container */}
            <div
              className="relative max-w-4xl w-full bg-[#FAF8F5] border border-white/20 overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full view image */}
              <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-[480px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full max-h-[55vh] md:max-h-[80vh] object-contain filter saturate-[1.1]"
                />
              </div>

              {/* Sidebar with details & direct WhatsApp */}
              <div className="md:w-2/5 p-5 md:p-6 flex flex-col justify-between overflow-y-auto bg-[#FAF8F5]">
                <div>
                  <div className="inline-block px-2.5 py-0.5 bg-[#1D2F29] text-white text-[9px] font-bold tracking-widest uppercase mb-3">
                    {selectedProject.category}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#14201C] mb-2 leading-tight">
                    {selectedProject.title}
                  </h3>

                  <div className="flex flex-col gap-1 text-[11px] text-[#7A7165] mb-4 pb-3 border-b border-[#E2DDD5]">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-[#BD6B3B]" />
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#BD6B3B]" />
                      <span>Execução: {selectedProject.year}</span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-[#595349] mb-4">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2DDD5] space-y-2">
                  <a
                    href={getWhatsAppLink(
                      `Olá, Thales! Gostaria de um orçamento para meu imóvel com base na obra "${selectedProject.title}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Quero este padrão no WhatsApp</span>
                  </a>

                  {/* Mobile Navigation Buttons */}
                  <div className="flex md:hidden gap-2 pt-1">
                    <button
                      onClick={() => navigateProject('prev')}
                      className="flex-1 py-2 border border-[#DCD3C5] text-[11px] font-bold uppercase text-[#14201C]"
                    >
                      ← Anterior
                    </button>
                    <button
                      onClick={() => navigateProject('next')}
                      className="flex-1 py-2 border border-[#DCD3C5] text-[11px] font-bold uppercase text-[#14201C]"
                    >
                      Próxima →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorksGallery;

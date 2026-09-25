/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../siteConfig';
import { Menu, X, MapPin, Search, MoreVertical } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, YouTubeIcon } from './SocialIcons';
import ThalesLogo from './ThalesLogo';
import { AIServiceSearchBar } from './AIServiceSearchBar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const hasYouTube = Boolean(SITE_CONFIG.youtubeUrl && SITE_CONFIG.youtubeUrl.trim() !== '' && SITE_CONFIG.youtubeUrl !== 'não tem');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Pedras Naturais', href: '#pedras-naturais' },
    { label: 'Obras', href: '#obras' },
    { label: 'Antes & Depois', href: '#antes-e-depois' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#E2DDD5] py-2.5 shadow-sm'
          : 'bg-[#FAF8F5] border-b border-[#E2DDD5]/70 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Compact Business Name */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#inicio');
          }}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
          title="Thales Pinturas - Início"
        >
          <div className="relative shrink-0 flex items-center justify-center">
            <ThalesLogo className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base font-bold tracking-wide text-[#14201C] leading-none group-hover:text-[#BD6B3B] transition-colors">
              THALES PINTURAS
            </span>
            <span className="text-[9px] font-sans tracking-[0.16em] uppercase text-[#7A7165] mt-0.5">
              Pintura & Limpeza
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold tracking-wider uppercase text-[#4A443B]">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="hover:text-[#1D2F29] transition-colors cursor-pointer py-1 relative hover:text-[#BD6B3B]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Header Action Cluster: Instagram -> WhatsApp -> Pesquisa (Lupa) -> 3 Pontinhos */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Instagram link icon (Small, discrete) */}
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 sm:p-1.5 text-[#4A443B] hover:text-[#BD6B3B] transition-colors cursor-pointer"
            aria-label="Instagram de Thales Pinturas"
            title="Instagram Oficial"
          >
            <InstagramIcon size={17} />
          </a>

          {/* 1. WhatsApp Button (Calls more attention, prominent for quote) */}
          <a
            href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer border border-[#25D366]"
            title="Solicitar Orçamento no WhatsApp"
          >
            <WhatsAppIcon size={14} />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>

          {/* 2. Barra / Lupa de Pesquisa (Posicionada exatamente entre WhatsApp e 3 pontinhos) */}
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
            className={`inline-flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 border transition-all cursor-pointer ${
              isSearchOpen
                ? 'bg-[#1D2F29] text-[#FAF8F5] border-[#1D2F29]'
                : 'bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#14201C] border-[#DCD3C5]'
            }`}
            aria-label="Pesquisar serviço com IA"
            title="Pesquisar serviço com IA"
          >
            <Search size={15} className="text-[#BD6B3B]" />
            <span className="hidden sm:inline text-[11px] font-semibold text-[#3D352B]">
              {isSearchOpen ? 'Fechar' : 'Pesquisar'}
            </span>
          </button>

          {/* 3. Os 3 Pontinhos / Menu */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              if (isSearchOpen) setIsSearchOpen(false);
            }}
            className={`p-1.5 sm:p-2 border transition-colors cursor-pointer flex items-center justify-center ${
              mobileMenuOpen
                ? 'bg-[#1D2F29] text-[#FAF8F5] border-[#1D2F29]'
                : 'bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#14201C] border-[#DCD3C5]'
            }`}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Menu de opções (3 pontinhos)'}
            title="Menu de navegação"
          >
            {mobileMenuOpen ? <X size={17} /> : <MoreVertical size={17} />}
          </button>
        </div>
      </div>

      {/* Dropdown / Painel da Barra de Pesquisa de Serviços com IA */}
      {isSearchOpen && (
        <div className="border-t border-[#E2DDD5] bg-[#FAF8F5] shadow-2xl px-4 py-4 animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#BD6B3B] flex items-center gap-1">
                <Search size={12} /> Pesquisa Rápida de Serviços
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-[#8C8479] hover:text-[#14201C] cursor-pointer flex items-center gap-1"
              >
                <span>Fechar</span>
                <X size={13} />
              </button>
            </div>
            <AIServiceSearchBar autoFocus onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu (Accessible from the 3 dots) */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[56px] sm:top-[60px] bg-[#FAF8F5] border-b border-[#E2DDD5] shadow-2xl p-5 flex flex-col gap-3 animate-in slide-in-from-top-3 duration-150">
          <div className="py-1 text-[10px] font-bold tracking-widest uppercase text-[#BD6B3B] border-b border-[#EAE4DB]">
            ★ {SITE_CONFIG.badge}
          </div>

          <div className="flex flex-col gap-1 py-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-xs font-semibold tracking-wider uppercase text-[#14201C] hover:text-[#BD6B3B] py-2 border-b border-[#F4EFEA] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-xs font-bold tracking-wider uppercase shadow-sm"
            >
              <WhatsAppIcon size={16} />
              <span>Solicitar Orçamento no WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-6 pt-1 text-[#4A443B]">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:opacity-85"
              >
                <InstagramIcon size={16} />
                <span>Instagram</span>
              </a>

              {hasYouTube && (
                <a
                  href={SITE_CONFIG.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:opacity-85"
                >
                  <YouTubeIcon size={16} />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../siteConfig';
import { MapPin, Award, Phone } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, YouTubeIcon } from './SocialIcons';
import ThalesLogo from './ThalesLogo';

const Footer: React.FC = () => {
  const hasYouTube = Boolean(SITE_CONFIG.youtubeUrl && SITE_CONFIG.youtubeUrl.trim() !== '' && SITE_CONFIG.youtubeUrl !== 'não tem');

  return (
    <footer className="bg-[#14201C] text-[#FAF8F5] pt-20 pb-12 border-t-4 border-[#BD6B3B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#253D35]">
          {/* Brand & Badge Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-6">
              <ThalesLogo className="w-14 h-14 shrink-0 drop-shadow-lg" />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#FAF8F5] block">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#DCD3C5]">
                  {SITE_CONFIG.brandTag}
                </span>
              </div>
            </div>

            {/* Prominent Footer Seal */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#1D2F29] border border-[#BD6B3B] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase mb-6">
              <Award size={18} className="text-[#BD6B3B] shrink-0" />
              <span>{SITE_CONFIG.badge}</span>
            </div>

            <p className="text-sm text-[#DCD3C5] leading-relaxed max-w-sm">
              Especialista em pintura residencial de alto padrão, pintura predial e assentamento técnico de pedras naturais em Itajaí e cidades vizinhas do litoral catarinense.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-[#BD6B3B] mb-6">
              Navegação Rápida
            </h4>
            <ul className="space-y-3 text-xs tracking-wider uppercase text-[#DCD3C5]">
              <li>
                <a href="#inicio" className="hover:text-[#FAF8F5] transition-colors">Início</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#FAF8F5] transition-colors">Sobre o Profissional</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#FAF8F5] transition-colors">Serviços Especializados</a>
              </li>
              <li>
                <a href="#pedras-naturais" className="hover:text-[#FAF8F5] transition-colors text-[#BD6B3B] font-bold">
                  ★ Pedras Naturais
                </a>
              </li>
              <li>
                <a href="#obras" className="hover:text-[#FAF8F5] transition-colors">Obras Realizadas</a>
              </li>
              <li>
                <a href="#antes-e-depois" className="hover:text-[#FAF8F5] transition-colors">Antes & Depois</a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-[#FAF8F5] transition-colors">Avaliações de Clientes</a>
              </li>
            </ul>
          </div>

          {/* Location & Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-[#BD6B3B] mb-6">
              Atendimento Regional
            </h4>

            <div className="space-y-4 text-xs text-[#DCD3C5] mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#BD6B3B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FAF8F5] block">Cidade Base: {SITE_CONFIG.city} – {SITE_CONFIG.state}</strong>
                  <span className="text-[#DCD3C5]">Atendendo Praia Brava, Balneário Camboriú, Navegantes, Penha e Camboriú.</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#BD6B3B] shrink-0" />
                <span>WhatsApp: {SITE_CONFIG.phoneDisplay}</span>
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#3E5C50] bg-[#1D2F29] hover:bg-[#2A443B] flex items-center justify-center transition-all p-1.5"
                aria-label="Instagram J. Thales Pinturas"
                data-hover="true"
                data-hover-text="Instagram"
              >
                <InstagramIcon size={24} />
              </a>

              {hasYouTube && (
                <a
                  href={SITE_CONFIG.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#3E5C50] bg-[#1D2F29] hover:bg-[#2A443B] flex items-center justify-center transition-all p-1.5"
                  aria-label="YouTube J. Thales Pinturas"
                  data-hover="true"
                  data-hover-text="YouTube"
                >
                  <YouTubeIcon size={24} />
                </a>
              )}

              <a
                href={getWhatsAppLink('Olá, J. Thales! Vi seu rodapé e gostaria de tirar dúvidas sobre um orçamento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase transition-all shadow-md"
                data-hover="true"
                data-hover-text="WhatsApp"
              >
                <WhatsAppIcon size={18} />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8D9B95] tracking-wider uppercase">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>Desenvolvido por</span>
            <a
              href="https://dviadev.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FAF8F5] hover:text-[#BD6B3B] font-bold underline underline-offset-4 decoration-[#BD6B3B] transition-colors"
            >
              Dev. Thayson (dviadev.com.br)
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>Pintor em {SITE_CONFIG.city} – {SITE_CONFIG.state}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

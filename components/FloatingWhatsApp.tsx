/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../siteConfig';
import { WhatsAppIcon } from './SocialIcons';

const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Contato direto via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center group pointer-events-auto"
    >
      {/* Floating tooltip/message box on hover or prominent callout */}
      <div className="hidden sm:flex items-center mr-3 px-3.5 py-2 bg-[#FAF8F5] text-[#14201C] text-xs font-semibold tracking-wider uppercase border border-[#DCD3C5] shadow-xl group-hover:border-[#1D2F29] transition-all pointer-events-none">
        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
        <span>Orçamento Rápido em Itajaí</span>
      </div>

      <a
        href={getWhatsAppLink('Olá, J. Thales! Acessei seu site e gostaria de solicitar um orçamento para pintura / pedras naturais.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp com J. Thales Pinturas"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-[#FAF8F5] flex items-center justify-center shadow-2xl transition-all border-2 border-[#FAF8F5] group-hover:scale-105 cursor-pointer relative p-2.5"
        data-hover="true"
        data-hover-text="WhatsApp"
      >
        {/* Subtle ping indicator */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#25D366] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#25D366] border border-white" />

        <WhatsAppIcon size={34} />
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;

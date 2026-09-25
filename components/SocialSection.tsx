/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SITE_CONFIG } from '../siteConfig';
import { ArrowUpRight, Camera } from 'lucide-react';
import { InstagramIcon, YouTubeIcon } from './SocialIcons';

const SocialSection: React.FC = () => {
  const hasYouTube = Boolean(SITE_CONFIG.youtubeUrl && SITE_CONFIG.youtubeUrl.trim() !== '' && SITE_CONFIG.youtubeUrl !== 'não tem');

  return (
    <section className="py-20 bg-[#1D2F29] text-[#FAF8F5] relative overflow-hidden border-t border-[#3E5C50]">
      {/* Subtle architectural backdrop */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#FAF8F5_1px,transparent_1px),linear-gradient(to_bottom,#FAF8F5_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-[#BD6B3B] mb-3">
              <Camera size={14} />
              <span>Acompanhe o dia a dia das obras</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#FAF8F5] mb-2">
              Transformações em tempo real no Instagram
            </h2>
            <p className="text-sm text-[#DCD3C5] max-w-xl">
              Confira vídeos diários de antes e depois, técnicas de aplicação de pedras naturais e o cuidado com cada detalhe nas obras em Itajaí e região.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {/* Big Instagram Button with authentic gradient icon */}
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-8 py-5 bg-[#FAF8F5] hover:bg-[#FFFFFF] text-[#14201C] text-xs font-bold tracking-widest uppercase transition-all shadow-xl group border border-[#FAF8F5]"
              data-hover="true"
              data-hover-text="Instagram"
            >
              <InstagramIcon size={24} className="group-hover:scale-110 transition-transform" />
              <span>Acessar Instagram {SITE_CONFIG.instagramHandle}</span>
              <ArrowUpRight size={16} />
            </a>

            {/* YouTube button - Conditionally rendered only if URL exists and is not 'não tem' */}
            {hasYouTube && (
              <a
                href={SITE_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3.5 px-8 py-5 bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-[#FAF8F5] text-xs font-bold tracking-widest uppercase transition-all border border-[#FAF8F5]/30 group"
                data-hover="true"
                data-hover-text="YouTube"
              >
                <YouTubeIcon size={24} className="group-hover:scale-110 transition-transform" />
                <span>Canal no YouTube</span>
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;

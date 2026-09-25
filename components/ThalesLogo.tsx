/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ThalesLogoProps {
  className?: string;
  variant?: 'emblem' | 'compact' | 'full';
  showDetails?: boolean;
}

export const ThalesLogo: React.FC<ThalesLogoProps> = ({
  className = 'w-12 h-12',
  variant = 'emblem',
  showDetails = true,
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Oficial J. Thales Pinturas"
    >
      <defs>
        {/* Rich Metallic Gold Gradients */}
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECC870" />
          <stop offset="25%" stopColor="#C99436" />
          <stop offset="50%" stopColor="#FDEAB2" />
          <stop offset="75%" stopColor="#B37C22" />
          <stop offset="100%" stopColor="#E5BE64" />
        </linearGradient>

        <linearGradient id="goldLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="50%" stopColor="#E3B24F" />
          <stop offset="100%" stopColor="#966314" />
        </linearGradient>

        <linearGradient id="goldDarkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A5A12" />
          <stop offset="50%" stopColor="#E8BE65" />
          <stop offset="100%" stopColor="#734709" />
        </linearGradient>

        {/* Deep Navy/Black Backgrounds */}
        <linearGradient id="navyBlackShield" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B1320" />
          <stop offset="60%" stopColor="#060A10" />
          <stop offset="100%" stopColor="#020406" />
        </linearGradient>

        <linearGradient id="brushBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1C385C" />
          <stop offset="40%" stopColor="#0D1C30" />
          <stop offset="100%" stopColor="#050C16" />
        </linearGradient>

        {/* Paint Roller Gradient */}
        <linearGradient id="rollerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0E233C" />
          <stop offset="50%" stopColor="#1B4272" />
          <stop offset="100%" stopColor="#0A182A" />
        </linearGradient>

        {/* Wet Gold Paint on Brush */}
        <linearGradient id="yellowPaintGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF099" />
          <stop offset="40%" stopColor="#F5B82E" />
          <stop offset="100%" stopColor="#D98A0D" />
        </linearGradient>

        {/* Drop Shadow for Plaque */}
        <filter id="plaqueShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
        </filter>
        <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.9" />
        </filter>
      </defs>

      {/* 1. OUTER SHIELD / BADGE BACKGROUND */}
      <path
        d="M 60 250 L 60 300 L 250 460 L 440 300 L 440 250 Z"
        fill="url(#navyBlackShield)"
      />
      <path
        d="M 68 255 L 68 296 L 250 450 L 432 296 L 432 255 Z"
        stroke="url(#goldMetallic)"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M 80 262 L 80 292 L 250 436 L 420 292 L 420 262 Z"
        stroke="url(#goldMetallic)"
        strokeWidth="1.5"
        opacity="0.8"
        fill="none"
      />

      {/* 2. ARCHITECTURAL CITYSCAPE & HOUSES (Top Background) */}
      <g id="buildings" className="opacity-95">
        {/* Commercial Building / High-Rise on Left */}
        <path
          d="M 90 230 L 90 160 L 155 140 L 175 147 L 175 230 Z"
          fill="#0C1B2E"
          stroke="#C99436"
          strokeWidth="1.5"
        />
        {/* Windows on High-Rise */}
        <g fill="#FDEAB2" opacity="0.85">
          <rect x="98" y="172" width="9" height="11" rx="1" />
          <rect x="113" y="172" width="9" height="11" rx="1" />
          <rect x="128" y="172" width="9" height="11" rx="1" />

          <rect x="98" y="190" width="9" height="11" rx="1" />
          <rect x="113" y="190" width="9" height="11" rx="1" />
          <rect x="128" y="190" width="9" height="11" rx="1" />

          <rect x="98" y="208" width="9" height="11" rx="1" />
          <rect x="113" y="208" width="9" height="11" rx="1" />
          <rect x="128" y="208" width="9" height="11" rx="1" />
        </g>

        {/* Small adjacent house section */}
        <path
          d="M 130 230 L 130 200 L 165 190 L 165 230 Z"
          fill="#091424"
          stroke="#C99436"
          strokeWidth="1.5"
        />
        <rect x="136" y="204" width="7" height="9" fill="#FDEAB2" opacity="0.9" />
        <rect x="148" y="204" width="7" height="9" fill="#FDEAB2" opacity="0.9" />

        {/* Residential Houses (Center & Right) */}
        {/* House 1: Gable Center Roof with Gold Trim */}
        <path
          d="M 235 170 L 290 230 L 180 230 Z"
          fill="#FAF8F5"
          stroke="url(#goldMetallic)"
          strokeWidth="4"
        />
        <path
          d="M 235 182 L 278 230 L 192 230 Z"
          fill="#0A1828"
        />
        {/* Center House Window with white frame */}
        <rect x="220" y="200" width="28" height="30" fill="#0A1828" stroke="#FAF8F5" strokeWidth="2.5" />
        <line x1="234" y1="200" x2="234" y2="230" stroke="#FAF8F5" strokeWidth="1.5" />
        <line x1="220" y1="214" x2="248" y2="214" stroke="#FAF8F5" strokeWidth="1.5" />

        {/* House 2: Right Gable with Garage */}
        <path
          d="M 290 190 L 350 230 L 230 230 Z"
          fill="#FAF8F5"
          stroke="url(#goldMetallic)"
          strokeWidth="3.5"
        />
        <path
          d="M 290 198 L 340 230 L 242 230 Z"
          fill="#0B1726"
        />
        {/* Garage Door & Right Window */}
        <rect x="268" y="210" width="16" height="20" fill="#FAF8F5" stroke="#0B1726" strokeWidth="1" />
        <rect x="300" y="214" width="40" height="16" fill="#08101C" stroke="url(#goldMetallic)" strokeWidth="1.5" />

        {/* House 3: Far Right Wing */}
        <path
          d="M 330 160 L 390 205 L 390 230 L 330 230 Z"
          fill="#FAF8F5"
          stroke="url(#goldMetallic)"
          strokeWidth="3"
        />
        <rect x="345" y="178" width="18" height="22" fill="#0E1E32" stroke="#FAF8F5" strokeWidth="2" />
      </g>

      {/* 3. PAINT ROLLER (Upper Right) */}
      <g id="paint-roller" transform="rotate(18 360 140)">
        {/* Roller Cylinder */}
        <rect x="300" y="80" width="130" height="36" rx="10" fill="url(#rollerGrad)" stroke="url(#goldMetallic)" strokeWidth="3" />
        {/* Roller Inner core endcap */}
        <ellipse cx="425" cy="98" rx="6" ry="14" fill="#050D18" stroke="url(#goldMetallic)" strokeWidth="2" />

        {/* Gold Metal Wire Frame */}
        <path
          d="M 425 98 L 442 98 L 442 150 L 375 175 L 375 195"
          stroke="url(#goldMetallic)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Blue Handle */}
        <rect x="368" y="195" width="14" height="42" rx="4" fill="url(#brushBodyGrad)" stroke="url(#goldMetallic)" strokeWidth="2" />
      </g>

      {/* 4. MASTER PAINTER BRUSH (Hero Element - Angled Left) */}
      <g id="master-brush" transform="rotate(-32 230 140)">
        {/* Wooden / Glossy Navy Handle */}
        <path
          d="M 218 30 C 224 45 228 85 232 110 L 202 110 C 206 85 210 45 218 30 Z"
          fill="url(#brushBodyGrad)"
          stroke="url(#goldMetallic)"
          strokeWidth="2.5"
        />
        {/* Brush Eyelet Ring at Tip */}
        <circle cx="218" cy="45" r="5" fill="#FAF8F5" stroke="url(#goldMetallic)" strokeWidth="2" />

        {/* Polished Gold Ferrule (Metal Collar) */}
        <rect x="188" y="108" width="58" height="34" rx="2" fill="url(#goldMetallic)" stroke="#664104" strokeWidth="1.5" />
        {/* Ferrule Rivets & Grooves */}
        <line x1="188" y1="120" x2="246" y2="120" stroke="#7A4E08" strokeWidth="2" />
        <line x1="188" y1="126" x2="246" y2="126" stroke="#FFE9A8" strokeWidth="1" />
        <circle cx="198" cy="133" r="2.5" fill="#523202" />
        <circle cx="217" cy="133" r="2.5" fill="#523202" />
        <circle cx="236" cy="133" r="2.5" fill="#523202" />

        {/* Brush Bristles */}
        <path
          d="M 188 142 L 180 185 Q 217 195 254 185 L 246 142 Z"
          fill="url(#yellowPaintGrad)"
          stroke="url(#goldMetallic)"
          strokeWidth="2"
        />
        {/* Bristle texture lines */}
        <path
          d="M 194 142 L 190 180 M 202 142 L 202 186 M 214 142 L 216 188 M 226 142 L 228 186 M 238 142 L 242 181"
          stroke="#B87609"
          strokeWidth="1.5"
          opacity="0.8"
        />
        {/* Wet dripping paint drops */}
        <path
          d="M 192 182 Q 192 196 195 198 Q 198 196 198 182 Z"
          fill="url(#yellowPaintGrad)"
        />
        <path
          d="M 216 188 Q 216 206 220 208 Q 224 206 224 188 Z"
          fill="url(#yellowPaintGrad)"
        />
      </g>

      {/* Decorative Gold Flourish Ribbon Under Bristles */}
      <path
        d="M 75 220 C 130 238 180 210 230 226 C 260 236 300 220 330 225"
        stroke="url(#goldMetallic)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* 5. MAIN BRAND PLAQUE ("J. THALES PINTURAS") */}
      <g id="main-plaque" filter="url(#plaqueShadow)">
        {/* Outer Plaque Frame with Chamfered Corners */}
        <path
          d="M 75 240 
             L 425 240 
             L 445 260 
             L 445 285 
             L 425 305 
             L 75 305 
             L 55 285 
             L 55 260 
             Z"
          fill="url(#navyBlackShield)"
          stroke="url(#goldMetallic)"
          strokeWidth="4"
        />
        {/* Inner Gold Thin Border */}
        <path
          d="M 80 246 
             L 420 246 
             L 438 263 
             L 438 282 
             L 420 299 
             L 80 299 
             L 62 282 
             L 62 263 
             Z"
          stroke="url(#goldMetallic)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.85"
        />

        {/* Text: J. THALES PINTURAS */}
        <text
          x="250"
          y="283"
          textAnchor="middle"
          fill="url(#goldMetallic)"
          fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
          fontSize="33"
          fontWeight="900"
          letterSpacing="2"
          filter="url(#textGlow)"
        >
          J. THALES PINTURAS
        </text>
      </g>

      {/* 6. SUB-RIBBON BANNER: PINTURA RESIDENCIAIS E COMERCIAL */}
      <g id="ribbon-banner">
        {/* Ribbon Shape with Swallowtail Ends */}
        <path
          d="M 95 310 
             L 115 302 
             L 385 302 
             L 405 310 
             L 395 328 
             L 385 328 
             L 115 328 
             L 105 328 
             Z"
          fill="url(#goldMetallic)"
          stroke="#6E4405"
          strokeWidth="1.5"
        />
        {/* Ribbon Fold Shading on sides */}
        <path d="M 95 310 L 105 328 L 115 310 Z" fill="#663E04" />
        <path d="M 405 310 L 395 328 L 385 310 Z" fill="#663E04" />

        {/* Text on Ribbon */}
        <text
          x="250"
          y="322"
          textAnchor="middle"
          fill="#060C14"
          fontFamily="'Montserrat', 'Arial Black', sans-serif"
          fontSize="11.5"
          fontWeight="900"
          letterSpacing="1.8"
        >
          PINTURA RESIDENCIAIS E COMERCIAL
        </text>
      </g>

      {/* 7. SOCIAL CHANNELS & WHATSAPP (Bottom Shield Area) */}
      {showDetails && (
        <g id="social-footer">
          {/* Instagram Icon & Handle */}
          <g transform="translate(110, 342)">
            {/* Instagram Camera Icon with gradient */}
            <rect x="0" y="0" width="18" height="18" rx="5" fill="#E1306C" />
            <rect x="2" y="2" width="14" height="14" rx="4" fill="none" stroke="#FAF8F5" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="3.5" fill="none" stroke="#FAF8F5" strokeWidth="1.5" />
            <circle cx="13" cy="5" r="1" fill="#FAF8F5" />
            <text
              x="24"
              y="14"
              fill="#FAF8F5"
              fontFamily="'Montserrat', Arial, sans-serif"
              fontSize="12.5"
              fontWeight="700"
              letterSpacing="0.5"
            >
              @jthales_pinturas
            </text>
          </g>

          {/* WhatsApp Icon & Phone */}
          <g transform="translate(275, 342)">
            {/* WhatsApp Green Icon */}
            <circle cx="9" cy="9" r="9" fill="#25D366" />
            <path
              d="M 6 6.5 C 6 6.5 6.5 5.5 7.5 5.5 C 8.2 5.5 8.6 6.6 8.7 6.8 C 8.9 7.1 8.8 7.3 8.6 7.5 L 8.1 8 C 8 8.1 7.9 8.2 8 8.4 C 8.2 8.8 8.7 9.6 9.4 10.2 C 10.1 10.8 10.8 11.1 11.2 11.2 C 11.4 11.3 11.5 11.2 11.6 11.1 L 12 10.6 C 12.2 10.4 12.4 10.3 12.6 10.4 C 12.9 10.5 13.9 11 14 11.6 C 14.1 12.2 13.5 12.8 13.2 12.8 C 12.8 12.9 11.8 12.9 10.2 11.9 C 8.4 10.7 7.3 9 7 8.5 C 6.8 8.1 6 7 6 6.5 Z"
              fill="#FAF8F5"
            />
            <text
              x="24"
              y="14"
              fill="#FAF8F5"
              fontFamily="'Montserrat', Arial, sans-serif"
              fontSize="13"
              fontWeight="800"
              letterSpacing="0.5"
            >
              47 99100-6754
            </text>
          </g>

          {/* Lower Shield Gold Accent Wings */}
          <path
            d="M 180 380 L 250 436 L 320 380"
            stroke="url(#goldMetallic)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 210 395 L 250 426 L 290 395"
            stroke="url(#goldMetallic)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
        </g>
      )}
    </svg>
  );
};

export default ThalesLogo;

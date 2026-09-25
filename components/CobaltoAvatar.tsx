/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CobaltoAvatarProps {
  className?: string;
  size?: number | string;
}

/**
 * Cobalto - Nosso agente de IA da J. Thales Pinturas
 * Versão operário com capacete de proteção branco e luvas brancas de trabalho,
 * preservando o estilo cartoon com traços pretos marcantes, bigode amigável e pincel de acabamento.
 */
export const CobaltoAvatar: React.FC<CobaltoAvatarProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Cobalto - Nosso agente de IA"
    >
      {/* --- CULTURA OPERÁRIA: CORPO E ROUPAS --- */}

      {/* Camiseta branca de operário por baixo */}
      <path
        d="M170 390 C170 350 342 350 342 390 L360 490 L152 490 Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Macacão Azul de Pintor Operário (Azul Cobalto) */}
      <path
        d="M150 435 C150 405 362 405 362 435 L370 500 L142 500 Z"
        fill="#2563EB"
        stroke="#111111"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Alça esquerda do macacão */}
      <rect
        x="172"
        y="386"
        width="38"
        height="110"
        rx="6"
        fill="#1D4ED8"
        stroke="#111111"
        strokeWidth="14"
      />
      {/* Fivela metálica da alça esquerda */}
      <rect
        x="180"
        y="425"
        width="22"
        height="16"
        rx="3"
        fill="#E2E8F0"
        stroke="#111111"
        strokeWidth="8"
      />

      {/* Alça direita do macacão */}
      <rect
        x="302"
        y="386"
        width="38"
        height="110"
        rx="6"
        fill="#1D4ED8"
        stroke="#111111"
        strokeWidth="14"
      />
      {/* Fivela metálica da alça direita */}
      <rect
        x="310"
        y="425"
        width="22"
        height="16"
        rx="3"
        fill="#E2E8F0"
        stroke="#111111"
        strokeWidth="8"
      />

      {/* Pescoço */}
      <path
        d="M216 335 L216 385 C216 410 296 410 296 385 L296 335 Z"
        fill="#FFC7AA"
        stroke="#111111"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Orelhas */}
      {/* Orelha esquerda */}
      <path
        d="M148 206 C116 206 116 256 148 256"
        fill="#FFC7AA"
        stroke="#111111"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Orelha direita */}
      <path
        d="M364 206 C396 206 396 256 364 256"
        fill="#FFC7AA"
        stroke="#111111"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Rosto / Cabeça */}
      <path
        d="M146 200 C146 120 366 120 366 200 C366 312 322 366 256 366 C190 366 146 312 146 200 Z"
        fill="#FFD2BC"
        stroke="#111111"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Olhos pretos cartoon (expressivos e simpáticos) */}
      <circle cx="204" cy="232" r="10" fill="#111111" />
      <circle cx="308" cy="232" r="10" fill="#111111" />

      {/* Sobrancelhas arqueadas */}
      <path
        d="M184 206 C192 198 216 198 224 206"
        stroke="#111111"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M288 206 C296 198 320 198 328 206"
        stroke="#111111"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* Nariz sutil */}
      <path
        d="M256 244 C256 252 250 258 244 258"
        stroke="#E69578"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bigode volumoso clássico castanho escuro */}
      <path
        d="M256 288 
           C244 266 216 266 196 278 
           C174 290 186 332 216 332 
           C236 332 250 318 256 308 
           C262 318 276 332 296 332 
           C326 332 338 290 316 278 
           C296 266 268 266 256 288 Z"
        fill="#663319"
        stroke="#111111"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Sorriso simpático sob o bigode */}
      <path
        d="M242 320 C248 328 264 328 270 320"
        stroke="#111111"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* --- CAPACETE BRANCO DE OPERÁRIO DA CONSTRUÇÃO CIVIL --- */}
      {/* Cúpula do capacete branco */}
      <path
        d="M118 174 
           C118 68 394 68 394 174 
           L394 186 
           C394 192 388 196 382 196 
           L130 196 
           C124 196 118 192 118 186 Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="15"
        strokeLinejoin="round"
      />

      {/* Nervura central reforçada do capacete (típica de EPI industrial) */}
      <path
        d="M236 78 C236 78 248 72 256 72 C264 72 276 78 276 78 L270 178 L242 178 Z"
        fill="#E2E8F0"
        stroke="#111111"
        strokeWidth="11"
        strokeLinejoin="round"
      />

      {/* Brilho suave da cúpula do capacete */}
      <path
        d="M160 120 C185 92 230 84 250 84"
        stroke="#CBD5E1"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Aba frontal do capacete de proteção */}
      <path
        d="M98 182 
           C98 174 130 166 256 166 
           C382 166 414 174 414 182 
           C414 198 382 206 256 206 
           C130 206 98 198 98 182 Z"
        fill="#F8FAFC"
        stroke="#111111"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Faixa / Selo de segurança frontal no capacete */}
      <rect
        x="232"
        y="142"
        width="48"
        height="24"
        rx="4"
        fill="#2563EB"
        stroke="#111111"
        strokeWidth="6"
      />
      <circle cx="256" cy="154" r="5" fill="#FFFFFF" />

      {/* --- LADO ESQUERDO: BANDEJA / PALETA DE TINTA --- */}
      <path
        d="M34 400 
           C14 430 40 495 100 490 
           C140 488 152 440 126 410 
           C102 384 54 370 34 400 Z"
        fill="#E0A96D"
        stroke="#111111"
        strokeWidth="14"
        strokeLinejoin="round"
      />
      {/* Gotas de tinta na paleta: terracota, amarelo, verde */}
      <circle cx="70" cy="425" r="14" fill="#C2410C" stroke="#111111" strokeWidth="6" />
      <circle cx="95" cy="460" r="12" fill="#FBBF24" stroke="#111111" strokeWidth="6" />
      <circle cx="56" cy="455" r="9" fill="#10B981" stroke="#111111" strokeWidth="5" />

      {/* LUVAS BRANCAS OPERÁRIAS (MÃO ESQUERDA SEGURANDO A PALETA) */}
      <path
        d="M106 430 
           C106 405 138 405 138 430 
           L138 450 
           C138 465 106 465 106 450 Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      {/* Punho elástico da luva operária esquerda */}
      <rect
        x="124"
        y="442"
        width="26"
        height="38"
        rx="6"
        fill="#F1F5F9"
        stroke="#111111"
        strokeWidth="10"
        transform="rotate(15 124 442)"
      />

      {/* --- LADO DIREITO: PINCEL DE ACABAMENTO PROFISSIONAL --- */}
      {/* Cabo do pincel */}
      <path
        d="M442 330 L400 445 L382 438 L424 324 Z"
        fill="#78350F"
        stroke="#111111"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      {/* Virola metálica do pincel */}
      <path
        d="M428 312 L448 318 L440 345 L420 338 Z"
        fill="#CBD5E1"
        stroke="#111111"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      {/* Cerdas do pincel com tinta terracota fresca na ponta */}
      <path
        d="M435 292 
           C430 260 455 240 480 230 
           C485 270 470 300 455 315 Z"
        fill="#334155"
        stroke="#111111"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      {/* Tinta terracota fresca na ponta das cerdas */}
      <path
        d="M465 242 C475 235 480 230 480 230 C478 250 472 262 462 272 Z"
        fill="#EA580C"
      />

      {/* LUVAS BRANCAS OPERÁRIAS (MÃO DIREITA SEGURANDO FIRME O PINCEL) */}
      {/* Dedos da luva branca */}
      <path
        d="M374 380 C360 380 360 405 374 405 L412 405 C424 405 424 380 412 380 Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <path
        d="M368 406 C354 406 354 430 368 430 L408 430 C420 430 420 406 408 406 Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <path
        d="M372 432 C360 432 360 456 372 456 L404 456 C416 456 416 432 404 432 Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      {/* Dorso e punho da luva operária direita */}
      <path
        d="M394 374 C422 374 436 394 432 444 L396 462 C384 462 380 440 380 410 Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      {/* Costura / friso de punho elástico de segurança */}
      <path
        d="M400 458 L428 448"
        stroke="#94A3B8"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CobaltoAvatar;

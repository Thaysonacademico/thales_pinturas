/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number | string;
}

/**
 * Exact replica of uploaded whatsapp.png
 * Green circle with white speech bubble and phone handset inside
 */
export const WhatsAppIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Green circular base (#25D366) */}
      <circle cx="256" cy="256" r="256" fill="#25D366" />
      {/* Speech bubble outline and body */}
      <path
        d="M258.5 98C171.4 98 100.8 168.6 100.8 255.7c0 30.8 8.9 59.5 24.3 83.8L97 417l80.2-27.4c23.2 13.9 50.2 21.8 79.1 21.8 87.1 0 157.7-70.6 157.7-157.7 0-87.1-70.6-157.7-155.5-157.7z"
        fill="#25D366"
        stroke="#FFFFFF"
        strokeWidth="28"
        strokeMiterlimit="10"
      />
      {/* Speech bubble tail filling */}
      <path
        d="M258.5 112c79.4 0 143.7 64.3 143.7 143.7 0 79.4-64.3 143.7-143.7 143.7-26.7 0-51.7-7.3-73.1-20.1l-5.2-3.1-54.4 18.6 18.9-52.9-3.4-5.5c-14.4-22.9-22-49.3-22-76.7 0-79.4 64.3-143.7 143.7-143.7z"
        fill="#25D366"
      />
      {/* Classic tilted phone handset */}
      <path
        d="M200.7 175.7c-4.3-9.5-8.8-9.7-12.9-9.9-3.3-.1-7.2-.1-11.1-.1-3.9 0-10.2 1.5-15.6 7.3-5.3 5.9-20.5 20-20.5 48.7s21 56.4 23.9 60.3c2.9 3.9 40.4 64.9 99.7 88.2 49.3 19.3 59.3 15.5 70 14.5 10.7-1 34.6-14.1 39.5-27.8 4.9-13.6 4.9-25.3 3.4-27.8-1.5-2.4-5.4-3.9-11.2-6.8-5.9-2.9-34.6-17.1-40-19-5.4-2-9.3-2.9-13.2 2.9-3.9 5.9-15.1 19-18.5 22.9-3.4 3.9-6.8 4.4-12.7 1.5-5.9-2.9-24.8-9.1-47.2-29.1-17.5-15.6-29.2-34.8-32.7-40.7-3.4-5.9-.4-9 2.6-11.9 2.6-2.6 5.9-6.8 8.8-10.2 2.9-3.4 3.9-5.9 5.9-9.8 1.9-3.9 1-7.3-.5-10.2-1.4-3-12.7-30.8-17.9-42.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

/**
 * Exact replica of uploaded instagram.png
 * Squircle with official multi-stop Instagram gradient and white camera symbol
 */
export const InstagramIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  const gradId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id={`${gradId}-radial`}
          cx="15%"
          cy="105%"
          r="115%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFD521" />
          <stop offset="10%" stopColor="#FFD521" />
          <stop offset="50%" stopColor="#F50000" />
          <stop offset="100%" stopColor="#B900B4" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${gradId}-linear`}
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FA7E1E" />
          <stop offset="35%" stopColor="#D62976" />
          <stop offset="60%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>

      {/* Outer squircle base */}
      <rect
        width="512"
        height="512"
        rx="128"
        fill={`url(#${gradId}-linear)`}
      />
      <rect
        width="512"
        height="512"
        rx="128"
        fill={`url(#${gradId}-radial)`}
      />

      {/* White camera outline */}
      <rect
        x="98"
        y="98"
        width="316"
        height="316"
        rx="80"
        stroke="#FFFFFF"
        strokeWidth="34"
        fill="none"
      />

      {/* Central lens circle */}
      <circle
        cx="256"
        cy="256"
        r="78"
        stroke="#FFFFFF"
        strokeWidth="34"
        fill="none"
      />

      {/* Flash dot at top right */}
      <circle
        cx="348"
        cy="164"
        r="22"
        fill="#FFFFFF"
      />
    </svg>
  );
};

/**
 * Exact replica of uploaded youtube.png
 * Circular red background (#FF0000) with white rounded screen and red center play triangle
 */
export const YouTubeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Red circular base (#FF0000) */}
      <circle cx="256" cy="256" r="256" fill="#FF0000" />

      {/* White rounded TV display rectangle */}
      <rect
        x="122"
        y="160"
        width="268"
        height="192"
        rx="54"
        fill="#FFFFFF"
      />

      {/* Centered red play triangle pointing right */}
      <path
        d="M220 214L308 256L220 298V214Z"
        fill="#FF0000"
      />
    </svg>
  );
};

export default {
  WhatsAppIcon,
  InstagramIcon,
  YouTubeIcon,
};

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: 'dark' | 'light';
}

export function Logo({
  className = '',
  size = 'md',
  showText = true,
  theme = 'light',
}: LogoProps) {
  const iconSizes = {
    sm: { width: 28, height: 28 },
    md: { width: 38, height: 38 },
    lg: { width: 56, height: 56 },
  };

  const textSizes = {
    sm: 'text-base tracking-[0.25em]',
    md: 'text-xl tracking-[0.28em]',
    lg: 'text-2xl tracking-[0.32em]',
  };

  const isDark = theme === 'dark';
  const mainColor = isDark ? '#FFFFFF' : '#0A0A0A';
  const redColor = '#EF4444'; // Dynamic Crimson Laser Red

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric SVG Emblem */}
      <svg
        width={iconSizes[size].width}
        height={iconSizes[size].height}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Outer Circular Q Ring */}
        <circle
          cx="80"
          cy="75"
          r="54"
          stroke={mainColor}
          strokeWidth="7"
          className="transition-colors"
        />
        
        {/* Q Angular Tail (Bottom Right) */}
        <path
          d="M 106 100 L 132 126 L 118 126"
          stroke={mainColor}
          strokeWidth="7"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* Central Geometric X Strokes */}
        {/* Top-Left to Bottom-Right Line 1 */}
        <line
          x1="52"
          y1="47"
          x2="108"
          y2="103"
          stroke={mainColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Top-Right to Bottom-Left */}
        <line
          x1="108"
          y1="47"
          x2="52"
          y2="103"
          stroke={mainColor}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Inner parallel X accents */}
        <line
          x1="58"
          y1="40"
          x2="72"
          y2="54"
          stroke={mainColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="88"
          y1="96"
          x2="102"
          y2="110"
          stroke={mainColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Dynamic Crimson Laser Red Diagonal Slash (Forming the Y intersection) */}
        <line
          x1="22"
          y1="133"
          x2="138"
          y2="17"
          stroke={redColor}
          strokeWidth="5"
          strokeLinecap="square"
        />
      </svg>

      {/* Futuristic Clean Brand Wordmark */}
      {showText && (
        <span
          className={`font-heading font-black uppercase leading-none font-mono ${
            isDark ? 'text-white' : 'text-brand-black'
          } ${textSizes[size]}`}
          style={{ letterSpacing: '0.22em' }}
        >
          QXYRA
        </span>
      )}
    </div>
  );
}

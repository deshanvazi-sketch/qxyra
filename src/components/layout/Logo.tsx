'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: 'dark' | 'light';
}

const logoHeights = {
  sm: 36,
  md: 46,
  lg: 60,
};

export function Logo({
  className = '',
  size = 'md',
  showText = true,
  theme: explicitTheme,
}: LogoProps) {
  const { theme: contextTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = explicitTheme || (mounted ? contextTheme : 'dark');
  const isDark = activeTheme === 'dark';
  const heightPx = logoHeights[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* 3D Metallic Emblem from Methmi Mobile Official Brand */}
      <div 
        className="relative shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center"
        style={{ height: `${heightPx}px`, width: `${heightPx}px` }}
      >
        <Image
          src="/methmi-emblem.png"
          alt="Methmi Mobile (Pvt) Ltd"
          fill
          priority
          sizes="(max-width: 768px) 48px, 60px"
          className="object-contain filter drop-shadow-[0_2px_8px_rgba(212,155,106,0.25)]"
        />
      </div>

      {/* Brand Wordmark & Tagline */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5 font-heading font-black tracking-[0.14em] text-base sm:text-lg">
            <span className="text-[#C58348] dark:text-[#D49B6A] drop-shadow-sm font-extrabold">METHMI</span>
            <span className={isDark ? 'text-white' : 'text-[#121D33]'}>MOBILE</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[9px] tracking-[0.22em] font-mono font-bold text-[#C58348] dark:text-[#D49B6A] uppercase">
              (PVT) LTD
            </span>
            <span className={isDark ? 'text-gray-500 font-mono text-[9px]' : 'text-gray-400 font-mono text-[9px]'}>•</span>
            <span className={`text-[9px] tracking-[0.14em] font-semibold uppercase truncate max-w-[170px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Trusted Partner
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

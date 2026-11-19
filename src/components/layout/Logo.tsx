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
        className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105 border border-amber-500/20 shadow-md bg-black/40 flex items-center justify-center p-0.5"
        style={{ height: `${heightPx}px`, width: `${Math.round(heightPx * 1.5)}px` }}
      >
        <Image
          src="/methmi-logo.jpg"
          alt="Methmi Mobile (Pvt) Ltd"
          fill
          priority
          sizes="(max-width: 768px) 60px, 90px"
          className="object-contain"
        />
      </div>

      {/* Brand Wordmark & Tagline */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5 font-heading font-black tracking-[0.14em] text-base sm:text-lg">
            <span className="text-[#D49B6A] drop-shadow-sm">METHMI</span>
            <span className={isDark ? 'text-white' : 'text-[#0F172A]'}>MOBILE</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[9px] tracking-[0.24em] font-mono font-bold text-[#D49B6A]/85 uppercase">
              (PVT) LTD
            </span>
            <span className="hidden lg:inline text-[9px] text-gray-500 font-mono">•</span>
            <span className="hidden lg:inline text-[9px] tracking-[0.16em] text-gray-400 font-medium uppercase truncate max-w-[160px]">
              Trusted Partner
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

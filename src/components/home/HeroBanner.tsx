'use client';

import Link from 'next/link';
import { BRAND_TAGLINE } from '@/lib/constants';

export function HeroBanner() {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-black via-zinc-900 to-brand-black">
      {/* Subtle gold accent overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-brand-white font-bold mb-6 tracking-tight animate-fade-in-up">
          Redefine Your Style
        </h1>
        <p className="text-lg md:text-2xl text-brand-gray-300 font-body mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {BRAND_TAGLINE}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Link 
            href="/shop" 
            className="px-8 py-4 bg-brand-gold text-brand-black font-semibold rounded hover:bg-brand-gold/90 transition-colors shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          >
            Shop Now
          </Link>
          <Link 
            href="/categories" 
            className="px-8 py-4 bg-transparent border-2 border-brand-white text-brand-white font-semibold rounded hover:bg-brand-white hover:text-brand-black transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </div>
  );
}

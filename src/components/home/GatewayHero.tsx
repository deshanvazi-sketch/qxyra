'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export function GatewayHero() {
  const [hoveredSide, setHoveredSide] = useState<'none' | 'store' | 'labs'>('none');
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && theme === 'light';

  return (
    <section 
      className={cn(
        "relative w-full min-h-[85vh] lg:min-h-[90vh] overflow-hidden flex flex-col justify-center select-none transition-colors duration-300",
        isLight ? "bg-[#F8F9FA]" : "bg-black"
      )}
      onMouseLeave={() => setHoveredSide('none')}
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 opacity-20">
        <div 
          className={cn(
            "w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-500 ease-out",
            hoveredSide === 'store' 
              ? "bg-brand-gold/30 -translate-x-1/4 scale-110" 
              : hoveredSide === 'labs' 
                ? "bg-blue-500/30 translate-x-1/4 scale-110" 
                : "bg-gradient-to-r from-brand-gold/15 to-blue-500/15"
          )} 
        />
      </div>

      {/* Main Stationary 50/50 Split Container (Zero Layout Shift) */}
      <div className="relative w-full h-full min-h-[85vh] lg:min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
        
        {/* ====================================================================
            LEFT SIDE: QXYRA STORE (Stationary 50% width)
            ==================================================================== */}
        <div 
          className={cn(
            "relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r overflow-hidden transition-all duration-300 ease-out",
            isLight 
              ? "border-gray-200 bg-gradient-to-br from-white via-[#FCFBF9] to-[#F7F4EE]" 
              : "border-gray-800/80 bg-black/90",
            hoveredSide === 'store' 
              ? "opacity-100 filter-none" 
              : hoveredSide === 'labs' 
                ? "opacity-25 saturate-50 contrast-75" 
                : "opacity-100 filter-none"
          )}
          onMouseEnter={() => setHoveredSide('store')}
        >
          {/* Subtle Background Image */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1400"
              alt="Qxyra Store Streetwear"
              fill
              priority
              className={cn(
                "object-cover object-center transition-transform duration-500",
                hoveredSide === 'store' ? "scale-105" : "scale-100",
                isLight 
                  ? "opacity-15 brightness-105" 
                  : "brightness-40 opacity-75"
              )}
            />
            {!isLight && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            )}
          </div>

          {/* Top Tag & Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
              <span className={cn(
                "text-xs uppercase tracking-widest font-mono font-semibold transition-colors",
                isLight ? "text-amber-700" : "text-brand-gold"
              )}>
                Division 01
              </span>
            </div>
            <span className={cn(
              "text-[11px] font-mono px-3 py-1 rounded-full font-medium transition-all duration-200",
              isLight 
                ? "bg-amber-100/80 text-amber-900 border border-amber-200 shadow-sm" 
                : "bg-brand-gold/10 text-brand-gold border border-brand-gold/30"
            )}>
              Streetwear & Tech Gear
            </span>
          </div>

          {/* Core Store Content */}
          <div className="relative z-10 my-auto py-8 space-y-6 max-w-xl">
            <div className="space-y-2">
              <span className={cn(
                "text-xs font-mono uppercase tracking-widest font-medium transition-colors",
                isLight ? "text-gray-600" : "text-gray-400"
              )}>
                Curated Apparel & Lifestyle
              </span>
              <h1 className={cn(
                "text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight leading-[1.08] transition-colors",
                isLight ? "text-gray-950" : "text-white"
              )}>
                QXYRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-light font-normal">STORE</span>
              </h1>
            </div>

            <p className={cn(
              "text-sm sm:text-base leading-relaxed font-body font-light transition-colors",
              isLight ? "text-gray-700" : "text-gray-300"
            )}>
              Architectural regular fit tees, heavy 280GSM oversized drop-shoulder silhouettes, 460GSM french terry hoodies, and high-performance MagSafe and workspace peripherals.
            </p>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <Link 
                href="/store/fashion/regular-fit-tee"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-brand-gold text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-brand-gold text-gray-300 hover:text-white"
                )}
              >
                Regular Fit Tee
              </Link>
              <Link 
                href="/store/fashion/oversized-tee"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-brand-gold text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-brand-gold text-gray-300 hover:text-white"
                )}
              >
                Oversized Tee
              </Link>
              <Link 
                href="/store/fashion/hoodie"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-brand-gold text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-brand-gold text-gray-300 hover:text-white"
                )}
              >
                Hoodies
              </Link>
              <Link 
                href="/store/accessories"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-brand-gold text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-brand-gold text-gray-300 hover:text-white"
                )}
              >
                Mobile & Computer Gear
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/store"
                className="px-7 py-3.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold text-xs rounded-xl shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-all flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>Explore Store</span>
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </Link>
              <Link
                href="/store/fashion"
                className={cn(
                  "px-6 py-3.5 text-xs font-medium rounded-xl transition-all duration-200",
                  isLight 
                    ? "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-brand-gold shadow-sm" 
                    : "bg-black/50 hover:bg-black/80 text-white border border-gray-700 hover:border-brand-gold"
                )}
              >
                View Fashion Drop
              </Link>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className={cn(
            "relative z-10 pt-4 border-t flex items-center justify-between text-xs transition-colors",
            isLight ? "border-gray-200 text-gray-600" : "border-gray-800/80 text-gray-400"
          )}>
            <span>Worldwide Tracked Delivery</span>
            <span className={cn("font-mono font-medium", isLight ? "text-amber-700" : "text-brand-gold")}>
              09 Premium Drops Active
            </span>
          </div>
        </div>

        {/* ====================================================================
            RIGHT SIDE: QXYRA LABS (Stationary 50% width)
            ==================================================================== */}
        <div 
          className={cn(
            "relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden transition-all duration-300 ease-out",
            isLight 
              ? "bg-gradient-to-bl from-white via-[#F7FAFD] to-[#EDF4FB]" 
              : "bg-[#080C14]/95",
            hoveredSide === 'labs' 
              ? "opacity-100 filter-none" 
              : hoveredSide === 'store' 
                ? "opacity-25 saturate-50 contrast-75" 
                : "opacity-100 filter-none"
          )}
          onMouseEnter={() => setHoveredSide('labs')}
        >
          {/* Subtle Background Image */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1400"
              alt="Qxyra Labs Software Technology"
              fill
              priority
              className={cn(
                "object-cover object-center transition-transform duration-500",
                hoveredSide === 'labs' ? "scale-105" : "scale-100",
                isLight 
                  ? "opacity-15 brightness-105" 
                  : "brightness-30 opacity-75"
              )}
            />
            {!isLight && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            )}
          </div>

          {/* Top Tag & Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className={cn(
                "text-xs uppercase tracking-widest font-mono font-semibold transition-colors",
                isLight ? "text-blue-700" : "text-blue-400"
              )}>
                Division 02
              </span>
            </div>
            <span className={cn(
              "text-[11px] font-mono px-3 py-1 rounded-full font-medium transition-all duration-200",
              isLight 
                ? "bg-blue-100/80 text-blue-900 border border-blue-200 shadow-sm" 
                : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
            )}>
              Software & Web Solutions
            </span>
          </div>

          {/* Core Labs Content */}
          <div className="relative z-10 my-auto py-8 space-y-6 max-w-xl">
            <div className="space-y-2">
              <span className={cn(
                "text-xs font-mono uppercase tracking-widest font-medium transition-colors",
                isLight ? "text-gray-600" : "text-gray-400"
              )}>
                Engineering Digital Infrastructure
              </span>
              <h2 className={cn(
                "text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight leading-[1.08] transition-colors",
                isLight ? "text-gray-950" : "text-white"
              )}>
                QXYRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 font-normal">LABS</span>
              </h2>
            </div>

            <p className={cn(
              "text-sm sm:text-base leading-relaxed font-body font-light transition-colors",
              isLight ? "text-gray-700" : "text-gray-300"
            )}>
              High-speed retail Point of Sale (POS) suites, multi-channel inventory orchestrators, bespoke luxury web applications, and enterprise digital solutions designed for ambitious brands.
            </p>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <Link 
                href="/labs/software"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-500 text-gray-800 hover:text-blue-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white"
                )}
              >
                Qxyra Retail POS
              </Link>
              <Link 
                href="/labs/solutions"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-500 text-gray-800 hover:text-blue-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white"
                )}
              >
                Web & E-Commerce
              </Link>
              <Link 
                href="/labs/solutions"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-500 text-gray-800 hover:text-blue-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white"
                )}
              >
                Restaurant & Shop Systems
              </Link>
              <Link 
                href="/labs/quote"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-500 text-gray-800 hover:text-blue-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white"
                )}
              >
                Custom Development
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/labs"
                className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>Explore Labs</span>
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </Link>
              <Link
                href="/labs/quote"
                className={cn(
                  "px-6 py-3.5 text-xs font-medium rounded-xl transition-all duration-200",
                  isLight 
                    ? "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-blue-500 shadow-sm" 
                    : "bg-black/50 hover:bg-black/80 text-white border border-gray-700 hover:border-blue-500"
                )}
              >
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className={cn(
            "relative z-10 pt-4 border-t flex items-center justify-between text-xs transition-colors",
            isLight ? "border-gray-200 text-gray-600" : "border-gray-800/80 text-gray-400"
          )}>
            <span>Next.js Turbopack & Cloud Native</span>
            <span className={cn("font-mono font-medium", isLight ? "text-blue-700" : "text-blue-400")}>
              99.98% SLA Enterprise
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
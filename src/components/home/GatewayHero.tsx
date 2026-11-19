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
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 opacity-25">
        <div 
          className={cn(
            "w-[550px] h-[550px] rounded-full blur-3xl transition-all duration-500 ease-out",
            hoveredSide === 'store' 
              ? "bg-[#D49B6A]/35 -translate-x-1/4 scale-110" 
              : hoveredSide === 'labs' 
                ? "bg-blue-600/35 translate-x-1/4 scale-110" 
                : "bg-gradient-to-r from-[#D49B6A]/20 to-blue-600/20"
          )} 
        />
      </div>

      {/* Main Stationary 50/50 Split Container */}
      <div className="relative w-full h-full min-h-[85vh] lg:min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
        
        {/* ====================================================================
            LEFT SIDE: METHMI STORE (Smartphones & Mobile Gear)
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
                ? "opacity-35 saturate-50 contrast-75" 
                : "opacity-100 filter-none"
          )}
          onMouseEnter={() => setHoveredSide('store')}
        >
          {/* Subtle Background Image */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1400"
              alt="Methmi Mobile Flagship Smartphones"
              fill
              priority
              className={cn(
                "object-cover object-center transition-transform duration-500",
                hoveredSide === 'store' ? "scale-105" : "scale-100",
                isLight 
                  ? "opacity-15 brightness-105" 
                  : "brightness-35 opacity-70"
              )}
            />
            {!isLight && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            )}
          </div>

          {/* Top Tag & Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D49B6A] animate-pulse" />
              <span className={cn(
                "text-xs uppercase tracking-widest font-mono font-semibold transition-colors",
                isLight ? "text-amber-800" : "text-[#D49B6A]"
              )}>
                Division 01
              </span>
            </div>
            <span className={cn(
              "text-[11px] font-mono px-3 py-1 rounded-full font-medium transition-all duration-200",
              isLight 
                ? "bg-amber-100/90 text-amber-950 border border-amber-200 shadow-sm" 
                : "bg-[#D49B6A]/10 text-[#D49B6A] border border-[#D49B6A]/30"
            )}>
              Flagship Smartphones & Gear
            </span>
          </div>

          {/* Core Store Content */}
          <div className="relative z-10 my-auto py-8 space-y-6 max-w-xl">
            <div className="space-y-2">
              <span className={cn(
                "text-xs font-mono uppercase tracking-widest font-medium transition-colors",
                isLight ? "text-gray-600" : "text-gray-400"
              )}>
                100% Genuine TRCSL Approved Stock
              </span>
              <h1 className={cn(
                "text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight leading-[1.08] transition-colors",
                isLight ? "text-gray-950" : "text-white"
              )}>
                METHMI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D49B6A] via-amber-300 to-[#e2ac7e] font-normal">STORE</span>
              </h1>
            </div>

            <p className={cn(
              "text-sm sm:text-base leading-relaxed font-body font-light transition-colors",
              isLight ? "text-gray-700" : "text-gray-300"
            )}>
              Sri Lanka&apos;s premier destination for brand new Apple iPhones, Samsung Galaxy, Tecno, Infinix, Xiaomi Redmi, and genuine fast-charging accessories with official company warranty.
            </p>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <Link 
                href="/store"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-[#D49B6A] text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-[#D49B6A] text-gray-300 hover:text-white"
                )}
              >
                Apple iPhones
              </Link>
              <Link 
                href="/store"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-[#D49B6A] text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-[#D49B6A] text-gray-300 hover:text-white"
                )}
              >
                Samsung Galaxy
              </Link>
              <Link 
                href="/store"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-[#D49B6A] text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-[#D49B6A] text-gray-300 hover:text-white"
                )}
              >
                Tecno & Infinix
              </Link>
              <Link 
                href="/store"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-[#D49B6A] text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-[#D49B6A] text-gray-300 hover:text-white"
                )}
              >
                Xiaomi Redmi
              </Link>
              <Link 
                href="/store/accessories"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
                  isLight 
                    ? "bg-white hover:bg-amber-50 border border-gray-200 hover:border-[#D49B6A] text-gray-800 hover:text-amber-800 shadow-sm" 
                    : "bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-[#D49B6A] text-gray-300 hover:text-white"
                )}
              >
                Fast Chargers & Gear
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/store"
                className="px-7 py-3.5 bg-gradient-to-r from-[#D49B6A] to-[#e2ac7e] text-black font-semibold text-xs rounded-xl shadow-lg shadow-[#D49B6A]/20 hover:opacity-95 transition-all flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>Explore Store</span>
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </Link>
              <Link
                href="/deals"
                className={cn(
                  "px-6 py-3.5 text-xs font-medium rounded-xl transition-all duration-200",
                  isLight 
                    ? "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-[#D49B6A] shadow-sm" 
                    : "bg-black/50 hover:bg-black/80 text-white border border-gray-700 hover:border-[#D49B6A]"
                )}
              >
                View Hot Deals
              </Link>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className={cn(
            "relative z-10 pt-4 border-t flex items-center justify-between text-xs transition-colors",
            isLight ? "border-gray-200 text-gray-600" : "border-gray-800/80 text-gray-400"
          )}>
            <span>Islandwide Cash On Delivery</span>
            <span className={cn("font-mono font-medium", isLight ? "text-amber-800" : "text-[#D49B6A]")}>
              100% TRCSL Approved
            </span>
          </div>
        </div>

        {/* ====================================================================
            RIGHT SIDE: METHMI LABS (Cloud POS & Business Systems)
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
                ? "opacity-35 saturate-50 contrast-75" 
                : "opacity-100 filter-none"
          )}
          onMouseEnter={() => setHoveredSide('labs')}
        >
          {/* Subtle Background Image */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1400"
              alt="Methmi Labs POS Software Technology"
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
              Cloud POS & Business Systems
            </span>
          </div>

          {/* Core Labs Content */}
          <div className="relative z-10 my-auto py-8 space-y-6 max-w-xl">
            <div className="space-y-2">
              <span className={cn(
                "text-xs font-mono uppercase tracking-widest font-medium transition-colors",
                isLight ? "text-gray-600" : "text-gray-400"
              )}>
                Retail POS & Business Engineering
              </span>
              <h2 className={cn(
                "text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight leading-[1.08] transition-colors",
                isLight ? "text-gray-950" : "text-white"
              )}>
                METHMI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 font-normal">LABS</span>
              </h2>
            </div>

            <p className={cn(
              "text-sm sm:text-base leading-relaxed font-body font-light transition-colors",
              isLight ? "text-gray-700" : "text-gray-300"
            )}>
              High-speed retail Point of Sale (POS) suites, multi-counter shop billing, real-time reload trackers, and enterprise digital solutions tailored for growing Sri Lankan businesses.
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
                Methmi Cloud POS
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
                Shop Reload Tracker
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
                Retail & Grocery POS
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
                VIP Device Care
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/labs"
                className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>Explore Tech Solutions</span>
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
                Request a Demo
              </Link>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className={cn(
            "relative z-10 pt-4 border-t flex items-center justify-between text-xs transition-colors",
            isLight ? "border-gray-200 text-gray-600" : "border-gray-800/80 text-gray-400"
          )}>
            <span>Cloud Sync & Multi-Branch Ready</span>
            <span className={cn("font-mono font-medium", isLight ? "text-blue-700" : "text-blue-400")}>
              24/7 Islandwide Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

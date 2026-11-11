'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface MegaMenuProps {
  division: 'store' | 'labs';
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MegaMenu({ division, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (division === 'store') {
    return (
      <div 
        className="absolute top-full left-0 w-full flex justify-center pt-2 px-4 z-50 pointer-events-auto"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div 
          className={cn(
            "w-full max-w-2xl rounded-2xl p-5 shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-1",
            isLight 
              ? "bg-white/98 border border-gray-200 text-gray-900 shadow-black/10" 
              : "bg-[#0E121A]/95 border border-brand-gold/30 text-white shadow-black/80 backdrop-blur-xl"
          )}
        >
          {/* Header */}
          <div className={cn(
            "flex items-center justify-between pb-3 mb-4 border-b",
            isLight ? "border-gray-200" : "border-gray-800"
          )}>
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🛍️</span>
              <div>
                <h3 className={cn("text-sm font-semibold flex items-center gap-2", isLight ? "text-gray-900" : "text-white")}>
                  <span>Qxyra Store</span>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-mono font-medium uppercase",
                    isLight ? "bg-amber-100 text-amber-800" : "bg-brand-gold/15 text-brand-gold border border-brand-gold/30"
                  )}>
                    Curated Apparel & Tech
                  </span>
                </h3>
              </div>
            </div>
            <Link
              href="/store"
              onClick={onClose}
              className={cn(
                "text-xs font-medium flex items-center gap-1 group transition-colors",
                isLight ? "text-amber-700 hover:text-amber-900" : "text-brand-gold hover:text-white"
              )}
            >
              <span>All Products</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* 2-Column Compact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Column 1: Fashion */}
            <div className="space-y-2">
              <Link
                href="/store/fashion"
                onClick={onClose}
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors",
                  isLight ? "text-gray-800 hover:text-amber-700" : "text-gray-300 hover:text-brand-gold"
                )}
              >
                <span>👕</span>
                <span>Fashion Drops</span>
              </Link>
              <div className="space-y-1.5 pl-1">
                <Link
                  href="/store/fashion/regular-fit-tee"
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-xl transition-all flex items-center justify-between group",
                    isLight 
                      ? "hover:bg-amber-50/80 border border-transparent hover:border-amber-200" 
                      : "hover:bg-black/50 border border-transparent hover:border-gray-800"
                  )}
                >
                  <div>
                    <h4 className={cn("text-xs font-medium", isLight ? "text-gray-900 group-hover:text-amber-800" : "text-white group-hover:text-brand-gold")}>
                      Regular Fit Tee
                    </h4>
                    <p className={cn("text-[11px]", isLight ? "text-gray-500" : "text-gray-400")}>
                      240GSM combed cotton everyday cut
                    </p>
                  </div>
                  <span className={cn("text-xs", isLight ? "text-gray-400 group-hover:text-amber-800" : "text-gray-500 group-hover:text-brand-gold")}>→</span>
                </Link>

                <Link
                  href="/store/fashion/oversized-tee"
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-xl transition-all flex items-center justify-between group",
                    isLight 
                      ? "hover:bg-amber-50/80 border border-transparent hover:border-amber-200" 
                      : "hover:bg-black/50 border border-transparent hover:border-gray-800"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className={cn("text-xs font-medium", isLight ? "text-gray-900 group-hover:text-amber-800" : "text-white group-hover:text-brand-gold")}>
                        Oversized Tee
                      </h4>
                      <span className={cn("text-[9px] px-1.5 py-0.2 rounded font-mono", isLight ? "bg-amber-100 text-amber-800" : "bg-brand-gold/20 text-brand-gold")}>Hot</span>
                    </div>
                    <p className={cn("text-[11px]", isLight ? "text-gray-500" : "text-gray-400")}>
                      280GSM heavy boxy streetwear drape
                    </p>
                  </div>
                  <span className={cn("text-xs", isLight ? "text-gray-400 group-hover:text-amber-800" : "text-gray-500 group-hover:text-brand-gold")}>→</span>
                </Link>

                <Link
                  href="/store/fashion/hoodie"
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-xl transition-all flex items-center justify-between group",
                    isLight 
                      ? "hover:bg-amber-50/80 border border-transparent hover:border-amber-200" 
                      : "hover:bg-black/50 border border-transparent hover:border-gray-800"
                  )}
                >
                  <div>
                    <h4 className={cn("text-xs font-medium", isLight ? "text-gray-900 group-hover:text-amber-800" : "text-white group-hover:text-brand-gold")}>
                      French Terry Hoodie
                    </h4>
                    <p className={cn("text-[11px]", isLight ? "text-gray-500" : "text-gray-400")}>
                      460GSM double-fleece structured hood
                    </p>
                  </div>
                  <span className={cn("text-xs", isLight ? "text-gray-400 group-hover:text-amber-800" : "text-gray-500 group-hover:text-brand-gold")}>→</span>
                </Link>
              </div>
            </div>

            {/* Column 2: Tech Accessories */}
            <div className="space-y-2">
              <Link
                href="/store/accessories"
                onClick={onClose}
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors",
                  isLight ? "text-gray-800 hover:text-amber-700" : "text-gray-300 hover:text-brand-gold"
                )}
              >
                <span>⚡</span>
                <span>Tech Peripherals</span>
              </Link>
              <div className="space-y-1.5 pl-1">
                <Link
                  href="/store/accessories/mobile"
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-xl transition-all flex items-center justify-between group",
                    isLight 
                      ? "hover:bg-amber-50/80 border border-transparent hover:border-amber-200" 
                      : "hover:bg-black/50 border border-transparent hover:border-gray-800"
                  )}
                >
                  <div>
                    <h4 className={cn("text-xs font-medium", isLight ? "text-gray-900 group-hover:text-amber-800" : "text-white group-hover:text-brand-gold")}>
                      Mobile Accessories
                    </h4>
                    <p className={cn("text-[11px]", isLight ? "text-gray-500" : "text-gray-400")}>
                      MagSafe stands, 65W GaN fast chargers
                    </p>
                  </div>
                  <span className={cn("text-xs", isLight ? "text-gray-400 group-hover:text-amber-800" : "text-gray-500 group-hover:text-brand-gold")}>→</span>
                </Link>

                <Link
                  href="/store/accessories/computer"
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-xl transition-all flex items-center justify-between group",
                    isLight 
                      ? "hover:bg-amber-50/80 border border-transparent hover:border-amber-200" 
                      : "hover:bg-black/50 border border-transparent hover:border-gray-800"
                  )}
                >
                  <div>
                    <h4 className={cn("text-xs font-medium", isLight ? "text-gray-900 group-hover:text-amber-800" : "text-white group-hover:text-brand-gold")}>
                      Computer Accessories
                    </h4>
                    <p className={cn("text-[11px]", isLight ? "text-gray-500" : "text-gray-400")}>
                      CNC aluminum riser stands, 7-in-1 4K hubs
                    </p>
                  </div>
                  <span className={cn("text-xs", isLight ? "text-gray-400 group-hover:text-amber-800" : "text-gray-500 group-hover:text-brand-gold")}>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // LABS COMPACT DROPDOWN
  // =========================================================================
  return (
    <div 
      className="absolute top-full left-0 w-full flex justify-center pt-2 px-4 z-50 pointer-events-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className={cn(
          "w-full max-w-xl rounded-2xl p-5 shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-1",
          isLight 
            ? "bg-white/98 border border-gray-200 text-gray-900 shadow-black/10" 
            : "bg-[#0E121A]/95 border border-blue-500/30 text-white shadow-black/80 backdrop-blur-xl"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between pb-3 mb-3 border-b",
          isLight ? "border-gray-200" : "border-gray-800"
        )}>
          <div className="flex items-center gap-2.5">
            <span className="text-lg">⚡</span>
            <div>
              <h3 className={cn("text-sm font-semibold flex items-center gap-2", isLight ? "text-gray-900" : "text-white")}>
                <span>Qxyra Labs</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-mono font-medium uppercase",
                  isLight ? "bg-blue-100 text-blue-800" : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                )}>
                  Software & Web Solutions
                </span>
              </h3>
            </div>
          </div>
          <Link
            href="/labs"
            onClick={onClose}
            className={cn(
              "text-xs font-medium flex items-center gap-1 group transition-colors",
              isLight ? "text-blue-700 hover:text-blue-900" : "text-blue-400 hover:text-white"
            )}
          >
            <span>Explore Suite</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* 3 Compact Action Rows (Clean & Readable) */}
        <div className="space-y-2">
          {/* Item 1: Software */}
          <Link
            href="/labs/software"
            onClick={onClose}
            className={cn(
              "p-3 rounded-xl transition-all flex items-center justify-between group",
              isLight 
                ? "bg-gray-50/80 hover:bg-blue-50/80 border border-gray-200/60 hover:border-blue-300" 
                : "bg-black/40 hover:bg-black/70 border border-gray-800/80 hover:border-blue-500/40"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0",
                isLight ? "bg-blue-100 text-blue-700" : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
              )}>
                💻
              </div>
              <div>
                <h4 className={cn(
                  "text-xs font-semibold transition-colors",
                  isLight ? "text-gray-900 group-hover:text-blue-700" : "text-white group-hover:text-blue-400"
                )}>
                  Retail POS & Inventory Suite
                </h4>
                <p className={cn("text-[11px] leading-tight", isLight ? "text-gray-600" : "text-gray-400")}>
                  Turnkey point-of-sale checkout, multi-warehouse sync & till registers.
                </p>
              </div>
            </div>
            <span className={cn(
              "text-xs font-mono font-medium ml-2 transition-transform group-hover:translate-x-1",
              isLight ? "text-blue-700" : "text-blue-400"
            )}>
              →
            </span>
          </Link>

          {/* Item 2: Web Solutions */}
          <Link
            href="/labs/solutions"
            onClick={onClose}
            className={cn(
              "p-3 rounded-xl transition-all flex items-center justify-between group",
              isLight 
                ? "bg-gray-50/80 hover:bg-blue-50/80 border border-gray-200/60 hover:border-blue-300" 
                : "bg-black/40 hover:bg-black/70 border border-gray-800/80 hover:border-blue-500/40"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0",
                isLight ? "bg-purple-100 text-purple-700" : "bg-purple-500/10 text-purple-400 border border-purple-500/30"
              )}>
                🌐
              </div>
              <div>
                <h4 className={cn(
                  "text-xs font-semibold transition-colors",
                  isLight ? "text-gray-900 group-hover:text-blue-700" : "text-white group-hover:text-blue-400"
                )}>
                  Custom Web & E-Commerce Engineering
                </h4>
                <p className={cn("text-[11px] leading-tight", isLight ? "text-gray-600" : "text-gray-400")}>
                  Bespoke storefronts, custom CRM/ERP integrations & cloud hosting.
                </p>
              </div>
            </div>
            <span className={cn(
              "text-xs font-mono font-medium ml-2 transition-transform group-hover:translate-x-1",
              isLight ? "text-blue-700" : "text-blue-400"
            )}>
              →
            </span>
          </Link>

          {/* Item 3: Request Quote */}
          <Link
            href="/labs/quote"
            onClick={onClose}
            className={cn(
              "p-3 rounded-xl transition-all flex items-center justify-between group",
              isLight 
                ? "bg-blue-50/80 hover:bg-blue-100/70 border border-blue-200" 
                : "bg-gradient-to-r from-blue-950/40 to-black/60 border border-blue-500/30 hover:border-blue-400"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0",
                isLight ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
              )}>
                🚀
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={cn(
                    "text-xs font-semibold transition-colors",
                    isLight ? "text-blue-900" : "text-white group-hover:text-blue-300"
                  )}>
                    Request a Project Scope & Quote
                  </h4>
                  <span className={cn("text-[9px] font-mono px-1.5 py-0.2 rounded", isLight ? "bg-blue-200 text-blue-900" : "bg-blue-500/20 text-blue-400")}>Free</span>
                </div>
                <p className={cn("text-[11px] leading-tight", isLight ? "text-blue-800/80" : "text-gray-400")}>
                  Transparent estimation, architecture breakdown & 24h turnaround.
                </p>
              </div>
            </div>
            <span className={cn(
              "text-xs font-mono font-medium ml-2 transition-transform group-hover:translate-x-1",
              isLight ? "text-blue-800" : "text-blue-400"
            )}>
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
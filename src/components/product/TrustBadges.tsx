'use client';

import { ShieldCheck, Award, Truck, RotateCcw } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export function TrustBadges() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const badges = [
    {
      icon: ShieldCheck,
      title: '100% TRCSL Approved',
      subtitle: 'Telecommunications Regulatory Commission Registered',
      highlight: 'Official IMEI Registered',
    },
    {
      icon: Award,
      title: '1-Year Company Warranty',
      subtitle: 'Official Brand Warranty & Authorized Service Support',
      highlight: 'Sealed Box Unit',
    },
    {
      icon: Truck,
      title: 'Islandwide Fast COD',
      subtitle: 'Prompt Cash on Delivery Direct to Your Doorstep',
      highlight: '24-48 Hours Delivery',
    },
    {
      icon: RotateCcw,
      title: '7-Day Replacement',
      subtitle: 'Instant Swap for Verified Hardware Manufacturing Defects',
      highlight: 'Zero Hassle Policy',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold font-semibold">
          Authenticity &amp; Buyer Guarantee
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className={cn(
                'flex flex-col p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 hover:scale-[1.02]',
                isLight
                  ? 'bg-amber-50/40 border-amber-200/80 shadow-sm hover:border-amber-400'
                  : 'bg-black/40 border-gray-800/80 hover:border-brand-gold/40'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={cn(
                    'w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0',
                    isLight ? 'bg-amber-100 text-amber-800' : 'bg-brand-gold/10 text-brand-gold'
                  )}
                >
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <span
                  className={cn(
                    'text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold truncate',
                    isLight
                      ? 'bg-amber-200/60 text-amber-900'
                      : 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
                  )}
                >
                  {b.highlight}
                </span>
              </div>

              <h4
                className={cn(
                  'text-xs font-semibold leading-tight mb-1',
                  isLight ? 'text-gray-900' : 'text-white'
                )}
              >
                {b.title}
              </h4>
              <p
                className={cn(
                  'text-[10px] leading-snug line-clamp-2',
                  isLight ? 'text-gray-600' : 'text-gray-400'
                )}
              >
                {b.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

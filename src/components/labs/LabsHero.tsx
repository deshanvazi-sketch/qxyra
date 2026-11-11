'use client';

import Link from 'next/link';

interface LabsHeroProps {
  title: string;
  subtitle: string;
  tag?: string;
  actions?: {
    primaryText: string;
    primaryHref: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
}

export function LabsHero({
  title,
  subtitle,
  tag = 'Engineering Division',
  actions,
}: LabsHeroProps) {
  return (
    <div className="relative py-16 sm:py-24 bg-[#080C14] border-b border-blue-500/20 overflow-hidden">
      {/* Background Cyber Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-medium">
            Qxyra Labs • {tag}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light text-white tracking-tight leading-[1.1] max-w-4xl">
          {title}
        </h1>

        <p className="text-gray-400 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>

        {actions && (
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
            <Link
              href={actions.primaryHref}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-xl shadow-blue-500/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{actions.primaryText}</span>
              <span>→</span>
            </Link>
            {actions.secondaryText && actions.secondaryHref && (
              <Link
                href={actions.secondaryHref}
                className="px-6 py-3 bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white border border-gray-800 hover:border-blue-500 text-xs font-medium rounded-xl transition-all"
              >
                {actions.secondaryText}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

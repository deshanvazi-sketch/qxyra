'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLabsStore } from '@/store/labsStore';
import { useCurrency } from '@/context/CurrencyContext';
import { softwareProducts as defaultSoftware } from '@/lib/labs-data';

export function LabsSoftwareCatalog() {
  const { softwareList } = useLabsStore();
  const { format } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = mounted ? softwareList : defaultSoftware;

  return (
    <div className="space-y-12">
      {items.map((sw) => (
        <div
          key={sw.id}
          className="p-8 sm:p-12 rounded-3xl bg-[#0E1422] border border-blue-500/30 hover:border-blue-400 transition-all shadow-2xl space-y-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-800 pb-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                {sw.icon}
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                    {sw.badge}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">v2.6 Stable Release</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-medium text-white">
                  {sw.name}
                </h2>
                <p className="text-xs sm:text-sm text-blue-300 font-light">
                  {sw.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-mono block">Pricing Model</span>
                <span className="text-lg font-bold text-white font-mono">
                  {sw.pricing.type === 'custom-quote'
                    ? 'Custom Quote'
                    : sw.pricing.startingAt
                    ? `From ${format(sw.pricing.startingAt)}`
                    : 'Custom Quote'}
                </span>
              </div>
              <Link
                href={`/labs/quote?product=${sw.slug}`}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Request Demo / Deployment →
              </Link>
            </div>
          </div>

          {/* Description & Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-heading text-base font-medium text-white">
                Architecture & Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {sw.longDescription || sw.description}
              </p>

              <div className="pt-2">
                <h4 className="text-[11px] font-mono uppercase text-gray-400 tracking-wider mb-2">
                  Engineered Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sw.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-black/60 border border-gray-800 text-xs font-mono text-blue-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/50 border border-gray-800/80 space-y-3">
              <h4 className="font-heading text-xs font-medium text-blue-400 uppercase tracking-wider font-mono">
                Key Integrated Features
              </h4>
              <ul className="space-y-2.5">
                {sw.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

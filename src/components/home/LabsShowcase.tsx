'use client';

import Link from 'next/link';
import { softwareProducts, servicePackages, labsStats } from '@/lib/labs-data';

export function LabsShowcase() {
  return (
    <section className="py-24 bg-[#080B10] border-b border-gray-800/80 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-medium">
                Division 02 Engineering
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
              Qxyra <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Labs</span> Suite
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Turnkey retail Point of Sale (POS) software, multi-branch stock orchestration, and bespoke web platforms engineered for maximum conversion.
            </p>
          </div>

          <Link
            href="/labs/quote"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-xl shadow-blue-500/20 hover:opacity-95 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <span>Request a Project Quote</span>
            <span>→</span>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {labsStats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#0D121D] border border-blue-500/20 shadow-sm space-y-1"
            >
              <span className="text-2xl sm:text-3xl font-heading font-bold text-white font-mono">
                {stat.value}
              </span>
              <p className="text-xs font-medium text-blue-400">{stat.label}</p>
              <p className="text-[11px] text-gray-500">{stat.detail}</p>
            </div>
          ))}
        </div>

        {/* Featured Software & Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Software Product 1 */}
          {softwareProducts.slice(0, 2).map((sw) => (
            <div
              key={sw.id}
              className="p-7 rounded-2xl bg-[#0E1422] border border-blue-500/30 hover:border-blue-400 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    {sw.icon}
                  </span>
                  <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-medium">
                    {sw.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {sw.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {sw.description}
                  </p>
                </div>

                {/* Feature checklist */}
                <div className="space-y-2 pt-2 border-t border-gray-800">
                  {sw.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="text-blue-400 text-xs">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-mono">Investment</span>
                  <span className="text-sm font-semibold text-white font-mono">
                    {sw.pricing.type === 'custom-quote' ? 'Custom Quote' : `From $${sw.pricing.startingAt}`}
                  </span>
                </div>
                <Link
                  href="/labs/software"
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white text-xs font-semibold rounded-lg transition-all"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}

          {/* Web & POS Package 1 */}
          {servicePackages.slice(0, 1).map((pkg) => (
            <div
              key={pkg.id}
              className="p-7 rounded-2xl bg-gradient-to-b from-[#131B30] to-[#0E1422] border border-indigo-500/40 hover:border-indigo-400 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    🌐
                  </span>
                  <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full font-medium">
                    {pkg.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Feature checklist */}
                <div className="space-y-2 pt-2 border-t border-gray-800">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="text-indigo-400 text-xs">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-mono">Turnaround</span>
                  <span className="text-sm font-semibold text-white font-mono">
                    {pkg.deliveryTime}
                  </span>
                </div>
                <Link
                  href="/labs/solutions"
                  className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white text-xs font-semibold rounded-lg transition-all"
                >
                  View Solutions →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

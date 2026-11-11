'use client';

import Link from 'next/link';

export function BrandStory() {
  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
                Our Dual DNA
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-white tracking-tight leading-tight">
              One Brand. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-blue-400 font-normal">
                Two Distinct Arenas.
              </span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              Qxyra was founded on the conviction that everyday excellence shouldn&apos;t be fragmented. We engineer the physical clothing and workspace objects you interact with daily—and the digital software infrastructure that powers ambitious businesses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#141820] border border-brand-gold/30 space-y-2">
                <span className="text-xl">🛍️</span>
                <h4 className="text-sm font-semibold text-white">Qxyra Store</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  240–460GSM heavyweight cotton streetwear, drop-shoulder silhouettes, and minimalist anodized workspace peripherals.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141820] border border-blue-500/30 space-y-2">
                <span className="text-xl">⚡</span>
                <h4 className="text-sm font-semibold text-white">Qxyra Labs</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Next-generation Point of Sale software, omnichannel inventory synchronizers, and high-conversion e-commerce engines.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-brand-gold transition-colors"
              >
                <span>Read the Complete Qxyra Story</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Values & Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
              <span className="text-2xl font-mono text-brand-gold">01</span>
              <h4 className="font-heading text-base font-medium text-white">Uncompromising Weight</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                We never compromise on fabric density or alloy purity. Every tee, hoodie, and stand is built with architectural permanence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
              <span className="text-2xl font-mono text-blue-400">02</span>
              <h4 className="font-heading text-base font-medium text-white">Sub-Second Speed</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                From offline-first POS tills to edge-rendered web storefronts, our software stack is optimized for zero latency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
              <span className="text-2xl font-mono text-brand-gold-light">03</span>
              <h4 className="font-heading text-base font-medium text-white">Real-Time Precision</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Live foreign exchange (USD / LKR), automated logistics tracking, and verified checkout cryptography.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
              <span className="text-2xl font-mono text-indigo-400">04</span>
              <h4 className="font-heading text-base font-medium text-white">Founder Accountability</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Direct client support, transparent lead times, and continuous product iterations driven by real customer feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

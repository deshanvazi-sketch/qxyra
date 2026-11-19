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
              <span className="w-2 h-2 rounded-full bg-[#D49B6A]" />
              <span className="text-xs uppercase tracking-widest text-[#D49B6A] font-mono font-medium">
                Our Dual DNA
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-white tracking-tight leading-tight">
              One Trusted Flagship. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D49B6A] via-amber-200 to-blue-400 font-normal">
                Two Powerful Tech Pillars.
              </span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              Methmi Mobile (Pvt) Ltd was built on the foundation of unyielding trust and technical excellence. We provide the genuine physical devices you rely on every second—and the high-speed retail software systems that empower Sri Lankan businesses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#141820] border border-[#D49B6A]/30 space-y-2">
                <span className="text-xl">📱</span>
                <h4 className="text-sm font-semibold text-white">Methmi Store</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  100% genuine Apple iPhones, Samsung Galaxy, Tecno, Infinix, Xiaomi Redmi, and certified high-speed mobile accessories.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141820] border border-blue-500/30 space-y-2">
                <span className="text-xl">⚡</span>
                <h4 className="text-sm font-semibold text-white">Methmi Labs</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Enterprise Cloud POS suites, multi-counter retail billing, and shop reload reconciliation tools built for real Sri Lankan shops.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#D49B6A] transition-colors"
              >
                <span>Read the Complete Methmi Mobile Story</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Values & Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
              <span className="text-2xl font-mono text-[#D49B6A]">01</span>
              <h4 className="font-heading text-base font-medium text-white">100% TRCSL Approved</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every smartphone is officially registered with the TRCSL with guaranteed zero signal drop, IMEI verification & official company warranty.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
              <span className="text-2xl font-mono text-blue-400">02</span>
              <h4 className="font-heading text-base font-medium text-white">Cloud POS Software</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Offline-capable Point of Sale tills, thermal receipt printing, and real-time stock orchestration designed for Sri Lankan retail enterprises.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
              <span className="text-2xl font-mono text-amber-300">03</span>
              <h4 className="font-heading text-base font-medium text-white">Islandwide Fast Delivery</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Cash On Delivery (COD) and doorstep insured dispatch across all 25 districts, backed by shop pickup at our physical showroom.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
              <span className="text-2xl font-mono text-indigo-400">04</span>
              <h4 className="font-heading text-base font-medium text-white">Lifetime Customer Trust</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Direct owner support, authentic pricing with no hidden charges, and continuous after-sales technical care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

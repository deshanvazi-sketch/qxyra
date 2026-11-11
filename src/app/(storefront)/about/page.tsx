import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Qxyra | Where Craftsmanship Meets Digital Engineering',
  description: 'The story of Qxyra: Operating across physical streetwear & lifestyle gear (Qxyra Store) and Point of Sale & custom web systems (Qxyra Labs).',
};

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative py-28 px-6 border-b border-gray-800 bg-gradient-to-b from-[#141820] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-mono">
            <span>Discover • Desire • Deliver</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-light tracking-tight text-white">
            Where Physical Craftsmanship <br />
            <span className="text-brand-gold font-normal">Meets Digital Engineering</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Qxyra was founded by Deshan Rathnadiwakara as a unified enterprise operating across two complementary disciplines: physical high-weight lifestyle apparel &amp; peripherals, alongside high-speed commercial software &amp; web infrastructure.
          </p>
        </div>
      </section>

      {/* Dual Divisions Deep Dive */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">The Two Pillars</span>
          <h2 className="text-3xl font-heading font-light text-white">Our Architecture</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pillar 1: Store */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#141820] border border-brand-gold/30 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-3xl p-3 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 inline-block">
                🛍️
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider block">Division 01</span>
                <h3 className="text-2xl font-heading font-medium text-white">Qxyra Store</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                We believe what you wear and touch everyday should never be flimsy. Qxyra Store curates heavy 240GSM regular fit tees, 280GSM acid-washed drop-shoulder streetwear, 460GSM french terry hoodies, and solid aluminum workspace gear.
              </p>
              <ul className="space-y-2 text-xs text-gray-400 pt-2 border-t border-gray-800">
                <li>• Pre-shrunk 100% organic cottons</li>
                <li>• N52 MagSafe &amp; GaN fast charging</li>
                <li>• Worldwide tracked fulfillment</li>
              </ul>
            </div>

            <Link
              href="/store"
              className="py-3 px-6 rounded-xl bg-brand-gold text-brand-black text-xs font-semibold text-center hover:opacity-95 transition-opacity"
            >
              Explore Store →
            </Link>
          </div>

          {/* Pillar 2: Labs */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1422] border border-blue-500/30 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-3xl p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 inline-block">
                ⚡
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block">Division 02</span>
                <h3 className="text-2xl font-heading font-medium text-white">Qxyra Labs</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Modern commerce requires software that never stumbles. Qxyra Labs engineers turnkey retail Point of Sale (POS) suites, multi-till inventory engines, live forex rate converters, and high-conversion headless web storefronts.
              </p>
              <ul className="space-y-2 text-xs text-gray-400 pt-2 border-t border-gray-800">
                <li>• Offline-first checkout &amp; thermal printing</li>
                <li>• Real-time dual currency (USD / LKR)</li>
                <li>• Full IP and source code ownership</li>
              </ul>
            </div>

            <Link
              href="/labs"
              className="py-3 px-6 rounded-xl bg-blue-500 text-white text-xs font-semibold text-center hover:bg-blue-400 transition-colors"
            >
              Explore Labs →
            </Link>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 px-6 bg-black border-y border-gray-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-3xl font-heading font-light text-center text-white">
            Core Operating Principles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Density & Substance', desc: 'Heavy fabrics and rigid alloy stands. We avoid flimsy disposability.' },
              { num: '02', title: 'Latency Zero', desc: 'Sub-second software. No bloated templates or sluggish till checkouts.' },
              { num: '03', title: 'Global Parity', desc: 'Real-time multi-currency support, international tracking & secure checkout.' },
              { num: '04', title: 'Direct Stewardship', desc: 'We stand behind every garment stitch and every line of code deployed.' },
            ].map((val, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
                <span className="text-xl font-mono text-brand-gold">{val.num}</span>
                <h3 className="text-base font-medium text-white">{val.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

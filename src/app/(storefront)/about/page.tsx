import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Methmi Mobile (Pvt) Ltd | Your Trusted Mobile Partner',
  description: 'The story of Methmi Mobile (Pvt) Ltd: Sri Lanka’s premier destination for genuine TRCSL-approved smartphones (Methmi Store) and cutting-edge retail Cloud POS software solutions (Methmi Labs).',
};

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative py-28 px-6 border-b border-gray-800 bg-gradient-to-b from-[#141820] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49B6A]/10 border border-[#D49B6A]/30 text-[#D49B6A] text-xs font-mono">
            <span>Your Trusted Mobile Partner • Established in Sri Lanka</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-light tracking-tight text-white">
            Where Authentic Flagships <br />
            <span className="text-[#D49B6A] font-normal">Meet Intelligent Retail Systems</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Methmi Mobile (Pvt) Ltd was built with an uncompromising commitment to trust, genuine telecommunication standards, and technological innovation. From islandwide TRCSL smartphone distribution to cloud-connected shop POS systems, we power Sri Lanka’s mobile future.
          </p>
        </div>
      </section>

      {/* Dual Divisions Deep Dive */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D49B6A] font-mono font-medium">The Two Pillars</span>
          <h2 className="text-3xl font-heading font-light text-white">Our Architecture</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pillar 1: Store */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#141820] border border-[#D49B6A]/30 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-3xl p-3 rounded-2xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 inline-block">
                📱
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#D49B6A] uppercase tracking-wider block">Division 01</span>
                <h3 className="text-2xl font-heading font-medium text-white">Methmi Store</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                We guarantee 100% genuine brand new sealed boxes. Methmi Store curates flagship Apple iPhones, Samsung Galaxy, Tecno Camon &amp; Spark, Infinix Note &amp; Smart, and Xiaomi Redmi devices with official company warranties.
              </p>
              <ul className="space-y-2 text-xs text-gray-400 pt-2 border-t border-gray-800">
                <li>• 100% TRCSL Approved with zero network block risk</li>
                <li>• Fast MagSafe, GaN chargers &amp; certified accessories</li>
                <li>• Doorstep insured islandwide Cash on Delivery</li>
              </ul>
            </div>

            <Link
              href="/store"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#D49B6A] to-[#e2ac7e] text-black text-xs font-semibold text-center hover:opacity-95 transition-opacity"
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
                <h3 className="text-2xl font-heading font-medium text-white">Methmi Labs</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Modern commerce demands software that never halts. Methmi Labs engineers cloud and offline-first Point of Sale (POS) suites, multi-counter shop billing, barcode synchronizers, and real-time reload trackers for Sri Lankan retailers.
              </p>
              <ul className="space-y-2 text-xs text-gray-400 pt-2 border-t border-gray-800">
                <li>• Offline-first checkout &amp; thermal receipt printing</li>
                <li>• Multi-counter shop inventory &amp; profit tracking</li>
                <li>• Dedicated on-site &amp; remote support team</li>
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
              { num: '01', title: '100% Genuine TRCSL', desc: 'No grey-market counterfeits or blocked devices. Every handset carries full legal approval.' },
              { num: '02', title: 'Zero Latency POS', desc: 'High-speed cloud and offline point of sale systems ensuring uninterrupted retail sales.' },
              { num: '03', title: 'Islandwide Reach', desc: 'Trusted doorstep delivery across all 25 districts, backed by our physical showroom.' },
              { num: '04', title: 'Customer First', desc: 'Direct owner accountability, transparent warranty claims, and friendly after-sales care.' },
            ].map((val, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#121620] border border-gray-800 space-y-3">
                <span className="text-xl font-mono text-[#D49B6A]">{val.num}</span>
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

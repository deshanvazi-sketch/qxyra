import Link from 'next/link';
import Image from 'next/image';

export function PromoBar() {
  return (
    <section className="py-16 md:py-0 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(212,155,106,0.06)_50%,transparent_75%,transparent_100%)] bg-[length:100px_100px]" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center min-h-[460px]">
        {/* Left Side: Copy & CTA */}
        <div className="w-full md:w-1/2 md:pr-12 py-12 relative z-10 text-center md:text-left">
          <p className="text-[#D49B6A] font-semibold uppercase tracking-wider mb-2 text-xs font-mono">
            Official TRCSL Flagship Stock
          </p>
          <h2 className="text-4xl md:text-5xl font-heading text-brand-white font-bold mb-6">
            Apple &amp; Samsung 2026 Collection
          </h2>
          <p className="text-brand-gray-300 font-body mb-8 max-w-md mx-auto md:mx-0 leading-relaxed text-sm">
            Discover brand new sealed flagship smartphones. 100% TRCSL registered with zero signal drop risk, official company warranty, and islandwide insured delivery from Methmi Mobile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link 
              href="/store/phones" 
              className="inline-block px-8 py-3.5 bg-[#D49B6A] text-black font-semibold rounded-xl hover:bg-[#e2ac7e] transition-all shadow-md text-sm"
            >
              Explore Smartphones
            </Link>
            <Link 
              href="/deals" 
              className="inline-block px-8 py-3.5 bg-transparent border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all text-sm"
            >
              View Hot Deals
            </Link>
          </div>
        </div>

        {/* Right Side: Official METHMI MOBILE Brand 3D Showcase */}
        <div className="w-full md:w-1/2 py-8 md:py-12 flex items-center justify-center relative">
          {/* Ambient Glow */}
          <div className="absolute w-80 h-80 bg-gradient-to-tr from-[#D49B6A]/25 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Logo Showcase Card */}
          <div className="relative z-10 p-4 sm:p-6 rounded-3xl bg-white shadow-2xl group hover:scale-[1.02] transition-all duration-500 max-w-sm">
            <Image
              src="/methmi-logo.jpg"
              alt="Methmi Mobile (Pvt) Ltd Official Brand"
              width={380}
              height={380}
              priority
              className="rounded-2xl object-contain shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

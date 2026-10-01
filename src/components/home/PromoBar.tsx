import Link from 'next/link';
import Image from 'next/image';

export function PromoBar() {
  return (
    <section className="py-16 md:py-0 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(201,168,76,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:100px_100px]" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center min-h-[460px]">
        {/* Left Side: Copy & CTA */}
        <div className="w-full md:w-1/2 md:pr-12 py-12 relative z-10 text-center md:text-left">
          <p className="text-brand-gold font-semibold uppercase tracking-wider mb-2 text-xs">
            Limited Time Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-heading text-brand-white font-bold mb-6">
            Summer Collection 2026
          </h2>
          <p className="text-brand-gray-300 font-body mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Discover our newest arrivals. Premium materials, world-class design, and exceptional comfort. 
            Elevate your wardrobe and lifestyle with Qxyra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link 
              href="/shop" 
              className="inline-block px-8 py-3.5 bg-brand-white text-brand-black font-semibold rounded hover:bg-brand-gold hover:text-brand-black transition-all shadow-md text-sm"
            >
              Explore Summer
            </Link>
            <Link 
              href="/deals" 
              className="inline-block px-8 py-3.5 bg-transparent border border-white/20 text-white font-medium rounded hover:bg-white/10 transition-all text-sm"
            >
              View Hot Deals
            </Link>
          </div>
        </div>

        {/* Right Side: Official QXYRA Brand Logo Showcase */}
        <div className="w-full md:w-1/2 py-8 md:py-12 flex items-center justify-center relative">
          {/* Ambient Glow */}
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-red-600/15 via-brand-gold/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Logo Showcase Card */}
          <div className="relative z-10 p-4 rounded-3xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-sm group hover:border-red-500/30 transition-all duration-500">
            <Image
              src="/logo.jpg"
              alt="Qxyra Official Brand Identity"
              width={340}
              height={340}
              priority
              className="rounded-2xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

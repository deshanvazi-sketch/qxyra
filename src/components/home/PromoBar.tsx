import Link from 'next/link';

export function PromoBar() {
  return (
    <section className="py-16 md:py-0 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(201,168,76,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:100px_100px]" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center min-h-[400px]">
        <div className="w-full md:w-1/2 md:pr-12 py-12 relative z-10 text-center md:text-left">
          <p className="text-brand-gold font-semibold uppercase tracking-wider mb-2">Limited Time Offer</p>
          <h2 className="text-4xl md:text-5xl font-heading text-brand-white font-bold mb-6">
            Summer Collection 2026
          </h2>
          <p className="text-brand-gray-300 font-body mb-8 max-w-md mx-auto md:mx-0">
            Discover our newest arrivals. Premium materials, world-class design, and exceptional comfort. 
            Elevate your wardrobe with Qxyra.
          </p>
          <Link 
            href="/collection/summer" 
            className="inline-block px-8 py-4 bg-brand-white text-brand-black font-semibold rounded hover:bg-brand-gray-50 transition-colors"
          >
            Explore Summer
          </Link>
        </div>
        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-gradient-to-bl from-zinc-800 to-brand-black relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-[12rem] text-brand-gold font-heading font-black tracking-tighter mix-blend-overlay">Q</span>
          </div>
        </div>
      </div>
    </section>
  );
}

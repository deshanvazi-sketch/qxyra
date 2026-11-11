import { Metadata } from 'next';
import Link from 'next/link';
import { StoreCatalog } from '@/components/store/StoreCatalog';

export const metadata: Metadata = {
  title: 'Qxyra Store | Premium Streetwear, Hoodies & Lifestyle Accessories',
  description: 'Explore curated heavyweight regular fit tees, oversized streetwear, 460GSM hoodies, MagSafe charging & computer docking stations.',
};

export default function StorePage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Store Header Banner */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#141820] via-black to-[#141820] border border-brand-gold/30 shadow-2xl overflow-hidden space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Division 01 • Official Storefront
            </span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-heading font-light text-white tracking-tight leading-tight">
              QXYRA <span className="text-brand-gold font-normal">STORE</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              Heavyweight architectural apparel and precision workspace accessories. Explore our full catalog or browse by department below.
            </p>
          </div>

          {/* Quick Department Jump */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/store/fashion"
              className="px-5 py-2.5 rounded-xl bg-brand-gold text-brand-black text-xs font-semibold hover:opacity-95 transition-opacity flex items-center gap-2"
            >
              <span>👕</span>
              <span>Fashion Collection (Tees & Hoodies)</span>
            </Link>
            <Link
              href="/store/accessories"
              className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/90 border border-gray-700 hover:border-brand-gold text-white text-xs font-medium transition-all flex items-center gap-2"
            >
              <span>📱</span>
              <span>Tech Accessories (Mobile & PC)</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Store Catalog */}
        <StoreCatalog />
      </div>
    </div>
  );
}

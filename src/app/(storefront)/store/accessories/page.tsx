import { Metadata } from 'next';
import Link from 'next/link';
import { AccessoriesCatalog } from '@/components/store/AccessoriesCatalog';

export const metadata: Metadata = {
  title: 'Tech & Mobile Accessories | Methmi Mobile Store',
  description: 'Original GaN fast chargers, braided Type-C cables, earbuds, tempered glass, and phone accessories in Sri Lanka with official warranty.',
};

export default function AccessoriesCategoryPage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/store" className="hover:text-white transition-colors">Store</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-brand-gold">Accessories</span>
        </nav>

        {/* Category Hero */}
        <div className="p-5 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141820] to-black border border-brand-gold/30 shadow-2xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Department 02
            </span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-heading font-light text-white tracking-tight">
            Original Mobile &amp; Tech <span className="text-brand-gold font-normal">Accessories</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-light">
            Genuine GaN high-speed chargers, Type-C braided cables, wireless earbuds, scratch-resistant tempered glass, and mobile gear with warranty.
          </p>
        </div>

        {/* Client-Connected Accessories Catalog */}
        <AccessoriesCatalog />
      </div>
    </div>
  );
}

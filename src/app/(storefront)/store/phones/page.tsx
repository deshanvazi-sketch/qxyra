import { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { SubCategoryGrid } from '@/components/store/SubCategoryGrid';

export const metadata: Metadata = {
  title: 'Smartphones | Vivo, Infinix, Tecno | Methmi Mobile Store',
  description: '100% Genuine TRCSL-approved Vivo, Infinix & Tecno smartphones with official 1-Year Company Warranty in Sri Lanka.',
};

export default function PhonesCategoryPage() {
  const phoneProducts = products.filter((p) =>
    ['vivo', 'tecno-infinix', 'phones'].includes(p.categoryId)
  );

  const subcategories = [
    {
      id: 'vivo',
      name: 'Vivo',
      slug: 'vivo',
      href: '/store/phones/vivo',
      count: products.filter((p) => p.categoryId === 'vivo').length,
    },
    {
      id: 'infinix',
      name: 'Infinix',
      slug: 'infinix',
      href: '/store/phones/infinix',
      count: products.filter((p) => p.categoryId === 'tecno-infinix' && p.name.toLowerCase().includes('infinix')).length,
    },
    {
      id: 'tecno',
      name: 'Tecno',
      slug: 'tecno',
      href: '/store/phones/tecno',
      count: products.filter((p) => p.categoryId === 'tecno-infinix' && p.name.toLowerCase().includes('tecno')).length,
    },
    {
      id: 'tecno-infinix',
      name: 'Tecno & Infinix',
      slug: 'tecno-infinix',
      href: '/store/phones/tecno-infinix',
      count: products.filter((p) => p.categoryId === 'tecno-infinix').length,
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/store" className="hover:text-white transition-colors">Store</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-brand-gold">Smartphones</span>
        </nav>

        {/* Category Hero */}
        <div className="p-5 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141820] to-black border border-brand-gold/30 shadow-2xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              100% Genuine TRCSL Approved
            </span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-heading font-light text-white tracking-tight">
            Flagship & Budget <span className="text-brand-gold font-normal">Smartphones</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-light">
            Explore brand new sealed Vivo, Infinix, and Tecno smartphones with 1-Year Official Company Warranty, TRCSL approval, and fast islandwide delivery.
          </p>
        </div>

        {/* Sub-Category Navigation Bar */}
        <SubCategoryGrid
          parentName="Smartphones"
          parentHref="/store/phones"
          items={subcategories}
        />

        {/* Product Grid */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3">
            <span>Showing All Official Smartphones</span>
            <span className="font-mono text-brand-gold">{phoneProducts.length} Models Available</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {phoneProducts.map((product) => {
              let catLabel = 'Smartphone';
              if (product.categoryId === 'vivo') catLabel = 'Vivo';
              else if (product.name.toLowerCase().includes('infinix')) catLabel = 'Infinix';
              else if (product.name.toLowerCase().includes('tecno')) catLabel = 'Tecno';

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={catLabel}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

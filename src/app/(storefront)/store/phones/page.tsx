import { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { SubCategoryGrid } from '@/components/store/SubCategoryGrid';

export const metadata: Metadata = {
  title: 'Smartphones | Apple, Samsung, Tecno, Infinix, Redmi | Methmi Mobile Store',
  description: '100% Genuine TRCSL-approved Apple iPhones, Samsung Galaxy, Tecno, Infinix & Xiaomi Redmi with official company warranty in Sri Lanka.',
};

export default function PhonesCategoryPage() {
  const phoneProducts = products.filter((p) =>
    ['apple', 'samsung', 'tecno-infinix', 'redmi', 'phones'].includes(p.categoryId)
  );

  const subcategories = [
    {
      id: 'apple',
      name: 'Apple iPhone',
      slug: 'apple',
      href: '/store/phones/apple',
      count: products.filter((p) => p.categoryId === 'apple').length,
    },
    {
      id: 'samsung',
      name: 'Samsung Galaxy',
      slug: 'samsung',
      href: '/store/phones/samsung',
      count: products.filter((p) => p.categoryId === 'samsung').length,
    },
    {
      id: 'tecno-infinix',
      name: 'Tecno & Infinix',
      slug: 'tecno-infinix',
      href: '/store/phones/tecno-infinix',
      count: products.filter((p) => p.categoryId === 'tecno-infinix').length,
    },
    {
      id: 'redmi',
      name: 'Xiaomi Redmi',
      slug: 'redmi',
      href: '/store/phones/redmi',
      count: products.filter((p) => p.categoryId === 'redmi').length,
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
            Flagship <span className="text-brand-gold font-normal">Smartphones</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-light">
            Sri Lanka’s premier authorized smartphone showroom. Explore sealed Apple iPhones with Apple Care, Samsung Galaxy flagship S-series, Tecno Camon camera phones, Infinix Note series, and Xiaomi Redmi devices with official company warranty.
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
              if (product.categoryId === 'apple') catLabel = 'Apple iPhone';
              else if (product.categoryId === 'samsung') catLabel = 'Samsung Galaxy';
              else if (product.categoryId === 'tecno-infinix') catLabel = 'Tecno / Infinix';
              else if (product.categoryId === 'redmi') catLabel = 'Xiaomi Redmi';

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

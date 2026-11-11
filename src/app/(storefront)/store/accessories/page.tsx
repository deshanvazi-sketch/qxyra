import { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { SubCategoryGrid } from '@/components/store/SubCategoryGrid';

export const metadata: Metadata = {
  title: 'Tech Accessories | Mobile & Computer Peripherals | Qxyra Store',
  description: 'Precision engineered MagSafe wireless stands, 65W GaN fast chargers, Kevlar cables, CNC aluminum laptop elevators and 4K USB-C docks.',
};

export default function AccessoriesCategoryPage() {
  const accessoryProducts = products.filter((p) =>
    ['mobile', 'computer'].includes(p.categoryId)
  );

  const subcategories = [
    {
      id: 'mobile',
      name: 'Mobile Accessories',
      slug: 'mobile',
      href: '/store/accessories/mobile',
      count: products.filter((p) => p.categoryId === 'mobile').length,
    },
    {
      id: 'computer',
      name: 'Computer Accessories',
      slug: 'computer',
      href: '/store/accessories/computer',
      count: products.filter((p) => p.categoryId === 'computer').length,
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/store" className="hover:text-white transition-colors">Store</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-brand-gold">Accessories</span>
        </nav>

        {/* Category Hero */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141820] to-black border border-brand-gold/30 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Department 02
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-light text-white tracking-tight">
            Tech <span className="text-brand-gold font-normal">Accessories</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl leading-relaxed font-light">
            Minimalist workspace tools, high-speed GaN gallium nitride charging, Kevlar ballistic cables, and sandblasted aluminum ergonomics.
          </p>
        </div>

        {/* Sub-Category Navigation Bar */}
        <SubCategoryGrid
          parentName="Accessories"
          parentHref="/store/accessories"
          items={subcategories}
        />

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3">
            <span>Showing All Tech Accessories</span>
            <span className="font-mono text-brand-gold">{accessoryProducts.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessoryProducts.map((product) => {
              let catLabel = 'Accessories';
              if (product.categoryId === 'mobile') catLabel = 'Mobile Gear';
              else if (product.categoryId === 'computer') catLabel = 'Computer Gear';

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

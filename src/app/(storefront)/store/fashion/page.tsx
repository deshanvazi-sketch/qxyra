import { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { SubCategoryGrid } from '@/components/store/SubCategoryGrid';

export const metadata: Metadata = {
  title: 'Fashion Collection | Regular Fit, Oversized Tees & Hoodies | Qxyra Store',
  description: 'Precision-tailored streetwear, 240GSM regular fit tees, 280GSM heavy oversized tees, and 460GSM french terry hoodies.',
};

export default function FashionCategoryPage() {
  const fashionProducts = products.filter((p) =>
    ['regular-fit-tee', 'oversized-tee', 'hoodie'].includes(p.categoryId)
  );

  const subcategories = [
    {
      id: 'regular-fit-tee',
      name: 'Regular Fit Tee',
      slug: 'regular-fit-tee',
      href: '/store/fashion/regular-fit-tee',
      count: products.filter((p) => p.categoryId === 'regular-fit-tee').length,
    },
    {
      id: 'oversized-tee',
      name: 'Oversized Tee',
      slug: 'oversized-tee',
      href: '/store/fashion/oversized-tee',
      count: products.filter((p) => p.categoryId === 'oversized-tee').length,
    },
    {
      id: 'hoodie',
      name: 'Hoodie',
      slug: 'hoodie',
      href: '/store/fashion/hoodie',
      count: products.filter((p) => p.categoryId === 'hoodie').length,
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
          <span className="text-brand-gold">Fashion</span>
        </nav>

        {/* Category Hero */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141820] to-black border border-brand-gold/30 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Department 01
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-light text-white tracking-tight">
            Fashion <span className="text-brand-gold font-normal">Collection</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl leading-relaxed font-light">
            Architectural cuts, pre-shrunk organic cottons, and structured double-needle finishes across regular fit tees, oversized streetwear, and luxury hoodies.
          </p>
        </div>

        {/* Sub-Category Navigation Bar */}
        <SubCategoryGrid
          parentName="Fashion"
          parentHref="/store/fashion"
          items={subcategories}
        />

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3">
            <span>Showing All Fashion Pieces</span>
            <span className="font-mono text-brand-gold">{fashionProducts.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fashionProducts.map((product) => {
              let catLabel = 'Fashion';
              if (product.categoryId === 'regular-fit-tee') catLabel = 'Regular Fit Tee';
              else if (product.categoryId === 'oversized-tee') catLabel = 'Oversized Tee';
              else if (product.categoryId === 'hoodie') catLabel = 'Hoodie';

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

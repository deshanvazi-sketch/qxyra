'use client';

import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';

const featuredProducts = products.filter((p) => p.isFeatured ?? true).slice(0, 8);

export function FeaturedProducts() {
  return (
    <section className="py-20 px-4 md:px-8 bg-brand-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-brand-black font-bold">
            Featured Products
          </h2>
          <a href="/shop" className="text-brand-gold font-semibold hover:underline hidden sm:block">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
          <a href="/products" className="inline-block px-6 py-3 border border-brand-black text-brand-black font-semibold rounded hover:bg-brand-black hover:text-brand-white transition-colors">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}

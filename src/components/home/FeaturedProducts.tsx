'use client';

import { useState, useEffect } from 'react';
import { products as defaultProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';
import Link from 'next/link';

export function FeaturedProducts() {
  const [items, setItems] = useState<Product[]>(() => {
    return defaultProducts.filter((p) => p.isFeatured ?? true).slice(0, 8);
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('methmi_products_list_v2') || localStorage.getItem('methmi_products_list') || localStorage.getItem('methmi mobile_products_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        const list: Product[] = Array.isArray(parsed) ? parsed : parsed?.state?.products || [];
        if (list.length > 0) {
          setItems(list.filter((p) => (p.isFeatured ?? true) && p.isActive).slice(0, 8));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section className="py-12 sm:py-20 px-4 md:px-8 bg-brand-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <span className="text-xs uppercase text-brand-gold font-semibold tracking-widest block mb-1">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading text-brand-black font-bold">
              Featured Products
            </h2>
          </div>
          <Link href="/store" className="text-brand-gold font-semibold hover:underline hidden sm:block text-sm">
            View All →
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/60 p-8 shadow-sm">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-lg font-heading text-brand-black font-semibold">New Collection Coming Soon</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Our catalog is being updated with authentic luxury releases.
            </p>
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link href="/store" className="inline-block px-6 py-3 border border-brand-black text-brand-black font-semibold rounded hover:bg-brand-black hover:text-brand-white transition-colors text-sm">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

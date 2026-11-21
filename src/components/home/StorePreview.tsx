'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { useProductStore } from '@/store/productStore';

export function StorePreview() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'phones' | 'accessories' | 'fashion'>('all');
  const products = useProductStore((s) => s.products);

  const filteredProducts = products.filter((p) => {
    if (!p.isActive) return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'phones') {
      return ['apple', 'samsung', 'vivo', 'tecno-infinix', 'redmi', 'phones'].includes(p.categoryId);
    }
    if (activeCategory === 'accessories') {
      return ['mobile', 'computer'].includes(p.categoryId);
    }
    if (activeCategory === 'fashion') {
      return ['regular-fit-tee', 'oversized-tee', 'hoodie'].includes(p.categoryId);
    }
    return true;
  }).slice(0, 8);

  const phoneCount = products.filter((p) => ['apple', 'samsung', 'vivo', 'tecno-infinix', 'redmi', 'phones'].includes(p.categoryId)).length;
  const accessoryCount = products.filter((p) => ['mobile', 'computer'].includes(p.categoryId)).length;
  const fashionCount = products.filter((p) => ['regular-fit-tee', 'oversized-tee', 'hoodie'].includes(p.categoryId)).length;

  return (
    <section className="py-12 sm:py-20 bg-[#0A0A0A] border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
                Division 01 • Official Store
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-light text-white tracking-wide">
              Methmi Mobile <span className="font-normal text-brand-gold">Flagship</span> Collection
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl">
              100% Genuine TRCSL-approved Apple iPhones, Samsung Galaxy, Tecno, Infinix, high-speed mobile power, and curated lifestyle apparel.
            </p>
          </div>

          {/* Filter Pills - Horizontally scrollable on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#141820] p-1.5 rounded-xl border border-gray-800 overflow-x-auto no-scrollbar max-w-full flex-nowrap md:flex-wrap self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-brand-gold text-brand-black shadow-md font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory('phones')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'phones'
                  ? 'bg-brand-gold text-brand-black shadow-md font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱 Phones ({phoneCount})
            </button>
            <button
              onClick={() => setActiveCategory('accessories')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'accessories'
                  ? 'bg-brand-gold text-brand-black shadow-md font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ⚡ Accessories ({accessoryCount})
            </button>
            <button
              onClick={() => setActiveCategory('fashion')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'fashion'
                  ? 'bg-brand-gold text-brand-black shadow-md font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👕 Apparel ({fashionCount})
            </button>
          </div>
        </div>

        {/* Product Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => {
            let catLabel = 'Product';
            if (product.categoryId === 'apple') catLabel = 'Apple iPhone';
            else if (product.categoryId === 'samsung') catLabel = 'Samsung Galaxy';
            else if (product.categoryId === 'vivo') catLabel = 'Vivo';
            else if (product.categoryId === 'tecno-infinix') catLabel = 'Tecno / Infinix';
            else if (product.categoryId === 'redmi') catLabel = 'Xiaomi Redmi';
            else if (product.categoryId === 'regular-fit-tee') catLabel = 'Regular Fit Tee';
            else if (product.categoryId === 'oversized-tee') catLabel = 'Oversized Tee';
            else if (product.categoryId === 'hoodie') catLabel = 'Hoodie';
            else if (product.categoryId === 'mobile') catLabel = 'Mobile Gear';
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

        {/* Bottom CTA Banner */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#141820] border border-brand-gold/20">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-base font-medium text-white">Looking for the full drop?</h4>
            <p className="text-gray-400 text-xs">Explore all tees, heavy winter hoodies, MagSafe charging & computer docking stations.</p>
          </div>
          <Link
            href="/store"
            className="px-6 py-2.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>View Full Store Catalog</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

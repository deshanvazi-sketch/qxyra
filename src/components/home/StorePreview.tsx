'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { useProductStore } from '@/store/productStore';

export function StorePreview() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'vivo' | 'infinix' | 'tecno'>('all');
  const products = useProductStore((s) => s.products);

  const filteredProducts = products.filter((p) => {
    if (!p.isActive) return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'vivo') return p.categoryId === 'vivo';
    if (activeCategory === 'infinix') return p.name.toLowerCase().includes('infinix');
    if (activeCategory === 'tecno') return p.name.toLowerCase().includes('tecno');
    return true;
  });

  const vivoCount = products.filter((p) => p.categoryId === 'vivo').length;
  const infinixCount = products.filter((p) => p.name.toLowerCase().includes('infinix')).length;
  const tecnoCount = products.filter((p) => p.name.toLowerCase().includes('tecno')).length;

  return (
    <section className="py-12 sm:py-20 bg-[#0A0A0A] border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
                Official Smartphone Collection
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-light text-white tracking-wide">
              Methmi Mobile <span className="font-normal text-brand-gold">Flagship</span> Collection
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl">
              100% Genuine TRCSL-approved Vivo, Infinix, and Tecno smartphones with 1-Year Official Company Warranty and fast islandwide delivery.
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
              All Phones ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory('vivo')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'vivo'
                  ? 'bg-brand-gold text-brand-black shadow-md font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱 Vivo ({vivoCount})
            </button>
            <button
              onClick={() => setActiveCategory('infinix')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'infinix'
                  ? 'bg-brand-gold text-brand-black shadow-md font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ⚡ Infinix ({infinixCount})
            </button>
            <button
              onClick={() => setActiveCategory('tecno')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'tecno'
                  ? 'bg-brand-gold text-brand-black shadow-md font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📸 Tecno ({tecnoCount})
            </button>
          </div>
        </div>

        {/* Product Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => {
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

        {/* Bottom CTA Banner */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#141820] border border-brand-gold/20">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-base font-medium text-white">Looking for the full catalog?</h4>
            <p className="text-gray-400 text-xs">Explore all Vivo, Infinix, and Tecno smartphone series with official 1-Year Company Warranty.</p>
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

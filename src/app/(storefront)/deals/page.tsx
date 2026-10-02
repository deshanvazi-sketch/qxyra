'use client';

import { useState, useEffect } from 'react';
import { products as defaultProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';
import Link from 'next/link';

export default function DealsPage() {
  const [productsList, setProductsList] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('qxyra_products_list');
      if (saved) {
        setProductsList(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saleProducts = productsList.filter(p => p.isActive && p.salePrice && p.salePrice < p.basePrice);

  return (
    <div className="bg-white pb-20">
      {/* Hero Banner */}
      <section className="bg-brand-black text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold via-brand-black to-brand-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-brand-gold uppercase tracking-wider">
            Hot Deals
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover exceptional savings on curated collections. Limited time offers and seasonal promotions.
          </p>
          
          {/* Static Timer */}
          <div className="flex justify-center gap-4 text-center">
            {[
              { label: 'Days', val: '02' },
              { label: 'Hours', val: '14' },
              { label: 'Mins', val: '45' },
              { label: 'Secs', val: '30' },
            ].map((unit, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 w-24">
                <div className="text-3xl font-bold text-brand-gold mb-1">{unit.val}</div>
                <div className="text-xs uppercase text-gray-400 tracking-wider">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold">Flash Sale & Promotions</h2>
            <p className="text-gray-500 mt-2">Special promotional pricing on selected items</p>
          </div>
        </div>

        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8">
            <span className="text-4xl block mb-3">🏷️</span>
            <h3 className="font-heading text-lg font-medium text-brand-black mb-1">No Active Flash Deals</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Exclusive promotional items and discounts will appear here once added to inventory.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-brand-gold text-brand-black font-semibold text-xs rounded-xl hover:opacity-90 transition-all"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-brand-black rounded-3xl p-12 text-center text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-800">
          <div className="text-left max-w-xl">
            <h3 className="text-3xl font-heading font-bold mb-4 text-brand-gold">VIP Member Exclusive</h3>
            <p className="text-gray-300">Sign up for our newsletter to receive an additional 10% off all sale items, early access to new drops, and exclusive rewards.</p>
          </div>
          <div className="w-full md:w-auto flex-shrink-0">
            <Link href="/register" className="inline-block bg-brand-gold text-brand-black px-8 py-4 rounded-full font-bold hover:bg-white transition-colors w-full md:w-auto text-center">
              Join VIP Club
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

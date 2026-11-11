'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/product/ProductCard';
import { StoreCategoryCard } from '@/components/store/StoreCategoryCard';
import { products as fallbackProducts } from '@/lib/mock-data';

export function StoreCatalog() {
  const storeProducts = useProductStore((s) => s.products);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeProducts = (mounted ? storeProducts : fallbackProducts).filter((p) => p.isActive);

  const fashionProducts = activeProducts.filter((p) =>
    ['regular-fit-tee', 'oversized-tee', 'hoodie'].includes(p.categoryId)
  );

  const accessoryProducts = activeProducts.filter((p) =>
    ['mobile', 'computer'].includes(p.categoryId)
  );

  return (
    <>
      {/* Department Feature Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StoreCategoryCard
          title="Fashion"
          subtitle="240GSM regular fit tees, 280GSM oversized drop-shoulder cuts, and 460GSM french terry hoodies."
          href="/store/fashion"
          image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000"
          itemCount={fashionProducts.length}
          subcategories={[
            { name: 'Regular Fit Tee', href: '/store/fashion/regular-fit-tee' },
            { name: 'Oversized Tee', href: '/store/fashion/oversized-tee' },
            { name: 'Hoodie', href: '/store/fashion/hoodie' },
          ]}
        />

        <StoreCategoryCard
          title="Accessories"
          subtitle="MagSafe leather stands, 65W GaN charging, Kevlar cables, and CNC aluminum desktop elevators."
          href="/store/accessories"
          image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000"
          itemCount={accessoryProducts.length}
          subcategories={[
            { name: 'Mobile Accessories', href: '/store/accessories/mobile' },
            { name: 'Computer Accessories', href: '/store/accessories/computer' },
          ]}
        />
      </div>

      {/* All Products Grid */}
      <div className="space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-medium text-white">
              All Store Products ({activeProducts.length})
            </h2>
            <p className="text-gray-400 text-xs mt-1">Filtered by curated launch order</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Showing:</span>
            <span className="font-mono text-brand-gold">{activeProducts.length} Items</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeProducts.map((product) => {
            let catLabel = 'Product';
            if (product.categoryId === 'regular-fit-tee') catLabel = 'Regular Fit Tee';
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
      </div>
    </>
  );
}

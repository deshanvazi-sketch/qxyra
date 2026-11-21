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

  const vivoProducts = activeProducts.filter((p) => p.categoryId === 'vivo');
  const infinixProducts = activeProducts.filter((p) => p.name.toLowerCase().includes('infinix'));
  const tecnoProducts = activeProducts.filter((p) => p.name.toLowerCase().includes('tecno'));

  return (
    <>
      {/* Brand Feature Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StoreCategoryCard
          title="Vivo Smartphones"
          subtitle="100% genuine TRCSL-approved Vivo Y-series smartphones with 1-Year Official Company Warranty."
          href="/store/phones/vivo"
          image="/products/vivo-y05-summit-platinum.jpg"
          itemCount={vivoProducts.length}
          subcategories={[
            { name: 'Vivo Y05', href: '/store/vivo-y05' },
            { name: 'Vivo Y11D', href: '/store/vivo-y11d' },
            { name: 'Vivo Y31D', href: '/store/vivo-y31d' },
          ]}
        />

        <StoreCategoryCard
          title="Infinix Smartphones"
          subtitle="Flagship Note 60 Pro 5G, Hot 70, and Smart 20 series with 100W FastCharge and TRCSL approval."
          href="/store/phones/infinix"
          image="/products/infinix-note-60-pro-solar-orange.jpg"
          itemCount={infinixProducts.length}
          subcategories={[
            { name: 'Infinix Note 60 Pro', href: '/store/infinix-note-60-pro' },
            { name: 'Infinix Hot 70', href: '/store/infinix-hot-70' },
            { name: 'Infinix Smart 20', href: '/store/infinix-smart-20' },
          ]}
        />

        <StoreCategoryCard
          title="Tecno Smartphones"
          subtitle="Flagship mobile photography with Tecno Camon 50 Pro 5G and official local warranty."
          href="/store/phones/tecno"
          image="/products/tecno-camon-50-pro-malachite-green.jpg"
          itemCount={tecnoProducts.length}
          subcategories={[
            { name: 'Tecno Camon 50 Pro', href: '/store/tecno-camon-50-pro' },
            { name: 'All Tecno Models', href: '/store/phones/tecno' },
          ]}
        />
      </div>

      {/* All Products Grid */}
      <div className="space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-medium text-white">
              All Available Smartphones ({activeProducts.length})
            </h2>
            <p className="text-gray-400 text-xs mt-1">100% Genuine TRCSL Approved Brand New Sealed Packs</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Showing:</span>
            <span className="font-mono text-brand-gold">{activeProducts.length} In-Stock</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {activeProducts.map((product) => {
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
    </>
  );
}

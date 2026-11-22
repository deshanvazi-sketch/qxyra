'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/product/ProductCard';
import { products as fallbackProducts } from '@/lib/mock-data';
import { SubCategoryGrid } from '@/components/store/SubCategoryGrid';

interface AccessoriesCatalogProps {
  categoryId?: string;
}

export function AccessoriesCatalog({ categoryId }: AccessoriesCatalogProps) {
  const storeProducts = useProductStore((s) => s.products);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allProducts = mounted ? storeProducts : fallbackProducts;
  const accessoryProducts = allProducts.filter((p) => {
    if (!p.isActive) return false;
    if (categoryId) {
      return p.categoryId === categoryId;
    }
    return ['mobile', 'computer', 'audio-desk'].includes(p.categoryId);
  });

  const subcategories = [
    {
      id: 'mobile',
      name: 'Mobile Accessories',
      slug: 'mobile',
      href: '/store/accessories/mobile',
      count: allProducts.filter((p) => p.categoryId === 'mobile' && p.isActive).length,
    },
    {
      id: 'computer',
      name: 'Computer Accessories',
      slug: 'computer',
      href: '/store/accessories/computer',
      count: allProducts.filter((p) => p.categoryId === 'computer' && p.isActive).length,
    },
  ];

  return (
    <>
      {/* Sub-Category Navigation Bar */}
      <SubCategoryGrid
        parentName="Accessories"
        parentHref="/store/accessories"
        items={subcategories}
      />

      {/* Product Grid */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3">
          <span>
            {categoryId === 'mobile'
              ? 'Showing Mobile Accessories'
              : categoryId === 'computer'
              ? 'Showing Computer Accessories'
              : 'Showing All Tech & Mobile Accessories'}
          </span>
          <span className="font-mono text-brand-gold">{accessoryProducts.length} Items</span>
        </div>

        {accessoryProducts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#141820] border border-gray-800 text-gray-400 space-y-3">
            <span className="text-4xl block">🔌</span>
            <h3 className="text-lg font-heading font-medium text-white">Stock Updating</h3>
            <p className="text-xs max-w-md mx-auto text-gray-400">
              New stock for this category is currently being registered. Check back shortly or contact our showroom hotline!
            </p>
            <div className="pt-2 flex gap-3 justify-center">
              <Link
                href="/store/accessories"
                className="inline-block px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
              >
                All Accessories
              </Link>
              <Link
                href="/store/phones"
                className="inline-block px-5 py-2.5 rounded-xl bg-brand-gold text-brand-black text-xs font-semibold hover:opacity-95"
              >
                Smartphones →
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
        )}
      </div>
    </>
  );
}

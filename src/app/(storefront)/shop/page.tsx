'use client';

import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/layout';
import { ProductFilters, ProductGrid, ProductSort } from '@/components/product';
import { products as initialProducts, categories } from '@/lib/mock-data';
import { FilterState, SortOption } from '@/types';

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({});
  const [sort, setSort] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (filters.category) {
      result = result.filter(p => p.categoryId === filters.category);
    }
    if (filters.minPrice !== undefined) {
      result = result.filter(p => (p.salePrice || p.basePrice) >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(p => (p.salePrice || p.basePrice) <= filters.maxPrice!);
    }
    if (filters.inStock) {
      result = result.filter(p => p.variants.some(v => v.stock > 0));
    }

    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.totalSold - a.totalSold);
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }]} />
      
      <div className="mt-8 mb-12">
        <h1 className="font-heading text-4xl font-medium text-brand-black">All Products</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <ProductFilters 
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
        />
        
        <div className="flex-1">
          <ProductSort 
            totalProducts={filteredProducts.length}
            sort={sort}
            onSortChange={setSort}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onMobileFiltersClick={() => setIsMobileFiltersOpen(true)}
          />
          
          <ProductGrid 
            products={filteredProducts}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
}

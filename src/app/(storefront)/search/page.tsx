'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/layout';
import { ProductGrid, ProductSort } from '@/components/product';
import { products as initialProducts } from '@/lib/mock-data';
import { SortOption } from '@/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [sort, setSort] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase())
    );

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
  }, [query, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search', href: `/search?q=${query}` }]} />
      
      <div className="mt-8 mb-12">
        <h1 className="font-heading text-4xl font-medium text-brand-black">
          Search results for "{query}"
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        <ProductSort 
          totalProducts={filteredProducts.length}
          sort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onMobileFiltersClick={() => {}}
        />
        
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-brand-gray-50 rounded border border-brand-gray-100 text-center">
            <span className="text-4xl mb-4 text-brand-gray-300">🔍</span>
            <h3 className="font-heading text-xl font-medium text-brand-black mb-2">
              No products found for "{query}"
            </h3>
            <p className="text-brand-gray-500 max-w-md">
              Try checking your spelling or using more general terms.
            </p>
          </div>
        ) : (
          <ProductGrid 
            products={filteredProducts}
            viewMode={viewMode}
          />
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-brand-gray-500">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}

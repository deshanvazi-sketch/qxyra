'use client';

import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-brand-gray-50 rounded border border-brand-gray-100 text-center">
        <span className="text-4xl mb-4 text-brand-gray-300">📦</span>
        <h3 className="font-heading text-xl font-medium text-brand-black mb-2">No products found</h3>
        <p className="text-brand-gray-500 max-w-md">
          We couldn't find any products matching your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "grid gap-6",
        viewMode === 'grid' 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
          : "grid-cols-1"
      )}
    >
      {products.map((product) => (
        <div key={product.id} className={cn(viewMode === 'list' && "max-w-3xl mx-auto w-full")}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

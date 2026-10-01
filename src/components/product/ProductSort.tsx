'use client';

import { SortOption } from '@/types';
import { cn } from '@/lib/utils';

interface ProductSortProps {
  totalProducts: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onMobileFiltersClick: () => void;
}

export function ProductSort({ 
  totalProducts, 
  sort, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onMobileFiltersClick
}: ProductSortProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 mb-6 border-b border-brand-gray-100 gap-4">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <button 
          onClick={onMobileFiltersClick}
          className="lg:hidden flex items-center gap-2 text-brand-black font-medium text-sm py-2 px-4 border border-brand-gray-200 rounded hover:bg-brand-gray-50 transition-colors"
        >
          <span>⚲</span> Filters
        </button>
        <span className="text-sm text-brand-gray-500">
          Showing <span className="font-medium text-brand-black">{totalProducts}</span> results
        </span>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-6">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-brand-gray-500 whitespace-nowrap">
            Sort by:
          </label>
          <select 
            id="sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-sm text-brand-black font-medium bg-transparent border-none focus:ring-0 cursor-pointer outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating_desc">Best Rating</option>
          </select>
        </div>

        <div className="hidden sm:flex items-center gap-2 border-l border-brand-gray-200 pl-6">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              "p-2 rounded transition-colors",
              viewMode === 'grid' ? "text-brand-black bg-brand-gray-50" : "text-brand-gray-400 hover:text-brand-black"
            )}
            title="Grid View"
          >
            <span className="text-lg leading-none block font-mono">⊞</span>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              "p-2 rounded transition-colors",
              viewMode === 'list' ? "text-brand-black bg-brand-gray-50" : "text-brand-gray-400 hover:text-brand-black"
            )}
            title="List View"
          >
            <span className="text-lg leading-none block font-mono">☰</span>
          </button>
        </div>
      </div>
    </div>
  );
}

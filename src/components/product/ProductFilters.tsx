'use client';

import { Category, FilterState, SortOption } from '@/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProductFiltersProps {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductFilters({ categories, filters, onFilterChange, isOpen, onClose }: ProductFiltersProps) {
  const [minPriceStr, setMinPriceStr] = useState(filters.minPrice?.toString() || '');
  const [maxPriceStr, setMaxPriceStr] = useState(filters.maxPrice?.toString() || '');

  const handleCategoryToggle = (categoryId: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === categoryId ? undefined : categoryId
    });
  };

  const handlePriceApply = () => {
    onFilterChange({
      ...filters,
      minPrice: minPriceStr ? Number(minPriceStr) : undefined,
      maxPrice: maxPriceStr ? Number(maxPriceStr) : undefined,
    });
  };

  const clearFilters = () => {
    setMinPriceStr('');
    setMaxPriceStr('');
    onFilterChange({});
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Filter Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 lg:relative lg:transform-none lg:shadow-none lg:w-64 lg:z-0 lg:block",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full overflow-y-auto p-6 lg:p-0">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="font-heading text-xl font-medium text-brand-black">Filters</h2>
            <button onClick={onClose} className="p-2 text-brand-gray-500 hover:text-brand-black">
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-medium text-brand-black hidden lg:block">Filters</h3>
            {(Object.keys(filters).length > 0 || minPriceStr || maxPriceStr) && (
              <button 
                onClick={clearFilters}
                className="text-sm text-brand-gold hover:text-brand-black transition-colors underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-brand-black uppercase tracking-wider mb-4">Categories</h4>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-brand-gray-300 rounded bg-white group-hover:border-brand-black transition-colors">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={filters.category === cat.id}
                      onChange={() => handleCategoryToggle(cat.id)}
                    />
                    <div className="hidden peer-checked:block w-3 h-3 bg-brand-black rounded-sm" />
                  </div>
                  <span className={cn(
                    "text-sm transition-colors",
                    filters.category === cat.id ? "text-brand-black font-medium" : "text-brand-gray-600 group-hover:text-brand-black"
                  )}>
                    {cat.name} <span className="text-brand-gray-400 text-xs ml-1">({cat.productCount})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-brand-black uppercase tracking-wider mb-4">Price Range</h4>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                <input 
                  type="number" 
                  placeholder="Min"
                  value={minPriceStr}
                  onChange={(e) => setMinPriceStr(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 text-sm border border-brand-gray-200 rounded focus:outline-none focus:border-brand-black transition-colors"
                />
              </div>
              <span className="text-brand-gray-400">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400 text-sm">$</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={maxPriceStr}
                  onChange={(e) => setMaxPriceStr(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 text-sm border border-brand-gray-200 rounded focus:outline-none focus:border-brand-black transition-colors"
                />
              </div>
            </div>
            <button 
              onClick={handlePriceApply}
              className="w-full py-2 bg-brand-gray-50 text-brand-black text-sm font-medium rounded hover:bg-brand-gray-100 transition-colors"
            >
              Apply Price
            </button>
          </div>

          {/* Availability */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-brand-black uppercase tracking-wider mb-4">Availability</h4>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-10 h-5 bg-brand-gray-200 rounded-full transition-colors peer-checked:bg-brand-black">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={filters.inStock || false}
                  onChange={(e) => onFilterChange({ ...filters, inStock: e.target.checked ? true : undefined })}
                />
                <div className={cn(
                  "absolute left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200",
                  filters.inStock ? "translate-x-5" : "translate-x-0"
                )} />
              </div>
              <span className="text-sm text-brand-gray-600 group-hover:text-brand-black transition-colors">
                In Stock Only
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

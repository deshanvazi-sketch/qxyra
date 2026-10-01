'use client';

import { ProductVariant } from '@/types';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

// Map common color names to CSS colors for mock representation
const COLOR_MAP: Record<string, string> = {
  'Black': '#000000',
  'White': '#ffffff',
  'Silver': '#c0c0c0',
  'Beige': '#f5f5dc',
  'Blue': '#0000ff',
  'Brown': '#a52a2a',
  'Navy': '#000080',
  'Purple': '#800080',
  'Gold/Green': '#d4af37',
};

export function VariantSelector({ variants, selectedVariant, onSelectVariant }: VariantSelectorProps) {
  // Extract unique colors and sizes
  const colors = useMemo(() => {
    const uniqueColors = new Set<string>();
    variants.forEach(v => {
      if (v.color) uniqueColors.add(v.color);
    });
    return Array.from(uniqueColors);
  }, [variants]);

  const sizes = useMemo(() => {
    const uniqueSizes = new Set<string>();
    variants.forEach(v => {
      if (v.size) uniqueSizes.add(v.size);
    });
    return Array.from(uniqueSizes);
  }, [variants]);

  const handleColorSelect = (color: string) => {
    // Find a variant with this color and current size (if any), or just first available with this color
    const currentSize = selectedVariant?.size;
    const match = variants.find(v => v.color === color && (currentSize ? v.size === currentSize : true)) 
               || variants.find(v => v.color === color);
    
    if (match) {
      onSelectVariant(match);
    }
  };

  const handleSizeSelect = (size: string) => {
    // Find a variant with this size and current color (if any), or just first available with this size
    const currentColor = selectedVariant?.color;
    const match = variants.find(v => v.size === size && (currentColor ? v.color === currentColor : true))
               || variants.find(v => v.size === size);
    
    if (match) {
      onSelectVariant(match);
    }
  };

  const getStockStatus = (variant: ProductVariant | null) => {
    if (!variant) return null;
    if (variant.stock === 0) return <span className="text-red-500 font-medium">Out of Stock</span>;
    if (variant.stock < 10) return <span className="text-orange-500 font-medium">Only {variant.stock} left</span>;
    return <span className="text-green-600 font-medium">In Stock</span>;
  };

  return (
    <div className="flex flex-col gap-6">
      {colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="font-heading font-medium text-sm tracking-wider uppercase">
            Color {selectedVariant?.color && <span className="text-gray-500 ml-2">- {selectedVariant.color}</span>}
          </span>
          <div className="flex flex-wrap gap-3">
            {colors.map(color => {
              const isSelected = selectedVariant?.color === color;
              const hasStock = variants.some(v => v.color === color && v.stock > 0);
              
              return (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  disabled={!hasStock}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold",
                    isSelected ? "ring-2 ring-brand-gold ring-offset-2" : "ring-1 ring-gray-200 hover:ring-gray-400",
                    !hasStock && "opacity-40 cursor-not-allowed"
                  )}
                  title={color}
                  aria-label={`Select color ${color}`}
                >
                  <span 
                    className="w-8 h-8 rounded-full shadow-sm border border-black/5"
                    style={{ backgroundColor: COLOR_MAP[color] || '#e5e7eb' }}
                  />
                  {!hasStock && (
                    <span className="absolute w-full h-[1px] bg-red-500 rotate-45 transform origin-center" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="font-heading font-medium text-sm tracking-wider uppercase">
            Size {selectedVariant?.size && <span className="text-gray-500 ml-2">- {selectedVariant.size}</span>}
          </span>
          <div className="flex flex-wrap gap-3">
            {sizes.map(size => {
              const isSelected = selectedVariant?.size === size;
              const hasStock = variants.some(v => v.size === size && v.stock > 0);

              return (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  disabled={!hasStock}
                  className={cn(
                    "min-w-[3rem] h-12 px-4 rounded-md font-body text-sm font-medium transition-all duration-200",
                    "flex items-center justify-center focus:outline-none",
                    isSelected 
                      ? "bg-brand-black text-white border-2 border-brand-black" 
                      : "bg-white text-brand-black border border-gray-200 hover:border-gray-400",
                    !hasStock && "opacity-40 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedVariant && (
        <div className="text-sm">
          {getStockStatus(selectedVariant)}
        </div>
      )}
    </div>
  );
}

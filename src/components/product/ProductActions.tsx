'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { VariantSelector } from './VariantSelector';
import { Minus, Plus, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const maxStock = selectedVariant ? selectedVariant.stock : 0;
  
  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= maxStock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    alert(`Added ${quantity} of ${product.name} (${selectedVariant.sku}) to cart!`);
  };

  return (
    <div className="flex flex-col gap-8">
      <VariantSelector 
        variants={product.variants} 
        selectedVariant={selectedVariant}
        onSelectVariant={(variant) => {
          setSelectedVariant(variant);
          setQuantity(1); // Reset quantity when variant changes
        }}
      />

      <div className="flex flex-col gap-4">
        <span className="font-heading font-medium text-sm tracking-wider uppercase">Quantity</span>
        <div className="flex items-center gap-6">
          <div className="flex items-center border border-gray-200 rounded-md h-12 w-32">
            <button 
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || maxStock === 0}
              className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-brand-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="flex-1 text-center font-medium">{maxStock === 0 ? 0 : quantity}</span>
            <button 
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= maxStock || maxStock === 0}
              className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-brand-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <span className="text-sm text-gray-500">
            {maxStock > 0 ? `${maxStock} available` : 'Out of stock'}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={maxStock === 0 || !selectedVariant}
          className="flex-1 bg-brand-gold hover:bg-brand-gold/90 text-white h-14 rounded-md font-heading font-medium tracking-wide uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-gold shadow-lg shadow-brand-gold/20"
        >
          {maxStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={cn(
            "h-14 px-6 rounded-md border flex items-center justify-center transition-colors font-medium gap-2",
            isWishlisted 
              ? "border-red-500 text-red-500 bg-red-50 hover:bg-red-100" 
              : "border-gray-200 text-brand-black hover:border-brand-black"
          )}
        >
          <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
        </button>
      </div>
    </div>
  );
}

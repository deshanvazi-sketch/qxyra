'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { VariantSelector } from './VariantSelector';
import { Minus, Plus, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const maxStock = selectedVariant ? selectedVariant.stock : 10;
  
  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= maxStock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    const variant = selectedVariant || product.variants?.[0] || {
      id: `${product.id}-default`,
      productId: product.id,
      price: product.salePrice || product.basePrice,
      stock: 10,
      sku: `METHMI-${product.slug.slice(0, 6).toUpperCase()}`,
    };
    addItem(product, variant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <VariantSelector 
        variants={product.variants} 
        selectedVariant={selectedVariant}
        onSelectVariant={(variant) => {
          setSelectedVariant(variant);
          setQuantity(1);
        }}
      />

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Select Quantity</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-700 bg-black/40 rounded-xl h-11 w-32">
            <button 
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || maxStock === 0}
              className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="flex-1 text-center font-mono font-medium text-white">{maxStock === 0 ? 0 : quantity}</span>
            <button 
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= maxStock || maxStock === 0}
              className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <span className="text-xs text-gray-400 font-mono">
            {maxStock > 0 ? `${maxStock} units in stock` : 'Out of stock'}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={maxStock === 0}
          className={cn(
            "flex-1 h-12 sm:h-14 rounded-xl font-heading font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98",
            justAdded 
              ? "bg-green-500 text-white shadow-green-500/20" 
              : "bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black shadow-brand-gold/20 hover:opacity-95"
          )}
        >
          {justAdded ? (
            <>
              <span>✓</span>
              <span>Added to Bag!</span>
            </>
          ) : (
            <>
              <span>🛍️</span>
              <span>{maxStock === 0 ? 'Out of Stock' : 'Add to Bag'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleToggleWishlist}
          className={cn(
            "h-12 sm:h-14 px-5 rounded-xl border flex items-center justify-center transition-colors font-medium gap-2 cursor-pointer",
            isWishlisted 
              ? "border-red-500/50 text-red-400 bg-red-500/10" 
              : "border-gray-800 bg-black/40 text-gray-300 hover:border-gray-700 hover:text-white"
          )}
        >
          <Heart className={cn("w-5 h-5", isWishlisted && "fill-current text-red-500")} />
          <span className="text-xs">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
        </button>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useTheme } from '@/context/ThemeContext';

interface ProductCardProps {
  product: Product;
  categoryName?: string;
}

export function ProductCard({ product, categoryName }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { format } = useCurrency();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);
  
  const hasDiscount = product.salePrice != null && product.salePrice < product.basePrice;
  const displayPrice = hasDiscount ? product.salePrice! : product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;

  const primaryImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0] || {
      id: `${product.id}-default`,
      productId: product.id,
      price: displayPrice,
      stock: 10,
      sku: `QXY-${product.slug.slice(0, 6).toUpperCase()}`,
    };
    addItem(product, defaultVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  return (
    <div 
      className={cn(
        "group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden",
        isLight
          ? "bg-white border-gray-200/90 shadow-sm hover:shadow-xl hover:border-amber-400"
          : "bg-[#141820] border-gray-800/80 hover:border-brand-gold/40 shadow-lg hover:shadow-2xl hover:shadow-black/60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area - Aspect Square, perfectly fits 1000x1000 phone shots with equal size and zero cropping */}
      <div className={cn(
        "relative aspect-square w-full overflow-hidden transition-colors flex items-center justify-center p-3 sm:p-4",
        isLight ? "bg-white border-b border-gray-100" : "bg-white/[0.04] border-b border-gray-800/50"
      )}>
        {/* Sale Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-brand-gold text-brand-black text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md uppercase tracking-wider">
            -{discountPercent}%
          </div>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-2 right-2 sm:top-3 sm:right-3 z-20 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm hover:scale-110",
            isLight
              ? "bg-white/90 border border-gray-200 text-gray-700 hover:text-red-500"
              : "bg-black/60 border border-white/10 text-white hover:text-red-400"
          )}
          aria-label="Toggle Wishlist"
        >
          <span className={cn("text-xs sm:text-base", isWishlisted ? "text-red-500 scale-110" : isLight ? "text-gray-500" : "text-white/70")}>
            {isWishlisted ? "♥" : "♡"}
          </span>
        </button>

        {/* Product Image - object-contain ensures ZERO cropping and uniform size */}
        <Link href={`/store/${product.slug}`} className="relative block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Desktop Quick Add To Cart Bar (Hover-based) */}
        <div className={cn(
          "hidden md:block absolute inset-x-3 bottom-3 z-20 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        )}>
          <button 
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-semibold rounded-xl shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {justAdded ? (
              <>
                <span>✓</span>
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <span>🛍️</span>
                <span>Quick Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className={cn(
        "p-2.5 sm:p-4 flex flex-col flex-grow transition-colors",
        isLight ? "bg-white" : "bg-[#141820]"
      )}>
        {categoryName && (
          <p className={cn(
            "text-[9px] sm:text-[11px] uppercase tracking-wider mb-0.5 sm:mb-1 font-mono font-semibold truncate",
            isLight ? "text-amber-800" : "text-brand-gold/80"
          )}>
            {categoryName}
          </p>
        )}
        <Link href={`/store/${product.slug}`} className="block mb-1 sm:mb-2 flex-grow">
          <h3 className={cn(
            "font-heading text-xs sm:text-sm font-semibold line-clamp-2 h-8 sm:h-10 transition-colors leading-snug",
            isLight ? "text-gray-900 group-hover:text-amber-800" : "text-white group-hover:text-brand-gold"
          )}>
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-2">
          <div className="flex text-amber-500 text-[10px] sm:text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating || 5) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className={cn(
            "text-[10px] sm:text-[11px] font-mono",
            isLight ? "text-gray-600 font-medium" : "text-gray-400"
          )}>
            ({product.rating?.toFixed(1) || '5.0'})
          </span>
          {product.totalSold ? (
            <span className={cn(
              "text-[9px] sm:text-[10px] ml-auto hidden sm:inline font-mono",
              isLight ? "text-gray-500" : "text-gray-500"
            )}>
              {product.totalSold}+ sold
            </span>
          ) : null}
        </div>

        {/* Price & Action */}
        <div className={cn(
          "flex items-center justify-between pt-1.5 sm:pt-2 border-t gap-1.5",
          isLight ? "border-gray-100" : "border-gray-800/80"
        )}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 min-w-0">
            <span className={cn(
              "font-bold text-xs sm:text-base font-mono truncate",
              isLight ? "text-gray-950 font-extrabold" : "text-white"
            )}>
              {format(displayPrice)}
            </span>
            {hasDiscount && (
              <span className={cn(
                "text-[10px] sm:text-xs line-through font-mono",
                isLight ? "text-gray-400" : "text-gray-500"
              )}>
                {format(product.basePrice)}
              </span>
            )}
          </div>

          {/* Mobile Tap-to-Add (+) Button */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "md:hidden w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all shrink-0 active:scale-90 cursor-pointer shadow-sm",
              justAdded 
                ? "bg-green-500 text-white font-bold text-xs" 
                : "bg-brand-gold text-brand-black hover:opacity-90 text-sm font-bold shadow-brand-gold/20"
            )}
            aria-label="Add to cart"
          >
            {justAdded ? "✓" : "+"}
          </button>

          {/* Desktop Link */}
          <Link
            href={`/store/${product.slug}`}
            className={cn(
              "hidden md:inline text-xs font-semibold whitespace-nowrap transition-colors",
              isLight ? "text-amber-800 hover:text-amber-950 hover:underline" : "text-brand-gold hover:underline"
            )}
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const categoryName = "Premium Category";
  
  const hasDiscount = product.salePrice != null && product.salePrice < product.basePrice;
  const displayPrice = hasDiscount ? product.salePrice! : product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;

  return (
    <div 
      className="group flex flex-col bg-white rounded shadow-sm hover:shadow-xl transition-shadow duration-300 border border-brand-gray-50 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden">
        {/* Sale Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-20 bg-brand-black text-brand-white text-xs font-bold px-2 py-1 rounded">
            SALE {discountPercent}%
          </div>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition-transform"
          aria-label="Toggle Wishlist"
        >
          <span className={cn("text-lg", isWishlisted ? "text-brand-black" : "text-brand-gray-300 grayscale")}>
            {isWishlisted ? "♥" : "♡"}
          </span>
        </button>

        {/* Product Image Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <span className="font-heading font-medium text-brand-gray-500 uppercase tracking-widest text-sm opacity-50">
            {product.name}
          </span>
        </div>

        {/* Hover Actions */}
        <div className={cn(
          "absolute inset-0 bg-brand-black/10 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <button className="w-full py-2.5 bg-brand-white text-brand-black font-semibold rounded hover:bg-brand-gray-50 transition-colors shadow-sm transform translate-y-2 group-hover:translate-y-0 duration-300">
            Quick View
          </button>
          <button className="w-full py-2.5 bg-brand-black text-brand-white font-semibold rounded hover:bg-brand-black/90 transition-colors shadow-sm transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-brand-gray-500 mb-1">{categoryName}</p>
        <Link href={`/product/${product.slug}`} className="block mb-2 flex-grow">
          <h3 className="font-heading font-medium text-brand-black line-clamp-2 hover:text-brand-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-xs text-brand-gold">
              {i < 4 ? '★' : '☆'}
            </span>
          ))}
          <span className="text-xs text-brand-gray-500 ml-1">(12)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-brand-black">
            {formatPrice(displayPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-brand-gray-400 line-through">
              {formatPrice(product.basePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

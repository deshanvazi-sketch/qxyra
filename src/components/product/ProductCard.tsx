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
import { WHATSAPP_NUMBER } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
  categoryName?: string;
}

export function ProductCard({ product, categoryName }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [activeColorImage, setActiveColorImage] = useState<string | null>(null);

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

  const primaryImage =
    activeColorImage ||
    product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0] || {
      id: `${product.id}-default`,
      productId: product.id,
      price: displayPrice,
      stock: 10,
      sku: `MM-${product.slug.slice(0, 6).toUpperCase()}`,
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

  const handleWhatsAppQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hello Methmi Mobile! I would like to order:\n\n📱 *Model*: ${product.name}\n💰 *Price*: ${format(displayPrice)}\n\nPlease let me know availability and delivery details.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
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
      {/* Image Area - Aspect Square with zero cropping */}
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden transition-colors flex items-center justify-center p-3 sm:p-4",
          isLight ? "bg-white border-b border-gray-100" : "bg-white/[0.04] border-b border-gray-800/50"
        )}
      >
        {/* Sale Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-brand-gold text-brand-black text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md uppercase tracking-wider">
            -{discountPercent}%
          </div>
        )}

        {/* Top Right Action Icons: Wishlist + WhatsApp */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5">
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm hover:scale-110",
              isLight
                ? "bg-white/90 border border-gray-200 text-gray-700 hover:text-red-500"
                : "bg-black/60 border border-white/10 text-white hover:text-red-400"
            )}
            aria-label="Toggle Wishlist"
          >
            <span
              className={cn(
                "text-xs sm:text-sm",
                isWishlisted ? "text-red-500 scale-110" : isLight ? "text-gray-500" : "text-white/70"
              )}
            >
              {isWishlisted ? "♥" : "♡"}
            </span>
          </button>

          <button
            onClick={handleWhatsAppQuickOrder}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-md hover:scale-110 transition-transform cursor-pointer"
            title="Inquire on WhatsApp (074 303 1990)"
            aria-label="Inquire on WhatsApp"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/store/${product.slug}`} className="relative block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Desktop Quick Add Bar */}
        <div
          className={cn(
            "hidden md:block absolute inset-x-3 bottom-3 z-20 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          )}
        >
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

      {/* Product Details Area */}
      <div
        className={cn(
          "p-2.5 sm:p-4 flex flex-col flex-grow transition-colors",
          isLight ? "bg-white" : "bg-[#141820]"
        )}
      >
        {/* Color Dots Row (Feature 2) */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[9px] font-mono uppercase text-gray-500 mr-0.5">Colors:</span>
            {product.colorOptions.slice(0, 5).map((opt) => {
              const isSelected = activeColorImage === opt.image;
              return (
                <button
                  key={opt.name}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveColorImage(opt.image || null);
                  }}
                  onMouseEnter={() => {
                    if (opt.image) setActiveColorImage(opt.image);
                  }}
                  className={cn(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all cursor-pointer shadow-sm hover:scale-125",
                    isSelected
                      ? "ring-2 ring-brand-gold scale-110 border-white"
                      : "border-black/30 hover:ring-1 hover:ring-brand-gold"
                  )}
                  style={{ backgroundColor: opt.hex }}
                  title={opt.name}
                  aria-label={`View ${opt.name}`}
                />
              );
            })}
            {product.colorOptions.length > 5 && (
              <span className="text-[9px] font-mono text-gray-500">
                +{product.colorOptions.length - 5}
              </span>
            )}
          </div>
        )}

        {categoryName && (
          <p
            className={cn(
              "text-[9px] sm:text-[11px] uppercase tracking-wider mb-0.5 sm:mb-1 font-mono font-semibold truncate",
              isLight ? "text-amber-800" : "text-brand-gold/80"
            )}
          >
            {categoryName}
          </p>
        )}

        {/* Title */}
        <Link href={`/store/${product.slug}`} className="block mb-1 sm:mb-1.5 flex-grow">
          <h3
            className={cn(
              "font-heading text-xs sm:text-sm font-semibold line-clamp-2 h-8 sm:h-10 transition-colors leading-snug",
              isLight ? "text-gray-900 group-hover:text-amber-800" : "text-white group-hover:text-brand-gold"
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* Quick Specs Badges (Feature 4) */}
        {product.specsHighlights && product.specsHighlights.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.specsHighlights.slice(0, 2).map((badge, idx) => (
              <span
                key={idx}
                className={cn(
                  "text-[9px] font-mono px-1.5 py-0.5 rounded-md border font-medium truncate max-w-[120px]",
                  isLight
                    ? "bg-gray-100 text-gray-700 border-gray-200"
                    : "bg-white/[0.05] text-gray-300 border-white/10"
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Rating & Sold count */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-2">
          <div className="flex text-amber-500 text-[10px] sm:text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.floor(product.rating || 5) ? '★' : '☆'}</span>
            ))}
          </div>
          <span
            className={cn(
              "text-[10px] sm:text-[11px] font-mono",
              isLight ? "text-gray-600 font-medium" : "text-gray-400"
            )}
          >
            ({product.rating?.toFixed(1) || '5.0'})
          </span>
          {product.totalSold ? (
            <span
              className={cn(
                "text-[9px] sm:text-[10px] ml-auto hidden sm:inline font-mono",
                isLight ? "text-gray-500" : "text-gray-500"
              )}
            >
              {product.totalSold}+ sold
            </span>
          ) : null}
        </div>

        {/* Price & Action */}
        <div
          className={cn(
            "flex items-center justify-between pt-1.5 sm:pt-2 border-t gap-1.5",
            isLight ? "border-gray-100" : "border-gray-800/80"
          )}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 min-w-0">
            <span
              className={cn(
                "font-bold text-xs sm:text-base font-mono truncate",
                isLight ? "text-gray-950 font-extrabold" : "text-white"
              )}
            >
              {format(displayPrice)}
            </span>
            {hasDiscount && (
              <span
                className={cn(
                  "text-[10px] sm:text-xs line-through font-mono",
                  isLight ? "text-gray-400" : "text-gray-500"
                )}
              >
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
              isLight
                ? "text-amber-800 hover:text-amber-950 hover:underline"
                : "text-brand-gold hover:underline"
            )}
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

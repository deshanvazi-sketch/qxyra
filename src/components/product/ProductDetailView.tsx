'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { ProductGallery } from './ProductGallery';
import { ProductActions } from './ProductActions';
import { TrustBadges } from './TrustBadges';
import { FrequentlyBoughtTogether } from './FrequentlyBoughtTogether';
import { useCurrency } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { ShieldCheck, Zap, Battery, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  catName: string;
  productReviewsCount: number;
}

export function ProductDetailView({
  product,
  catName,
  productReviewsCount,
}: ProductDetailViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { format } = useCurrency();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Find image when color changes
  const handleColorChange = (colorName: string) => {
    // 1. Check colorOptions first
    const opt = product.colorOptions?.find(
      (c) => c.name.toLowerCase() === colorName.toLowerCase()
    );
    if (opt?.image) {
      const idx = product.images.findIndex((img) => img.url === opt.image);
      if (idx !== -1) {
        setActiveImageIndex(idx);
        return;
      }
    }

    // 2. Fuzzy match against image URL or alt
    const cleanColor = colorName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const idx = product.images.findIndex((img) => {
      const cleanUrl = img.url.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanAlt = (img.alt || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanUrl.includes(cleanColor) || cleanAlt.includes(cleanColor);
    });

    if (idx !== -1) {
      setActiveImageIndex(idx);
    }
  };

  // Sync variant color when user clicks an image thumbnail
  const handleActiveImageIndexChange = (idx: number) => {
    setActiveImageIndex(idx);
    const activeImg = product.images[idx];
    if (!activeImg) return;

    // Check if any variant's color matches image filename or alt
    const matchedVariant = product.variants.find((v) => {
      if (!v.color) return false;
      const cleanColor = v.color.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanUrl = activeImg.url.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanUrl.includes(cleanColor);
    });

    if (matchedVariant) {
      setSelectedVariant(matchedVariant);
    }
  };

  const currentPrice = selectedVariant?.price || product.salePrice || product.basePrice;
  const hasDiscount = product.salePrice != null && product.salePrice < product.basePrice;

  return (
    <div className="w-full">
      {/* Top Grid: High-Res Studio Gallery + Specs & Configuration */}
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 p-4 sm:p-8 lg:p-10 rounded-3xl border transition-colors mb-10",
          isLight 
            ? "bg-white border-gray-200/90 shadow-lg" 
            : "bg-[#121620] border-gray-800 shadow-2xl"
        )}
      >
        {/* Left: Gallery with 2.2x High-Res Studio Zoom */}
        <div className="w-full">
          <ProductGallery
            images={product.images}
            productName={product.name}
            activeIndex={activeImageIndex}
            onActiveIndexChange={handleActiveImageIndexChange}
          />
        </div>

        {/* Right: Info, Price, Specs Badges & WhatsApp Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold font-bold">
                Methmi Mobile {catName} Official
              </span>
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                100% Genuine TRCSL
              </span>
            </div>

            {/* Product Title */}
            <h1
              className={cn(
                "text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold leading-tight",
                isLight ? "text-gray-950" : "text-white"
              )}
            >
              {product.name}
            </h1>

            {/* Ratings & Total Sold */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full border",
                  isLight 
                    ? "bg-amber-50 border-amber-200 text-amber-900" 
                    : "bg-black/40 border-gray-800 text-white"
                )}
              >
                <span className="text-xs font-mono font-bold">{product.rating}</span>
                <span className="text-amber-500 text-sm leading-none">★</span>
              </div>

              <a
                href="#reviews"
                className="text-xs text-gray-400 hover:text-brand-gold underline underline-offset-4 transition-colors font-mono"
              >
                {productReviewsCount > 0
                  ? `${productReviewsCount} Verified Customer Reviews`
                  : 'Company Inspected & Sealed Pack'}
              </a>

              {product.totalSold ? (
                <span className="text-xs font-mono text-emerald-400 ml-auto hidden sm:inline">
                  ⚡ {product.totalSold}+ units sold in Sri Lanka
                </span>
              ) : null}
            </div>

            {/* Specs Highlights Pills */}
            {product.specsHighlights && product.specsHighlights.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {product.specsHighlights.map((spec, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-[11px] font-mono px-3 py-1 rounded-xl border font-medium flex items-center gap-1",
                      isLight
                        ? "bg-gray-100/80 border-gray-200 text-gray-800"
                        : "bg-white/[0.05] border-white/10 text-gray-300"
                    )}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}

            {/* Live Pricing */}
            <div
              className={cn(
                "flex items-baseline gap-3 py-3 border-y",
                isLight ? "border-gray-100" : "border-gray-800/80"
              )}
            >
              <span
                className={cn(
                  "text-3xl sm:text-4xl font-heading font-bold font-mono",
                  isLight ? "text-gray-950 font-black" : "text-white"
                )}
              >
                {format(currentPrice)}
              </span>

              {hasDiscount && (
                <span className="text-base sm:text-lg text-gray-500 line-through font-mono">
                  {format(product.basePrice)}
                </span>
              )}

              <span className="bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ml-auto">
                Official Warranty Price
              </span>
            </div>

            {/* Description */}
            <p
              className={cn(
                "text-xs sm:text-sm font-body leading-relaxed line-clamp-3",
                isLight ? "text-gray-700 font-medium" : "text-gray-300"
              )}
            >
              {product.description}
            </p>

            {/* Interactive Actions (Color Swatches, Quantity, Add to Bag & WhatsApp Order) */}
            <div className={cn("pt-4 border-t", isLight ? "border-gray-100" : "border-gray-800/80")}>
              <ProductActions
                product={product}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
                onColorChange={handleColorChange}
              />
            </div>
          </div>

          {/* Official TRCSL & Company Warranty Badges */}
          <div className={cn("pt-6 border-t", isLight ? "border-gray-100" : "border-gray-800/80")}>
            <TrustBadges />
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle */}
      <FrequentlyBoughtTogether
        product={product}
        selectedVariant={selectedVariant}
      />
    </div>
  );
}

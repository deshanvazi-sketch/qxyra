'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { VariantSelector } from './VariantSelector';
import { Minus, Plus, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCurrency } from '@/context/CurrencyContext';
import { WHATSAPP_NUMBER } from '@/lib/constants';

interface ProductActionsProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
  onSelectVariant?: (variant: ProductVariant) => void;
  onColorChange?: (color: string) => void;
}

export function ProductActions({
  product,
  selectedVariant: controlledVariant,
  onSelectVariant: controlledOnSelect,
  onColorChange,
}: ProductActionsProps) {
  const [internalVariant, setInternalVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );

  const selectedVariant = controlledVariant !== undefined ? controlledVariant : internalVariant;
  const setSelectedVariant = (variant: ProductVariant) => {
    setInternalVariant(variant);
    controlledOnSelect?.(variant);
  };

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const { format } = useCurrency();
  const isWishlisted = isInWishlist(product.id);

  const maxStock = selectedVariant ? selectedVariant.stock : 10;
  const currentPrice = selectedVariant?.price || product.salePrice || product.basePrice;

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
      price: currentPrice,
      stock: 10,
      sku: `METHMI-${product.slug.slice(0, 6).toUpperCase()}`,
    };
    addItem(product, variant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const handleWhatsAppOrder = () => {
    const colorText = selectedVariant?.color ? `\n🎨 *Color*: ${selectedVariant.color}` : '';
    const sizeText = selectedVariant?.size ? `\n💾 *Storage*: ${selectedVariant.size}` : '';
    const qtyText = quantity > 1 ? `\n🔢 *Quantity*: ${quantity}` : '';
    const totalFormatted = format(currentPrice * quantity);

    const message = encodeURIComponent(
      `Hello Methmi Mobile! I would like to order this genuine TRCSL approved smartphone:\n\n` +
      `📱 *Model*: ${product.name}` +
      `${colorText}` +
      `${sizeText}` +
      `${qtyText}\n` +
      `💰 *Total Price*: ${totalFormatted}\n\n` +
      `Please confirm stock availability and islandwide Cash on Delivery (COD) dispatch.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-7">
      {/* Real Variant & Color Selector */}
      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
        onColorChange={onColorChange}
      />

      {/* Quantity & Stock Status */}
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
          Select Quantity
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-700 bg-black/40 rounded-xl h-11 w-32">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || maxStock === 0}
              className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="flex-1 text-center font-mono font-medium text-white">
              {maxStock === 0 ? 0 : quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= maxStock || maxStock === 0}
              className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs text-gray-400 font-mono">
            {maxStock > 0 ? (
              <span className="text-emerald-400 font-medium">✓ {maxStock} units in stock (Immediate Dispatch)</span>
            ) : (
              <span className="text-red-400 font-medium">Out of stock</span>
            )}
          </span>
        </div>
      </div>

      {/* Action Buttons: Add to Bag, 1-Click WhatsApp Order, Wishlist */}
      <div className="flex flex-col gap-3 pt-2">
        {/* Row 1: Add to Bag + Wishlist */}
        <div className="flex gap-3">
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
              "h-12 sm:h-14 px-4 sm:px-5 rounded-xl border flex items-center justify-center transition-colors font-medium gap-2 cursor-pointer shrink-0",
              isWishlisted
                ? "border-red-500/50 text-red-400 bg-red-500/10"
                : "border-gray-800 bg-black/40 text-gray-300 hover:border-gray-700 hover:text-white"
            )}
            aria-label="Save to Wishlist"
          >
            <Heart className={cn("w-5 h-5", isWishlisted && "fill-current text-red-500")} />
            <span className="text-xs hidden sm:inline">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
          </button>
        </div>

        {/* Row 2: 1-Click WhatsApp Quick Order */}
        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="w-full h-12 sm:h-14 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-heading font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/35 active:scale-98"
        >
          {/* WhatsApp SVG Icon */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>Order via WhatsApp (074 303 1990)</span>
        </button>
      </div>
    </div>
  );
}

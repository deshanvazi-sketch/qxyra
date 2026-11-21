'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { PhoneViewer3D } from './PhoneViewer3D';
import { X, MessageCircle, ShoppingBag, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

interface Phone3DModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  initialColor?: string;
}

export function Phone3DModal({ product, isOpen, onClose, initialColor }: Phone3DModalProps) {
  const { format } = useCurrency();
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  // Extract unique colors from variants
  const colorList: string[] = Array.from(
    new Set(product.variants.map((v) => v.color).filter(Boolean) as string[])
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    initialColor || colorList[0] || 'Voyage Black'
  );

  if (!isOpen) return null;

  const displayPrice = product.salePrice || product.basePrice;

  // Selected variant based on color
  const matchedVariant = product.variants.find((v) => v.color === selectedColor) || product.variants[0] || {
    id: `${product.id}-default`,
    productId: product.id,
    price: displayPrice,
    stock: 10,
    sku: `QXY-${product.slug.slice(0, 6).toUpperCase()}`,
  };

  const handleAddToCart = () => {
    addItem(product, matchedVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  // WhatsApp Quick Order Message
  const whatsappNumber = '94770000000'; // official WhatsApp number or company line
  const whatsappMessage = encodeURIComponent(
    `Hello Methmi Mobile, I would like to order the ${product.name} in ${selectedColor} (Price: ${format(displayPrice)}). Please provide payment and delivery details.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl h-[92vh] sm:h-[85vh] bg-[#0E121A] rounded-3xl border border-brand-gold/40 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:rotate-90"
          aria-label="Close 3D Viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3D Interactive Canvas Area */}
        <div className="relative w-full md:w-3/5 h-3/5 md:h-full bg-gradient-to-b from-[#141822] via-[#0E121A] to-[#080B10] flex items-center justify-center">
          <PhoneViewer3D
            phoneName={product.name}
            colors={colorList}
            initialColor={selectedColor}
            onColorChange={(c) => setSelectedColor(c)}
            className="w-full h-full"
            showControls={true}
          />
        </div>

        {/* Right Side: Product Details & Fast Action Bar */}
        <div className="w-full md:w-2/5 h-2/5 md:h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar border-t md:border-t-0 md:border-l border-gray-800 bg-[#0E121A]/90">
          <div className="space-y-4 sm:space-y-6">
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-[10px] font-mono font-semibold uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Real-Time 3D Studio</span>
              </span>
              <span className="text-gray-400 text-xs font-mono">360° Inspection</span>
            </div>

            {/* Title & Brand */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Currently Viewing: <span className="text-brand-gold font-medium">{selectedColor}</span>
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-heading font-bold text-white font-mono">
                {format(displayPrice)}
              </span>
              {product.salePrice && product.salePrice < product.basePrice && (
                <span className="text-sm text-gray-500 line-through font-mono">
                  {format(product.basePrice)}
                </span>
              )}
            </div>

            {/* Trust Badges */}
            <div className="space-y-2 pt-2 border-t border-gray-800/80">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>100% Genuine TRCSL Approved & Company Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fast Islandwide Express Delivery • COD Available</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Add to Bag & WhatsApp Order */}
          <div className="space-y-2.5 pt-4 border-t border-gray-800">
            {/* Quick Add To Cart */}
            <button
              onClick={handleAddToCart}
              className={cn(
                "w-full py-3 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg",
                justAdded
                  ? "bg-emerald-500 text-white"
                  : "bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black hover:opacity-95 shadow-brand-gold/20"
              )}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {selectedColor} to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag ({selectedColor})</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Order */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 sm:py-3 rounded-xl font-heading text-xs sm:text-sm font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#25D366]/20"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order via WhatsApp (Instant Reply)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

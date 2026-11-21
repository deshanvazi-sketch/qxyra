'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product, ProductVariant } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useCartStore } from '@/store/cartStore';
import { useTheme } from '@/context/ThemeContext';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Check, Plus, ShoppingBag } from 'lucide-react';

interface FrequentlyBoughtTogetherProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

interface BundleItem {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  required?: boolean;
}

export function FrequentlyBoughtTogether({ product, selectedVariant }: FrequentlyBoughtTogetherProps) {
  const { format } = useCurrency();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const addItem = useCartStore((s) => s.addItem);

  const phonePrice = selectedVariant?.price || product.salePrice || product.basePrice;
  const primaryPhoneImage = product.images?.[0]?.url || '/products/vivo-y05-summit-platinum.jpg';

  const accessories: BundleItem[] = [
    {
      id: 'acc-tempered-glass',
      name: `9D Diamond Screen & Lens Guard for ${product.name.split(' (')[0]}`,
      price: 5.0,
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=400',
      tag: '9H Scratch-Proof',
    },
    {
      id: 'acc-gan-charger',
      name: 'Original 45W GaN Fast Charger + 6A Braided Type-C Cable',
      price: 15.0,
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=400',
      tag: 'Super Fast Charge',
    },
  ];

  const [selectedAccs, setSelectedAccs] = useState<string[]>(['acc-tempered-glass', 'acc-gan-charger']);
  const [justAdded, setJustAdded] = useState(false);

  const toggleAccessory = (id: string) => {
    setSelectedAccs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate totals
  const accessoriesTotal = accessories
    .filter((a) => selectedAccs.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const discount = selectedAccs.length === 2 ? 3.0 : selectedAccs.length === 1 ? 1.0 : 0;
  const bundleTotal = phonePrice + accessoriesTotal - discount;

  const handleAddBundleToCart = () => {
    // Add phone
    const variant = selectedVariant || product.variants[0] || {
      id: `${product.id}-default`,
      productId: product.id,
      price: phonePrice,
      stock: 10,
      sku: `MM-${product.slug.slice(0, 6).toUpperCase()}`,
    };
    addItem(product, variant, 1);

    // Add accessories
    accessories
      .filter((a) => selectedAccs.includes(a.id))
      .forEach((acc) => {
        const dummyProduct: Product = {
          id: acc.id,
          name: acc.name,
          slug: acc.id,
          description: acc.name,
          basePrice: acc.price,
          salePrice: acc.price,
          images: [{ id: `img-${acc.id}`, productId: acc.id, url: acc.image, alt: acc.name, isPrimary: true, sortOrder: 0 }],
          categoryId: 'mobile',
          variants: [{ id: `var-${acc.id}`, productId: acc.id, price: acc.price, stock: 50, sku: `SKU-${acc.id}` }],
          rating: 4.9,
          totalSold: 120,
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        addItem(dummyProduct, dummyProduct.variants[0], 1);
      });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  const handleOrderBundleWhatsApp = () => {
    const includedItems = [
      `1. ${product.name} (${selectedVariant?.size || 'Standard'}, ${selectedVariant?.color || 'Selected Color'})`,
      ...accessories.filter((a) => selectedAccs.includes(a.id)).map((a, i) => `${i + 2}. ${a.name}`),
    ].join('\n');

    const msg = encodeURIComponent(
      `Hello Methmi Mobile! I would like to order the *Frequently Bought Together Bundle*:\n\n${includedItems}\n\n*Total Bundle Price*: ${format(bundleTotal)}\n*Discount Applied*: ${format(discount)}\n\nPlease reserve this bundle for islandwide cash on delivery.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div
      className={cn(
        'w-full p-4 sm:p-6 rounded-3xl border transition-colors my-8',
        isLight
          ? 'bg-amber-50/30 border-amber-200/90 shadow-sm'
          : 'bg-[#121620] border-gray-800 shadow-xl'
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold block">
            Exclusive Accessory Combo
          </span>
          <h3 className={cn('text-lg sm:text-xl font-heading font-semibold', isLight ? 'text-gray-950' : 'text-white')}>
            Frequently Bought Together
          </h3>
        </div>
        {discount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 w-fit">
            <span>🎁</span> Save {format(discount)} on Combo
          </span>
        )}
      </div>

      {/* Items Preview Row */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
        {/* Main Phone */}
        <div className="flex flex-col items-center text-center w-24 sm:w-28 shrink-0">
          <div
            className={cn(
              'relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border p-2 flex items-center justify-center overflow-hidden mb-1.5',
              isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-black/50 border-gray-800'
            )}
          >
            <Image
              src={primaryPhoneImage}
              alt={product.name}
              fill
              sizes="100px"
              className="object-contain p-1"
            />
          </div>
          <span className={cn('text-[11px] font-medium line-clamp-1', isLight ? 'text-gray-900' : 'text-white')}>
            This Phone
          </span>
          <span className="text-[11px] font-mono font-bold text-brand-gold">
            {format(phonePrice)}
          </span>
        </div>

        {/* Plus separator */}
        <div className="flex items-center justify-center text-gray-500">
          <Plus className="w-4 h-4" />
        </div>

        {/* Accessories */}
        {accessories.map((acc, index) => {
          const isChecked = selectedAccs.includes(acc.id);
          return (
            <div key={acc.id} className="contents">
              <div
                onClick={() => toggleAccessory(acc.id)}
                className={cn(
                  'flex flex-col items-center text-center w-24 sm:w-28 shrink-0 cursor-pointer group transition-opacity',
                  !isChecked && 'opacity-40 hover:opacity-70'
                )}
              >
                <div
                  className={cn(
                    'relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border p-2 flex items-center justify-center overflow-hidden mb-1.5 transition-all',
                    isChecked
                      ? isLight
                        ? 'border-amber-400 bg-white ring-2 ring-amber-300/40 shadow-sm'
                        : 'border-brand-gold bg-black/60 ring-2 ring-brand-gold/30 shadow-md'
                      : 'border-gray-700 bg-black/20'
                  )}
                >
                  <Image
                    src={acc.image}
                    alt={acc.name}
                    fill
                    sizes="100px"
                    className="object-cover rounded-xl"
                  />
                  <div
                    className={cn(
                      'absolute top-1 right-1 w-5 h-5 rounded-md flex items-center justify-center transition-colors',
                      isChecked ? 'bg-brand-gold text-brand-black' : 'bg-black/60 border border-gray-600'
                    )}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <span className={cn('text-[10px] font-medium line-clamp-1', isLight ? 'text-gray-800' : 'text-gray-300')}>
                  {acc.name.split(' for')[0]}
                </span>
                <span className="text-[11px] font-mono font-bold text-brand-gold">
                  +{format(acc.price)}
                </span>
              </div>

              {index < accessories.length - 1 && (
                <div className="flex items-center justify-center text-gray-500">
                  <Plus className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Checkbox item details */}
      <div className="space-y-2 border-t border-gray-800/80 pt-4 mb-5 text-xs">
        <label className="flex items-center gap-2.5 text-gray-300 cursor-not-allowed">
          <input type="checkbox" checked disabled className="rounded text-brand-gold accent-amber-500" />
          <span className={isLight ? 'text-gray-900 font-semibold' : 'text-white font-medium'}>
            <strong>This item:</strong> {product.name} ({format(phonePrice)})
          </span>
        </label>
        {accessories.map((acc) => {
          const isChecked = selectedAccs.includes(acc.id);
          return (
            <label
              key={acc.id}
              onClick={() => toggleAccessory(acc.id)}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}}
                className="rounded text-brand-gold accent-amber-500 cursor-pointer"
              />
              <span className={cn(isLight ? 'text-gray-700' : 'text-gray-300', !isChecked && 'line-through text-gray-500')}>
                {acc.name} — <strong className="text-brand-gold">{format(acc.price)}</strong>
              </span>
            </label>
          );
        })}
      </div>

      {/* Price & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-800/80">
        <div>
          <span className="text-xs text-gray-400 font-mono block">Bundle Price (all selected):</span>
          <div className="flex items-baseline gap-2">
            <span className={cn('text-2xl font-bold font-mono', isLight ? 'text-gray-950 font-extrabold' : 'text-white')}>
              {format(bundleTotal)}
            </span>
            {discount > 0 && (
              <span className="text-xs text-gray-500 line-through font-mono">
                {format(phonePrice + accessoriesTotal)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleAddBundleToCart}
            className={cn(
              'px-5 py-3 rounded-xl font-heading font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95',
              justAdded
                ? 'bg-green-500 text-white shadow-green-500/20'
                : 'bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black hover:opacity-95 shadow-brand-gold/20'
            )}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{justAdded ? 'Bundle Added to Bag!' : 'Add Bundle to Bag'}</span>
          </button>

          <button
            type="button"
            onClick={handleOrderBundleWhatsApp}
            className="px-5 py-3 rounded-xl font-heading font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md active:scale-95"
          >
            <span>💬</span>
            <span>Order Bundle via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}

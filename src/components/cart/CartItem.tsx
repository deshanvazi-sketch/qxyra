'use client';

import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { CartItem as CartItemType } from '@/types';

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore();

  const price = item.product.salePrice || item.variant.price || item.product.basePrice;
  const subtotal = price * item.quantity;

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-6 border-b border-gray-200 gap-4">
      {/* Product Info (Col 1-6) */}
      <div className="col-span-6 flex gap-4 w-full">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] text-center text-gray-500 p-2 overflow-hidden shadow-inner">
          {item.product.name}
        </div>
        
        <div className="flex flex-col justify-center flex-grow">
          <h3 className="font-medium text-brand-black text-base md:text-lg line-clamp-2">{item.product.name}</h3>
          <div className="text-sm text-gray-500 mt-1 flex gap-3">
            {item.variant.size && <span>Size: {item.variant.size}</span>}
            {item.variant.color && <span>Color: {item.variant.color}</span>}
          </div>
          <div className="font-medium text-brand-black mt-2 md:hidden">
            {formatPrice(price)}
          </div>
        </div>
      </div>

      {/* Mobile Actions Container */}
      <div className="flex w-full items-center justify-between md:hidden mt-2">
        <div className="flex items-center border border-gray-300 rounded-md h-9">
          <button 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-3 h-full text-gray-600 hover:text-brand-black hover:bg-gray-50 transition-colors rounded-l-md"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 min-w-[2.5rem] text-center font-medium text-sm">
            {item.quantity}
          </span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 h-full text-gray-600 hover:text-brand-black hover:bg-gray-50 transition-colors rounded-r-md"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button 
          onClick={() => removeItem(item.id)}
          className="text-gray-400 hover:text-red-500 text-sm font-medium underline transition-colors"
        >
          Remove
        </button>
      </div>

      {/* Desktop Layout (Col 7-12) */}
      <div className="hidden md:block col-span-2 text-right font-medium text-gray-700">
        {formatPrice(price)}
      </div>

      <div className="hidden md:flex col-span-2 justify-center">
        <div className="flex items-center border border-gray-300 rounded-md h-9 bg-white">
          <button 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-3 h-full text-gray-600 hover:text-brand-black hover:bg-gray-50 transition-colors rounded-l-md"
          >
            -
          </button>
          <span className="px-2 min-w-[2.5rem] text-center font-medium text-sm">
            {item.quantity}
          </span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 h-full text-gray-600 hover:text-brand-black hover:bg-gray-50 transition-colors rounded-r-md"
          >
            +
          </button>
        </div>
      </div>

      <div className="hidden md:flex col-span-2 justify-end items-center gap-4">
        <div className="font-bold text-brand-black text-right">
          {formatPrice(subtotal)}
        </div>
        <button 
          onClick={() => removeItem(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Remove item"
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
      </div>
    </div>
  );
}

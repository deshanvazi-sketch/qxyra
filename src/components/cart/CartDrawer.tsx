'use client';

import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, getTotal, getItemCount, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-brand-black flex items-center gap-3 font-heading">
            Your Cart 
            {getItemCount() > 0 && (
              <span className="text-sm font-bold text-brand-black bg-brand-gold px-2.5 py-0.5 rounded-full">
                {getItemCount()}
              </span>
            )}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-brand-black transition-colors rounded-full p-1 hover:bg-gray-100"
            aria-label="Close cart"
          >
            <span className="text-2xl leading-none block w-6 h-6 flex items-center justify-center">&times;</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-brand-black font-medium text-lg">Your cart is empty.</p>
              <p className="text-gray-500 text-sm mb-4">Discover our collection and find something you love.</p>
              <button 
                onClick={onClose}
                className="text-brand-gold font-bold hover:text-brand-black transition-colors border-b-2 border-brand-gold hover:border-brand-black pb-1"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const price = item.product.salePrice || item.variant.price || item.product.basePrice;
                return (
                  <div key={item.id} className="flex gap-4 items-start group">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] text-gray-400 text-center p-1 shadow-sm">
                      {item.product.name}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-brand-black line-clamp-2 pr-4">{item.product.name}</h3>
                      <div className="text-xs text-gray-500 mt-1.5 flex gap-2">
                        {item.variant.size && <span>Size: {item.variant.size}</span>}
                        {item.variant.size && item.variant.color && <span>•</span>}
                        {item.variant.color && <span>Color: {item.variant.color}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">Qty: {item.quantity}</div>
                        <div className="text-sm font-bold text-brand-black">{formatPrice(price * item.quantity)}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Remove"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-brand-black">Subtotal</span>
              <span className="text-xl font-bold text-brand-black">{formatPrice(getTotal())}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">Shipping, taxes, and discounts calculated at checkout.</p>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/cart"
                onClick={onClose}
                className="block text-center border-2 border-brand-black text-brand-black py-3 rounded-md hover:bg-brand-black hover:text-white transition-colors font-bold text-sm"
              >
                View Cart
              </Link>
              <button 
                onClick={onClose}
                className="block text-center bg-brand-gold text-brand-black py-3 rounded-md hover:bg-brand-black hover:text-white transition-colors font-bold text-sm shadow-md"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

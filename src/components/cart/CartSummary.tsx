'use client';

import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import Link from 'next/link';
import { useState } from 'react';

export function CartSummary() {
  const { getTotal } = useCartStore();
  const subtotal = getTotal();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 15.00; // Mock fixed shipping cost
  const total = subtotal + shippingCost;
  
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="bg-brand-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-brand-black mb-6 font-heading">Order Summary</h2>
      
      <div className="space-y-4 mb-6 text-brand-black">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {isFreeShipping ? <span className="text-green-600 font-bold">Free</span> : formatPrice(shippingCost)}
          </span>
        </div>
        
        {!isFreeShipping && subtotal > 0 && (
          <div className="text-sm text-gray-500 text-right mt-1">
            Spend <span className="font-medium text-brand-black">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</span> more for free shipping
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 py-6 mb-2">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-brand-black">Total</span>
          <span className="text-2xl font-bold text-brand-gold">{formatPrice(total)}</span>
        </div>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Promo code" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-white text-sm"
          />
          <button className="px-4 py-2 bg-brand-black text-white rounded-md hover:bg-brand-gold hover:text-brand-black transition-colors whitespace-nowrap text-sm font-medium">
            Apply
          </button>
        </div>
        
        <button 
          className="w-full bg-brand-gold text-brand-black font-bold py-4 rounded-md hover:bg-brand-black hover:text-white transition-colors mb-4 text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={subtotal === 0}
        >
          Proceed to Checkout
        </button>
        
        <div className="text-center mt-4">
          <Link href="/shop" className="text-gray-500 underline hover:text-brand-gold transition-colors text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-3 pt-6 border-t border-gray-200">
        <div className="flex gap-4 opacity-60">
          <span className="text-2xl grayscale hover:grayscale-0 transition-all" title="Secure Payment">🔒</span>
          <span className="text-2xl grayscale hover:grayscale-0 transition-all" title="Visa">💳</span>
          <span className="text-2xl grayscale hover:grayscale-0 transition-all" title="Mastercard">💳</span>
        </div>
        <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">100% Secure Checkout</span>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

interface OrderReviewProps {
  onPlaceOrder: () => void;
  shippingData?: any;
}

export function OrderReview({ onPlaceOrder, shippingData }: OrderReviewProps) {
  const { items, getTotal } = useCartStore();
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [promoCode, setPromoCode] = useState('');
  
  const subtotal = getTotal();
  const shippingCost = shippingMethod === 'standard' ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% estimated tax
  const total = subtotal + shippingCost + tax;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-heading font-semibold text-brand-black mb-6">Review Your Order</h2>

      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-brand-black">Items in Order</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="p-6 flex gap-4">
              <div className="w-20 h-20 bg-gray-100 relative shrink-0">
                {item.product.images[0] ? (
                  <Image 
                    src={item.product.images[0].url} 
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-brand-black">{item.product.name}</h4>
                <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                  {item.variant.color && <p>Color: {item.variant.color}</p>}
                  {item.variant.size && <p>Size: {item.variant.size}</p>}
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-sm font-medium text-brand-black">
                {formatPrice((item.product.salePrice || item.variant.price || item.product.basePrice) * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-6">
        <h3 className="font-medium text-brand-black">Shipping Method</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-200 cursor-pointer hover:border-brand-gold transition-colors">
            <input 
              type="radio" 
              name="shipping" 
              value="standard" 
              checked={shippingMethod === 'standard'}
              onChange={() => setShippingMethod('standard')}
              className="w-4 h-4 text-brand-gold accent-brand-gold"
            />
            <span className="ml-3 flex-1 text-sm">Standard Shipping (3-5 Business Days)</span>
            <span className="text-sm font-medium">Free</span>
          </label>
          <label className="flex items-center p-4 border border-gray-200 cursor-pointer hover:border-brand-gold transition-colors">
            <input 
              type="radio" 
              name="shipping" 
              value="express" 
              checked={shippingMethod === 'express'}
              onChange={() => setShippingMethod('express')}
              className="w-4 h-4 text-brand-gold accent-brand-gold"
            />
            <span className="ml-3 flex-1 text-sm">Express Shipping (1-2 Business Days)</span>
            <span className="text-sm font-medium">$9.99</span>
          </label>
        </div>
      </div>

      {shippingData && (
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="font-medium text-brand-black mb-2">Shipping To</h3>
          <p className="text-sm text-gray-600">
            {shippingData.fullName}<br />
            {shippingData.street}<br />
            {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
            {shippingData.country}
          </p>
        </div>
      )}

      <div className="pt-6">
        <button
          onClick={onPlaceOrder}
          className="w-full py-4 bg-brand-gold text-brand-black hover:bg-brand-gold/90 transition-colors font-medium text-lg shadow-sm"
        >
          Place Order — {formatPrice(total)}
        </button>
      </div>
    </div>
  );
}

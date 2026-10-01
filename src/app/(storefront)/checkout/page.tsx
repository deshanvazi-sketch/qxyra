'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { AddressForm, PaymentForm, OrderReview, CheckoutSteps } from '@/components/checkout';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState<any>(null);
  
  useEffect(() => {
    setIsMounted(true);
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (!isMounted || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleAddressSubmit = (data: any) => {
    setShippingData(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    const orderNumber = generateOrderNumber();
    clearCart();
    router.push(`/order/${orderNumber}`);
  };

  const subtotal = getTotal();
  const shippingCost = 0; // Or based on selection
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 max-w-6xl flex text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-brand-black transition-colors">Cart</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-black font-medium">Checkout</span>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-8">
        <h1 className="text-3xl font-heading font-bold text-brand-black text-center mb-2">Secure Checkout</h1>
        <CheckoutSteps currentStep={currentStep} />

        <div className="flex flex-col lg:flex-row gap-12 mt-12">
          {/* Main Content Area */}
          <div className="flex-1">
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <AddressForm onSubmit={handleAddressSubmit} />
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6">
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-gray-500 hover:text-brand-black flex items-center transition-colors"
                  >
                    ← Back to Shipping
                  </button>
                </div>
                <PaymentForm onSubmit={handlePaymentSubmit} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6">
                  <button 
                    onClick={() => setCurrentStep(2)}
                    className="text-sm text-gray-500 hover:text-brand-black flex items-center transition-colors"
                  >
                    ← Back to Payment
                  </button>
                </div>
                <OrderReview onPlaceOrder={handlePlaceOrder} shippingData={shippingData} />
              </div>
            )}
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-24 bg-gray-50 border border-gray-100 p-6">
              <h2 className="text-lg font-heading font-semibold text-brand-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white border border-gray-100 relative shrink-0">
                      {item.product.images[0] && (
                        <Image 
                          src={item.product.images[0].url} 
                          alt={item.product.name}
                          fill
                          className="object-cover p-1"
                        />
                      )}
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-black text-white text-xs flex items-center justify-center rounded-full">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-brand-black line-clamp-1">{item.product.name}</p>
                      <p className="text-gray-500 mt-0.5">{item.variant.size} / {item.variant.color}</p>
                    </div>
                    <div className="text-sm font-medium text-brand-black">
                      {formatPrice((item.product.salePrice || item.variant.price || item.product.basePrice) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-brand-black">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-brand-black">{currentStep === 3 ? (shippingCost === 0 ? 'Free' : formatPrice(shippingCost)) : 'Calculated at next step'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-brand-black">{formatPrice(tax)}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200 flex justify-between items-end">
                  <span className="text-base font-semibold text-brand-black">Total</span>
                  <span className="text-xl font-semibold text-brand-black">{formatPrice(total)}</span>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Secure 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/context/CurrencyContext';
import { AddressForm, PaymentForm, OrderReview, CheckoutSteps } from '@/components/checkout';
import { ShippingAddressData } from '@/components/checkout/AddressForm';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import Image from 'next/image';
import { ShieldCheck, Truck, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { format } = useCurrency();

  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingAddressData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (!isMounted || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAddressSubmit = (data: ShippingAddressData) => {
    setShippingData(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const subtotal = getTotal();
  const shippingCost = 0; // 100% Free islandwide delivery
  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const orderNumber = `MM-COD-${Math.floor(100000 + Math.random() * 900000)}`;
    const formattedTotal = format(total);
    const formattedSubtotal = format(subtotal);
    const orderDate = new Date();
    const dateFormatted = orderDate.toLocaleDateString('en-GB');
    const timeFormatted = orderDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // 1. Build Item list string
    const itemsList = items
      .map((it, idx) => {
        const itemPrice = it.product.salePrice || it.variant.price || it.product.basePrice;
        const lineTotal = format(itemPrice * it.quantity);
        return (
          `${idx + 1}. *${it.product.name}*\n` +
          `   • Color: ${it.variant.color || 'Standard'}\n` +
          `   • Storage: ${it.variant.size || 'Standard'}\n` +
          `   • Qty: ${it.quantity}\n` +
          `   • Price: ${lineTotal}`
        );
      })
      .join('\n\n');

    // 2. Build Customer Details string
    const customerDetails =
      `• *Name*: ${shippingData?.fullName || 'N/A'}\n` +
      `• *Phone / WhatsApp*: ${shippingData?.phone || 'N/A'}\n` +
      `• *Delivery Address*: ${shippingData?.street || ''}, ${shippingData?.city || ''}, ${shippingData?.state || ''}\n` +
      `${shippingData?.notes ? `• *Landmark / Note*: ${shippingData.notes}\n` : ''}` +
      `• *Country*: Sri Lanka 🇱🇰`;

    // 3. Build Full WhatsApp Message
    const whatsappMessage =
      `📦 *NEW CASH ON DELIVERY (COD) ORDER!* 📦\n` +
      `----------------------------------------\n` +
      `🔖 *Order Reference*: #${orderNumber}\n` +
      `📅 *Date*: ${dateFormatted} at ${timeFormatted}\n\n` +
      `👤 *CUSTOMER DETAILS*:\n` +
      `${customerDetails}\n\n` +
      `🛍️ *ORDERED ITEMS*:\n` +
      `${itemsList}\n\n` +
      `💰 *BILLING & DELIVERY*:\n` +
      `• *Subtotal*: ${formattedSubtotal}\n` +
      `• *Islandwide Delivery*: FREE (Cash on Delivery)\n` +
      `• *TOTAL CASH TO COLLECT*: ${formattedTotal}\n` +
      `• *Payment Method*: Cash on Delivery (COD) 🚚\n\n` +
      `Please confirm order verification & islandwide dispatch from Methmi Mobile Showroom.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // 4. Save order to localStorage for confirmation page
    const orderRecord = {
      orderNumber,
      customer: shippingData,
      items: items.map((it) => ({
        id: it.id,
        productId: it.product.id,
        name: it.product.name,
        color: it.variant.color || 'Standard',
        size: it.variant.size || 'Standard',
        quantity: it.quantity,
        price: it.product.salePrice || it.variant.price || it.product.basePrice,
        image: it.product.images?.[0]?.url || '/products/vivo-y05-summit-platinum.jpg',
      })),
      subtotal,
      shippingCost,
      total,
      formattedTotal,
      paymentMethod: 'Cash on Delivery (COD)',
      date: orderDate.toISOString(),
      whatsappUrl,
    };

    try {
      localStorage.setItem('latest_methmi_order', JSON.stringify(orderRecord));
      localStorage.setItem(`order_${orderNumber}`, JSON.stringify(orderRecord));
    } catch (e) {
      console.warn('Could not save order locally', e);
    }

    // 5. Open WhatsApp directly to send the message
    window.open(whatsappUrl, '_blank');

    // 6. Clear cart & redirect to confirmation screen
    clearCart();
    router.push(`/order/${orderNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3.5">
        <div className="container mx-auto px-4 max-w-6xl flex items-center text-xs text-gray-500 font-mono">
          <Link href="/" className="hover:text-brand-black transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/cart" className="hover:text-brand-black transition-colors">
            Cart
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-brand-black font-semibold">Cash on Delivery Checkout</span>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-8">
        <div className="text-center mb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold font-bold">
            Islandwide Doorstep Cash On Delivery
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-brand-black mt-1">
            Secure Checkout
          </h1>
        </div>

        <CheckoutSteps currentStep={currentStep} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {currentStep === 1 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm animate-in fade-in duration-300">
                <AddressForm onSubmit={handleAddressSubmit} initialData={shippingData} />
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm animate-in fade-in duration-300">
                <div className="mb-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-mono font-medium text-gray-500 hover:text-brand-black flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    ← Back to Delivery Address
                  </button>
                </div>
                <PaymentForm onSubmit={handlePaymentSubmit} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm animate-in fade-in duration-300">
                <div className="mb-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-mono font-medium text-gray-500 hover:text-brand-black flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    ← Back to Payment Method
                  </button>
                </div>
                <OrderReview
                  onPlaceOrder={handlePlaceOrder}
                  shippingData={shippingData}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h2 className="text-base font-heading font-bold text-brand-black">
                  Order Summary
                </h2>
                <span className="text-xs font-mono text-gray-500">
                  {items.reduce((s, i) => s + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1 no-scrollbar">
                {items.map((item) => {
                  const price =
                    item.product.salePrice || item.variant.price || item.product.basePrice;
                  const itemImg =
                    item.product.images?.[0]?.url || '/products/vivo-y05-summit-platinum.jpg';

                  return (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <div className="relative w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 shrink-0 flex items-center justify-center p-1">
                        <Image
                          src={itemImg}
                          alt={item.product.name}
                          fill
                          sizes="60px"
                          className="object-contain p-0.5"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-black text-white text-[10px] font-mono flex items-center justify-center rounded-full font-bold">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                          {item.variant.size} • {item.variant.color}
                        </p>
                        <p className="font-mono font-bold text-gray-950 mt-1">
                          {format(price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-gray-900">{format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Islandwide Delivery</span>
                  <span className="font-mono font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Payment Method</span>
                  <span className="font-mono font-semibold text-amber-900">Cash on Delivery</span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-brand-black">Total to Pay (COD)</span>
                  <span className="text-xl font-bold font-mono text-brand-black">
                    {format(total)}
                  </span>
                </div>
              </div>

              {/* Trust signals */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-600 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Genuine TRCSL Approved Phones</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Prompt Cash on Delivery Islandwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No Upfront Deposit Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/context/CurrencyContext';
import { Truck, ShieldCheck, MapPin, Phone, User, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { ShippingAddressData } from './AddressForm';

interface OrderReviewProps {
  onPlaceOrder: () => void;
  shippingData?: ShippingAddressData | null;
  isSubmitting?: boolean;
}

export function OrderReview({ onPlaceOrder, shippingData, isSubmitting }: OrderReviewProps) {
  const { items, getTotal } = useCartStore();
  const { format } = useCurrency();

  const subtotal = getTotal();
  const shippingCost = 0; // 100% Free islandwide delivery
  const total = subtotal + shippingCost;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-semibold text-brand-black mb-1">
          Review Your Order (Cash on Delivery)
        </h2>
        <p className="text-xs text-gray-500">
          Please check your order items and delivery address before confirming.
        </p>
      </div>

      {/* Items in Order */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between">
          <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-gray-700">
            Selected Items ({items.reduce((s, i) => s + i.quantity, 0)})
          </h3>
          <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            100% Genuine TRCSL
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            const unitPrice =
              item.product.salePrice || item.variant.price || item.product.basePrice;
            const itemTotal = unitPrice * item.quantity;
            const primaryImg = item.product.images?.[0]?.url || '/products/vivo-y05-summit-platinum.jpg';

            return (
              <div key={item.id} className="p-4 sm:p-5 flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl border border-gray-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={primaryImg}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] font-mono text-gray-500 mt-1 flex flex-wrap gap-2">
                    {item.variant.color && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        Color: <strong className="text-gray-800">{item.variant.color}</strong>
                      </span>
                    )}
                    {item.variant.size && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        Storage: <strong className="text-gray-800">{item.variant.size}</strong>
                      </span>
                    )}
                    <span className="bg-gray-100 px-2 py-0.5 rounded">
                      Qty: <strong className="text-gray-800">{item.quantity}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-xs sm:text-sm text-gray-950 block">
                    {format(itemTotal)}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-[10px] text-gray-400 font-mono">
                      {format(unitPrice)} each
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery & Customer Info Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer & Address */}
        <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-700">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>Delivery Destination</span>
          </div>

          {shippingData ? (
            <div className="text-xs text-gray-700 space-y-1 leading-relaxed">
              <p className="font-semibold text-gray-950 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" />
                {shippingData.fullName}
              </p>
              <p className="text-emerald-700 font-mono font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {shippingData.phone}
              </p>
              <p className="text-gray-600">
                {shippingData.street}, {shippingData.city}, {shippingData.state}
              </p>
              {shippingData.notes && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-2">
                  <strong>Landmark / Note:</strong> {shippingData.notes}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400">No address provided</p>
          )}
        </div>

        {/* Payment & Shipping Policy */}
        <div className="bg-amber-50/40 border border-amber-200 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <Truck className="w-4 h-4 text-amber-800" />
            <span>Payment &amp; Delivery Method</span>
          </div>

          <div className="text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Payment:</span>
              <span className="font-bold text-gray-950 bg-white px-2 py-0.5 rounded border border-amber-300">
                Cash on Delivery (COD) 🚚
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Courier:</span>
              <span className="font-medium text-emerald-700">Prompt / Certis Islandwide Express</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Delivery Fee:</span>
              <span className="font-bold text-emerald-600">FREE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Warranty:</span>
              <span className="font-medium text-gray-800">1-Year Official Company Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="pt-2">
        <button
          onClick={onPlaceOrder}
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-brand-gold to-brand-gold-light hover:opacity-95 text-brand-black font-heading font-bold text-sm sm:text-base tracking-wider uppercase rounded-2xl transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
              <span>Processing Order...</span>
            </span>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-brand-black" />
              <span>Confirm &amp; Place COD Order — {format(total)}</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-gray-500 mt-2.5 flex items-center justify-center gap-1.5">
          <span>💬</span>
          <span>
            Clicking will confirm your COD order and open WhatsApp to send your order details directly to <strong>074 303 1990</strong>.
          </span>
        </p>
      </div>
    </div>
  );
}

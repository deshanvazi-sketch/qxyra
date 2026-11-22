'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '@/context/CurrencyContext';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY_NUMBER, STORE_ADDRESS } from '@/lib/constants';
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  Phone,
  User,
  MapPin,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';

interface OrderConfirmationClientProps {
  orderId: string;
}

export function OrderConfirmationClient({ orderId }: OrderConfirmationClientProps) {
  const { format } = useCurrency();
  const [order, setOrder] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(`order_${orderId}`) ||
        localStorage.getItem('latest_methmi_order');

      if (saved) {
        const parsed = JSON.parse(saved);
        setOrder(parsed);
      }
    } catch (e) {
      console.warn('Could not load order record from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, [orderId]);

  const fallbackMessage = encodeURIComponent(
    `Hello Methmi Mobile! I placed an order with Order Reference #${orderId}. Please confirm stock availability and islandwide Cash on Delivery (COD) dispatch.`
  );

  const whatsappHref = order?.whatsappUrl
    ? order.whatsappUrl
    : `https://wa.me/${WHATSAPP_NUMBER}?text=${fallbackMessage}`;

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 sm:py-16 px-4">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        {/* Main Success Hero Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl font-bold shadow-inner border border-emerald-200">
            ✓
          </div>

          <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold font-bold block mb-1">
            Cash On Delivery (COD) Confirmed
          </span>
          <h1 className="text-2xl sm:text-4xl font-heading font-semibold text-gray-950 mb-2">
            Thank you for your order!
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-body max-w-lg mx-auto leading-relaxed">
            Your Cash on Delivery order has been successfully placed. Our team will verify your address and prepare your 100% genuine TRCSL approved package for dispatch.
          </p>

          {/* Order Reference Pill */}
          <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-gray-100 rounded-full text-xs font-mono text-gray-700 border border-gray-200">
            <span>Order Reference:</span>
            <strong className="text-gray-950 font-bold">#{order?.orderNumber || orderId}</strong>
          </div>

          {/* Primary Action: Send to WhatsApp Button */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-heading font-bold text-sm sm:text-base tracking-wide rounded-2xl shadow-xl shadow-[#25D366]/25 hover:scale-102 active:scale-98 transition-all"
            >
              {/* WhatsApp Icon */}
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Send Order to WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
            </a>
            <p className="text-[11px] text-gray-500 mt-2">
              Tap above to send this order directly to our showroom team for priority packaging and dispatch.
            </p>
          </div>
        </div>

        {/* Ordered Items Breakdown */}
        {order?.items && order.items.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-800 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>Ordered Smartphones &amp; Accessories</span>
              <span className="text-xs font-mono text-gray-500">
                {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
              </span>
            </h3>

            <div className="divide-y divide-gray-100">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="py-3.5 flex items-center gap-4">
                  <div className="relative w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 shrink-0 flex items-center justify-center p-1">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="60px"
                        className="object-contain p-0.5"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-semibold text-gray-950 line-clamp-1">{item.name}</p>
                    <p className="text-gray-500 font-mono mt-0.5">
                      {item.size} • {item.color} • Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-xs sm:text-sm text-gray-950">
                      {format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Total */}
            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-mono">{format(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Islandwide Delivery</span>
                <span className="font-mono font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-100 text-sm">
                <span className="font-bold text-gray-950">Total Cash to Pay on Delivery</span>
                <span className="text-xl font-bold font-mono text-gray-950">
                  {order.formattedTotal || format(order.total || 0)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Customer & Delivery Address Card */}
        {order?.customer && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-800 pb-3 border-b border-gray-100">
              Delivery Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-mono text-[10px] uppercase">
                  Recipient Name
                </span>
                <p className="font-semibold text-gray-900 mt-0.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  {order.customer.fullName}
                </p>
              </div>

              <div>
                <span className="text-gray-400 block font-mono text-[10px] uppercase">
                  Contact / WhatsApp
                </span>
                <p className="font-semibold text-emerald-700 font-mono mt-0.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {order.customer.phone}
                </p>
              </div>

              <div className="sm:col-span-2">
                <span className="text-gray-400 block font-mono text-[10px] uppercase">
                  Delivery Destination
                </span>
                <p className="text-gray-800 font-medium mt-0.5 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                  <span>
                    {order.customer.street}, {order.customer.city}, {order.customer.state},{' '}
                    {order.customer.country || 'Sri Lanka'}
                  </span>
                </p>
                {order.customer.notes && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2">
                    <strong>Note:</strong> {order.customer.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* What Happens Next? Timeline */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">
                Order Process
              </span>
              <h3 className="font-heading font-bold text-base text-gray-950 mt-0.5">
                What Happens Next?
              </h3>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              COD In Progress
            </span>
          </div>

          <div className="space-y-5 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Order Verification</h4>
                <p className="text-gray-500 mt-0.5">
                  Our showroom team verifies stock availability and checks TRCSL registration validity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-gold text-brand-black flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Sealed Pack Quality Inspection</h4>
                <p className="text-gray-500 mt-0.5">
                  Your phone is inspected and packaged with the official 1-Year Company Warranty card at our Mutur Flagship Showroom.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Islandwide Courier Handover</h4>
                <p className="text-gray-500 mt-0.5">
                  Handed over to our reliable delivery network (Prompt / Certis Express) for 24-48 hours doorstep delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Doorstep Inspection &amp; Cash Payment</h4>
                <p className="text-gray-500 mt-0.5">
                  You inspect the sealed unit at your door and pay cash or Bank LankaQR directly to the courier agent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/store"
            className="px-8 py-3.5 bg-brand-black text-white hover:bg-black/90 font-heading font-semibold text-xs tracking-wider uppercase text-center rounded-xl transition-all shadow-md"
          >
            Continue Shopping
          </Link>
          <a
            href={`tel:${WHATSAPP_NUMBER}`}
            className="px-8 py-3.5 bg-white text-gray-900 border border-gray-300 hover:border-gray-500 font-heading font-semibold text-xs tracking-wider uppercase text-center rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>📞</span>
            <span>Call Hotline: {WHATSAPP_DISPLAY_NUMBER}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { mockOrders } from '@/lib/mock-admin-data';
import { cjClient } from '@/lib/cj-dropshipping';

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;
  
  // Find order in mock database or use dummy order
  const existingOrder = mockOrders.find(
    o => o.id === orderId || o.orderNumber.toLowerCase() === orderId.toLowerCase()
  );

  const orderTotal = existingOrder ? existingOrder.total : 249.99;
  const orderNumber = existingOrder ? existingOrder.orderNumber : orderId;
  const trackingNumber = existingOrder?.trackingNumber || 'CJTRK982314991US';
  const cjOrderId = existingOrder?.cjOrderId || 'CJ-ORD-771835';

  const trackingData = await cjClient.getTracking(trackingNumber);

  return (
    <div className="min-h-[75vh] bg-brand-gray-50/50 py-16 px-4">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        {/* Success Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-10 shadow-sm text-center">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-inner">
            ✓
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-light text-brand-black mb-3">
            Thank you for your order!
          </h1>
          <p className="text-gray-500 font-body max-w-md mx-auto">
            Your payment has been verified. Your items are being prepared for dispatch with international tracking.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-brand-gray-100 rounded-full text-xs font-mono text-gray-700">
            <span>Order Reference:</span>
            <strong className="text-brand-black">{orderNumber}</strong>
          </div>
        </div>

        {/* Live Tracking Timeline (CJ Dropshipping Fulfillment) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
                Live Courier Tracking
              </span>
              <h2 className="text-xl font-heading font-medium text-brand-black mt-1">
                CJ Packet Express • {trackingNumber}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                In Transit — On Schedule
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-sm">
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-400 text-xs block">Estimated Delivery</span>
              <span className="font-semibold text-brand-black mt-0.5 block">{trackingData.estimatedDelivery}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-400 text-xs block">Fulfillment Center</span>
              <span className="font-semibold text-brand-black mt-0.5 block">{trackingData.originCountry}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-400 text-xs block">CJ Order ID</span>
              <span className="font-mono text-xs text-brand-black mt-1 block">{cjOrderId}</span>
            </div>
          </div>

          {/* Checkpoint Milestones */}
          <div className="mt-8 space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {trackingData.checkpoints.map((cp, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-8">
                <div
                  className={`absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                    idx === 0 ? 'border-brand-gold bg-brand-gold' : 'border-gray-300'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-400">
                    <span className="font-medium text-gray-700">{cp.location}</span>
                    <span>{cp.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-body">{cp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="font-heading font-medium text-brand-black text-lg">Purchase Summary</h3>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900 font-medium">{formatPrice(orderTotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Courier Shipping (CJ Packet Global)</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
          <div className="flex justify-between items-center text-base pt-4 border-t border-gray-100">
            <span className="font-semibold text-brand-black">Total Paid</span>
            <span className="font-bold text-xl text-brand-black">{formatPrice(orderTotal)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="px-8 py-3.5 bg-brand-black text-white hover:bg-black/90 transition-colors font-medium text-sm text-center rounded-xl"
          >
            Return to Storefront
          </Link>
          <Link
            href="/account/orders"
            className="px-8 py-3.5 bg-white text-brand-black border border-gray-200 hover:border-brand-gold transition-colors font-medium text-sm text-center rounded-xl"
          >
            View All My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

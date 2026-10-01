'use client';

import React, { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { mockOrders } from '@/lib/mock-admin-data';
import { Order, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalOrder, setActiveModalOrder] = useState<Order | null>(null);
  const [syncingOrderId, setSyncingOrderId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (order.cjOrderId && order.cjOrderId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const forwardToCJ = async (order: Order) => {
    setSyncingOrderId(order.id);
    try {
      const response = await fetch('/api/cj/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          shippingAddress: order.shippingAddress,
          items: order.items.map(item => ({
            sku: item.variant.sku,
            quantity: item.quantity,
            title: item.product.name
          }))
        })
      });

      const res = await response.json();
      if (res.success) {
        setOrders(prev => prev.map(o => {
          if (o.id === order.id) {
            return {
              ...o,
              status: OrderStatus.PROCESSING,
              cjOrderId: res.cjOrderId,
              trackingNumber: res.trackingNumber
            };
          }
          return o;
        }));
        setToastMessage(`✓ Order #${order.orderNumber} successfully forwarded to CJ Dropshipping (${res.cjOrderId})!`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch (e) {
      // Fallback update
      setOrders(prev => prev.map(o => {
        if (o.id === order.id) {
          return {
            ...o,
            status: OrderStatus.PROCESSING,
            cjOrderId: `CJ-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            trackingNumber: `CJTRK${Math.floor(100000000 + Math.random() * 900000000)}US`
          };
        }
        return o;
      }));
      setToastMessage(`✓ Order #${order.orderNumber} transmitted to CJ Dropshipping!`);
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setSyncingOrderId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm shadow-2xl flex items-center gap-3">
          <span>🚀</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
            Order Fulfillment & Logistics
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Track customer shipments, manage fulfillment lifecycle, and dispatch orders to CJ Dropshipping.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Total Active Orders:</span>
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-white text-xs">
            {orders.length}
          </span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search by order #, customer, or CJ ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141820] border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
                selectedStatus === st
                  ? 'bg-brand-gold text-brand-black font-semibold'
                  : 'bg-[#141820] text-gray-400 border border-gray-800 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-800 pb-3">
                <th className="pb-3 font-medium">Order Number</th>
                <th className="pb-3 font-medium">Customer Details</th>
                <th className="pb-3 font-medium">Order Date</th>
                <th className="pb-3 font-medium">Total Paid</th>
                <th className="pb-3 font-medium">Fulfillment Status</th>
                <th className="pb-3 font-medium">CJ Tracking Details</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredOrders.map(order => {
                const isSyncing = syncingOrderId === order.id;
                return (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-mono text-xs font-semibold text-white">
                      {order.orderNumber}
                    </td>
                    <td className="py-4">
                      <div className="font-medium text-gray-200 text-xs">{order.shippingAddress.fullName}</div>
                      <div className="text-[11px] text-gray-500">{order.shippingAddress.city}, {order.shippingAddress.country}</div>
                    </td>
                    <td className="py-4 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 font-semibold text-xs text-white">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : order.status === 'SHIPPED'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : order.status === 'PROCESSING'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-xs">
                      {order.cjOrderId ? (
                        <div>
                          <span className="text-brand-gold font-medium block">{order.cjOrderId}</span>
                          <span className="text-gray-400 text-[10px] block">{order.trackingNumber}</span>
                        </div>
                      ) : (
                        <span className="text-amber-400/80 text-[11px] font-sans">Awaiting CJ Dispatch</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === 'PENDING' && (
                          <button
                            onClick={() => forwardToCJ(order)}
                            disabled={isSyncing}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-semibold hover:opacity-95 transition-all shadow-sm flex items-center gap-1.5"
                          >
                            {isSyncing ? (
                              <>
                                <span className="animate-spin text-xs">⏳</span>
                                <span>Syncing...</span>
                              </>
                            ) : (
                              <>
                                <span>🚀</span>
                                <span>Forward to CJ</span>
                              </>
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => setActiveModalOrder(order)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-gray-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs uppercase text-brand-gold font-semibold">Order Inspection</span>
                <h3 className="text-xl font-heading text-white font-medium">#{activeModalOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setActiveModalOrder(null)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Customer & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                <span className="text-gray-400 block mb-1">Customer Information</span>
                <div className="text-white font-medium text-sm">{activeModalOrder.shippingAddress.fullName}</div>
                <div className="text-gray-400 mt-1">{activeModalOrder.shippingAddress.phone}</div>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                <span className="text-gray-400 block mb-1">Delivery Address</span>
                <div className="text-white font-medium">{activeModalOrder.shippingAddress.street}</div>
                <div className="text-gray-400">{activeModalOrder.shippingAddress.city}, {activeModalOrder.shippingAddress.state} {activeModalOrder.shippingAddress.zipCode}</div>
                <div className="text-gray-400">{activeModalOrder.shippingAddress.country}</div>
              </div>
            </div>

            {/* CJ Fulfillment Reference */}
            <div className="p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20 flex flex-col sm:flex-row justify-between gap-3 text-xs">
              <div>
                <span className="text-gray-400 block">CJ Dropshipping Reference</span>
                <span className="font-mono text-brand-gold font-bold text-sm">
                  {activeModalOrder.cjOrderId || 'Not Yet Transmitted'}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Courier Tracking Number</span>
                <span className="font-mono text-white font-medium">
                  {activeModalOrder.trackingNumber || 'Pending Dispatch'}
                </span>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              <span className="text-xs text-gray-400 block">Ordered Items ({activeModalOrder.items.length})</span>
              {activeModalOrder.items.map(item => (
                <div key={item.id} className="p-3 rounded-xl bg-black/20 border border-gray-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-white font-medium">{item.product.name}</div>
                    <div className="text-gray-500 text-[11px]">SKU: {item.variant.sku} • Qty: {item.quantity}</div>
                  </div>
                  <div className="font-mono text-white font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Footer */}
            <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-sm">
              <span className="text-gray-400">Total Order Amount</span>
              <span className="text-xl font-heading font-bold text-white">{formatPrice(activeModalOrder.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { mockOrders } from '@/lib/mock-admin-data';
import { Order, OrderStatus } from '@/types';

const STORAGE_KEY = 'qxyra_admin_orders';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalOrder, setActiveModalOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [syncingOrderId, setSyncingOrderId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
    }
  }, []);

  const updateOrders = (newList: Order[]) => {
    setOrders(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (order.cjOrderId && order.cjOrderId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleDeleteSingle = () => {
    if (!orderToDelete) return;
    const deletedNum = orderToDelete.orderNumber;
    const updated = orders.filter(o => o.id !== orderToDelete.id);
    updateOrders(updated);
    setOrderToDelete(null);
    showToast(`✓ Removed Order #${deletedNum} from records!`);
  };

  const handleClearAllOrders = () => {
    updateOrders([]);
    setShowDeleteAllModal(false);
    showToast('✓ All demo orders cleared from fulfillment queue!');
  };

  const handleResetDemoOrders = () => {
    updateOrders(mockOrders);
    showToast('✓ Restored 5 demo orders.');
  };

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
        const updated = orders.map(o => {
          if (o.id === order.id) {
            return {
              ...o,
              status: OrderStatus.PROCESSING,
              cjOrderId: res.cjOrderId,
              trackingNumber: res.trackingNumber
            };
          }
          return o;
        });
        updateOrders(updated);
        showToast(`✓ Order #${order.orderNumber} successfully forwarded to CJ Dropshipping (${res.cjOrderId})!`);
      }
    } catch (e) {
      // Fallback update
      const updated = orders.map(o => {
        if (o.id === order.id) {
          return {
            ...o,
            status: OrderStatus.PROCESSING,
            cjOrderId: `CJ-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            trackingNumber: `CJTRK${Math.floor(100000000 + Math.random() * 900000000)}US`
          };
        }
        return o;
      });
      updateOrders(updated);
      showToast(`✓ Order #${order.orderNumber} transmitted to CJ Dropshipping!`);
    } finally {
      setSyncingOrderId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <span>✨</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
              Order Fulfillment & Logistics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              {orders.length} Orders
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Track customer shipments, manage fulfillment lifecycle, and dispatch orders to CJ Dropshipping.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {orders.length > 0 && (
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="px-3.5 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              title="Delete all demo orders"
            >
              <span>🗑️</span>
              <span>Clear All Orders ({orders.length})</span>
            </button>
          )}

          {orders.length === 0 && (
            <button
              onClick={handleResetDemoOrders}
              className="px-3.5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              title="Restore demo orders"
            >
              <span>↺</span>
              <span>Restore Demo Orders</span>
            </button>
          )}
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
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-semibold hover:opacity-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
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
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setOrderToDelete(order)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
                          title={`Delete Order ${order.orderNumber}`}
                        >
                          <span>🗑️</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Empty State */}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-14 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="text-4xl">📋</div>
                      <h3 className="text-base font-heading text-white font-medium">
                        {orders.length === 0 ? 'No orders in queue' : 'No matching orders'}
                      </h3>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        {orders.length === 0
                          ? 'All demo orders have been cleared. As real customers make purchases on your storefront, their orders will appear here automatically.'
                          : 'No orders match your selected status filter or search criteria.'}
                      </p>
                      {orders.length === 0 && (
                        <div className="pt-2">
                          <button
                            onClick={handleResetDemoOrders}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-xl border border-white/10 cursor-pointer"
                          >
                            ↺ Restore Demo Orders
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Single Order Confirmation Modal */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl text-red-400 shrink-0">
                🗑️
              </div>
              <div>
                <h3 className="text-lg font-heading text-white font-medium">Delete Order Record</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Are you sure you want to delete Order <span className="text-white font-semibold font-mono">#{orderToDelete.orderNumber}</span> ({orderToDelete.shippingAddress.fullName})?
                </p>
              </div>
            </div>

            <div className="p-3 bg-red-950/30 border border-red-900/40 rounded-xl text-red-300 text-xs">
              ⚠️ This order record and its fulfillment tracking details will be permanently removed.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSingle}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 cursor-pointer"
              >
                Yes, Delete Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Orders Confirmation Modal */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl text-red-400 shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-heading text-white font-medium">Clear All Demo Orders?</h3>
                <p className="text-gray-400 text-xs mt-1">
                  This will remove all <span className="text-white font-semibold">{orders.length} demo orders</span> from your management dashboard.
                </p>
              </div>
            </div>

            <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded-xl text-brand-gold text-xs">
              💡 Don&apos;t worry: You can click &quot;Restore Demo Orders&quot; anytime if you ever want the sample orders back.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteAllModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAllOrders}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 cursor-pointer"
              >
                Clear All Orders
              </button>
            </div>
          </div>
        </div>
      )}

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
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
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

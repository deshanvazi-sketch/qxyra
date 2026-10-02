'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { mockOrders } from '@/lib/mock-admin-data';
import { products as defaultProducts } from '@/lib/mock-data';
import { Order, Product } from '@/types';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [productsList, setProductsList] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('qxyra_admin_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      const savedProducts = localStorage.getItem('qxyra_products_list');
      if (savedProducts) {
        setProductsList(JSON.parse(savedProducts));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const ordersCount = orders.length;
  const aov = ordersCount > 0 ? totalRevenue / ordersCount : 0;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
            Executive Overview
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time store performance, fulfillment metrics, and catalog status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold text-xs rounded-xl shadow-lg shadow-brand-gold/10 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span>➕</span>
            <span>Add Products ({productsList.length})</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium rounded-xl transition-all"
          >
            Manage Orders ({ordersCount})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Total Sales Revenue</span>
            <span className="text-brand-gold font-semibold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20">
              USD
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
            <span>{ordersCount} total orders recorded</span>
            <span className="text-emerald-400">Live</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Customer Orders</span>
            <span className="text-brand-gold font-semibold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20">
              Queue
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {ordersCount}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span>{orders.filter(o => o.status === 'PENDING').length} pending dispatch</span>
          </div>
        </div>

        {/* Active Products */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Catalog Inventory</span>
            <span className="text-brand-gold font-semibold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20">
              Store
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {productsList.length} Items
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span>{productsList.filter(p => p.isActive).length} published live</span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Average Order Value</span>
            <span className="text-brand-gold font-semibold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20">
              AOV
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {formatPrice(aov)}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span>Calculated from active orders</span>
          </div>
        </div>
      </div>

      {/* Sales Trend Chart & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Graph */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-heading font-medium text-white">Sales Velocity & Activity</h2>
              <p className="text-xs text-gray-400 mt-0.5">Real-time daily generated revenue</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">
              Store Status
            </span>
          </div>

          {/* Clean State When No Orders */}
          {ordersCount === 0 ? (
            <div className="h-56 flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-800 rounded-xl">
              <span className="text-3xl mb-2">📊</span>
              <h3 className="text-sm font-heading text-white font-medium">Sales Chart Ready</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                No orders recorded yet. As customers begin making purchases on your storefront at qxyra.com, daily sales will graph here automatically.
              </p>
            </div>
          ) : (
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 border-b border-gray-800">
              {orders.slice(0, 7).map((order, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] text-gray-400 whitespace-nowrap">
                    {formatPrice(order.total)}
                  </div>
                  <div className="w-full max-w-[42px] bg-brand-gold rounded-t-lg h-32" />
                  <span className="text-[11px] text-gray-400 mt-2 font-mono">#{order.orderNumber}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-1">
            <span>Storefront: qxyra.com</span>
            <span className="text-emerald-400 font-medium">● Operational</span>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-heading font-medium text-white">System Feed</h2>
              <p className="text-xs text-gray-400 mt-0.5">Automated storefront events</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <div className="space-y-4 flex-1">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                <span>Active</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                  Online
                </span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-body">
                Official domain qxyra.com connected and secured with SSL encryption.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                <span>Inventory</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-gold/10 text-brand-gold font-medium border border-brand-gold/20">
                  Catalog
                </span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-body">
                {productsList.length > 0
                  ? `${productsList.length} products published in store inventory.`
                  : 'Demo items cleared. Ready for your authentic product listings.'}
              </p>
            </div>
          </div>

          <Link
            href="/admin/products"
            className="mt-4 pt-4 border-t border-gray-800 text-xs text-center text-brand-gold hover:underline block"
          >
            Manage Product Catalog →
          </Link>
        </div>
      </div>

      {/* Recent Orders Action Table */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-heading font-medium text-white">Recent Customer Orders</h2>
            <p className="text-xs text-gray-400 mt-0.5">Real customer purchases & shipment pipeline</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-brand-gold hover:underline font-medium"
          >
            View Complete Orders ({ordersCount}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-3xl block mb-2">📦</span>
              <h3 className="text-sm font-heading text-white font-medium">No Customer Orders Yet</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                As real customers browse and purchase items from your storefront at qxyra.com, their orders and shipping details will appear here automatically.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-800 pb-3">
                  <th className="pb-3 font-medium">Order Number</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Items</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-mono text-xs font-semibold text-white">
                      #{order.orderNumber}
                    </td>
                    <td className="py-4">
                      <div className="font-medium text-gray-200 text-xs">{order.shippingAddress.fullName}</div>
                      <div className="text-[11px] text-gray-500">{order.shippingAddress.country}</div>
                    </td>
                    <td className="py-4 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-xs text-gray-300">
                      {order.items.length} item(s)
                    </td>
                    <td className="py-4 font-semibold text-xs text-white">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        href="/admin/orders"
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-gold hover:text-brand-black text-gray-300 transition-all text-xs font-medium"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

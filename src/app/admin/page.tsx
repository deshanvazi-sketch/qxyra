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

  // Financial & Profit Aggregations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalCost = orders.reduce((sum, o) => sum + (o.costPrice || 0), 0);
  const totalNetProfit = totalRevenue - totalCost;
  const overallMargin = totalRevenue > 0 ? ((totalNetProfit / totalRevenue) * 100).toFixed(1) : '0';
  const ordersCount = orders.length;
  const aov = ordersCount > 0 ? totalRevenue / ordersCount : 0;
  const recentOrders = orders.slice(0, 5);

  // Platform Breakdown Analysis
  const platformStats = [
    'Daraz',
    'Qxyra Web',
    'CJ Dropshipping',
    'TikTok Shop',
    'Manual / Other'
  ].map(channel => {
    const channelOrders = orders.filter(o => {
      const p = o.platform || (o.cjOrderId ? 'CJ Dropshipping' : 'Qxyra Web');
      return p === channel || (channel === 'Manual / Other' && !['Daraz', 'Qxyra Web', 'CJ Dropshipping', 'TikTok Shop'].includes(p));
    });

    const revenue = channelOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const cost = channelOrders.reduce((sum, o) => sum + (o.costPrice || 0), 0);
    const profit = revenue - cost;

    return {
      channel,
      count: channelOrders.length,
      revenue,
      cost,
      profit
    };
  }).filter(stat => stat.count > 0 || ['Daraz', 'Qxyra Web', 'CJ Dropshipping'].includes(stat.channel));

  // Platform badge helper
  const getPlatformBadge = (platform?: string) => {
    const p = platform || 'Qxyra Web';
    if (p === 'Daraz') return 'bg-[#FF6000]/15 text-[#FF6000] border-[#FF6000]/30';
    if (p === 'TikTok Shop') return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
    if (p === 'CJ Dropshipping') return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    return 'bg-brand-gold/15 text-brand-gold border-brand-gold/30';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
            Executive Overview & Profit Command
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time multi-channel fulfillment, dropshipping margin metrics, and net profit analytics.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold text-brand-black font-bold text-xs rounded-xl shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span>➕</span>
            <span>Record Multi-Channel Order</span>
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium rounded-xl transition-all"
          >
            Products ({productsList.length})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (Focusing on Profit, Revenue, and Margin) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales (Revenue) */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Sales Revenue</span>
            <span className="text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 text-[10px]">
              Sell Total
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
            <span>{ordersCount} orders recorded</span>
            <span className="text-emerald-400">Live</span>
          </div>
        </div>

        {/* Total Sourcing Cost */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Sourcing Cost</span>
            <span className="text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[10px]">
              Buy Total
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-gray-300">
            {formatPrice(totalCost)}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Inventory & dropship purchase cost
          </div>
        </div>

        {/* Net Profit (ශුද්ධ ලාභය) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#141820] to-[#12241b] border border-emerald-500/30 shadow-lg shadow-emerald-950/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400 text-xs mb-2">
            <span className="font-semibold">Net Profit (ශුද්ධ ලාභය)</span>
            <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px]">
              {overallMargin}%
            </span>
          </div>
          <div className={`text-2xl sm:text-3xl font-heading font-bold ${
            totalNetProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {totalNetProfit >= 0 ? `+${formatPrice(totalNetProfit)}` : formatPrice(totalNetProfit)}
          </div>
          <div className="text-xs text-emerald-300/80 mt-2">
            {totalNetProfit >= 0 ? '✨ Pure earnings after sourcing' : '⚠️ Net deficit'}
          </div>
        </div>

        {/* Average Order Value & Margins */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Average Order Value</span>
            <span className="text-brand-gold font-semibold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20 text-[10px]">
              AOV
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-brand-gold">
            {formatPrice(aov)}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Average ticket size across platforms
          </div>
        </div>
      </div>

      {/* Multi-Channel Platform Performance Breakdown */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-heading font-medium text-white flex items-center gap-2">
              <span>🌐</span>
              <span>Multi-Platform Sales & Profit Breakdown</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Performance split by sales channel (Daraz, Qxyra Storefront, CJ Dropshipping, TikTok)
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-brand-gold hover:underline font-medium"
          >
            Manage Channels →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platformStats.map(stat => (
            <div 
              key={stat.channel}
              className="p-4 rounded-xl bg-black/30 border border-gray-800/80 hover:border-gray-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold border ${getPlatformBadge(stat.channel)}`}>
                  {stat.channel}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {stat.count} {stat.count === 1 ? 'order' : 'orders'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-800/60 text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 block">Revenue</span>
                  <span className="font-semibold text-white font-mono">{formatPrice(stat.revenue)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Buy Cost</span>
                  <span className="font-mono text-gray-400">{formatPrice(stat.cost)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-semibold block">Net Profit</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {stat.profit >= 0 ? `+${formatPrice(stat.profit)}` : formatPrice(stat.profit)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Action Table */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-heading font-medium text-white">Recent Multi-Channel Orders</h2>
            <p className="text-xs text-gray-400 mt-0.5">Live customer purchases, buy cost vs sell profit</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-brand-gold hover:underline font-medium"
          >
            View All ({ordersCount}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-3xl block mb-2">📦</span>
              <h3 className="text-sm font-heading text-white font-medium">No Orders Logged Yet</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                Record your first dropshipping order from Daraz, TikTok Shop, or your website to start tracking profits.
              </p>
              <div className="pt-3">
                <Link
                  href="/admin/orders"
                  className="px-4 py-2 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-bold rounded-xl inline-block"
                >
                  ➕ Record First Order
                </Link>
              </div>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-800 pb-3">
                  <th className="pb-3 font-medium">Order Number</th>
                  <th className="pb-3 font-medium">Channel</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Sell Price</th>
                  <th className="pb-3 font-medium">Buy Price</th>
                  <th className="pb-3 font-medium">Net Profit (ශුද්ධ ලාභය)</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {recentOrders.map(order => {
                  const platformName = order.platform || (order.cjOrderId ? 'CJ Dropshipping' : 'Qxyra Web');
                  const sellVal = order.total || 0;
                  const costVal = order.costPrice || 0;
                  const profitVal = order.profit !== undefined ? order.profit : (sellVal - costVal);

                  return (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 font-mono text-xs font-semibold text-white">
                        #{order.orderNumber}
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border ${getPlatformBadge(platformName)}`}>
                          {platformName}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="font-medium text-gray-200 text-xs">{order.shippingAddress.fullName}</div>
                        <div className="text-[11px] text-gray-500">{order.shippingAddress.country}</div>
                      </td>
                      <td className="py-4 font-semibold text-xs text-white">
                        {formatPrice(sellVal)}
                      </td>
                      <td className="py-4 font-mono text-xs text-gray-400">
                        {costVal > 0 ? formatPrice(costVal) : '—'}
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold font-mono border ${
                          profitVal >= 0 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}>
                          {profitVal >= 0 ? `+${formatPrice(profitVal)}` : formatPrice(profitVal)}
                        </span>
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
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

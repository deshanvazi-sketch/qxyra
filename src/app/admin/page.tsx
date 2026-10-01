'use client';

import React from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { mockAnalytics, mockOrders } from '@/lib/mock-admin-data';

export default function AdminDashboardPage() {
  const maxSale = Math.max(...mockAnalytics.dailySales.map(s => s.amount));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
            Executive Overview
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time store performance, fulfillment metrics, and CJ Dropshipping pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/cj-sync"
            className="px-4 py-2 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold text-xs rounded-xl shadow-lg shadow-brand-gold/10 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Source CJ Products</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium rounded-xl transition-all"
          >
            View All Orders
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Revenue */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Monthly Revenue</span>
            <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              +{mockAnalytics.revenueGrowthPercent}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {formatPrice(mockAnalytics.revenueThisMonth)}
          </div>
          <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
            <span>Today: {formatPrice(mockAnalytics.revenueToday)}</span>
            <span className="text-brand-gold">USD Currency</span>
          </div>
        </div>

        {/* Orders */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Orders This Month</span>
            <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              +{mockAnalytics.ordersGrowthPercent}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {mockAnalytics.ordersThisMonth}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span>{mockAnalytics.ordersToday} placed today</span>
          </div>
        </div>

        {/* AOV */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Average Order Value</span>
            <span className="text-brand-gold font-semibold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20">
              AOV
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {formatPrice(mockAnalytics.averageOrderValue)}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span>Conversion Rate: {mockAnalytics.conversionRate}%</span>
          </div>
        </div>

        {/* CJ Fulfillment */}
        <div className="p-5 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>CJ Fulfillment Rate</span>
            <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Auto-Sync
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-semibold text-white">
            {mockAnalytics.cjFulfillmentRate}%
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span>Average transit: 6.8 days</span>
          </div>
        </div>
      </div>

      {/* Sales Trend Chart & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Graph */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-heading font-medium text-white">Weekly Sales Velocity</h2>
              <p className="text-xs text-gray-400 mt-0.5">Daily generated revenue and order volume</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">
              Last 7 Days
            </span>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 border-b border-gray-800">
            {mockAnalytics.dailySales.map((day, idx) => {
              const heightPercent = Math.round((day.amount / maxSale) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatPrice(day.amount)}
                  </div>
                  <div className="w-full max-w-[42px] bg-gray-800/80 rounded-t-lg group-hover:bg-brand-gold transition-all duration-300 relative overflow-hidden flex items-end"
                       style={{ height: `${heightPercent}%` }}>
                    <div className="w-full bg-gradient-to-t from-brand-gold-dark/40 to-brand-gold h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[11px] text-gray-400 mt-2">{day.date}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-1">
            <span>Peak Day: Sep 30 ($1,890.00 / 15 orders)</span>
            <span className="text-emerald-400 font-medium">Trending +32% higher than prev week</span>
          </div>
        </div>

        {/* Live CJ Dropshipping Feed */}
        <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-heading font-medium text-white">Fulfillment Stream</h2>
              <p className="text-xs text-gray-400 mt-0.5">Automated CJ sync events</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <div className="space-y-4 flex-1">
            {mockAnalytics.recentActivity.map(act => (
              <div key={act.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-gray-700 transition-all">
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                  <span>{act.time}</span>
                  {act.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-gold/10 text-brand-gold font-medium border border-brand-gold/20">
                      {act.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-200 leading-relaxed font-body">{act.title}</p>
              </div>
            ))}
          </div>

          <Link
            href="/admin/cj-sync"
            className="mt-4 pt-4 border-t border-gray-800 text-xs text-center text-brand-gold hover:underline block"
          >
            Open CJ Dropshipping Center →
          </Link>
        </div>
      </div>

      {/* Recent Orders Action Table */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-heading font-medium text-white">Recent Customer Orders</h2>
            <p className="text-xs text-gray-400 mt-0.5">Direct fulfillment pipeline & shipping status</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-brand-gold hover:underline font-medium"
          >
            View Complete Order History ({mockOrders.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-800 pb-3">
                <th className="pb-3 font-medium">Order Number</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">CJ Order ID</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {mockOrders.map(order => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 font-mono text-xs font-semibold text-white">
                    {order.orderNumber}
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
                  <td className="py-4 font-mono text-xs text-gray-400">
                    {order.cjOrderId ? (
                      <span className="text-brand-gold">{order.cjOrderId}</span>
                    ) : (
                      <span className="text-gray-600 italic">Not Synced</span>
                    )}
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
        </div>
      </div>
    </div>
  );
}

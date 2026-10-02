'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';
import { useWishlistStore } from '@/store/wishlistStore';
import { OrderStatus } from '@/types';

export default function AccountOverviewPage() {
  const wishlistItems = useWishlistStore((state) => state.items);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('qxyra_customer_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  
  const stats = [
    { label: 'Total Orders', value: orders.length.toString() },
    { label: 'Wishlist Items', value: wishlistItems.length.toString() },
    { label: 'Total Spent', value: formatPrice(totalSpent) },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl mb-2">Welcome to your Qxyra Account</h1>
        <p className="text-gray-600">Here is a quick overview of your orders and profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="font-heading text-2xl text-brand-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/account/settings" className="bg-brand-black text-white p-4 rounded-lg flex items-center justify-between hover:bg-brand-gold transition-colors group">
          <span className="font-medium">Edit Profile</span>
          <span className="text-brand-gold group-hover:text-brand-black">&rarr;</span>
        </Link>
        <Link href="/account/addresses" className="bg-brand-black text-white p-4 rounded-lg flex items-center justify-between hover:bg-brand-gold transition-colors group">
          <span className="font-medium">Manage Addresses</span>
          <span className="text-brand-gold group-hover:text-brand-black">&rarr;</span>
        </Link>
        <Link href="/account/wishlist" className="bg-brand-black text-white p-4 rounded-lg flex items-center justify-between hover:bg-brand-gold transition-colors group">
          <span className="font-medium">View Wishlist</span>
          <span className="text-brand-gold group-hover:text-brand-black">&rarr;</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-heading text-xl">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm text-brand-gold hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="text-center py-12 px-4">
              <span className="text-3xl block mb-2">🛍️</span>
              <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
              <Link
                href="/shop"
                className="inline-block px-5 py-2.5 bg-brand-gold text-brand-black font-semibold text-xs rounded-xl hover:opacity-90 transition-all"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                  <th className="p-4 font-medium">Order #</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium">#{order.orderNumber || order.id}</td>
                    <td className="p-4 text-gray-600">{formatDate(order.createdAt || order.date)}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">{formatPrice(order.total)}</td>
                    <td className="p-4 text-right">
                      <Link href={`/account/orders`} className="text-sm font-medium hover:text-brand-gold">
                        View
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

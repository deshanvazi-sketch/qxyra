'use client';

import React from 'react';
import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';
import { useWishlistStore } from '@/store/wishlistStore';
import { OrderStatus } from '@/types';

export default function AccountOverviewPage() {
  const wishlistItems = useWishlistStore((state) => state.items);
  
  const stats = [
    { label: 'Total Orders', value: '12' },
    { label: 'Wishlist Items', value: wishlistItems.length.toString() },
    { label: 'Total Spent', value: formatPrice(1234.50) },
  ];

  const recentOrders = [
    { id: 'ORD-12345', date: '2023-10-15T10:00:00Z', status: OrderStatus.DELIVERED, total: 245.00 },
    { id: 'ORD-12346', date: '2023-09-28T14:30:00Z', status: OrderStatus.SHIPPED, total: 120.50 },
    { id: 'ORD-12347', date: '2023-08-12T09:15:00Z', status: OrderStatus.PROCESSING, total: 85.00 },
  ];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.PROCESSING: return 'bg-blue-100 text-blue-800';
      case OrderStatus.SHIPPED: return 'bg-purple-100 text-purple-800';
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's a quick overview of your account.</p>
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <th className="p-4 font-medium">Order #</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4 text-gray-600">{formatDate(order.date)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
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
        </div>
      </div>
    </div>
  );
}

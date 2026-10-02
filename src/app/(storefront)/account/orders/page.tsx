'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [orders, setOrders] = useState<any[]>([]);
  
  const filters = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

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

  const filteredOrders = orders.filter(order => 
    activeTab === 'All' || (order.status && order.status.toLowerCase() === activeTab.toLowerCase())
  );

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case OrderStatus.PROCESSING: return 'bg-blue-100 text-blue-800 border-blue-200';
      case OrderStatus.SHIPPED: return 'bg-purple-100 text-purple-800 border-purple-200';
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h1 className="font-heading text-2xl md:text-3xl">My Orders</h1>
        <Link 
          href="/shop"
          className="text-xs font-semibold text-brand-gold hover:underline"
        >
          Explore Shop →
        </Link>
      </div>
      
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveTab(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === filter 
                ? 'bg-brand-black text-brand-gold' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8">
          <span className="text-4xl block mb-3">🛍️</span>
          <h3 className="font-heading text-lg font-medium text-brand-black mb-1">
            {orders.length === 0 ? 'No orders yet' : `No ${activeTab} orders`}
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            {orders.length === 0
              ? 'When you place an order at Qxyra, your receipt, fulfillment progress, and tracking details will be displayed here.'
              : `There are currently no orders in ${activeTab.toLowerCase()} status.`}
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-brand-gold text-brand-black font-semibold text-xs rounded-xl hover:opacity-90 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <h3 className="font-heading text-lg">Order #{order.orderNumber || order.id}</h3>
                  <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt || order.date)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-black">{formatPrice(order.total)}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 1} item(s)</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <Link 
                  href={`/order/${order.id}`}
                  className="px-4 py-2 bg-white border border-brand-black text-brand-black rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium"
                >
                  View Details
                </Link>
                {order.trackingNumber && (
                  <button className="px-4 py-2 bg-brand-black text-white rounded-lg hover:bg-brand-gold hover:text-brand-black transition-colors text-xs font-medium">
                    Track Package
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

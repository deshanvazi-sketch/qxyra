'use client';

import React, { useState } from 'react';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  
  const filters = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];
  
  const mockOrders = [
    { id: 'QXY-231015-ABCD', date: '2023-10-15T10:00:00Z', status: OrderStatus.DELIVERED, items: 3, total: 245.00 },
    { id: 'QXY-230928-EFGH', date: '2023-09-28T14:30:00Z', status: OrderStatus.SHIPPED, items: 1, total: 120.50 },
    { id: 'QXY-230812-IJKL', date: '2023-08-12T09:15:00Z', status: OrderStatus.PROCESSING, items: 2, total: 85.00 },
    { id: 'QXY-230705-MNOP', date: '2023-07-05T11:45:00Z', status: OrderStatus.PENDING, items: 5, total: 430.25 },
    { id: 'QXY-230620-QRST', date: '2023-06-20T16:20:00Z', status: OrderStatus.DELIVERED, items: 1, total: 55.00 },
  ];

  const filteredOrders = mockOrders.filter(order => 
    activeTab === 'All' || order.status.toLowerCase() === activeTab.toLowerCase()
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
      <h1 className="font-heading text-2xl md:text-3xl border-b border-gray-200 pb-4">My Orders</h1>
      
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveTab(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No orders found for {activeTab}.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <h3 className="font-heading text-lg">Order {order.id}</h3>
                  <p className="text-sm text-gray-500">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-black">{formatPrice(order.total)}</p>
                    <p className="text-sm text-gray-500">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-brand-black text-brand-black rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                  View Details
                </button>
                {order.status !== OrderStatus.DELIVERED && order.status !== OrderStatus.PENDING && (
                  <button className="flex-1 md:flex-none px-4 py-2 bg-brand-black text-white rounded hover:bg-brand-gold hover:text-brand-black transition-colors text-sm font-medium">
                    Track Order
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

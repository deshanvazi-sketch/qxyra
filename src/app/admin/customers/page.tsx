'use client';

import React, { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { mockCustomers, AdminCustomer } from '@/lib/mock-admin-data';

export default function AdminCustomersPage() {
  const [customers] = useState<AdminCustomer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
            Customer Directory
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Registered accounts, client lifetime value, and order history records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Total Registered:</span>
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-white text-xs">
            {customers.length} Clients
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search by client name, email, or country..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141820] border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
        />
      </div>

      {/* Customers Table */}
      <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-800 pb-3">
                <th className="pb-3 font-medium">Customer Profile</th>
                <th className="pb-3 font-medium">Country / Market</th>
                <th className="pb-3 font-medium">Orders Placed</th>
                <th className="pb-3 font-medium">Lifetime Spend</th>
                <th className="pb-3 font-medium">Client Tier</th>
                <th className="pb-3 font-medium">Last Active</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-gold/30 to-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-xs font-bold text-brand-gold">
                        {customer.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-white text-xs leading-snug">{customer.name}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-xs text-gray-300">
                    {customer.country}
                  </td>
                  <td className="py-4 text-xs font-mono text-gray-300">
                    {customer.totalOrders} orders
                  </td>
                  <td className="py-4 text-xs font-mono font-bold text-white">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      customer.status === 'vip'
                        ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {customer.status === 'vip' ? '★ VIP Club' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-gray-400">
                    {customer.lastOrderDate}
                  </td>
                  <td className="py-4 text-right">
                    <a
                      href={`mailto:${customer.email}`}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium inline-block"
                    >
                      Email Client
                    </a>
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

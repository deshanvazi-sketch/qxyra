'use client';

import React, { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { mockCustomers, AdminCustomer } from '@/lib/mock-admin-data';

const STORAGE_KEY = 'qxyra_admin_customers';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerToDelete, setCustomerToDelete] = useState<AdminCustomer | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCustomers(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load customers from localStorage', e);
    }
  }, []);

  const updateCustomers = (newList: AdminCustomer[]) => {
    setCustomers(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save customers to localStorage', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSingle = () => {
    if (!customerToDelete) return;
    const deletedName = customerToDelete.name;
    const updated = customers.filter(c => c.id !== customerToDelete.id);
    updateCustomers(updated);
    setCustomerToDelete(null);
    showToast(`✓ Removed "${deletedName}" from client directory!`);
  };

  const handleClearAll = () => {
    updateCustomers([]);
    setShowDeleteAllModal(false);
    showToast('✓ All demo client profiles cleared!');
  };

  const handleResetDemo = () => {
    updateCustomers(mockCustomers);
    showToast('✓ Restored 5 demo client profiles.');
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
              Customer Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              {customers.length} Clients
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Registered accounts, client lifetime value, and order history records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {customers.length > 0 && (
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="px-3.5 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              title="Delete all demo customers"
            >
              <span>🗑️</span>
              <span>Clear All ({customers.length})</span>
            </button>
          )}

          {customers.length === 0 && (
            <button
              onClick={handleResetDemo}
              className="px-3.5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              title="Restore demo customers"
            >
              <span>↺</span>
              <span>Restore Demo Clients</span>
            </button>
          )}
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
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`mailto:${customer.email}`}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium inline-block"
                      >
                        Email
                      </a>
                      <button
                        onClick={() => setCustomerToDelete(customer)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
                        title={`Delete ${customer.name}`}
                      >
                        <span>🗑️</span>
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-14 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="text-4xl">👥</div>
                      <h3 className="text-base font-heading text-white font-medium">
                        {customers.length === 0 ? 'Customer directory is empty' : 'No clients found'}
                      </h3>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        {customers.length === 0
                          ? 'All demo client profiles have been cleared. As real shoppers register and checkout, they will appear here.'
                          : 'No clients match your search query.'}
                      </p>
                      {customers.length === 0 && (
                        <div className="pt-2">
                          <button
                            onClick={handleResetDemo}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-xl border border-white/10 cursor-pointer"
                          >
                            ↺ Restore Demo Clients
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

      {/* Delete Single Customer Confirmation Modal */}
      {customerToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl text-red-400 shrink-0">
                🗑️
              </div>
              <div>
                <h3 className="text-lg font-heading text-white font-medium">Delete Client Profile</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Are you sure you want to delete <span className="text-white font-semibold">"{customerToDelete.name}"</span> ({customerToDelete.email})?
                </p>
              </div>
            </div>

            <div className="p-3 bg-red-950/30 border border-red-900/40 rounded-xl text-red-300 text-xs">
              ⚠️ This client profile and account record will be permanently removed.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCustomerToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSingle}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 cursor-pointer"
              >
                Yes, Delete Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Customers Confirmation Modal */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl text-red-400 shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-heading text-white font-medium">Clear All Demo Clients?</h3>
                <p className="text-gray-400 text-xs mt-1">
                  This will remove all <span className="text-white font-semibold">{customers.length} demo client profiles</span> from your directory.
                </p>
              </div>
            </div>

            <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded-xl text-brand-gold text-xs">
              💡 Don&apos;t worry: You can click &quot;Restore Demo Clients&quot; anytime if you ever want them back.
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
                onClick={handleClearAll}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 cursor-pointer"
              >
                Clear All Clients
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState(BRAND_NAME);
  const [tagline, setTagline] = useState(BRAND_TAGLINE);
  const [currency, setCurrency] = useState('USD');
  const [supportEmail, setSupportEmail] = useState('concierge@qxyra.com');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('50');

  // CJ Dropshipping API
  const [cjEmail, setCjEmail] = useState('dropship@qxyra.com');
  const [cjApiKey, setCjApiKey] = useState('••••••••••••••••••••••••38f9b2');
  const [cjAutoSync, setCjAutoSync] = useState(true);

  // Stripe & PayHere
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [stripePublishableKey, setStripePublishableKey] = useState('pk_live_51Pq...Qxyra98');
  const [payhereEnabled, setPayhereEnabled] = useState(true);
  const [payhereMerchantId, setPayhereMerchantId] = useState('1228491');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('✓ Store settings & API integrations saved successfully!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm shadow-2xl flex items-center gap-3">
          <span>⚙️</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
            Platform Settings & API Keys
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure store branding, payment credentials, and dropshipping fulfillment rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold text-xs rounded-xl shadow-lg shadow-brand-gold/10 hover:opacity-95 transition-all"
        >
          Save All Changes
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Store Identity */}
        <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm space-y-4">
          <h2 className="text-base font-heading font-medium text-white flex items-center gap-2">
            <span>🏷️</span>
            <span>Brand Identity & Store Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">Brand Legal Name</label>
              <input
                type="text"
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">Brand Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">Primary Store Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
              >
                <option value="USD">USD ($) — Global Standard</option>
                <option value="LKR">LKR (Rs) — Sri Lankan Rupee</option>
                <option value="EUR">EUR (€) — Euro</option>
                <option value="GBP">GBP (£) — British Pound</option>
              </select>
            </div>
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">Customer Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={e => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>
        </div>

        {/* CJ Dropshipping API Integration */}
        <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-medium text-white flex items-center gap-2">
              <span>🔄</span>
              <span>CJ Dropshipping API Credentials</span>
            </h2>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">
              API Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">CJ Registered Account Email</label>
              <input
                type="email"
                value={cjEmail}
                onChange={e => setCjEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">CJ OpenAPI Key (v2.0)</label>
              <input
                type="password"
                value={cjApiKey}
                onChange={e => setCjApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
            <div>
              <div className="text-gray-200 font-medium">Automatic Order Forwarding</div>
              <div className="text-gray-500 text-[11px]">Forward customer orders to CJ Dropshipping upon successful payment.</div>
            </div>
            <button
              type="button"
              onClick={() => setCjAutoSync(!cjAutoSync)}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                cjAutoSync ? 'bg-brand-gold' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black transition-transform ${
                  cjAutoSync ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm space-y-4">
          <h2 className="text-base font-heading font-medium text-white flex items-center gap-2">
            <span>💳</span>
            <span>Payment Processing Gateways</span>
          </h2>

          {/* Stripe */}
          <div className="p-4 rounded-xl bg-black/30 border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white text-xs block">Stripe (International Visa, Mastercard, Apple Pay)</span>
                <span className="text-[11px] text-gray-500">Global multi-currency checkout</span>
              </div>
              <button
                type="button"
                onClick={() => setStripeEnabled(!stripeEnabled)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  stripeEnabled ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {stripeEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            {stripeEnabled && (
              <div className="text-xs pt-2">
                <label className="text-gray-400 block mb-1">Stripe Publishable Key</label>
                <input
                  type="text"
                  value={stripePublishableKey}
                  onChange={e => setStripePublishableKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-800 text-white font-mono text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>
            )}
          </div>

          {/* PayHere */}
          <div className="p-4 rounded-xl bg-black/30 border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white text-xs block">PayHere (Sri Lanka Local Gateway)</span>
                <span className="text-[11px] text-gray-500">Supports local bank cards, Genie, eZ Cash, and mCash</span>
              </div>
              <button
                type="button"
                onClick={() => setPayhereEnabled(!payhereEnabled)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  payhereEnabled ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {payhereEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            {payhereEnabled && (
              <div className="text-xs pt-2">
                <label className="text-gray-400 block mb-1">PayHere Merchant ID</label>
                <input
                  type="text"
                  value={payhereMerchantId}
                  onChange={e => setPayhereMerchantId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-800 text-white font-mono text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>
            )}
          </div>
        </div>

        {/* Shipping Policies */}
        <div className="p-6 rounded-2xl bg-[#141820] border border-gray-800/80 shadow-sm space-y-4">
          <h2 className="text-base font-heading font-medium text-white flex items-center gap-2">
            <span>🚚</span>
            <span>Shipping & Fulfillment Rules</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">Free Courier Shipping Threshold ($)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={e => setFreeShippingThreshold(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Orders equal or above this qualify for free global delivery.</span>
            </div>
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">Default Dropship Courier</label>
              <input
                type="text"
                disabled
                value="CJ Packet Express Special Line (4-9 days)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/20 border border-gray-800 text-gray-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

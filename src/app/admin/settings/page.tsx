'use client';

import React, { useState, useEffect } from 'react';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';
import { ADMIN_CREDENTIALS_KEY, DEFAULT_ADMIN_CONFIG } from '@/lib/admin-auth';

const STORAGE_KEY = 'qxyra_platform_settings';

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState(BRAND_NAME);
  const [tagline, setTagline] = useState(BRAND_TAGLINE);
  const [currency, setCurrency] = useState('USD');
  const [supportEmail, setSupportEmail] = useState('support@qxyra.com');
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

  // Admin Security Credentials
  const [adminLoginEmail, setAdminLoginEmail] = useState('deshanvazi@gmail.com');
  const [adminMasterPassword, setAdminMasterPassword] = useState('Qxyra@2026');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.storeName !== undefined) setStoreName(data.storeName);
        if (data.tagline !== undefined) setTagline(data.tagline);
        if (data.currency !== undefined) setCurrency(data.currency);
        if (data.supportEmail !== undefined) setSupportEmail(data.supportEmail);
        if (data.freeShippingThreshold !== undefined) setFreeShippingThreshold(data.freeShippingThreshold);
        if (data.cjEmail !== undefined) setCjEmail(data.cjEmail);
        if (data.cjApiKey !== undefined) setCjApiKey(data.cjApiKey);
        if (data.cjAutoSync !== undefined) setCjAutoSync(data.cjAutoSync);
        if (data.stripeEnabled !== undefined) setStripeEnabled(data.stripeEnabled);
        if (data.stripePublishableKey !== undefined) setStripePublishableKey(data.stripePublishableKey);
        if (data.payhereEnabled !== undefined) setPayhereEnabled(data.payhereEnabled);
        if (data.payhereMerchantId !== undefined) setPayhereMerchantId(data.payhereMerchantId);
        if (data.savedAt) setLastSavedTime(data.savedAt);
      }

      // Load custom admin credentials if saved
      const savedCreds = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
      if (savedCreds) {
        const creds = JSON.parse(savedCreds);
        if (creds.email) setAdminLoginEmail(creds.email);
        if (creds.password) setAdminMasterPassword(creds.password);
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    const settingsData = {
      storeName,
      tagline,
      currency,
      supportEmail,
      freeShippingThreshold,
      cjEmail,
      cjApiKey,
      cjAutoSync,
      stripeEnabled,
      stripePublishableKey,
      payhereEnabled,
      payhereMerchantId,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    try {
      // 1. Save general settings
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsData));
      
      // 2. Save security login credentials
      localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify({
        email: adminLoginEmail.trim().toLowerCase(),
        password: adminMasterPassword
      }));

      setLastSavedTime(settingsData.savedAt);

      // 3. Also sync to backend CJ settings API route if available
      try {
        await fetch('/api/cj/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: cjEmail,
            apiKey: cjApiKey,
            autoSync: cjAutoSync
          })
        });
      } catch (err) {
        // Local persistence still succeeded
      }

      setToastMessage('✓ All store settings & security credentials have been saved!');
      setTimeout(() => setToastMessage(null), 4500);
    } catch (error) {
      console.error('Failed to save settings', error);
      setToastMessage('⚠️ Error saving settings. Please try again.');
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <span>⚙️</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-wide">
              Platform Settings & API Keys
            </h1>
            {lastSavedTime && (
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Saved at {lastSavedTime}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Configure store branding, payment credentials, dropshipping fulfillment, and admin security.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={isSaving}
          className="px-6 py-2.5 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold text-xs rounded-xl shadow-lg shadow-brand-gold/10 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <span className="animate-spin text-xs">⏳</span>
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>Save All Changes</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Security & Admin Access Control */}
        <div className="p-6 rounded-2xl bg-[#141820] border border-brand-gold/30 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-medium text-white flex items-center gap-2">
              <span>🛡️</span>
              <span>Admin Security & Login Credentials</span>
            </h2>
            <span className="text-[10px] bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-md font-semibold">
              Protected Portal Gate
            </span>
          </div>
          <p className="text-gray-400 text-xs">
            Only administrators with these credentials can unlock and access the <code className="text-brand-gold font-mono">/admin</code> dashboard.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div>
              <label className="text-gray-300 block mb-1.5 font-medium">Owner / Administrator Email</label>
              <input
                type="email"
                required
                value={adminLoginEmail}
                onChange={e => setAdminLoginEmail(e.target.value)}
                placeholder="deshanvazi@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm focus:outline-none focus:border-brand-gold"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Also authorized: admin@qxyra.com</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-gray-300 font-medium">Admin Master Password</label>
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="text-gray-400 hover:text-white text-[11px]"
                >
                  {showAdminPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showAdminPassword ? 'text' : 'password'}
                required
                value={adminMasterPassword}
                onChange={e => setAdminMasterPassword(e.target.value)}
                placeholder="Qxyra@2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm font-mono focus:outline-none focus:border-brand-gold"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Used to unlock the dashboard at /admin/login</span>
            </div>
          </div>
        </div>

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
                placeholder="support@qxyra.com"
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
                type="text"
                value={cjApiKey}
                onChange={e => setCjApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gray-800 text-white text-sm font-mono focus:outline-none focus:border-brand-gold"
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
              className={`w-11 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
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
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
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
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
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

        {/* Bottom Save Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-bold text-xs rounded-xl shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <span className="animate-spin text-xs">⏳</span>
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';
import { getAdminSession } from '@/lib/admin-auth';

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

  // Admin Security & Master Password Update
  const [adminEmail, setAdminEmail] = useState('deshanvazi@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{ text: string; error: boolean } | null>(null);

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

      // Load active admin session email
      const session = getAdminSession();
      if (session?.email) {
        setAdminEmail(session.email);
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (!currentPassword || !newPassword) {
      setPasswordFeedback({ text: 'Please enter both current and new password.', error: true });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordFeedback({ text: 'New password must be at least 8 characters long.', error: true });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ text: 'New passwords do not match. Please verify.', error: true });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordFeedback({ text: '✓ Master password updated successfully on server!', error: false });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordFeedback({ text: data.error || 'Failed to update password.', error: true });
      }
    } catch {
      setPasswordFeedback({ text: 'Network error updating password.', error: true });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

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
        <div className="p-6 rounded-2xl bg-[#141820] border border-brand-gold/30 shadow-sm space-y-5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-heading font-medium text-white flex items-center gap-2">
                <span>🛡️</span>
                <span>Admin Master Security & Access Control</span>
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Server-side HMAC authenticated access. Public storefront links and default credentials have been removed.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Rate Limiting & Honeypot Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-black/30 p-3.5 rounded-xl border border-gray-800">
            <div>
              <span className="text-gray-500 block text-[11px]">Primary Master Admin</span>
              <span className="text-white font-medium">{adminEmail}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">Authentication Mechanism</span>
              <span className="text-brand-gold font-mono text-[11px]">HMAC SHA-256 HttpOnly Cookie</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">Brute-Force Shield</span>
              <span className="text-emerald-400 text-[11px]">5 attempts / 15m lockout</span>
            </div>
          </div>

          {/* Change Master Password Accordion / Form */}
          <div className="pt-2 border-t border-gray-800/80">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white flex items-center gap-1.5">
                  <span>🔑</span>
                  <span>Change Master Admin Password</span>
                </h3>
                <p className="text-gray-400 text-[11px]">Update your server-side master login password safely.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className="text-xs text-brand-gold hover:underline font-medium"
              >
                {showPasswordFields ? 'Collapse ▲' : 'Update Password ▼'}
              </button>
            </div>

            {showPasswordFields && (
              <div className="mt-4 p-4 rounded-xl bg-black/40 border border-gray-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-gray-800 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-gray-800 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-gray-800 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                {passwordFeedback && (
                  <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                    passwordFeedback.error
                      ? 'bg-red-500/10 border border-red-500/30 text-red-300'
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  }`}>
                    <span>{passwordFeedback.error ? '⚠️' : '✓'}</span>
                    <span>{passwordFeedback.text}</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                    className="px-4 py-2 bg-brand-gold text-brand-black font-semibold text-xs rounded-lg hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isUpdatingPassword ? (
                      <>
                        <span className="animate-spin text-xs">⏳</span>
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <span>🔒</span>
                        <span>Save New Master Password</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
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

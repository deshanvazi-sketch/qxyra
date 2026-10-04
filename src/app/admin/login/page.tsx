'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Check if session is already active via secure API
  useEffect(() => {
    fetch('/api/admin/auth', { cache: 'no-store' })
      .then(res => {
        if (res.ok) {
          router.replace(redirectTarget);
        }
      })
      .catch(() => {});
  }, [router, redirectTarget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Also save user email to local state for convenience
        try {
          localStorage.setItem('qxyra_admin_session', JSON.stringify({
            email: email.trim().toLowerCase(),
            role: 'OWNER_ADMIN',
            authenticatedAt: new Date().toISOString()
          }));
        } catch {
          // ignore
        }
        router.replace(redirectTarget);
      } else {
        setIsLoading(false);
        if (res.status === 429 || data.locked) {
          setIsLocked(true);
        }
        setErrorMessage(data.error || 'Access Denied: Invalid administrator credentials.');
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('Network error during authentication. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#12151B] border border-gray-800/80 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient gold glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="text-center space-y-3 mb-8 relative">
        <div className="flex justify-center mb-4">
          <Logo size="md" theme="dark" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span>Restricted Access Portal</span>
        </div>
        <h1 className="text-2xl font-heading font-light text-white tracking-wide mt-1">
          Command Center Login
        </h1>
        <p className="text-xs text-gray-400">
          Strict security authentication required. All access attempts are logged and monitored.
        </p>
      </div>

      {/* Error or Lockout Banner */}
      {errorMessage && (
        <div className={`mb-6 p-4 rounded-xl border text-xs flex items-start gap-3 animate-in fade-in ${
          isLocked 
            ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' 
            : 'bg-red-950/40 border-red-500/30 text-red-300'
        }`}>
          <span className="text-base shrink-0">{isLocked ? '🛑' : '⚠️'}</span>
          <div>
            <div className="font-semibold">{isLocked ? 'Security Lockout' : 'Access Denied'}</div>
            <div className="mt-0.5 opacity-90">{errorMessage}</div>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        {/* Hidden Honeypot trap to catch automated hacking bots */}
        <input
          type="text"
          name="security_honeypot_field"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        />

        <div>
          <label className="text-gray-300 block mb-1.5 font-medium">Administrator Email</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter authorized administrator email"
              disabled={isLocked || isLoading}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-gray-300 font-medium">Master Password / Key</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter master password key"
              disabled={isLocked || isLoading}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold transition-colors font-mono disabled:opacity-50"
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 flex items-center gap-2">
          <span className="text-emerald-400">🛡️</span>
          <span>Protected with cryptographic rate limiting & brute-force defense.</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isLocked}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold text-brand-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin text-sm">⏳</span>
              <span>Authenticating Secure Vault...</span>
            </>
          ) : isLocked ? (
            <>
              <span>🛑</span>
              <span>Account Temporarily Locked</span>
            </>
          ) : (
            <>
              <span>🔐</span>
              <span>Authorize & Enter Dashboard</span>
            </>
          )}
        </button>
      </form>

      {/* Return to Storefront Link */}
      <div className="mt-8 pt-6 border-t border-gray-800/80 text-center">
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <span>←</span>
          <span>Return to Qxyra Storefront</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0C0E12] text-gray-100 flex items-center justify-center p-4 font-body antialiased relative">
      <Suspense fallback={<div className="text-gray-400 text-xs">Loading Security Portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

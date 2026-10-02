'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { 
  verifyAdminCredentials, 
  setAdminSession, 
  checkIsAdminAuthenticated,
  DEFAULT_ADMIN_CONFIG 
} from '@/lib/admin-auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('deshanvazi@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect to admin
  useEffect(() => {
    if (checkIsAdminAuthenticated()) {
      router.replace(redirectTarget);
    }
  }, [router, redirectTarget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const isValid = verifyAdminCredentials(email, password);

      if (isValid) {
        setAdminSession(email);
        router.replace(redirectTarget);
      } else {
        setIsLoading(false);
        setErrorMessage('Access Denied: Invalid administrator email or master password.');
      }
    }, 600);
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
        <h1 className="text-2xl font-heading font-light text-white tracking-wide">
          Command Center Login
        </h1>
        <p className="text-xs text-gray-400">
          Restricted administrative access. Authorized personnel only.
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        <div>
          <label className="text-gray-300 block mb-1.5 font-medium">Administrator Email</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@qxyra.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold transition-colors"
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
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/40 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold transition-colors font-mono"
            />
          </div>
        </div>

        {/* Credentials Tip Card */}
        <div className="p-3.5 rounded-xl bg-brand-gold/5 border border-brand-gold/20 text-gray-300 text-[11px] space-y-1">
          <div className="text-brand-gold font-semibold flex items-center gap-1.5">
            <span>🛡️</span>
            <span>Default Master Credentials:</span>
          </div>
          <div className="text-gray-400 font-mono text-[10px] pl-5">
            <div>Email: <span className="text-white">deshanvazi@gmail.com</span></div>
            <div>Password: <span className="text-brand-gold font-bold">Qxyra@2026</span></div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold text-brand-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin text-sm">⏳</span>
              <span>Authenticating Portal...</span>
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

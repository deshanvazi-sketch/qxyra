'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { 
  checkIsAdminAuthenticated, 
  getAdminSession, 
  logoutAdmin 
} from '@/lib/admin-auth';
import { CurrencySelector } from '@/components/currency/CurrencySelector';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('deshanvazi@gmail.com');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // If on login page, render children directly without sidebar
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    fetch('/api/admin/auth', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user?.email) {
          setIsAuthenticated(true);
          setAdminEmail(data.user.email);
        } else {
          router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
        }
      })
      .catch(() => {
        if (checkIsAdminAuthenticated()) {
          setIsAuthenticated(true);
        } else {
          router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
        }
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await logoutAdmin();
    router.replace('/admin/login');
  };

  // If visiting login page, render standalone clean view
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show quick security verification spinner while checking
  if (isCheckingAuth || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0E12] flex flex-col items-center justify-center text-gray-400 gap-3">
        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono tracking-wider">Verifying Security Credentials...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0E12] text-gray-100 flex flex-col md:flex-row font-body antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#12151B] border-r border-gray-800/80 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Logo size="sm" theme="dark" />
          </Link>
        </div>

        {/* Integration Status Badge */}
        <div className="mx-4 my-4 p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/20 flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="text-xs">
            <div className="text-emerald-300 font-medium">CJ Dropshipping API</div>
            <div className="text-gray-400 text-[10px]">Connected & Active</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              pathname === '/admin'
                ? 'bg-brand-gold text-brand-black font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-lg">📊</span>
            <span>Dashboard Overview</span>
          </Link>

          <Link
            href="/admin/products"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              pathname === '/admin/products'
                ? 'bg-brand-gold text-brand-black font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-lg">📦</span>
            <span>Products & Inventory</span>
          </Link>

          <Link
            href="/admin/orders"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              pathname === '/admin/orders'
                ? 'bg-brand-gold text-brand-black font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-lg">🛍️</span>
            <span>Orders & Fulfillment</span>
          </Link>

          <Link
            href="/admin/cj-sync"
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              pathname === '/admin/cj-sync'
                ? 'bg-brand-gold text-brand-black font-semibold'
                : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20 hover:bg-brand-gold/15'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🔄</span>
              <span className="font-semibold">CJ Dropshipping</span>
            </div>
            <span className="text-[10px] bg-brand-gold text-brand-black font-bold px-1.5 py-0.5 rounded">
              SYNC
            </span>
          </Link>

          <Link
            href="/admin/customers"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              pathname === '/admin/customers'
                ? 'bg-brand-gold text-brand-black font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-lg">👥</span>
            <span>Customer Directory</span>
          </Link>

          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              pathname === '/admin/settings'
                ? 'bg-brand-gold text-brand-black font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-lg">⚙️</span>
            <span>Store Settings</span>
          </Link>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all border border-white/5"
          >
            <span>↗ View Storefront</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-medium transition-all border border-red-500/20 cursor-pointer"
          >
            <span>🚪</span>
            <span>Logout Administrator</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-[#12151B]/80 backdrop-blur-md border-b border-gray-800/80 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-white font-medium">Qxyra Global HQ</span>
            <span>/</span>
            <span className="text-xs text-brand-gold uppercase tracking-wider font-semibold">Store Management</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Real-Time Live Currency Switcher (USD / LKR) */}
            <CurrencySelector />

            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <span>Environment:</span>
              <span className="text-emerald-400 font-semibold">Production Ready</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-xs font-bold text-brand-gold">
                {adminEmail.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-white leading-tight">Owner Admin</div>
                <div className="text-[10px] text-gray-400 font-mono">{adminEmail}</div>
              </div>
            </div>

            {/* Top Quick Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Logout from Admin Dashboard"
            >
              <span>🚪</span>
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [mounted, setMounted] = useState(false);
  const [storeExpanded, setStoreExpanded] = useState(true);
  const [labsExpanded, setLabsExpanded] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[85vw] max-w-sm bg-[#0E121A] text-white border-r border-gray-800 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <Link href="/" onClick={onClose} className="hover:opacity-90 transition-opacity">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 -mr-2 text-gray-400 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Quick Division Switcher Banner */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <Link
              href="/store"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-black/50 border border-brand-gold/40 text-center text-brand-gold font-medium hover:bg-black"
            >
              🛍️ Store Catalog
            </Link>
            <Link
              href="/labs"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-black/50 border border-blue-500/40 text-center text-blue-400 font-medium hover:bg-black"
            >
              ⚡ Labs Suite
            </Link>
          </div>

          {/* Division 01: Qxyra Store Accordion */}
          <div className="space-y-2 border-b border-gray-800/80 pb-5">
            <div 
              className="flex items-center justify-between py-2 cursor-pointer"
              onClick={() => setStoreExpanded(!storeExpanded)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🛍️</span>
                <span className="font-heading text-sm font-semibold text-white">Qxyra Store</span>
                <span className="text-[9px] bg-brand-gold/20 text-brand-gold px-1.5 py-0.2 rounded font-mono">Shop</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">{storeExpanded ? '▲' : '▼'}</span>
            </div>

            {storeExpanded && (
              <div className="pl-6 space-y-3 pt-1 text-xs">
                {/* Fashion */}
                <div className="space-y-1.5">
                  <Link 
                    href="/store/fashion" 
                    onClick={onClose}
                    className="font-semibold text-brand-gold hover:underline block"
                  >
                    Fashion Collection →
                  </Link>
                  <div className="pl-3 space-y-1 text-gray-400 border-l border-gray-800">
                    <Link href="/store/fashion/regular-fit-tee" onClick={onClose} className="block hover:text-white py-0.5">
                      • Regular Fit Tee
                    </Link>
                    <Link href="/store/fashion/oversized-tee" onClick={onClose} className="block hover:text-white py-0.5">
                      • Oversized Tee
                    </Link>
                    <Link href="/store/fashion/hoodie" onClick={onClose} className="block hover:text-white py-0.5">
                      • Hoodies
                    </Link>
                  </div>
                </div>

                {/* Accessories */}
                <div className="space-y-1.5 pt-2">
                  <Link 
                    href="/store/accessories" 
                    onClick={onClose}
                    className="font-semibold text-brand-gold hover:underline block"
                  >
                    Tech Accessories →
                  </Link>
                  <div className="pl-3 space-y-1 text-gray-400 border-l border-gray-800">
                    <Link href="/store/accessories/mobile" onClick={onClose} className="block hover:text-white py-0.5">
                      • Mobile Accessories
                    </Link>
                    <Link href="/store/accessories/computer" onClick={onClose} className="block hover:text-white py-0.5">
                      • Computer Accessories
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Division 02: Qxyra Labs Accordion */}
          <div className="space-y-2 border-b border-gray-800/80 pb-5">
            <div 
              className="flex items-center justify-between py-2 cursor-pointer"
              onClick={() => setLabsExpanded(!labsExpanded)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">⚡</span>
                <span className="font-heading text-sm font-semibold text-white">Qxyra Labs</span>
                <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.2 rounded font-mono">Tech</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">{labsExpanded ? '▲' : '▼'}</span>
            </div>

            {labsExpanded && (
              <div className="pl-6 space-y-2.5 pt-1 text-xs text-gray-300">
                <Link href="/labs/software" onClick={onClose} className="block hover:text-blue-400 py-1">
                  💻 Software (Retail POS & Inventory)
                </Link>
                <Link href="/labs/solutions" onClick={onClose} className="block hover:text-blue-400 py-1">
                  🌐 Web & POS Solutions
                </Link>
                <Link href="/labs/quote" onClick={onClose} className="block hover:text-blue-400 font-semibold text-blue-400 py-1">
                  🚀 Request a Project Quote →
                </Link>
              </div>
            )}
          </div>

          {/* General Links */}
          <div className="space-y-3 text-xs font-mono uppercase tracking-wider text-gray-400 pt-1">
            <Link href="/" onClick={onClose} className="block hover:text-white py-1">
              Home
            </Link>
            <Link href="/deals" onClick={onClose} className="block hover:text-brand-gold py-1">
              Limited Deals
            </Link>
            <Link href="/about" onClick={onClose} className="block hover:text-white py-1">
              About Qxyra
            </Link>
            <Link href="/contact" onClick={onClose} className="block hover:text-white py-1">
              Contact Desk
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-gray-800 bg-black/40 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <Link href="/account" onClick={onClose} className="text-gray-300 hover:text-white">
              My Account
            </Link>
            <Link href="/account/wishlist" onClick={onClose} className="text-gray-300 hover:text-white">
              Wishlist
            </Link>
            <Link href="/cart" onClick={onClose} className="text-brand-gold font-semibold">
              Shopping Bag
            </Link>
          </div>
          <p className="text-[10px] text-gray-500 text-center font-mono">
            &copy; {new Date().getFullYear()} Qxyra. Discover. Desire. Deliver.
          </p>
        </div>
      </div>
    </>
  );
}

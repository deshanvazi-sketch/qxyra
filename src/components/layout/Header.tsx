'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BRAND_NAME, NAV_LINKS } from '@/lib/constants';
import { MobileNav } from './MobileNav';
import { Logo } from './Logo';
import { CurrencySelector } from '@/components/currency/CurrencySelector';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      )}>
        {/* Top Bar */}
        <div className="bg-brand-black text-brand-gold text-xs font-body py-1.5 px-4 sm:px-8 flex justify-between items-center tracking-wide">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">Official Qxyra Storefront</span>
            <CurrencySelector showRateBadge={false} />
          </div>
          <p className="text-center flex-1 sm:flex-initial hidden md:block">Free standard shipping on orders over $50.</p>
          <Link
            href="/admin"
            className="text-[11px] text-white hover:text-brand-gold font-medium transition-colors bg-white/10 hover:bg-white/15 px-2.5 py-0.5 rounded-full border border-white/10"
          >
            ⚡ Admin & CJ Hub
          </Link>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 -ml-2 text-brand-black"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-gold",
                    pathname === link.href ? "text-brand-gold" : "text-brand-black"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <button aria-label="Search" className="text-brand-black hover:text-brand-gold transition-colors hidden sm:block">
                <SearchIcon />
              </button>
              <Link href="/account" aria-label="Account" className="text-brand-black hover:text-brand-gold transition-colors hidden sm:block">
                <UserIcon />
              </Link>
              <Link href="/wishlist" aria-label="Wishlist" className="text-brand-black hover:text-brand-gold transition-colors">
                <HeartIcon />
              </Link>
              <Link href="/cart" aria-label="Cart" className="text-brand-black hover:text-brand-gold transition-colors relative flex items-center">
                <CartIcon />
                <span className="absolute -top-1.5 -right-2 bg-brand-gold text-brand-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[104px]" />
    </>
  );
}

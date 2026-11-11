'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { MobileNav } from './MobileNav';
import { Logo } from './Logo';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { MegaMenu } from './MegaMenu';
import { useCartStore } from '@/store/cartStore';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'store' | 'labs' | null>(null);
  const [mounted, setMounted] = useState(false);
  const menuTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const pathname = usePathname();
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleMenuEnter = (division: 'store' | 'labs') => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    menuTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(division);
    }, 130);
  };

  const handleMenuLeave = () => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    menuTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 180);
  };

  const cancelMenuLeave = () => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
  }, [pathname]);

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled 
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gray-800/80 shadow-2xl" 
          : "bg-[#0A0A0A] border-b border-gray-800/40"
      )}>
        {/* Top Announcement & Currency Bar */}
        <div className="bg-black text-brand-gold text-xs font-mono py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-gray-800/60">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">
              Qxyra Global • Store & Labs
            </span>
            <CurrencySelector showRateBadge={false} />
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-400 font-sans">
            <Link href="/labs" className="hover:text-blue-400 transition-colors hidden md:inline">
              ⚡ Qxyra Labs (Software/Web)
            </Link>
            <span className="text-gray-700 hidden md:inline">|</span>
            <span>Support: <span className="text-brand-gold">support@qxyra.com</span></span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 -ml-2 text-white hover:text-brand-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {NAV_LINKS.map((link) => {
                const isStoreLink = link.label === 'Store';
                const isLabsLink = link.label === 'Labs';
                const hasMega = isStoreLink || isLabsLink;
                const isDivisionActive = 
                  (isStoreLink && pathname.startsWith('/store')) ||
                  (isLabsLink && pathname.startsWith('/labs')) ||
                  (pathname === link.href);

                return (
                  <div
                    key={link.href}
                    className="relative py-2 my-auto"
                    onMouseEnter={() => {
                      if (isStoreLink) handleMenuEnter('store');
                      else if (isLabsLink) handleMenuEnter('labs');
                      else handleMenuLeave();
                    }}
                    onMouseLeave={handleMenuLeave}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xs font-medium tracking-wide uppercase font-mono flex items-center gap-1.5 transition-colors",
                        isDivisionActive 
                          ? (isLabsLink ? "text-blue-400" : "text-brand-gold") 
                          : "text-gray-300 hover:text-white"
                      )}
                    >
                      <span>{link.label}</span>
                      {hasMega && (
                        <span className="text-[9px] opacity-60">▼</span>
                      )}
                      {link.badge && (
                        <span className={cn(
                          "text-[9px] px-1.5 py-0.2 rounded font-mono font-normal normal-case",
                          isLabsLink 
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" 
                            : "bg-brand-gold/10 text-brand-gold border border-brand-gold/30"
                        )}>
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-5 text-gray-300">
              <ThemeToggle />
              <Link 
                href="/search" 
                aria-label="Search" 
                className="hover:text-brand-gold transition-colors p-1.5 hidden sm:block"
              >
                <SearchIcon />
              </Link>
              <Link 
                href="/account" 
                aria-label="Account" 
                className="hover:text-brand-gold transition-colors p-1.5 hidden sm:block"
              >
                <UserIcon />
              </Link>
              <Link 
                href="/account/wishlist" 
                aria-label="Wishlist" 
                className="hover:text-red-400 transition-colors p-1.5"
              >
                <HeartIcon />
              </Link>
              <Link 
                href="/cart" 
                aria-label="Cart" 
                className="hover:text-brand-gold transition-colors relative p-1.5 flex items-center"
              >
                <CartIcon />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center font-mono shadow-md animate-in zoom-in-75">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMegaMenu && (
          <MegaMenu
            division={activeMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
            onMouseEnter={cancelMenuLeave}
            onMouseLeave={handleMenuLeave}
          />
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[110px]" />
    </>
  );
}

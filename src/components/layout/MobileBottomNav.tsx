'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

// SVG Icons tailored for compact mobile bottom navigation
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={active ? "1.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const PhoneIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={active ? "1.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const SearchIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={active ? "2.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={active ? "1.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const UserIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={active ? "1.5" : "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export function MobileBottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      label: 'Home',
      href: '/',
      active: pathname === '/',
      icon: (active: boolean) => <HomeIcon active={active} />,
    },
    {
      label: 'Phones',
      href: '/store/phones',
      active: pathname.startsWith('/store/phones') || pathname === '/store',
      badge: 'TRCSL',
      icon: (active: boolean) => <PhoneIcon active={active} />,
    },
    {
      label: 'Search',
      href: '/search',
      active: pathname === '/search',
      icon: (active: boolean) => <SearchIcon active={active} />,
    },
    {
      label: 'Cart',
      href: '/cart',
      active: pathname === '/cart',
      hasCount: true,
      icon: (active: boolean) => <CartIcon active={active} />,
    },
    {
      label: 'Account',
      href: '/account',
      active: pathname.startsWith('/account'),
      icon: (active: boolean) => <UserIcon active={active} />,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0A0D14]/95 backdrop-blur-xl border-t border-gray-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.7)] px-2 py-1.5 transition-all"
      style={{ paddingBottom: 'calc(0.4rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-95 group",
              item.active 
                ? "text-[#D49B6A]" 
                : "text-gray-400 hover:text-gray-200"
            )}
          >
            {/* Top Indicator Glow Bar for active item */}
            {item.active && (
              <span className="absolute -top-1.5 w-6 h-0.5 rounded-full bg-gradient-to-r from-[#D49B6A] to-amber-300 shadow-[0_0_8px_rgba(212,155,106,0.8)]" />
            )}

            {/* Icon & Badges */}
            <div className="relative flex items-center justify-center w-6 h-6 my-0.5">
              {item.icon(item.active)}

              {/* Cart Count Badge */}
              {item.hasCount && mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-[#D49B6A] to-amber-400 text-black text-[9px] font-bold font-mono min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}

              {/* Micro TRCSL badge for Phones */}
              {item.badge && !item.hasCount && (
                <span className="absolute -top-2 -right-3 text-[7px] font-mono font-bold bg-[#D49B6A]/20 text-[#D49B6A] border border-[#D49B6A]/40 px-1 rounded-sm leading-none py-0.5">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Text Label */}
            <span className={cn(
              "text-[10px] font-medium font-sans tracking-tight transition-colors mt-0.5",
              item.active ? "text-[#D49B6A] font-semibold" : "text-gray-400"
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

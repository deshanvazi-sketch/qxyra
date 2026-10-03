'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, Currency } from '@/context/CurrencyContext';

interface CurrencySelectorProps {
  variant?: 'compact' | 'full' | 'pill';
  showRateBadge?: boolean;
  className?: string;
}

export function CurrencySelector({
  variant = 'compact',
  showRateBadge = true,
  className = '',
}: CurrencySelectorProps) {
  const { currency, setCurrency, exchangeRate, isLoading, lastUpdated, refreshRate } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selected: Currency) => {
    setCurrency(selected);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-flex items-center gap-2 ${className}`} ref={dropdownRef}>
      {/* Live Market Rate Indicator (optional badge) */}
      {showRateBadge && (
        <div 
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300 font-mono"
          title={`Live Forex Rate (USD/LKR): Updated ${lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Recently'}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-gray-400 font-sans">Forex:</span>
          <span className="font-semibold text-emerald-300">1 USD = Rs. {exchangeRate.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              refreshRate();
            }}
            disabled={isLoading}
            className="ml-1 text-gray-400 hover:text-white transition-colors p-0.5"
            title="Refresh Live Exchange Rate"
          >
            <span className={`inline-block text-[10px] ${isLoading ? 'animate-spin' : ''}`}>🔄</span>
          </button>
        </div>
      )}

      {/* Currency Switcher Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-all cursor-pointer shadow-sm active:scale-95"
        title="Switch Display Currency"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-sm">
          {currency === 'USD' ? '🇺🇸' : '🇱🇰'}
        </span>
        <span className="font-semibold tracking-wide">
          {currency === 'USD' ? 'USD ($)' : 'LKR (Rs.)'}
        </span>
        <span className="text-[10px] text-gray-400 transition-transform duration-200">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[#161A22] border border-gray-700/80 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="px-3 py-1.5 border-b border-gray-800/80 text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center justify-between">
            <span>Select Currency</span>
            <span className="text-emerald-400 font-mono">Live Sync</span>
          </div>

          <div className="p-1.5 space-y-1">
            {/* USD Option */}
            <button
              onClick={() => handleSelect('USD')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-brand-gold text-brand-black font-semibold'
                  : 'text-gray-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🇺🇸</span>
                <div>
                  <div className="font-semibold leading-tight">USD ($)</div>
                  <div className={`text-[10px] ${currency === 'USD' ? 'text-black/80' : 'text-gray-400'}`}>
                    United States Dollar • Global
                  </div>
                </div>
              </div>
              {currency === 'USD' && <span className="font-bold text-sm">✓</span>}
            </button>

            {/* LKR Option */}
            <button
              onClick={() => handleSelect('LKR')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                currency === 'LKR'
                  ? 'bg-brand-gold text-brand-black font-semibold'
                  : 'text-gray-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🇱🇰</span>
                <div>
                  <div className="font-semibold leading-tight">LKR (Rs.)</div>
                  <div className={`text-[10px] ${currency === 'LKR' ? 'text-black/80' : 'text-gray-400'}`}>
                    Sri Lankan Rupee • Live Rate
                  </div>
                </div>
              </div>
              {currency === 'LKR' && <span className="font-bold text-sm">✓</span>}
            </button>
          </div>

          {/* Rate Summary Footer */}
          <div className="px-3 pt-2 pb-1 border-t border-gray-800/80 text-[10px] text-gray-400 flex items-center justify-between">
            <span>Market Rate:</span>
            <span className="font-mono text-emerald-400 font-semibold">
              $1 = Rs. {exchangeRate.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

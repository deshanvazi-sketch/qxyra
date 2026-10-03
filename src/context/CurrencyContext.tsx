'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Currency = 'USD' | 'LKR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  exchangeRate: number; // 1 USD = exchangeRate LKR
  lastUpdated: string | null;
  isLoading: boolean;
  source: string;
  refreshRate: () => Promise<void>;
  convert: (amountInUSD: number) => number;
  convertToUSD: (amountInLKR: number) => number;
  format: (amountInUSD: number, showSign?: boolean) => string;
  formatAmount: (amount: number, targetCurrency?: Currency, showSign?: boolean) => string;
}

const DEFAULT_LKR_RATE = 330.41;
const STORAGE_KEY = 'qxyra_currency';

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(DEFAULT_LKR_RATE);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [source, setSource] = useState<string>('Live Forex Market');

  // Load saved preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Currency;
      if (saved === 'USD' || saved === 'LKR') {
        setCurrencyState(saved);
      }
      const savedRate = localStorage.getItem('qxyra_forex_rate');
      if (savedRate) {
        const parsed = parseFloat(savedRate);
        if (!isNaN(parsed) && parsed > 100) {
          setExchangeRate(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading currency settings', e);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLiveRate = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. First try our Next.js API route
      const res = await fetch('/api/forex', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data?.rate && typeof data.rate === 'number') {
          setExchangeRate(data.rate);
          setLastUpdated(data.lastUpdated || new Date().toISOString());
          setSource(data.source || 'Live Forex Market');
          try {
            localStorage.setItem('qxyra_forex_rate', data.rate.toString());
          } catch (e) {
            console.error(e);
          }
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fallback direct client fetch to Open ER API if local API is unreachable
      try {
        const fallbackRes = await fetch('https://open.er-api.com/v6/latest/USD');
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          const lkr = fallbackData?.rates?.LKR;
          if (typeof lkr === 'number') {
            const formatted = Number(lkr.toFixed(2));
            setExchangeRate(formatted);
            setLastUpdated(new Date().toISOString());
            setSource('Direct Open Forex API (Live)');
            try {
              localStorage.setItem('qxyra_forex_rate', formatted.toString());
            } catch (e) {
              console.error(e);
            }
          }
        }
      } catch (err) {
        console.warn('Using default baseline Forex rate', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch live rate on mount and every 10 minutes
  useEffect(() => {
    fetchLiveRate();
    const interval = setInterval(fetchLiveRate, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchLiveRate]);

  // Convert USD amount into active currency numeric value
  const convert = useCallback((amountInUSD: number): number => {
    if (isNaN(amountInUSD)) return 0;
    if (currency === 'LKR') {
      return Number((amountInUSD * exchangeRate).toFixed(2));
    }
    return Number(amountInUSD.toFixed(2));
  }, [currency, exchangeRate]);

  // Convert LKR amount back to USD numeric value
  const convertToUSD = useCallback((amountInLKR: number): number => {
    if (isNaN(amountInLKR) || exchangeRate <= 0) return 0;
    return Number((amountInLKR / exchangeRate).toFixed(2));
  }, [exchangeRate]);

  // Format an amount (assumed in USD) using the active currency
  const format = useCallback((amountInUSD: number, showSign: boolean = false): string => {
    if (isNaN(amountInUSD)) return currency === 'LKR' ? 'Rs. 0.00' : '$0.00';

    const isNegative = amountInUSD < 0;
    const absUSD = Math.abs(amountInUSD);

    let prefix = '';
    if (showSign) {
      if (isNegative) prefix = '-';
      else if (amountInUSD > 0) prefix = '+';
    } else if (isNegative) {
      prefix = '-';
    }

    if (currency === 'LKR') {
      const lkrVal = absUSD * exchangeRate;
      const formattedNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(lkrVal);
      return `${prefix}Rs. ${formattedNumber}`;
    }

    // USD format
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(absUSD);
    return `${prefix}$${formattedNumber}`;
  }, [currency, exchangeRate]);

  // Format explicitly in given target currency
  const formatAmount = useCallback((
    amount: number, 
    targetCurrency: Currency = currency, 
    showSign: boolean = false
  ): string => {
    if (isNaN(amount)) return targetCurrency === 'LKR' ? 'Rs. 0.00' : '$0.00';

    const isNegative = amount < 0;
    const absVal = Math.abs(amount);

    let prefix = '';
    if (showSign) {
      if (isNegative) prefix = '-';
      else if (amount > 0) prefix = '+';
    } else if (isNegative) {
      prefix = '-';
    }

    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(absVal);

    return targetCurrency === 'LKR' ? `${prefix}Rs. ${formattedNumber}` : `${prefix}$${formattedNumber}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRate,
        lastUpdated,
        isLoading,
        source,
        refreshRate: fetchLiveRate,
        convert,
        convertToUSD,
        format,
        formatAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Graceful fallback if used outside Provider
    return {
      currency: 'USD' as Currency,
      setCurrency: () => {},
      exchangeRate: DEFAULT_LKR_RATE,
      lastUpdated: null,
      isLoading: false,
      source: 'Default Baseline',
      refreshRate: async () => {},
      convert: (amt: number) => amt,
      convertToUSD: (amt: number) => amt,
      format: (amt: number, showSign: boolean = false) => {
        const sign = showSign && amt > 0 ? '+' : amt < 0 ? '-' : '';
        return `${sign}$${Math.abs(amt).toFixed(2)}`;
      },
      formatAmount: (amt: number) => `$${amt.toFixed(2)}`,
    };
  }
  return context;
}

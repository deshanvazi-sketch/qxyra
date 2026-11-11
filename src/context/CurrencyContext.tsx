'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Currency = 'USD' | 'LKR' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'INR' | 'AED';

export interface CurrencyMetadata {
  symbol: string;
  label: string;
  flag: string;
  code: Currency;
}

export const CURRENCIES: Record<Currency, CurrencyMetadata> = {
  USD: { code: 'USD', symbol: '$', label: 'US Dollar', flag: '🇺🇸' },
  LKR: { code: 'LKR', symbol: 'Rs. ', label: 'Sri Lankan Rupee', flag: '🇱🇰' },
  EUR: { code: 'EUR', symbol: '€', label: 'Euro', flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', label: 'British Pound', flag: '🇬🇧' },
  AUD: { code: 'AUD', symbol: 'A$', label: 'Australian Dollar', flag: '🇦🇺' },
  CAD: { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar', flag: '🇨🇦' },
  INR: { code: 'INR', symbol: '₹', label: 'Indian Rupee', flag: '🇮🇳' },
  AED: { code: 'AED', symbol: 'AED ', label: 'UAE Dirham', flag: '🇦🇪' },
};

const DEFAULT_RATES: Record<Currency, number> = {
  USD: 1,
  LKR: 330.41,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.38,
  INR: 84.50,
  AED: 3.67,
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  exchangeRate: number; // rate of active currency relative to USD (1 USD = X Currency)
  rates: Record<Currency, number>;
  lastUpdated: string | null;
  isLoading: boolean;
  source: string;
  detectedCountry: string | null;
  refreshRate: () => Promise<void>;
  convert: (amountInUSD: number) => number;
  convertToUSD: (amountInLocal: number) => number;
  format: (amountInUSD: number, showSign?: boolean) => string;
  formatAmount: (amount: number, targetCurrency?: Currency, showSign?: boolean) => string;
}

const STORAGE_KEY = 'qxyra_currency';
const RATES_STORAGE_KEY = 'qxyra_forex_rates';

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

/**
 * Automatically detect visitor's country and default currency
 */
function detectVisitorLocation(): { currency: Currency; country: string } {
  if (typeof window === 'undefined') {
    return { currency: 'USD', country: 'Global' };
  }

  try {
    // 1. Timezone detection (fastest, zero network delay)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    if (tz.includes('Colombo') || tz.includes('Sri_Lanka')) {
      return { currency: 'LKR', country: 'Sri Lanka' };
    }
    if (tz.includes('London') || tz.includes('Belfast')) {
      return { currency: 'GBP', country: 'United Kingdom' };
    }
    if (
      tz.includes('Berlin') || tz.includes('Paris') || tz.includes('Rome') || 
      tz.includes('Madrid') || tz.includes('Amsterdam') || tz.includes('Vienna') || 
      tz.includes('Athens') || tz.includes('Dublin') || tz.includes('Brussels') || 
      tz.includes('Helsinki') || tz.includes('Lisbon') || tz.includes('Europe')
    ) {
      return { currency: 'EUR', country: 'Europe' };
    }
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane') || tz.includes('Perth') || tz.includes('Australia')) {
      return { currency: 'AUD', country: 'Australia' };
    }
    if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal') || tz.includes('Canada')) {
      return { currency: 'CAD', country: 'Canada' };
    }
    if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Delhi') || tz.includes('Mumbai') || tz.includes('India')) {
      return { currency: 'INR', country: 'India' };
    }
    if (tz.includes('Dubai') || tz.includes('Abu_Dhabi') || tz.includes('UAE')) {
      return { currency: 'AED', country: 'United Arab Emirates' };
    }

    // 2. Locale detection fallback
    const locale = (navigator.language || '').toUpperCase();
    if (locale.endsWith('-LK')) return { currency: 'LKR', country: 'Sri Lanka' };
    if (locale.endsWith('-GB')) return { currency: 'GBP', country: 'United Kingdom' };
    if (locale.endsWith('-AU')) return { currency: 'AUD', country: 'Australia' };
    if (locale.endsWith('-CA')) return { currency: 'CAD', country: 'Canada' };
    if (locale.endsWith('-IN')) return { currency: 'INR', country: 'India' };
    if (locale.endsWith('-AE')) return { currency: 'AED', country: 'United Arab Emirates' };
    if (['-FR', '-DE', '-IT', '-ES', '-NL', '-IE', '-PT', '-GR', '-AT'].some(c => locale.endsWith(c))) {
      return { currency: 'EUR', country: 'Europe' };
    }
  } catch (err) {
    console.warn('Geolocation detection error', err);
  }

  return { currency: 'USD', country: 'Global' };
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [rates, setRates] = useState<Record<Currency, number>>(DEFAULT_RATES);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [source, setSource] = useState<string>('Live Forex Market');
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  // Initialize: Load saved preference OR auto-detect from visitor country
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Currency;
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
      } else {
        // Auto-detect visitor's country and default to their local currency!
        const detected = detectVisitorLocation();
        setCurrencyState(detected.currency);
        setDetectedCountry(detected.country);
        console.log(`[Qxyra Geo-Currency] Detected visitor from ${detected.country} -> Auto-selected ${detected.currency}`);
      }

      // Load cached rates if available
      const savedRates = localStorage.getItem(RATES_STORAGE_KEY);
      if (savedRates) {
        const parsed = JSON.parse(savedRates);
        if (parsed && typeof parsed === 'object') {
          setRates(prev => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      console.error('Error initializing currency context', e);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    if (!CURRENCIES[c]) return;
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLiveRates = useCallback(async () => {
    setIsLoading(true);
    try {
      // Direct client fetch to Open ER API (Reliable, free, live multi-currency rates)
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (res.ok) {
        const data = await res.json();
        if (data?.rates) {
          const newRates: Record<Currency, number> = {
            USD: 1,
            LKR: data.rates.LKR || DEFAULT_RATES.LKR,
            EUR: data.rates.EUR || DEFAULT_RATES.EUR,
            GBP: data.rates.GBP || DEFAULT_RATES.GBP,
            AUD: data.rates.AUD || DEFAULT_RATES.AUD,
            CAD: data.rates.CAD || DEFAULT_RATES.CAD,
            INR: data.rates.INR || DEFAULT_RATES.INR,
            AED: data.rates.AED || DEFAULT_RATES.AED,
          };

          setRates(newRates);
          setLastUpdated(new Date().toISOString());
          setSource('Live Forex Network');
          try {
            localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(newRates));
          } catch (e) {
            console.error(e);
          }
        }
      }
    } catch (err) {
      console.warn('Live forex update skipped, using cached baseline', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch live rates on mount & refresh every 15 minutes
  useEffect(() => {
    fetchLiveRates();
    const interval = setInterval(fetchLiveRates, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchLiveRates]);

  const activeRate = rates[currency] || 1;

  // Convert USD amount into active currency numeric value
  const convert = useCallback((amountInUSD: number): number => {
    if (isNaN(amountInUSD)) return 0;
    const rate = rates[currency] || 1;
    return Number((amountInUSD * rate).toFixed(2));
  }, [currency, rates]);

  // Convert local amount back to USD numeric value
  const convertToUSD = useCallback((amountInLocal: number): number => {
    if (isNaN(amountInLocal)) return 0;
    const rate = rates[currency] || 1;
    if (rate <= 0) return 0;
    return Number((amountInLocal / rate).toFixed(2));
  }, [currency, rates]);

  // Format an amount (assumed in USD) using the active currency
  const format = useCallback((amountInUSD: number, showSign: boolean = false): string => {
    if (isNaN(amountInUSD)) return `${CURRENCIES[currency]?.symbol || '$'}0.00`;

    const isNegative = amountInUSD < 0;
    const absUSD = Math.abs(amountInUSD);
    const rate = rates[currency] || 1;
    const localVal = absUSD * rate;

    let prefix = '';
    if (showSign) {
      if (isNegative) prefix = '-';
      else if (amountInUSD > 0) prefix = '+';
    } else if (isNegative) {
      prefix = '-';
    }

    const meta = CURRENCIES[currency] || CURRENCIES.USD;

    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(localVal);

    return `${prefix}${meta.symbol}${formattedNumber}`;
  }, [currency, rates]);

  // Format an explicit amount with optional target currency
  const formatAmount = useCallback((
    amount: number,
    targetCurrency?: Currency,
    showSign: boolean = false
  ): string => {
    const cur = targetCurrency || currency;
    const meta = CURRENCIES[cur] || CURRENCIES.USD;
    const isNegative = amount < 0;
    const abs = Math.abs(amount);

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
    }).format(abs);

    return `${prefix}${meta.symbol}${formattedNumber}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRate: activeRate,
        rates,
        lastUpdated,
        isLoading,
        source,
        detectedCountry,
        refreshRate: fetchLiveRates,
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
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

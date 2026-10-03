import { NextResponse } from 'next/server';

// Fallback baseline rate in case external rate providers are unreachable
const FALLBACK_LKR_RATE = 330.41;

interface ForexCache {
  rate: number;
  timestamp: number;
  source: string;
}

let cachedRate: ForexCache | null = null;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache

export async function GET() {
  const now = Date.now();

  // Return cached rate if still fresh
  if (cachedRate && now - cachedRate.timestamp < CACHE_DURATION_MS) {
    return NextResponse.json({
      success: true,
      base: 'USD',
      target: 'LKR',
      rate: cachedRate.rate,
      lastUpdated: new Date(cachedRate.timestamp).toISOString(),
      source: cachedRate.source,
      cached: true,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    });
  }

  // Attempt Primary Provider (Open Exchange Rates / ER-API)
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 300 }, // Next.js fetch revalidation
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const data = await res.json();
      const lkr = data?.rates?.LKR;
      if (typeof lkr === 'number' && lkr > 100) {
        cachedRate = {
          rate: Number(lkr.toFixed(2)),
          timestamp: now,
          source: 'Open Exchange Rates (Live)',
        };

        return NextResponse.json({
          success: true,
          base: 'USD',
          target: 'LKR',
          rate: cachedRate.rate,
          lastUpdated: new Date(now).toISOString(),
          source: cachedRate.source,
          cached: false,
        });
      }
    }
  } catch (err) {
    console.warn('Primary Forex API failed, trying secondary...', err);
  }

  // Attempt Secondary Provider (ExchangeRate-API v4)
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const data = await res.json();
      const lkr = data?.rates?.LKR;
      if (typeof lkr === 'number' && lkr > 100) {
        cachedRate = {
          rate: Number(lkr.toFixed(2)),
          timestamp: now,
          source: 'ExchangeRate API v4 (Live)',
        };

        return NextResponse.json({
          success: true,
          base: 'USD',
          target: 'LKR',
          rate: cachedRate.rate,
          lastUpdated: new Date(now).toISOString(),
          source: cachedRate.source,
          cached: false,
        });
      }
    }
  } catch (err) {
    console.warn('Secondary Forex API failed, using fallback...', err);
  }

  // Fallback if both external APIs are unreachable
  const finalRate = cachedRate?.rate || FALLBACK_LKR_RATE;
  return NextResponse.json({
    success: true,
    base: 'USD',
    target: 'LKR',
    rate: finalRate,
    lastUpdated: new Date(now).toISOString(),
    source: cachedRate ? 'Cached Market Rate' : 'Central Bank Fallback Baseline',
    cached: true,
  });
}

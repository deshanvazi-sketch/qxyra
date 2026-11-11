'use client';

import Link from 'next/link';

export function PricingTable() {
  const comparison = [
    { feature: 'Point of Sale (POS) Hardware Support', starter: 'Basic Receipt', business: 'Thermal + Dual Display', enterprise: 'Full Hardware Rig' },
    { feature: 'Inventory & SKU Management', starter: 'Up to 500 SKUs', business: 'Unlimited SKUs', enterprise: 'Multi-Warehouse' },
    { feature: 'Payment Gateway Integration', starter: '1 Gateway', business: 'Multi-Gateway (Card/Stripe/Local)', enterprise: 'Custom Ledger / Split' },
    { feature: 'Real-Time Forex (USD / LKR)', starter: 'Static Rates', business: 'Live Hourly API Rates', enterprise: 'Custom Currency Pairs' },
    { feature: 'Staff Accounts & Permissions', starter: 'Up to 2 Staff', business: 'Up to 10 Cashiers', enterprise: 'Unlimited Role Hierarchy' },
    { feature: 'Delivery / Launch Timeline', starter: '2 – 3 Days', business: '5 – 7 Days', enterprise: '14 – 21 Days' },
    { feature: 'Post-Launch Priority Support', starter: '30 Days Email', business: '90 Days Phone & WhatsApp', enterprise: '1 Year 24/7 SLA' },
  ];

  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-800 bg-[#0E1422] shadow-2xl">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-gray-800 bg-black/40">
            <th className="p-5 font-heading text-sm text-white font-medium">Core Capabilities</th>
            <th className="p-5 font-heading text-sm text-gray-300 font-medium">Starter Tier</th>
            <th className="p-5 font-heading text-sm text-blue-400 font-medium bg-blue-500/10">Business Suite (Recommended)</th>
            <th className="p-5 font-heading text-sm text-purple-400 font-medium">Enterprise Custom</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/80">
          {comparison.map((row, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 text-gray-300 font-medium">{row.feature}</td>
              <td className="p-4 text-gray-400">{row.starter}</td>
              <td className="p-4 text-blue-300 font-semibold bg-blue-500/[0.03]">{row.business}</td>
              <td className="p-4 text-purple-300">{row.enterprise}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-black/60 border-t border-gray-800">
            <td className="p-5 font-semibold text-white">Estimated Investment</td>
            <td className="p-5 font-bold text-white font-mono text-sm">$160+</td>
            <td className="p-5 font-bold text-blue-400 font-mono text-base bg-blue-500/10">$280 – $420</td>
            <td className="p-5 font-bold text-purple-400 font-mono text-sm">Custom Quote</td>
          </tr>
          <tr className="bg-black/80">
            <td className="p-4"></td>
            <td className="p-4">
              <Link href="/labs/quote?tier=starter" className="text-xs text-gray-300 hover:text-white underline">
                Get Started →
              </Link>
            </td>
            <td className="p-4 bg-blue-500/10">
              <Link href="/labs/quote?tier=business" className="px-4 py-2 bg-blue-500 text-white font-semibold text-xs rounded-lg shadow-md hover:bg-blue-400 inline-block">
                Select Suite →
              </Link>
            </td>
            <td className="p-4">
              <Link href="/labs/quote?tier=enterprise" className="text-xs text-purple-300 hover:text-white underline">
                Schedule Call →
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

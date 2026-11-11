import { Metadata } from 'next';
import Link from 'next/link';
import { softwareProducts, servicePackages, labsStats } from '@/lib/labs-data';
import { LabsHero } from '@/components/labs/LabsHero';
import { ServiceCard } from '@/components/labs/ServiceCard';
import { PricingTable } from '@/components/labs/PricingTable';

export const metadata: Metadata = {
  title: 'Qxyra Labs | Point of Sale (POS) Systems & Custom Web Engineering',
  description: 'Enterprise retail Point of Sale suites, real-time multi-channel inventory orchestrators, and high-performance bespoke e-commerce platforms.',
};

export default function LabsLandingPage() {
  return (
    <div className="space-y-20 pb-24">
      {/* Hero Section */}
      <LabsHero
        tag="Division 02 Flagship"
        title="Software & Web Solutions Engineered for Modern Commerce"
        subtitle="From offline-ready Point of Sale (POS) retail software and inventory synchronizers to turnkey luxury web applications—we build the infrastructure that scales your business."
        actions={{
          primaryText: 'Explore POS & Web Solutions',
          primaryHref: '/labs/solutions',
          secondaryText: 'Request a Project Quote',
          secondaryHref: '/labs/quote',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Software */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1422] border border-blue-500/30 hover:border-blue-400 transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-3xl p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 inline-block">
                🛒
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block">Ready Software</span>
                <h2 className="text-2xl sm:text-3xl font-heading font-medium text-white">
                  Point of Sale & Retail Suites
                </h2>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Offline-first POS checkout engines, thermal receipt printing, barcode hardware integration, and multi-till synchronization designed for high-traffic retail.
              </p>
              <ul className="space-y-2 text-xs text-gray-300 pt-2 border-t border-gray-800">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Instant barcode scanning & SKU lookups</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Dual currency display (USD / LKR real-time)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Thermal receipt printer driver support (80mm/58mm)</span>
                </li>
              </ul>
            </div>

            <Link
              href="/labs/software"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white text-xs font-semibold transition-all"
            >
              <span>Explore Software Catalog</span>
              <span>→</span>
            </Link>
          </div>

          {/* Pillar 2: Solutions */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1422] border border-purple-500/30 hover:border-purple-400 transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-3xl p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 inline-block">
                🌐
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block">Bespoke Engineering</span>
                <h2 className="text-2xl sm:text-3xl font-heading font-medium text-white">
                  Web & E-Commerce Solutions
                </h2>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Custom full-stack web storefronts, headless architectures, payment gateway setups (Stripe, PayHere, Cards), and client CRM dashboards.
              </p>
              <ul className="space-y-2 text-xs text-gray-300 pt-2 border-t border-gray-800">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Sub-second page load times with Next.js Turbopack</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>International and local payment gateway integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Custom admin dashboards with live profit analytics</span>
                </li>
              </ul>
            </div>

            <Link
              href="/labs/solutions"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white text-xs font-semibold transition-all"
            >
              <span>View Packages & Pricing</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Featured Service Packages */}
        <div className="space-y-8">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-medium">Turnkey Deployments</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white">
              Popular Solution Packages
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl">
              Transparent pricing, clear deliverables, and guaranteed timelines with full source code handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicePackages.slice(0, 3).map((pkg) => (
              <ServiceCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-8">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-medium">Capability Matrix</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-white">
              Package Feature Comparison
            </h2>
          </div>
          <PricingTable />
        </div>

        {/* Bottom CTA to Quote */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#0E1422] to-indigo-950/60 border border-blue-500/40 text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Ready to build?</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-light text-white max-w-2xl mx-auto">
            Have a custom requirement or need a live POS system walk-through?
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto font-light">
            Contact our engineering desk today for a detailed technical proposal, cost estimate, and architecture review within 24 hours.
          </p>
          <div className="pt-2">
            <Link
              href="/labs/quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-xl shadow-blue-500/25 hover:opacity-95 transition-all"
            >
              <span>Request a Custom Quote</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

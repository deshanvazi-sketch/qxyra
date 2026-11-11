import { Metadata } from 'next';
import Link from 'next/link';
import { LabsHero } from '@/components/labs/LabsHero';
import { LabsSoftwareCatalog } from '@/components/labs/LabsSoftwareCatalog';

export const metadata: Metadata = {
  title: 'Software Catalog | Point of Sale & Retail Automation | Qxyra Labs',
  description: 'Enterprise retail POS systems, multi-channel stock orchestrators, and headless web platforms developed by Qxyra Labs.',
};

export default function LabsSoftwarePage() {
  return (
    <div className="space-y-16 pb-24">
      {/* Hero */}
      <LabsHero
        tag="Ready-to-Deploy Software"
        title="Production-Tested Point of Sale & Automation Engines"
        subtitle="Eliminate software bloat. Deploy fast, modern Point of Sale systems and multi-channel order flow tools designed for retail stores, supermarkets, and modern dropshippers."
        actions={{
          primaryText: 'Request Software Demo',
          primaryHref: '/labs/quote?type=software',
          secondaryText: 'View Web Solutions',
          secondaryHref: '/labs/solutions',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/labs" className="hover:text-white transition-colors">Labs</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-blue-400">Software Products</span>
        </nav>

        {/* Detailed Software Listings from Reactive Labs Store */}
        <LabsSoftwareCatalog />
      </div>
    </div>
  );
}

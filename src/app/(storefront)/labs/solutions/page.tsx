import { Metadata } from 'next';
import Link from 'next/link';
import { servicePackages } from '@/lib/labs-data';
import { LabsHero } from '@/components/labs/LabsHero';
import { ServiceCard } from '@/components/labs/ServiceCard';
import { PricingTable } from '@/components/labs/PricingTable';

export const metadata: Metadata = {
  title: 'Web & POS Solutions | Turnkey Development Packages | Qxyra Labs',
  description: 'Bespoke Point of Sale system setups, custom luxury e-commerce platforms, and tailored business web applications.',
};

export default function LabsSolutionsPage() {
  return (
    <div className="space-y-16 pb-24">
      {/* Hero */}
      <LabsHero
        tag="Turnkey Solution Packages"
        title="Web & POS Deployments Built for Commercial Velocity"
        subtitle="Full-cycle engineering: from database architecture and payment gateway integration to barcode hardware setups and staff onboarding."
        actions={{
          primaryText: 'Request a Custom Proposal',
          primaryHref: '/labs/quote',
          secondaryText: 'View Ready Software',
          secondaryHref: '/labs/software',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/labs" className="hover:text-white transition-colors">Labs</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-blue-400">Web & POS Solutions</span>
        </nav>

        {/* Packages Grid */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-medium">Available Packages</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-white">
              Choose the Architecture for Your Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePackages.map((pkg) => (
              <ServiceCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="space-y-6 pt-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-medium">Side-by-Side Analysis</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-white">
              Feature & Hardware Matrix
            </h2>
          </div>
          <PricingTable />
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { QuoteForm } from '@/components/labs/QuoteForm';

export const metadata: Metadata = {
  title: 'Request a Quote | Qxyra Labs Engineering',
  description: 'Submit your requirements for custom Point of Sale (POS) software, e-commerce storefronts, or tailored web applications.',
};

interface QuotePageProps {
  searchParams: Promise<{
    product?: string;
    package?: string;
    tier?: string;
  }>;
}

export default async function LabsQuotePage({ searchParams }: QuotePageProps) {
  const params = await searchParams;

  return (
    <div className="py-16 sm:py-24 bg-[#080B10] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/labs" className="hover:text-white transition-colors">Labs</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-blue-400">Request Quote</span>
        </nav>

        {/* Interactive Quote Form */}
        <QuoteForm
          initialProduct={params.product}
          initialPackage={params.package || params.tier}
        />

        {/* Engineering Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="p-5 rounded-2xl bg-[#0E1422] border border-gray-800 space-y-1.5">
            <span className="text-xl">⏱️</span>
            <h4 className="text-xs font-semibold text-white">24-Hour Scope Delivery</h4>
            <p className="text-[11px] text-gray-400">Receive a structured technical scope and quotation within one business day.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0E1422] border border-gray-800 space-y-1.5">
            <span className="text-xl">🔒</span>
            <h4 className="text-xs font-semibold text-white">IP & Code Ownership</h4>
            <p className="text-[11px] text-gray-400">You retain 100% intellectual property and full source code ownership upon delivery.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0E1422] border border-gray-800 space-y-1.5">
            <span className="text-xl">🛠️</span>
            <h4 className="text-xs font-semibold text-white">Direct Engineer Access</h4>
            <p className="text-[11px] text-gray-400">Communicate directly with our lead developers without middleman account managers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

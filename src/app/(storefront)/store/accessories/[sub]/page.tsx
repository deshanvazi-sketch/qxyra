import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { AccessoriesCatalog } from '@/components/store/AccessoriesCatalog';

const SUB_META: Record<string, { title: string; subtitle: string; categoryId: string }> = {
  'mobile': {
    title: 'Mobile Accessories',
    subtitle: 'High-speed fast chargers, braided Type-C cables, TWS earbuds, and genuine mobile gear.',
    categoryId: 'mobile',
  },
  'computer': {
    title: 'Computer Accessories',
    subtitle: 'Laptop stands, high-speed multi-port adapters, wireless mice and workspace peripherals.',
    categoryId: 'computer',
  },
};

interface AccessoriesSubPageProps {
  params: Promise<{
    sub: string;
  }>;
}

export function generateStaticParams() {
  return [
    { sub: 'mobile' },
    { sub: 'computer' },
  ];
}

export async function generateMetadata({ params }: AccessoriesSubPageProps): Promise<Metadata> {
  const { sub } = await params;
  const config = SUB_META[sub];

  if (!config) {
    return { title: 'Category Not Found | Methmi Store' };
  }

  return {
    title: `${config.title} | Methmi Store`,
    description: config.subtitle,
  };
}

export default async function AccessoriesSubCategoryPage({ params }: AccessoriesSubPageProps) {
  const { sub } = await params;
  const config = SUB_META[sub];

  if (!config) {
    notFound();
  }

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/store" className="hover:text-white transition-colors">Store</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/store/accessories" className="hover:text-white transition-colors">Accessories</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-brand-gold">{config.title}</span>
        </nav>

        {/* Hero */}
        <div className="p-5 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141820] to-black border border-brand-gold/30 shadow-2xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Accessories Sub-Category
            </span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-heading font-light text-white tracking-tight">
            {config.title}
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-light">
            {config.subtitle}
          </p>
        </div>

        {/* Connected Client Catalog */}
        <AccessoriesCatalog categoryId={config.categoryId} />
      </div>
    </div>
  );
}

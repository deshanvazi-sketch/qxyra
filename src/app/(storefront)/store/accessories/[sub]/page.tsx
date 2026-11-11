import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { SubCategoryGrid } from '@/components/store/SubCategoryGrid';

const SUB_META: Record<string, { title: string; subtitle: string; categoryId: string }> = {
  'mobile': {
    title: 'Mobile Accessories',
    subtitle: 'N52 MagSafe magnetic leather stands, 65W GaN dual-port fast blocks, Kevlar braided 100W cables & ultra-thin power banks.',
    categoryId: 'mobile',
  },
  'computer': {
    title: 'Computer Accessories',
    subtitle: 'Aerospace CNC aluminum laptop risers, 7-in-1 dual 4K USB-C docks, ergonomic silent wireless mice & dual-sided desk pads.',
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
    return { title: 'Category Not Found | Qxyra Store' };
  }

  return {
    title: `${config.title} | Qxyra Store`,
    description: config.subtitle,
  };
}

export default async function AccessoriesSubCategoryPage({ params }: AccessoriesSubPageProps) {
  const { sub } = await params;
  const config = SUB_META[sub];

  if (!config) {
    notFound();
  }

  const subProducts = products.filter((p) => p.categoryId === config.categoryId);

  const subcategories = [
    {
      id: 'mobile',
      name: 'Mobile Accessories',
      slug: 'mobile',
      href: '/store/accessories/mobile',
      count: products.filter((p) => p.categoryId === 'mobile').length,
      isActive: sub === 'mobile',
    },
    {
      id: 'computer',
      name: 'Computer Accessories',
      slug: 'computer',
      href: '/store/accessories/computer',
      count: products.filter((p) => p.categoryId === 'computer').length,
      isActive: sub === 'computer',
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141820] to-black border border-brand-gold/30 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Accessories • Subcategory
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-light text-white tracking-tight">
            {config.title}
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl leading-relaxed font-light">
            {config.subtitle}
          </p>
        </div>

        {/* Sub-Category Navigation Bar */}
        <SubCategoryGrid
          parentName="Accessories"
          parentHref="/store/accessories"
          items={subcategories}
        />

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3">
            <span>Showing {config.title}</span>
            <span className="font-mono text-brand-gold">{subProducts.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={config.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

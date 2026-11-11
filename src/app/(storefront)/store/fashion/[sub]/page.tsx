import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { SubCategoryGrid } from '@/components/store/SubCategoryGrid';

const SUB_META: Record<string, { title: string; subtitle: string; categoryId: string }> = {
  'regular-fit-tee': {
    title: 'Regular Fit Tee',
    subtitle: 'Crafted from 240GSM organic combed cotton with pre-shrunk treatment and a structured ribbed collar that never sags.',
    categoryId: 'regular-fit-tee',
  },
  'oversized-tee': {
    title: 'Oversized Tee',
    subtitle: 'Drop-shoulder proportions, 280GSM dense jersey cotton, relaxed elbow sleeves, and effortless boxy street aesthetic.',
    categoryId: 'oversized-tee',
  },
  'hoodie': {
    title: 'Hoodie',
    subtitle: '460GSM ultra-dense organic cotton french terry with seamless double-lined hood, clean silhouette, and hidden pockets.',
    categoryId: 'hoodie',
  },
};

interface FashionSubPageProps {
  params: Promise<{
    sub: string;
  }>;
}

export function generateStaticParams() {
  return [
    { sub: 'regular-fit-tee' },
    { sub: 'oversized-tee' },
    { sub: 'hoodie' },
  ];
}

export async function generateMetadata({ params }: FashionSubPageProps): Promise<Metadata> {
  const { sub } = await params;
  const config = SUB_META[sub];

  if (!config) {
    return { title: 'Category Not Found | Qxyra Store' };
  }

  return {
    title: `${config.title} Collection | Qxyra Fashion`,
    description: config.subtitle,
  };
}

export default async function FashionSubCategoryPage({ params }: FashionSubPageProps) {
  const { sub } = await params;
  const config = SUB_META[sub];

  if (!config) {
    notFound();
  }

  const subProducts = products.filter((p) => p.categoryId === config.categoryId);

  const subcategories = [
    {
      id: 'regular-fit-tee',
      name: 'Regular Fit Tee',
      slug: 'regular-fit-tee',
      href: '/store/fashion/regular-fit-tee',
      count: products.filter((p) => p.categoryId === 'regular-fit-tee').length,
      isActive: sub === 'regular-fit-tee',
    },
    {
      id: 'oversized-tee',
      name: 'Oversized Tee',
      slug: 'oversized-tee',
      href: '/store/fashion/oversized-tee',
      count: products.filter((p) => p.categoryId === 'oversized-tee').length,
      isActive: sub === 'oversized-tee',
    },
    {
      id: 'hoodie',
      name: 'Hoodie',
      slug: 'hoodie',
      href: '/store/fashion/hoodie',
      count: products.filter((p) => p.categoryId === 'hoodie').length,
      isActive: sub === 'hoodie',
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
          <Link href="/store/fashion" className="hover:text-white transition-colors">Fashion</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-brand-gold">{config.title}</span>
        </nav>

        {/* Hero */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141820] to-black border border-brand-gold/30 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Fashion • Subcategory
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-light text-white tracking-tight">
            {config.title} <span className="text-brand-gold font-normal">Drop</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl leading-relaxed font-light">
            {config.subtitle}
          </p>
        </div>

        {/* Sub-Category Navigation Bar */}
        <SubCategoryGrid
          parentName="Fashion"
          parentHref="/store/fashion"
          items={subcategories}
        />

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3">
            <span>Showing {config.title}</span>
            <span className="font-mono text-brand-gold">{subProducts.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

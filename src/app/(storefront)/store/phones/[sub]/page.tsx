import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { SubCategoryGrid } from '@/components/store/SubCategoryGrid';

const SUB_META: Record<string, { title: string; subtitle: string; categoryId: string }> = {
  'apple': {
    title: 'Apple iPhone',
    subtitle: '100% Genuine TRCSL Approved Apple iPhone models including iPhone 16 Pro Max, 16 Pro, and iPhone 15 with official 1-Year Apple Care warranty.',
    categoryId: 'apple',
  },
  'samsung': {
    title: 'Samsung Galaxy',
    subtitle: 'Galaxy S24 Ultra, S24+, Z Fold, and Galaxy A-series with official Samsung Sri Lanka 1-Year Company Warranty.',
    categoryId: 'samsung',
  },
  'tecno-infinix': {
    title: 'Tecno & Infinix',
    subtitle: 'Tecno Camon 30 Premier 5G, Spark series, and Infinix Note 40 Pro with 70W FastCharge and 100% local agent warranty.',
    categoryId: 'tecno-infinix',
  },
  'redmi': {
    title: 'Xiaomi Redmi',
    subtitle: 'Xiaomi 14 series, Redmi Note 13 Pro+ 5G, and budget Redmi models with 1-Year Genxt Sri Lanka Warranty.',
    categoryId: 'redmi',
  },
};

interface PhonesSubPageProps {
  params: Promise<{
    sub: string;
  }>;
}

export function generateStaticParams() {
  return [
    { sub: 'apple' },
    { sub: 'samsung' },
    { sub: 'tecno-infinix' },
    { sub: 'redmi' },
  ];
}

export async function generateMetadata({ params }: PhonesSubPageProps): Promise<Metadata> {
  const { sub } = await params;
  const config = SUB_META[sub];

  if (!config) {
    return { title: 'Category Not Found | Methmi Store' };
  }

  return {
    title: `${config.title} | Methmi Mobile Store`,
    description: config.subtitle,
  };
}

export default async function PhonesSubCategoryPage({ params }: PhonesSubPageProps) {
  const { sub } = await params;
  const config = SUB_META[sub];

  if (!config) {
    notFound();
  }

  const subProducts = products.filter((p) => p.categoryId === config.categoryId);

  const subcategories = [
    {
      id: 'apple',
      name: 'Apple iPhone',
      slug: 'apple',
      href: '/store/phones/apple',
      count: products.filter((p) => p.categoryId === 'apple').length,
    },
    {
      id: 'samsung',
      name: 'Samsung Galaxy',
      slug: 'samsung',
      href: '/store/phones/samsung',
      count: products.filter((p) => p.categoryId === 'samsung').length,
    },
    {
      id: 'tecno-infinix',
      name: 'Tecno & Infinix',
      slug: 'tecno-infinix',
      href: '/store/phones/tecno-infinix',
      count: products.filter((p) => p.categoryId === 'tecno-infinix').length,
    },
    {
      id: 'redmi',
      name: 'Xiaomi Redmi',
      slug: 'redmi',
      href: '/store/phones/redmi',
      count: products.filter((p) => p.categoryId === 'redmi').length,
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
          <Link href="/store/phones" className="hover:text-white transition-colors">Smartphones</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-brand-gold">{config.title}</span>
        </nav>

        {/* Category Hero */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141820] to-black border border-brand-gold/30 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-medium">
              Official TRCSL Stock
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
          parentName="Smartphones"
          parentHref="/store/phones"
          items={subcategories}
        />

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3">
            <span>Showing Models in {config.title}</span>
            <span className="font-mono text-brand-gold">{subProducts.length} Items</span>
          </div>

          {subProducts.length === 0 ? (
            <div className="text-center py-24 text-gray-500 font-mono text-sm border border-dashed border-gray-800 rounded-2xl">
              No products found in this category currently. New stock arriving soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={config.title}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

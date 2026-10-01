import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) return { title: 'Category Not Found' };
  
  return {
    title: `${category.name} | Qxyra`,
    description: category.description || `Browse ${category.name} at Qxyra`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.categoryId === category.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm mb-8 text-brand-gray-500">
        <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <span className="mx-2">&gt;</span>
        <Link href="/categories" className="hover:text-brand-gold transition-colors">Categories</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-brand-black font-medium">{category.name}</span>
      </nav>

      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold text-brand-black mb-4 font-heading">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-brand-gray-600 max-w-3xl">{category.description}</p>
        )}
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-brand-gray-50 rounded-xl">
          <p className="text-2xl text-brand-gray-500 mb-6">No products found in this category.</p>
          <Link href="/shop" className="inline-block bg-brand-black text-white px-8 py-3 rounded-md hover:bg-brand-gold transition-colors font-medium">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

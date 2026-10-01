import Link from 'next/link';
import { categories } from '@/lib/mock-data';

export const metadata = {
  title: 'Browse Categories | Qxyra',
  description: 'Explore our wide range of premium product categories.',
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm mb-8 text-brand-gray-500">
        <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-brand-black font-medium">Categories</span>
      </nav>

      <h1 className="text-4xl font-bold mb-10 text-brand-black font-heading">Browse Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`}
            className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
          >
            <div className="h-48 w-full bg-gradient-to-br from-brand-gray-100 to-brand-gray-200 relative">
              <div className="absolute inset-0 bg-brand-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brand-black group-hover:text-brand-gold transition-colors">{category.name}</h2>
              <p className="text-brand-gray-600 mt-2">{category.productCount} Products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

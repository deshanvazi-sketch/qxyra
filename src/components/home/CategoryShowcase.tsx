import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/mock-data';

export function CategoryShowcase() {
  return (
    <section className="py-20 px-4 md:px-8 bg-brand-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block mb-2">
            Curated Collections
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-brand-black font-bold">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 block border border-gray-100"
            >
              {/* Category Background Image */}
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* Dark Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/50 transition-colors duration-300" />
              
              {/* Category Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-brand-gold text-xs font-medium tracking-wider uppercase mb-1">
                  {category.productCount ? `${category.productCount} Products` : 'Collection'}
                </span>
                <h3 className="text-2xl font-heading text-brand-white font-semibold mb-2 group-hover:text-brand-gold transition-colors">
                  {category.name}
                </h3>
                <span className="text-brand-gray-300 text-xs font-body inline-flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <span>Explore Collection</span>
                  <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

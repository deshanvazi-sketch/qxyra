import Link from 'next/link';
import { categories } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function CategoryShowcase() {
  return (
    <section className="py-20 px-4 md:px-8 bg-brand-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading text-brand-black font-bold mb-12 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`}
              className="group relative h-80 rounded overflow-hidden shadow-md block"
            >
              {/* Placeholder background gradient based on index */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                "from-zinc-800 to-zinc-950"
              )} />
              
              <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/40 transition-colors duration-300" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-heading text-brand-white font-semibold mb-2">
                  {category.name}
                </h3>
                <p className="text-brand-gray-300 text-sm font-body">
                  Explore Products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

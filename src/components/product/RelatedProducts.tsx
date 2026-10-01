import { Product } from '@/types';
import { products } from '@/lib/mock-data';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Star } from 'lucide-react';

// Assuming ProductCard might not be available, I'll provide a local version here to ensure it works, 
// or one could import it: import { ProductCard } from './ProductCard';

function SimpleProductCard({ product }: { product: Product }) {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  
  return (
    <Link href={`/shop/${product.slug}`} className="group flex flex-col gap-3 min-w-[240px] md:min-w-0">
      <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-2">
        {/* Placeholder image representation since we don't have next/image setup with remote patterns guaranteed */}
        <div className="absolute inset-0 bg-neutral-200 group-hover:scale-105 transition-transform duration-500 ease-out" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="text-gray-400 font-heading text-sm text-center font-medium uppercase tracking-widest">
            {product.name}
          </span>
        </div>
        
        {product.salePrice && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="font-heading font-medium text-brand-black line-clamp-1 group-hover:text-brand-gold transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.totalSold})</span>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          {product.salePrice ? (
            <>
              <span className="font-medium text-red-600">{formatPrice(product.salePrice)}</span>
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.basePrice)}</span>
            </>
          ) : (
            <span className="font-medium text-brand-black">{formatPrice(product.basePrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

interface RelatedProductsProps {
  currentProductId: string;
  categoryId: string;
}

export function RelatedProducts({ currentProductId, categoryId }: RelatedProductsProps) {
  // Find products in same category, exclude current, take up to 4
  const relatedProducts = products
    .filter(p => p.categoryId === categoryId && p.id !== currentProductId && p.isActive)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100 mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-light tracking-wide text-brand-black">
          You May Also Like
        </h2>
        <Link href={`/shop?category=${categoryId}`} className="text-sm font-medium text-brand-black hover:text-brand-gold transition-colors uppercase tracking-wider">
          View All
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 gap-6 hide-scrollbar">
        {relatedProducts.map(product => (
          <div key={product.id} className="w-[70vw] md:w-auto flex-none">
            <SimpleProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

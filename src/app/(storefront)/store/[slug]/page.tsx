import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

import { products, reviews, categories } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductReviews } from '@/components/product/ProductReviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Qxyra Store',
    };
  }

  return {
    title: `${product.name} | Qxyra Store`,
    description: product.description,
  };
}

export default async function StoreProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find category info
  let catName = 'Store';
  let catHref = '/store';
  if (['regular-fit-tee', 'oversized-tee', 'hoodie'].includes(product.categoryId)) {
    catName = 'Fashion';
    catHref = '/store/fashion';
  } else if (['mobile', 'computer'].includes(product.categoryId)) {
    catName = 'Accessories';
    catHref = '/store/accessories';
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ProductJsonLd product={product} url={`https://qxyra.com/store/${product.slug}`} />

        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 mb-8 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600" />
          <Link href="/store" className="hover:text-white transition-colors">Store</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600" />
          <Link href={catHref} className="hover:text-brand-gold transition-colors">{catName}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600" />
          <span className="text-white truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </nav>

        {/* Top Section: Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 bg-[#121620] p-6 sm:p-10 rounded-3xl border border-gray-800">
          {/* Left: Gallery */}
          <div className="w-full">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold block">
                  Qxyra {catName} Drop
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-medium text-white leading-tight">
                  {product.name}
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-gray-800">
                  <span className="text-xs font-mono font-medium text-white">{product.rating}</span>
                  <span className="text-brand-gold text-sm leading-none">★</span>
                </div>
                <a href="#reviews" className="text-xs text-gray-400 hover:text-brand-gold underline underline-offset-4 transition-colors">
                  {productReviews.length > 0 ? `${productReviews.length} Verified Customer Reviews` : 'Verified Quality Inspected'}
                </a>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 pt-2">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-heading font-bold text-white font-mono">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-lg text-gray-500 line-through font-mono">
                      {formatPrice(product.basePrice)}
                    </span>
                    <span className="bg-brand-gold/10 text-brand-gold border border-brand-gold/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Special Drop Price
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-heading font-bold text-white font-mono">
                    {formatPrice(product.basePrice)}
                  </span>
                )}
              </div>

              <p className="text-gray-300 font-body text-sm leading-relaxed border-t border-gray-800/80 pt-4">
                {product.description}
              </p>

              {/* Interactive variant selection and cart actions */}
              <div className="border-t border-gray-800/80 pt-6">
                <ProductActions product={product} />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-800/80 pt-6 mt-8">
              <div className="flex flex-col items-center justify-center text-center gap-1.5 p-3.5 bg-black/40 rounded-2xl border border-gray-800">
                <Truck className="w-5 h-5 text-brand-gold" />
                <span className="text-[11px] font-medium text-white">Tracked Delivery</span>
                <span className="text-[10px] text-gray-400">7-14 Days Global</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-1.5 p-3.5 bg-black/40 rounded-2xl border border-gray-800">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                <span className="text-[11px] font-medium text-white">Quality Checked</span>
                <span className="text-[10px] text-gray-400">Inspected Garment</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-1.5 p-3.5 bg-black/40 rounded-2xl border border-gray-800">
                <RotateCcw className="w-5 h-5 text-brand-gold" />
                <span className="text-[11px] font-medium text-white">30-Day Guarantee</span>
                <span className="text-[10px] text-gray-400">Hassle-Free Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="mb-20">
          <ProductReviews productId={product.id} reviews={productReviews} rating={product.rating} />
        </div>

        {/* Related Products Section */}
        <div className="mb-12">
          <RelatedProducts currentProductId={product.id} categoryId={product.categoryId} />
        </div>
      </div>
    </div>
  );
}

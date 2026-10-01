import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Heart, Minus, Plus } from 'lucide-react';

import { products, reviews } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { ProductGallery } from '@/components/product/ProductGallery';
import { VariantSelector } from '@/components/product/VariantSelector';
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
      title: 'Product Not Found | Qxyra',
    };
  }

  return {
    title: `${product.name} | Qxyra`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get reviews for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ProductJsonLd product={product} url={`https://qxyra.vercel.app/shop/${product.slug}`} />
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8 font-body">
        <Link href="/" className="hover:text-brand-black transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/shop" className="hover:text-brand-black transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-brand-black font-medium truncate">{product.name}</span>
      </nav>

      {/* Top Section: Gallery + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
        {/* Left: Gallery */}
        <div className="w-full">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-brand-black mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-brand-black">{product.rating}</span>
              <span className="text-brand-gold text-lg leading-none">★</span>
            </div>
            <a href="#reviews" className="text-sm text-gray-500 hover:text-brand-black underline underline-offset-4 transition-colors">
              Read {productReviews.length} Reviews
            </a>
          </div>

          <div className="flex items-center gap-4 mb-8">
            {product.salePrice ? (
              <>
                <span className="text-3xl font-heading font-medium text-red-600">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-xl text-gray-400 line-through font-light">
                  {formatPrice(product.basePrice)}
                </span>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Sale
                </span>
              </>
            ) : (
              <span className="text-3xl font-heading font-medium text-brand-black">
                {formatPrice(product.basePrice)}
              </span>
            )}
          </div>

          <p className="text-gray-600 font-body leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="border-t border-gray-100 pt-8 mb-8">
            {/* We'll extract the interactive variant + cart actions to a client component */}
            <ProductActions product={product} />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8 mt-auto">
            <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-gray-50 rounded-xl">
              <Truck className="w-6 h-6 text-brand-black" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-gray-50 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-brand-black" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-600">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-gray-50 rounded-xl">
              <RotateCcw className="w-6 h-6 text-brand-black" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-600">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Details Section */}
      <div className="mb-20">
        <h2 className="text-2xl font-heading font-semibold mb-6">Product Details</h2>
        <div className="prose prose-lg max-w-none text-gray-600 font-body">
          <p>
            The {product.name} is designed with exceptional attention to detail. 
            Crafted from premium materials, it delivers both style and functionality 
            that meets the high standards of the Qxyra brand. Every element has been 
            carefully considered to provide you with an unparalleled experience.
          </p>
          <p className="mt-4">
            Whether you are looking for durability, aesthetics, or performance, 
            this product exceeds expectations across all categories. Join thousands 
            of satisfied customers who have made this their top choice.
          </p>
          <ul className="mt-6 space-y-2">
            <li>Premium build quality ensuring longevity</li>
            <li>Elegant design suitable for modern lifestyles</li>
            <li>Backed by Qxyra's quality guarantee</li>
            <li>Designed for ultimate satisfaction</li>
          </ul>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="mb-20">
        <ProductReviews productId={product.id} reviews={productReviews} rating={product.rating} />
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} categoryId={product.categoryId} />
    </div>
  );
}

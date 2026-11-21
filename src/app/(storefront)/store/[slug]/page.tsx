import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

import { products, reviews, categories } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { ProductDetailView } from '@/components/product/ProductDetailView';
import { ProductReviews } from '@/components/product/ProductReviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
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
      title: 'Product Not Found | Methmi Mobile Store',
    };
  }

  const primaryImage = product.images?.[0]?.url || '/methmi-logo.jpg';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://methmimobilepvtltd.lk';

  return {
    title: `${product.name} Price in Sri Lanka | 100% TRCSL Approved — Methmi Mobile`,
    description: product.description,
    keywords: [
      product.name,
      `${product.name} Sri Lanka`,
      `${product.name} Price in Sri Lanka`,
      'TRCSL Approved Phones',
      'Methmi Mobile',
      'Original Phone Warranty Sri Lanka'
    ],
    openGraph: {
      title: `${product.name} | Methmi Mobile Sri Lanka`,
      description: product.description,
      url: `${siteUrl}/store/${product.slug}`,
      images: [
        {
          url: primaryImage.startsWith('/') ? `${siteUrl}${primaryImage}` : primaryImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Methmi Mobile`,
      description: product.description,
      images: [primaryImage.startsWith('/') ? `${siteUrl}${primaryImage}` : primaryImage],
    },
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
  if (['apple', 'samsung', 'vivo', 'tecno-infinix', 'redmi', 'phones'].includes(product.categoryId)) {
    catName = 'Smartphones';
    catHref = '/store/phones';
  } else if (['regular-fit-tee', 'oversized-tee', 'hoodie'].includes(product.categoryId)) {
    catName = 'Fashion';
    catHref = '/store/fashion';
  } else if (['mobile', 'computer'].includes(product.categoryId)) {
    catName = 'Accessories';
    catHref = '/store/accessories';
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ProductJsonLd product={product} url={`https://methmimobilepvtltd.lk/store/${product.slug}`} />

        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 mb-6 sm:mb-8 font-mono overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600 shrink-0" />
          <Link href="/store" className="hover:text-white transition-colors">Store</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600 shrink-0" />
          <Link href={catHref} className="hover:text-brand-gold transition-colors">{catName}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600 shrink-0" />
          <span className="text-white truncate max-w-[140px] sm:max-w-xs">{product.name}</span>
        </nav>

        {/* Top Section: High-Res Studio Gallery + Specs & Configuration + Trust Badges */}
        <div className="mb-12 sm:mb-16">
          <ProductDetailView 
            product={product} 
            catName={catName} 
            productReviewsCount={productReviews.length} 
          />
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

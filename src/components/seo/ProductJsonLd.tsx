import React from 'react';
import { Product } from '@/types';

interface ProductJsonLdProps {
  product: Product;
  url: string;
}

export function ProductJsonLd({ product, url }: ProductJsonLdProps) {
  const siteUrl = 'https://methmimobilepvtltd.lk';
  const lkrPrice = Math.round((product.salePrice || product.basePrice) * 330.41);

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => img.url.startsWith('/') ? `${siteUrl}${img.url}` : img.url),
    description: product.description,
    sku: product.variants[0]?.sku || `MM-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: product.categoryId === 'vivo' ? 'Vivo' : product.categoryId === 'apple' ? 'Apple' : product.categoryId === 'samsung' ? 'Samsung' : 'Methmi Mobile',
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'LKR',
      price: lkrPrice.toString(),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Methmi Mobile (Pvt) Ltd',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: (product.reviews?.length || 18).toString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

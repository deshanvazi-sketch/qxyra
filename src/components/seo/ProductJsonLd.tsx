import React from 'react';
import { Product } from '@/types';

interface ProductJsonLdProps {
  product: Product;
  url: string;
}

export function ProductJsonLd({ product, url }: ProductJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.description,
    sku: product.variants[0]?.sku || `QX-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Qxyra',
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'USD',
      price: (product.salePrice || product.basePrice).toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: (product.reviews?.length || 12).toString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

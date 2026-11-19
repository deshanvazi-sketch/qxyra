import { MetadataRoute } from 'next';
import { products, categories } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://methmimobilepvtltd.lk';
  const currentDate = new Date().toISOString();

  // Static core routes
  const staticRoutes = [
    '',
    '/store',
    '/store/phones',
    '/store/phones/apple',
    '/store/phones/samsung',
    '/store/phones/tecno-infinix',
    '/store/phones/redmi',
    '/store/accessories',
    '/store/accessories/mobile',
    '/store/accessories/computer',
    '/store/fashion',
    '/labs',
    '/labs/software',
    '/labs/solutions',
    '/labs/quote',
    '/deals',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/store/${product.slug}`,
    lastModified: product.updatedAt || currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}

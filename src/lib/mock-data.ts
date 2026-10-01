import { Category, Product, Review } from '@/types';

export const categories: Category[] = [
  { id: 'c1', name: 'Electronics', slug: 'electronics', image: 'https://picsum.photos/seed/elec/800/600', productCount: 45 },
  { id: 'c2', name: 'Fashion', slug: 'fashion', image: 'https://picsum.photos/seed/fash/800/600', productCount: 120 },
  { id: 'c3', name: 'Home & Living', slug: 'home-living', image: 'https://picsum.photos/seed/home/800/600', productCount: 85 },
  { id: 'c4', name: 'Sports', slug: 'sports', image: 'https://picsum.photos/seed/sport/800/600', productCount: 30 },
  { id: 'c5', name: 'Beauty', slug: 'beauty', image: 'https://picsum.photos/seed/beauty/800/600', productCount: 65 },
  { id: 'c6', name: 'Accessories', slug: 'accessories', image: 'https://picsum.photos/seed/acc/800/600', productCount: 110 },
];

export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', userId: 'u1', userName: 'John Doe', rating: 5, comment: 'Absolutely amazing quality. The build is premium.', isVerified: true, createdAt: '2023-10-15T08:00:00Z' },
  { id: 'r2', productId: 'p1', userId: 'u2', userName: 'Jane Smith', rating: 4, comment: 'Great product, but shipping took a bit longer than expected.', isVerified: true, createdAt: '2023-11-02T14:30:00Z' },
  { id: 'r3', productId: 'p2', userId: 'u3', userName: 'Alice Johnson', rating: 5, comment: 'Perfect fit and the material feels luxurious.', isVerified: true, createdAt: '2023-09-20T10:15:00Z' },
  { id: 'r4', productId: 'p3', userId: 'u4', userName: 'Bob Williams', rating: 5, comment: 'Transformed my living room. Highly recommended.', isVerified: true, createdAt: '2023-12-05T16:45:00Z' },
  { id: 'r5', productId: 'p4', userId: 'u5', userName: 'Emma Davis', rating: 4, comment: 'Very sturdy, good for daily use.', isVerified: false, createdAt: '2024-01-10T09:20:00Z' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Quantum Wireless Headphones',
    slug: 'quantum-wireless-headphones',
    description: 'Experience pure sound with the Quantum Wireless Headphones. Featuring active noise cancellation and a premium design for ultimate comfort.',
    basePrice: 299.99,
    salePrice: 249.99,
    images: [
      { id: 'i1', productId: 'p1', url: 'https://picsum.photos/seed/headphones1/800/800', alt: 'Headphones Front', isPrimary: true, sortOrder: 0 },
      { id: 'i2', productId: 'p1', url: 'https://picsum.photos/seed/headphones2/800/800', alt: 'Headphones Side', isPrimary: false, sortOrder: 1 }
    ],
    categoryId: 'c1',
    variants: [
      { id: 'v1', productId: 'p1', color: 'Black', price: 299.99, stock: 50, sku: 'QWH-BLK' },
      { id: 'v2', productId: 'p1', color: 'Silver', price: 299.99, stock: 30, sku: 'QWH-SLV' }
    ],
    rating: 4.8,
    totalSold: 1250,
    isActive: true,
    isFeatured: true,
    createdAt: '2023-08-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p2',
    name: 'Luxe Cashmere Sweater',
    slug: 'luxe-cashmere-sweater',
    description: 'Stay warm and stylish with our Luxe Cashmere Sweater. Made from 100% pure cashmere for a soft, breathable fit.',
    basePrice: 159.00,
    images: [
      { id: 'i3', productId: 'p2', url: 'https://picsum.photos/seed/sweater1/800/800', alt: 'Sweater Front', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c2',
    variants: [
      { id: 'v3', productId: 'p2', size: 'M', color: 'Beige', price: 159.00, stock: 15, sku: 'LCS-M-BGE' },
      { id: 'v4', productId: 'p2', size: 'L', color: 'Beige', price: 159.00, stock: 10, sku: 'LCS-L-BGE' }
    ],
    rating: 4.9,
    totalSold: 840,
    isActive: true,
    isFeatured: true,
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p3',
    name: 'Minimalist Ceramic Vase',
    slug: 'minimalist-ceramic-vase',
    description: 'A beautiful handmade ceramic vase that adds a touch of elegance to any room.',
    basePrice: 45.00,
    images: [
      { id: 'i4', productId: 'p3', url: 'https://picsum.photos/seed/vase1/800/800', alt: 'Ceramic Vase', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c3',
    variants: [
      { id: 'v5', productId: 'p3', color: 'White', price: 45.00, stock: 100, sku: 'MCV-WHT' }
    ],
    rating: 4.6,
    totalSold: 320,
    isActive: true,
    isFeatured: false,
    createdAt: '2023-10-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p4',
    name: 'Aero Pro Running Shoes',
    slug: 'aero-pro-running-shoes',
    description: 'Engineered for speed and comfort, the Aero Pro running shoes feature advanced cushioning technology.',
    basePrice: 129.99,
    salePrice: 109.99,
    images: [
      { id: 'i5', productId: 'p4', url: 'https://picsum.photos/seed/shoes1/800/800', alt: 'Running Shoes', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c4',
    variants: [
      { id: 'v6', productId: 'p4', size: '9', color: 'Blue', price: 129.99, stock: 45, sku: 'APR-9-BLU' },
      { id: 'v7', productId: 'p4', size: '10', color: 'Blue', price: 129.99, stock: 30, sku: 'APR-10-BLU' }
    ],
    rating: 4.5,
    totalSold: 2100,
    isActive: true,
    isFeatured: true,
    createdAt: '2023-11-20T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p5',
    name: 'Radiance Vitamin C Serum',
    slug: 'radiance-vitamin-c-serum',
    description: 'Brighten your complexion with our concentrated Vitamin C serum.',
    basePrice: 38.00,
    images: [
      { id: 'i6', productId: 'p5', url: 'https://picsum.photos/seed/serum1/800/800', alt: 'Vitamin C Serum', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c5',
    variants: [
      { id: 'v8', productId: 'p5', size: '30ml', price: 38.00, stock: 200, sku: 'RVS-30ML' }
    ],
    rating: 4.7,
    totalSold: 1560,
    isActive: true,
    isFeatured: false,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p6',
    name: 'Classic Leather Watch',
    slug: 'classic-leather-watch',
    description: 'A timeless timepiece featuring a genuine leather strap and minimalist dial.',
    basePrice: 185.00,
    images: [
      { id: 'i7', productId: 'p6', url: 'https://picsum.photos/seed/watch1/800/800', alt: 'Leather Watch', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c6',
    variants: [
      { id: 'v9', productId: 'p6', color: 'Brown', price: 185.00, stock: 25, sku: 'CLW-BRN' }
    ],
    rating: 4.8,
    totalSold: 430,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'p7',
    name: 'Smart Home Hub',
    slug: 'smart-home-hub',
    description: 'Control your entire home with a single tap using the next-generation Smart Home Hub.',
    basePrice: 149.99,
    images: [
      { id: 'i8', productId: 'p7', url: 'https://picsum.photos/seed/hub1/800/800', alt: 'Smart Hub', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c1',
    variants: [
      { id: 'v10', productId: 'p7', color: 'White', price: 149.99, stock: 60, sku: 'SHH-WHT' }
    ],
    rating: 4.4,
    totalSold: 890,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 'p8',
    name: 'Silk Blend Scarf',
    slug: 'silk-blend-scarf',
    description: 'A beautifully crafted silk blend scarf perfect for any season.',
    basePrice: 55.00,
    images: [
      { id: 'i9', productId: 'p8', url: 'https://picsum.photos/seed/scarf1/800/800', alt: 'Silk Scarf', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c2',
    variants: [
      { id: 'v11', productId: 'p8', color: 'Navy', price: 55.00, stock: 85, sku: 'SBS-NVY' }
    ],
    rating: 4.9,
    totalSold: 670,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z'
  },
  {
    id: 'p9',
    name: 'Artisan Coffee Maker',
    slug: 'artisan-coffee-maker',
    description: 'Brew cafe-quality coffee at home with our Artisan Coffee Maker.',
    basePrice: 199.00,
    salePrice: 179.00,
    images: [
      { id: 'i10', productId: 'p9', url: 'https://picsum.photos/seed/coffee1/800/800', alt: 'Coffee Maker', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c3',
    variants: [
      { id: 'v12', productId: 'p9', color: 'Silver', price: 199.00, stock: 40, sku: 'ACM-SLV' }
    ],
    rating: 4.7,
    totalSold: 1100,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  },
  {
    id: 'p10',
    name: 'Yoga Mat Pro',
    slug: 'yoga-mat-pro',
    description: 'Extra thick, non-slip yoga mat designed for comfort and stability.',
    basePrice: 42.00,
    images: [
      { id: 'i11', productId: 'p10', url: 'https://picsum.photos/seed/yogamat1/800/800', alt: 'Yoga Mat', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c4',
    variants: [
      { id: 'v13', productId: 'p10', color: 'Purple', price: 42.00, stock: 150, sku: 'YMP-PRP' }
    ],
    rating: 4.5,
    totalSold: 3400,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z'
  },
  {
    id: 'p11',
    name: 'Hydrating Night Cream',
    slug: 'hydrating-night-cream',
    description: 'Wake up to glowing skin with our deeply hydrating night cream.',
    basePrice: 65.00,
    images: [
      { id: 'i12', productId: 'p11', url: 'https://picsum.photos/seed/cream1/800/800', alt: 'Night Cream', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c5',
    variants: [
      { id: 'v14', productId: 'p11', size: '50ml', price: 65.00, stock: 120, sku: 'HNC-50ML' }
    ],
    rating: 4.8,
    totalSold: 920,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z'
  },
  {
    id: 'p12',
    name: 'Polarized Aviator Sunglasses',
    slug: 'polarized-aviator-sunglasses',
    description: 'Classic aviator sunglasses with polarized lenses for ultimate UV protection.',
    basePrice: 110.00,
    salePrice: 85.00,
    images: [
      { id: 'i13', productId: 'p12', url: 'https://picsum.photos/seed/sunglasses1/800/800', alt: 'Sunglasses', isPrimary: true, sortOrder: 0 }
    ],
    categoryId: 'c6',
    variants: [
      { id: 'v15', productId: 'p12', color: 'Gold/Green', price: 110.00, stock: 75, sku: 'PAS-GLD-GRN' }
    ],
    rating: 4.6,
    totalSold: 2150,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-05T00:00:00Z'
  }
];

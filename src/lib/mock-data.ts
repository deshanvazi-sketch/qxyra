import { Category, Product, Review } from '@/types';

export const categories: Category[] = [
  { id: 'c1', name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800', productCount: 0 },
  { id: 'c2', name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', productCount: 0 },
  { id: 'c3', name: 'Home & Living', slug: 'home-living', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800', productCount: 0 },
  { id: 'c4', name: 'Sports', slug: 'sports', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800', productCount: 0 },
  { id: 'c5', name: 'Beauty', slug: 'beauty', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', productCount: 0 },
  { id: 'c6', name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', productCount: 0 },
];

export const reviews: Review[] = [];

export const products: Product[] = [];

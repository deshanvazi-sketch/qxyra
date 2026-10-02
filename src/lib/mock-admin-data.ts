import { Order, OrderStatus, User, UserRole, Product } from '@/types';

export interface CJProductCatalogItem {
  id: string;
  cjProductId: string;
  name: string;
  category: string;
  wholesalePrice: number;
  suggestedRetailPrice: number;
  imageUrl: string;
  stock: number;
  shippingDays: string;
  weight: string;
  variants: {
    name: string;
    wholesalePrice: number;
    retailPrice: number;
    stock: number;
  }[];
  description: string;
}

export const mockCJCatalog: CJProductCatalogItem[] = [
  {
    id: 'cj-101',
    cjProductId: 'CJ-PROD-88901',
    name: 'Smart Ambient RGB Desk Lamp with Wireless Charging',
    category: 'Electronics',
    wholesalePrice: 18.50,
    suggestedRetailPrice: 59.99,
    imageUrl: 'https://picsum.photos/seed/cjlamp/800/800',
    stock: 450,
    shippingDays: '5-9 business days',
    weight: '0.85 kg',
    description: 'Touch-sensitive ambient desk light featuring 16 million colors, app sync, sound-reactive modes, and a 15W Qi fast wireless charging base.',
    variants: [
      { name: 'Matte Obsidian Black', wholesalePrice: 18.50, retailPrice: 59.99, stock: 250 },
      { name: 'Brushed Aluminum Silver', wholesalePrice: 19.50, retailPrice: 64.99, stock: 200 }
    ]
  },
  {
    id: 'cj-102',
    cjProductId: 'CJ-PROD-88902',
    name: 'Ultra-Quiet Ultrasonic Aromatherapy Essential Oil Diffuser',
    category: 'Home & Living',
    wholesalePrice: 9.20,
    suggestedRetailPrice: 34.99,
    imageUrl: 'https://picsum.photos/seed/cjdiffuser/800/800',
    stock: 780,
    shippingDays: '6-10 business days',
    weight: '0.45 kg',
    description: '500ml water capacity, ultra-quiet <20dB operation, wood-grain finish, and intelligent auto-shutoff when water level is low.',
    variants: [
      { name: 'Dark Walnut Finish', wholesalePrice: 9.20, retailPrice: 34.99, stock: 400 },
      { name: 'Light Oak Finish', wholesalePrice: 9.20, retailPrice: 34.99, stock: 380 }
    ]
  },
  {
    id: 'cj-103',
    cjProductId: 'CJ-PROD-88903',
    name: 'Minimalist Magnetic Leather Cardholder Wallet',
    category: 'Accessories',
    wholesalePrice: 6.80,
    suggestedRetailPrice: 28.00,
    imageUrl: 'https://picsum.photos/seed/cjwallet/800/800',
    stock: 1200,
    shippingDays: '4-8 business days',
    weight: '0.12 kg',
    description: 'RFID-blocking slim genuine leather wallet with MagSafe compatible backing and quick card ejection trigger mechanism.',
    variants: [
      { name: 'Midnight Black', wholesalePrice: 6.80, retailPrice: 28.00, stock: 600 },
      { name: 'Cognac Saddle Brown', wholesalePrice: 6.80, retailPrice: 28.00, stock: 600 }
    ]
  },
  {
    id: 'cj-104',
    cjProductId: 'CJ-PROD-88904',
    name: 'Titanium Smart Fitness Tracker Ring with Sleep & HRV Sensor',
    category: 'Electronics',
    wholesalePrice: 32.00,
    suggestedRetailPrice: 99.00,
    imageUrl: 'https://picsum.photos/seed/cjring/800/800',
    stock: 310,
    shippingDays: '5-8 business days',
    weight: '0.05 kg',
    description: 'Aerospace-grade titanium health ring that tracks continuous heart rate, blood oxygen (SpO2), sleep quality, and daily movement.',
    variants: [
      { name: 'Size 8 / Matte Black', wholesalePrice: 32.00, retailPrice: 99.00, stock: 90 },
      { name: 'Size 9 / Matte Black', wholesalePrice: 32.00, retailPrice: 99.00, stock: 110 },
      { name: 'Size 10 / Matte Black', wholesalePrice: 32.00, retailPrice: 99.00, stock: 110 }
    ]
  },
  {
    id: 'cj-105',
    cjProductId: 'CJ-PROD-88905',
    name: 'Thermal Vacuum Insulated Ceramic Coffee Tumbler (480ml)',
    category: 'Home & Living',
    wholesalePrice: 8.50,
    suggestedRetailPrice: 29.50,
    imageUrl: 'https://picsum.photos/seed/cjtumbler/800/800',
    stock: 540,
    shippingDays: '6-11 business days',
    weight: '0.38 kg',
    description: 'Ceramic lined interior prevents metallic taste; double-wall stainless exterior keeps liquids hot for 12 hours or cold for 24 hours.',
    variants: [
      { name: 'Matte Charcoal', wholesalePrice: 8.50, retailPrice: 29.50, stock: 270 },
      { name: 'Pure Chalk White', wholesalePrice: 8.50, retailPrice: 29.50, stock: 270 }
    ]
  },
  {
    id: 'cj-106',
    cjProductId: 'CJ-PROD-88906',
    name: 'Precision Electric Burr Coffee Grinder Portable',
    category: 'Home & Living',
    wholesalePrice: 22.00,
    suggestedRetailPrice: 69.00,
    imageUrl: 'https://picsum.photos/seed/cjgrinder/800/800',
    stock: 195,
    shippingDays: '7-12 business days',
    weight: '0.62 kg',
    description: 'USB-C rechargeable conical ceramic burr grinder with 35 precise grind settings for espresso, pour-over, and French press.',
    variants: [
      { name: 'Space Gray Stainless', wholesalePrice: 22.00, retailPrice: 69.00, stock: 195 }
    ]
  }
];

export const mockOrders: Order[] = [];

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'vip' | 'inactive';
  joinedAt: string;
  lastOrderDate: string;
}

export const mockCustomers: AdminCustomer[] = [];

export interface StoreAnalytics {
  revenueToday: number;
  revenueThisMonth: number;
  revenueGrowthPercent: number;
  ordersToday: number;
  ordersThisMonth: number;
  ordersGrowthPercent: number;
  averageOrderValue: number;
  conversionRate: number;
  cjFulfillmentRate: number;
  recentActivity: {
    id: string;
    type: 'order' | 'cj_sync' | 'tracking_update' | 'product_import';
    title: string;
    time: string;
    badge?: string;
  }[];
  dailySales: { date: string; amount: number; orders: number }[];
}

export const mockAnalytics: StoreAnalytics = {
  revenueToday: 0,
  revenueThisMonth: 0,
  revenueGrowthPercent: 0,
  ordersToday: 0,
  ordersThisMonth: 0,
  ordersGrowthPercent: 0,
  averageOrderValue: 0,
  conversionRate: 0,
  cjFulfillmentRate: 100,
  recentActivity: [
    {
      id: 'act-1',
      type: 'cj_sync',
      title: 'Storefront and Admin active at qxyra.com. Ready for authentic inventory.',
      time: 'Just now',
      badge: 'Live'
    }
  ],
  dailySales: []
};

import { Order, OrderStatus, User, UserRole, Product } from '@/types';
import { products } from './mock-data';

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

export const mockOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'QX-98241',
    userId: 'u1',
    status: OrderStatus.DELIVERED,
    subtotal: 249.99,
    shippingCost: 0,
    discount: 0,
    total: 249.99,
    cjOrderId: 'CJ-ORD-771829',
    trackingNumber: 'CJTRK982314092US',
    createdAt: '2026-09-18T14:22:00Z',
    shippingAddress: {
      id: 'addr-1',
      userId: 'u1',
      fullName: 'Alexander Vance',
      phone: '+1 (555) 234-5678',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      country: 'United States',
      zipCode: '97477',
      isDefault: true
    },
    items: [
      {
        id: 'oi-1',
        orderId: 'ord-1001',
        product: products[0],
        variant: products[0].variants[0],
        quantity: 1,
        price: 249.99
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'QX-98242',
    userId: 'u2',
    status: OrderStatus.SHIPPED,
    subtotal: 159.00,
    shippingCost: 0,
    discount: 15.90,
    total: 143.10,
    cjOrderId: 'CJ-ORD-771835',
    trackingNumber: 'CJTRK982314991US',
    createdAt: '2026-09-22T09:15:00Z',
    shippingAddress: {
      id: 'addr-2',
      userId: 'u2',
      fullName: 'Sophia Elena Chen',
      phone: '+1 (555) 890-1234',
      street: '450 Sutter St Suite 1200',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      zipCode: '94108',
      isDefault: true
    },
    items: [
      {
        id: 'oi-2',
        orderId: 'ord-1002',
        product: products[1],
        variant: products[1].variants[0],
        quantity: 1,
        price: 159.00
      }
    ]
  },
  {
    id: 'ord-1003',
    orderNumber: 'QX-98243',
    userId: 'u3',
    status: OrderStatus.PROCESSING,
    subtotal: 334.99,
    shippingCost: 0,
    discount: 0,
    total: 334.99,
    cjOrderId: 'CJ-ORD-771842',
    trackingNumber: 'CJTRK982315882CN',
    createdAt: '2026-09-26T18:40:00Z',
    shippingAddress: {
      id: 'addr-3',
      userId: 'u3',
      fullName: 'Marcus Aurelius Sterling',
      phone: '+44 20 7946 0912',
      street: '18 Kensington Palace Gardens',
      city: 'London',
      state: 'Greater London',
      country: 'United Kingdom',
      zipCode: 'W8 4QP',
      isDefault: true
    },
    items: [
      {
        id: 'oi-3',
        orderId: 'ord-1003',
        product: products[0],
        variant: products[0].variants[1],
        quantity: 1,
        price: 249.99
      },
      {
        id: 'oi-4',
        orderId: 'ord-1003',
        product: products[11],
        variant: products[11].variants[0],
        quantity: 1,
        price: 85.00
      }
    ]
  },
  {
    id: 'ord-1004',
    orderNumber: 'QX-98244',
    userId: 'u4',
    status: OrderStatus.PENDING,
    subtotal: 85.00,
    shippingCost: 0,
    discount: 0,
    total: 85.00,
    cjOrderId: undefined,
    trackingNumber: undefined,
    createdAt: '2026-09-29T11:05:00Z',
    shippingAddress: {
      id: 'addr-4',
      userId: 'u4',
      fullName: 'Niroshan Perera',
      phone: '+94 77 123 4567',
      street: '42 Galle Road, Kollupitiya',
      city: 'Colombo',
      state: 'Western Province',
      country: 'Sri Lanka',
      zipCode: '00300',
      isDefault: true
    },
    items: [
      {
        id: 'oi-5',
        orderId: 'ord-1004',
        product: products[11],
        variant: products[11].variants[0],
        quantity: 1,
        price: 85.00
      }
    ]
  },
  {
    id: 'ord-1005',
    orderNumber: 'QX-98245',
    userId: 'u5',
    status: OrderStatus.PENDING,
    subtotal: 159.00,
    shippingCost: 0,
    discount: 0,
    total: 159.00,
    cjOrderId: undefined,
    trackingNumber: undefined,
    createdAt: '2026-09-30T07:30:00Z',
    shippingAddress: {
      id: 'addr-5',
      userId: 'u5',
      fullName: 'Emma Watson',
      phone: '+1 (555) 432-8765',
      street: '124 Ocean Avenue',
      city: 'Santa Monica',
      state: 'CA',
      country: 'United States',
      zipCode: '90401',
      isDefault: true
    },
    items: [
      {
        id: 'oi-6',
        orderId: 'ord-1005',
        product: products[1],
        variant: products[1].variants[1],
        quantity: 1,
        price: 159.00
      }
    ]
  }
];

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

export const mockCustomers: AdminCustomer[] = [
  {
    id: 'cust-1',
    name: 'Alexander Vance',
    email: 'alex.vance@example.com',
    avatar: 'AV',
    country: 'United States',
    totalOrders: 6,
    totalSpent: 1480.50,
    status: 'vip',
    joinedAt: '2025-11-12',
    lastOrderDate: '2026-09-18'
  },
  {
    id: 'cust-2',
    name: 'Sophia Elena Chen',
    email: 'sophia.chen@designlab.io',
    avatar: 'SC',
    country: 'United States',
    totalOrders: 4,
    totalSpent: 820.00,
    status: 'active',
    joinedAt: '2026-01-05',
    lastOrderDate: '2026-09-22'
  },
  {
    id: 'cust-3',
    name: 'Marcus Aurelius Sterling',
    email: 'marcus.sterling@londonlux.co.uk',
    avatar: 'MS',
    country: 'United Kingdom',
    totalOrders: 8,
    totalSpent: 2750.00,
    status: 'vip',
    joinedAt: '2025-08-20',
    lastOrderDate: '2026-09-26'
  },
  {
    id: 'cust-4',
    name: 'Niroshan Perera',
    email: 'niroshan.p@lankaweb.lk',
    avatar: 'NP',
    country: 'Sri Lanka',
    totalOrders: 2,
    totalSpent: 210.00,
    status: 'active',
    joinedAt: '2026-06-14',
    lastOrderDate: '2026-09-29'
  },
  {
    id: 'cust-5',
    name: 'Emma Watson',
    email: 'emma.watson@pacific.org',
    avatar: 'EW',
    country: 'United States',
    totalOrders: 1,
    totalSpent: 159.00,
    status: 'active',
    joinedAt: '2026-09-30',
    lastOrderDate: '2026-09-30'
  }
];

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
  revenueToday: 244.00,
  revenueThisMonth: 18450.00,
  revenueGrowthPercent: 24.8,
  ordersToday: 2,
  ordersThisMonth: 142,
  ordersGrowthPercent: 18.2,
  averageOrderValue: 129.92,
  conversionRate: 3.42,
  cjFulfillmentRate: 98.6,
  recentActivity: [
    {
      id: 'act-1',
      type: 'order',
      title: 'New Order #QX-98245 placed by Emma Watson ($159.00)',
      time: '1 hour ago',
      badge: 'Pending CJ Sync'
    },
    {
      id: 'act-2',
      type: 'cj_sync',
      title: 'Order #QX-98243 forwarded to CJ Dropshipping (CJ-ORD-771842)',
      time: '3 hours ago',
      badge: 'Fulfillment Active'
    },
    {
      id: 'act-3',
      type: 'tracking_update',
      title: 'Tracking CJTRK982314991US updated: Departed international sort facility',
      time: '6 hours ago',
      badge: 'In Transit'
    },
    {
      id: 'act-4',
      type: 'product_import',
      title: 'Imported "Smart Ambient RGB Desk Lamp" from CJ Dropshipping',
      time: 'Yesterday',
      badge: 'Catalog'
    }
  ],
  dailySales: [
    { date: 'Sep 24', amount: 820, orders: 7 },
    { date: 'Sep 25', amount: 1140, orders: 9 },
    { date: 'Sep 26', amount: 1450, orders: 12 },
    { date: 'Sep 27', amount: 980, orders: 8 },
    { date: 'Sep 28', amount: 1620, orders: 14 },
    { date: 'Sep 29', amount: 1280, orders: 10 },
    { date: 'Sep 30', amount: 1890, orders: 15 }
  ]
};

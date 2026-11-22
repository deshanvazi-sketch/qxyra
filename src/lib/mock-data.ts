import { Category, Product, Review } from '@/types';

export const categories: Category[] = [
  {
    id: 'phones',
    name: 'Smartphones',
    slug: 'phones',
    description: '100% genuine TRCSL-approved Vivo, Infinix, and Tecno smartphones with official company warranty in Sri Lanka.',
    image: '/products/vivo-y05-summit-platinum.jpg',
    productCount: 7,
    children: [
      {
        id: 'vivo',
        name: 'Vivo',
        slug: 'vivo',
        parentId: 'phones',
        description: 'Vivo Y-series smartphones with 100% TRCSL approval and official company warranty in Sri Lanka.',
        image: '/products/vivo-y05-summit-platinum.jpg',
        productCount: 3,
      },
      {
        id: 'infinix',
        name: 'Infinix',
        slug: 'infinix',
        parentId: 'phones',
        description: 'Infinix Note 60 Pro 5G, Hot 70 & Smart 20 series with 100% official company warranty.',
        image: '/products/infinix-note-60-pro-solar-orange.jpg',
        productCount: 3,
      },
      {
        id: 'tecno',
        name: 'Tecno',
        slug: 'tecno',
        parentId: 'phones',
        description: 'Tecno Camon 50 Pro 5G with flagship mobile photography and official warranty.',
        image: '/products/tecno-camon-50-pro-malachite-green.jpg',
        productCount: 1,
      },
      {
        id: 'tecno-infinix',
        name: 'Tecno & Infinix',
        slug: 'tecno-infinix',
        parentId: 'phones',
        description: 'Tecno Camon 50 Pro, Infinix Note 60 Pro, Hot 70 & Smart 20 series with 100% company warranty.',
        image: '/products/infinix-hot-70-silver-dancer.jpg',
        productCount: 4,
      },
    ],
  },
];

export const products: Product[] = [
  // ─── 01. VIVO Y05 ──────────────────────────────────────────
  {
    id: 'prod-vivo-y05',
    name: 'Vivo Y05 (4GB RAM | 64GB / 128GB Storage)',
    slug: 'vivo-y05',
    description: '100% Genuine TRCSL Approved brand new sealed Vivo Y05 smartphone in Sri Lanka. Engineered with a smooth 90Hz Sunlight Display, massive 5000mAh long-lasting all-day battery, 13MP AI dual rear camera, IP54 dust and splash resistance, and expandable memory. Includes 1-Year Official Vivo Sri Lanka Company Warranty and islandwide fast delivery.',
    basePrice: 199.72,
    salePrice: 181.56,
    images: [
      { id: 'img-vivo-y05-1', productId: 'prod-vivo-y05', url: '/products/vivo-y05-summit-platinum.jpg', alt: 'Vivo Y05 Summit Platinum Sri Lanka', isPrimary: true, sortOrder: 0 },
      { id: 'img-vivo-y05-2', productId: 'prod-vivo-y05', url: '/products/vivo-y05-haze-blue.jpg', alt: 'Vivo Y05 Haze Blue Dual Camera Phone', isPrimary: false, sortOrder: 1 },
      { id: 'img-vivo-y05-3', productId: 'prod-vivo-y05', url: '/products/vivo-y05-voyage-black.jpg', alt: 'Vivo Y05 Voyage Black Matte Finish', isPrimary: false, sortOrder: 2 },
    ],
    categoryId: 'vivo',
    variants: [
      { id: 'v-vy05-64-sp', productId: 'prod-vivo-y05', size: '4GB+64GB', color: 'Summit Platinum', price: 181.56, stock: 15, sku: 'MM-VIVO-Y05-64-SP' },
      { id: 'v-vy05-64-hb', productId: 'prod-vivo-y05', size: '4GB+64GB', color: 'Haze Blue', price: 181.56, stock: 15, sku: 'MM-VIVO-Y05-64-HB' },
      { id: 'v-vy05-64-vb', productId: 'prod-vivo-y05', size: '4GB+64GB', color: 'Voyage Black', price: 181.56, stock: 20, sku: 'MM-VIVO-Y05-64-VB' },
      { id: 'v-vy05-128-sp', productId: 'prod-vivo-y05', size: '4GB+128GB', color: 'Summit Platinum', price: 199.72, stock: 25, sku: 'MM-VIVO-Y05-128-SP' },
      { id: 'v-vy05-128-hb', productId: 'prod-vivo-y05', size: '4GB+128GB', color: 'Haze Blue', price: 199.72, stock: 20, sku: 'MM-VIVO-Y05-128-HB' },
      { id: 'v-vy05-128-vb', productId: 'prod-vivo-y05', size: '4GB+128GB', color: 'Voyage Black', price: 199.72, stock: 30, sku: 'MM-VIVO-Y05-128-VB' },
    ],
    rating: 4.9,
    totalSold: 42,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['🔋 5000mAh Battery', '📸 13MP AI Cam', '📱 90Hz Display', '🛡️ TRCSL Approved'],
    colorOptions: [
      { name: 'Summit Platinum', hex: '#D5D8DC', image: '/products/vivo-y05-summit-platinum.jpg' },
      { name: 'Haze Blue', hex: '#7B9FB8', image: '/products/vivo-y05-haze-blue.jpg' },
      { name: 'Voyage Black', hex: '#1F2022', image: '/products/vivo-y05-voyage-black.jpg' },
    ],
    createdAt: '2026-11-20T00:00:00Z',
    updatedAt: '2026-11-21T00:00:00Z',
  },

  // ─── 02. VIVO Y11D ─────────────────────────────────────────
  {
    id: 'prod-vivo-y11d',
    name: 'Vivo Y11D (4GB RAM | 128GB Storage)',
    slug: 'vivo-y11d',
    description: '100% Genuine TRCSL Approved brand new sealed Vivo Y11D smartphone in Sri Lanka. Engineered with a vivid 6.56-inch Sunlight Display, massive 5000mAh long-lasting battery, high-resolution AI dual rear camera system, IP54 dust and splash resistance, and expandable storage. Includes 1-Year Official Vivo Sri Lanka Company Warranty and islandwide fast delivery.',
    basePrice: 236.04,
    salePrice: 217.88,
    images: [
      { id: 'img-vivo-y11d-1', productId: 'prod-vivo-y11d', url: '/products/vivo-y11d-sunrise-gold.jpg', alt: 'Vivo Y11D Sunrise Gold Sri Lanka', isPrimary: true, sortOrder: 0 },
      { id: 'img-vivo-y11d-2', productId: 'prod-vivo-y11d', url: '/products/vivo-y11d-voyage-black.jpg', alt: 'Vivo Y11D Voyage Black Matte Finish Sri Lanka', isPrimary: false, sortOrder: 1 },
    ],
    categoryId: 'vivo',
    variants: [
      { id: 'v-vy11d-128-sg', productId: 'prod-vivo-y11d', size: '4GB+128GB', color: 'Sunrise Gold', price: 217.88, stock: 25, sku: 'MM-VIVO-Y11D-128-SG' },
      { id: 'v-vy11d-128-vb', productId: 'prod-vivo-y11d', size: '4GB+128GB', color: 'Voyage Black', price: 217.88, stock: 30, sku: 'MM-VIVO-Y11D-128-VB' },
    ],
    rating: 4.8,
    totalSold: 28,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['🔋 5000mAh Battery', '📸 AI High-Res Cam', '📱 6.56" HD+ Sunlight', '🛡️ 1-Yr Warranty'],
    colorOptions: [
      { name: 'Sunrise Gold', hex: '#E3A857', image: '/products/vivo-y11d-sunrise-gold.jpg' },
      { name: 'Voyage Black', hex: '#1F2022', image: '/products/vivo-y11d-voyage-black.jpg' },
    ],
    createdAt: '2026-11-21T00:00:00Z',
    updatedAt: '2026-11-21T00:00:00Z',
  },

  // ─── 03. VIVO Y31D ─────────────────────────────────────────
  {
    id: 'prod-vivo-y31d',
    name: 'Vivo Y31D (6GB+128GB / 8GB+256GB Storage)',
    slug: 'vivo-y31d',
    description: '100% Genuine TRCSL Approved brand new sealed Vivo Y31D smartphone in Sri Lanka. Engineered with a punch-hole Sunlight Display, powerful high-capacity 5000mAh battery with fast charging, high-resolution AI dual rear camera with Aura Light portrait system, IP54 dust and splash resistance, and seamless multitasking up to 8GB RAM + 256GB storage. Includes 1-Year Official Vivo Sri Lanka Company Warranty and free islandwide fast delivery.',
    basePrice: 317.75,
    salePrice: 287.49,
    images: [
      { id: 'img-vivo-y31d-1', productId: 'prod-vivo-y31d', url: '/products/vivo-y31d-feather-gold.jpg', alt: 'Vivo Y31D Feather Gold Sri Lanka', isPrimary: true, sortOrder: 0 },
      { id: 'img-vivo-y31d-2', productId: 'prod-vivo-y31d', url: '/products/vivo-y31d-starlight-grey.jpg', alt: 'Vivo Y31D Starlight Grey Matte Finish Sri Lanka', isPrimary: false, sortOrder: 1 },
    ],
    categoryId: 'vivo',
    variants: [
      { id: 'v-vy31d-128-fg', productId: 'prod-vivo-y31d', size: '6GB+128GB', color: 'Feather Gold', price: 287.49, stock: 20, sku: 'MM-VIVO-Y31D-128-FG' },
      { id: 'v-vy31d-128-sg', productId: 'prod-vivo-y31d', size: '6GB+128GB', color: 'Starlight Grey', price: 287.49, stock: 25, sku: 'MM-VIVO-Y31D-128-SG' },
      { id: 'v-vy31d-256-fg', productId: 'prod-vivo-y31d', size: '8GB+256GB', color: 'Feather Gold', price: 302.62, stock: 25, sku: 'MM-VIVO-Y31D-256-FG' },
      { id: 'v-vy31d-256-sg', productId: 'prod-vivo-y31d', size: '8GB+256GB', color: 'Starlight Grey', price: 302.62, stock: 30, sku: 'MM-VIVO-Y31D-256-SG' },
    ],
    rating: 4.9,
    totalSold: 34,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['🔋 5000mAh FastCharge', '📸 Aura Light Portrait', '⚡ 8GB RAM + 256GB', '🛡️ TRCSL Approved'],
    colorOptions: [
      { name: 'Feather Gold', hex: '#E6C280', image: '/products/vivo-y31d-feather-gold.jpg' },
      { name: 'Starlight Grey', hex: '#3F4349', image: '/products/vivo-y31d-starlight-grey.jpg' },
    ],
    createdAt: '2026-11-21T00:00:00Z',
    updatedAt: '2026-11-21T00:00:00Z',
  },

  // ─── 04. TECNO CAMON 50 PRO ────────────────────────────────
  {
    id: 'prod-tecno-camon-50-pro',
    name: 'Tecno Camon 50 Pro 5G (8GB RAM | 256GB Storage)',
    slug: 'tecno-camon-50-pro',
    description: '100% Genuine TRCSL Approved brand new sealed Tecno Camon 50 Pro 5G smartphone in Sri Lanka. Engineered for ultimate mobile photography with an AI ultra-clear triple camera system, dynamic punch-hole AMOLED Sunlight Display, ultra-fast charging with long-lasting 5000mAh battery, dual stereo speakers, and sleek dual-tone aesthetic curvature. Available in Malachite Green, Nebula Titanium, Moonshadow Black, Fir Green, Lavender Mist, and Ethereal Blue. Includes 1-Year Official Tecno Sri Lanka Company Warranty and free fast islandwide delivery.',
    basePrice: 529.64,
    salePrice: 484.24,
    images: [
      { id: 'img-tc50-1', productId: 'prod-tecno-camon-50-pro', url: '/products/tecno-camon-50-pro-malachite-green.jpg', alt: 'Tecno Camon 50 Pro 5G Malachite Green Sri Lanka', isPrimary: true, sortOrder: 0 },
      { id: 'img-tc50-2', productId: 'prod-tecno-camon-50-pro', url: '/products/tecno-camon-50-pro-nebula-titanium.jpg', alt: 'Tecno Camon 50 Pro 5G Nebula Titanium Sri Lanka', isPrimary: false, sortOrder: 1 },
      { id: 'img-tc50-3', productId: 'prod-tecno-camon-50-pro', url: '/products/tecno-camon-50-pro-moonshadow-black.jpg', alt: 'Tecno Camon 50 Pro 5G Moonshadow Black Sri Lanka', isPrimary: false, sortOrder: 2 },
    ],
    categoryId: 'tecno-infinix',
    variants: [
      { id: 'v-tc50p-256-mg', productId: 'prod-tecno-camon-50-pro', size: '8GB+256GB', color: 'Malachite Green', price: 484.24, stock: 25, sku: 'MM-TC50P-256-MG' },
      { id: 'v-tc50p-256-nt', productId: 'prod-tecno-camon-50-pro', size: '8GB+256GB', color: 'Nebula Titanium', price: 484.24, stock: 30, sku: 'MM-TC50P-256-NT' },
      { id: 'v-tc50p-256-mb', productId: 'prod-tecno-camon-50-pro', size: '8GB+256GB', color: 'Moonshadow Black', price: 484.24, stock: 30, sku: 'MM-TC50P-256-MB' },
      { id: 'v-tc50p-256-fg', productId: 'prod-tecno-camon-50-pro', size: '8GB+256GB', color: 'Fir Green', price: 484.24, stock: 15, sku: 'MM-TC50P-256-FG' },
      { id: 'v-tc50p-256-lm', productId: 'prod-tecno-camon-50-pro', size: '8GB+256GB', color: 'Lavender Mist', price: 484.24, stock: 20, sku: 'MM-TC50P-256-LM' },
      { id: 'v-tc50p-256-eb', productId: 'prod-tecno-camon-50-pro', size: '8GB+256GB', color: 'Ethereal Blue', price: 484.24, stock: 20, sku: 'MM-TC50P-256-EB' },
    ],
    rating: 4.9,
    totalSold: 48,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['🚀 5G Flagship', '📸 AI Ultra-Clear 50MP', '📱 Dynamic AMOLED', '🔋 5000mAh SuperCharge'],
    colorOptions: [
      { name: 'Malachite Green', hex: '#1E824C', image: '/products/tecno-camon-50-pro-malachite-green.jpg' },
      { name: 'Nebula Titanium', hex: '#D2D2D0', image: '/products/tecno-camon-50-pro-nebula-titanium.jpg' },
      { name: 'Moonshadow Black', hex: '#1E1F22', image: '/products/tecno-camon-50-pro-moonshadow-black.jpg' },
    ],
    createdAt: '2026-11-21T00:00:00Z',
    updatedAt: '2026-11-21T00:00:00Z',
  },

  // ─── 05. INFINIX HOT 70 ────────────────────────────────────
  {
    id: 'prod-infinix-hot-70',
    name: 'Infinix Hot 70 (4GB / 6GB RAM | 128GB Storage)',
    slug: 'infinix-hot-70',
    description: '100% Genuine TRCSL Approved brand new sealed Infinix Hot 70 smartphone in Sri Lanka. Powered by an ultra-smooth 120Hz punch-hole display, high-capacity 5000mAh long-lasting battery with fast charging, ultra-clear AI triple camera setup, dual stereo speakers, and IP54 splash resistance. Available in Silver Dancer, Dive Blue, Quiet Violet, Thermo Orange, and Green Texture. Includes 1-Year Official Infinix Sri Lanka Company Warranty and islandwide free fast delivery.',
    basePrice: 257.25,
    salePrice: 226.99,
    images: [
      { id: 'img-inf-h70-1', productId: 'prod-infinix-hot-70', url: '/products/infinix-hot-70-silver-dancer.jpg', alt: 'Infinix Hot 70 Silver Dancer Sri Lanka', isPrimary: true, sortOrder: 0 },
      { id: 'img-inf-h70-2', productId: 'prod-infinix-hot-70', url: '/products/infinix-hot-70-dive-blue.jpg', alt: 'Infinix Hot 70 Dive Blue Matte Sri Lanka', isPrimary: false, sortOrder: 1 },
      { id: 'img-inf-h70-3', productId: 'prod-infinix-hot-70', url: '/products/infinix-hot-70-quiet-violet.jpg', alt: 'Infinix Hot 70 Quiet Violet Dark Edition Sri Lanka', isPrimary: false, sortOrder: 2 },
    ],
    categoryId: 'tecno-infinix',
    variants: [
      { id: 'v-inf-h70-4-sd', productId: 'prod-infinix-hot-70', size: '4GB+128GB', color: 'Silver Dancer', price: 226.99, stock: 25, sku: 'MM-INF-H70-4-SD' },
      { id: 'v-inf-h70-4-db', productId: 'prod-infinix-hot-70', size: '4GB+128GB', color: 'Dive Blue', price: 226.99, stock: 25, sku: 'MM-INF-H70-4-DB' },
      { id: 'v-inf-h70-4-qv', productId: 'prod-infinix-hot-70', size: '4GB+128GB', color: 'Quiet Violet', price: 226.99, stock: 20, sku: 'MM-INF-H70-4-QV' },
      { id: 'v-inf-h70-4-to', productId: 'prod-infinix-hot-70', size: '4GB+128GB', color: 'Thermo Orange', price: 226.99, stock: 15, sku: 'MM-INF-H70-4-TO' },
      { id: 'v-inf-h70-4-gt', productId: 'prod-infinix-hot-70', size: '4GB+128GB', color: 'Green Texture', price: 226.99, stock: 15, sku: 'MM-INF-H70-4-GT' },
      { id: 'v-inf-h70-6-sd', productId: 'prod-infinix-hot-70', size: '6GB+128GB', color: 'Silver Dancer', price: 287.52, stock: 30, sku: 'MM-INF-H70-6-SD' },
      { id: 'v-inf-h70-6-db', productId: 'prod-infinix-hot-70', size: '6GB+128GB', color: 'Dive Blue', price: 287.52, stock: 30, sku: 'MM-INF-H70-6-DB' },
      { id: 'v-inf-h70-6-qv', productId: 'prod-infinix-hot-70', size: '6GB+128GB', color: 'Quiet Violet', price: 287.52, stock: 25, sku: 'MM-INF-H70-6-QV' },
      { id: 'v-inf-h70-6-to', productId: 'prod-infinix-hot-70', size: '6GB+128GB', color: 'Thermo Orange', price: 287.52, stock: 20, sku: 'MM-INF-H70-6-TO' },
      { id: 'v-inf-h70-6-gt', productId: 'prod-infinix-hot-70', size: '6GB+128GB', color: 'Green Texture', price: 287.52, stock: 20, sku: 'MM-INF-H70-6-GT' },
    ],
    rating: 4.9,
    totalSold: 58,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['⚡ 120Hz Punch-Hole', '🔋 5000mAh FastCharge', '📸 AI Triple Camera', '🔊 Dual Stereo Speakers'],
    colorOptions: [
      { name: 'Silver Dancer', hex: '#D0D3D4', image: '/products/infinix-hot-70-silver-dancer.jpg' },
      { name: 'Dive Blue', hex: '#2980B9', image: '/products/infinix-hot-70-dive-blue.jpg' },
      { name: 'Quiet Violet', hex: '#8E44AD', image: '/products/infinix-hot-70-quiet-violet.jpg' },
    ],
    createdAt: '2026-11-21T00:00:00Z',
    updatedAt: '2026-11-21T00:00:00Z',
  },

  // ─── 06. INFINIX SMART 20 ──────────────────────────────────
  {
    id: 'prod-infinix-smart-20',
    name: 'Infinix Smart 20 (4GB RAM | 64GB / 128GB Storage)',
    slug: 'infinix-smart-20',
    description: '100% Genuine TRCSL Approved brand new sealed Infinix Smart 20 smartphone in Sri Lanka. Features a fluid 120Hz Sunlight Punch-Hole Display, huge 5000mAh long-lasting battery with Type-C fast charging, high-clarity AI dual rear camera with dual flash, 300% Ultra Volume speaker, and IP54 splash resistance. Available in Polaris Titanium, Shadow Black, Cloudline Blue, and Sunlike Orange. Includes 1-Year Official Infinix Sri Lanka Company Warranty and free islandwide fast delivery.',
    basePrice: 181.59,
    salePrice: 166.46,
    images: [
      { id: 'img-inf-sm20-1', productId: 'prod-infinix-smart-20', url: '/products/infinix-smart-20-polaris-titanium.jpg', alt: 'Infinix Smart 20 Polaris Titanium Sri Lanka', isPrimary: true, sortOrder: 0 },
      { id: 'img-inf-sm20-2', productId: 'prod-infinix-smart-20', url: '/products/infinix-smart-20-shadow-black.jpg', alt: 'Infinix Smart 20 Shadow Black Sri Lanka', isPrimary: false, sortOrder: 1 },
      { id: 'img-inf-sm20-3', productId: 'prod-infinix-smart-20', url: '/products/infinix-smart-20-cloudline-blue.jpg', alt: 'Infinix Smart 20 Cloudline Blue Sri Lanka', isPrimary: false, sortOrder: 2 },
      { id: 'img-inf-sm20-4', productId: 'prod-infinix-smart-20', url: '/products/infinix-smart-20-all-colors.jpg', alt: 'Infinix Smart 20 Color Variants Sri Lanka', isPrimary: false, sortOrder: 3 },
    ],
    categoryId: 'tecno-infinix',
    variants: [
      { id: 'v-inf-sm20-64-pt', productId: 'prod-infinix-smart-20', size: '4GB+64GB', color: 'Polaris Titanium', price: 166.46, stock: 25, sku: 'MM-INF-SM20-64-PT' },
      { id: 'v-inf-sm20-64-sb', productId: 'prod-infinix-smart-20', size: '4GB+64GB', color: 'Shadow Black', price: 166.46, stock: 25, sku: 'MM-INF-SM20-64-SB' },
      { id: 'v-inf-sm20-64-cb', productId: 'prod-infinix-smart-20', size: '4GB+64GB', color: 'Cloudline Blue', price: 166.46, stock: 20, sku: 'MM-INF-SM20-64-CB' },
      { id: 'v-inf-sm20-64-so', productId: 'prod-infinix-smart-20', size: '4GB+64GB', color: 'Sunlike Orange', price: 166.46, stock: 20, sku: 'MM-INF-SM20-64-SO' },
      { id: 'v-inf-sm20-128-pt', productId: 'prod-infinix-smart-20', size: '4GB+128GB', color: 'Polaris Titanium', price: 196.72, stock: 30, sku: 'MM-INF-SM20-128-PT' },
      { id: 'v-inf-sm20-128-sb', productId: 'prod-infinix-smart-20', size: '4GB+128GB', color: 'Shadow Black', price: 196.72, stock: 30, sku: 'MM-INF-SM20-128-SB' },
      { id: 'v-inf-sm20-128-cb', productId: 'prod-infinix-smart-20', size: '4GB+128GB', color: 'Cloudline Blue', price: 196.72, stock: 25, sku: 'MM-INF-SM20-128-CB' },
      { id: 'v-inf-sm20-128-so', productId: 'prod-infinix-smart-20', size: '4GB+128GB', color: 'Sunlike Orange', price: 196.72, stock: 25, sku: 'MM-INF-SM20-128-SO' },
    ],
    rating: 4.8,
    totalSold: 42,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['⚡ 120Hz Sunlight Display', '🔋 5000mAh Type-C', '🔊 300% Ultra Volume', '🛡️ TRCSL Approved'],
    colorOptions: [
      { name: 'Polaris Titanium', hex: '#B0B3B2', image: '/products/infinix-smart-20-polaris-titanium.jpg' },
      { name: 'Shadow Black', hex: '#2C3E50', image: '/products/infinix-smart-20-shadow-black.jpg' },
      { name: 'Cloudline Blue', hex: '#5DADE2', image: '/products/infinix-smart-20-cloudline-blue.jpg' },
    ],
    createdAt: '2026-11-21T00:00:00Z',
    updatedAt: '2026-11-21T00:00:00Z',
  },

  // ─── 07. INFINIX NOTE 60 PRO ───────────────────────────────
  {
    id: 'prod-infinix-note-60-pro',
    name: 'Infinix Note 60 Pro 5G (8GB RAM | 256GB Storage)',
    slug: 'infinix-note-60-pro',
    description: '100% Genuine TRCSL Approved brand new sealed flagship Infinix Note 60 Pro 5G smartphone in Sri Lanka. Engineered with an innovative rear dot-matrix smart display, ultra-vivid 144Hz 3D curved AMOLED screen, ultra-fast 100W All-Round FastCharge & wireless MagCharge, 200MP OIS AI flagship camera, and military-grade durability. Available in Solar Orange, Torino Black, Deep Ocean Blue, Mocha Brown, Mist Titanium, and Frost Silver. Includes 1-Year Official Infinix Sri Lanka Company Warranty and islandwide free fast delivery.',
    basePrice: 559.91,
    salePrice: 514.51,
    images: [
      { id: 'img-inf-n60-1', productId: 'prod-infinix-note-60-pro', url: '/products/infinix-note-60-pro-solar-orange.jpg', alt: 'Infinix Note 60 Pro 5G Solar Orange Sri Lanka', isPrimary: true, sortOrder: 0 },
      { id: 'img-inf-n60-2', productId: 'prod-infinix-note-60-pro', url: '/products/infinix-note-60-pro-torino-black.jpg', alt: 'Infinix Note 60 Pro 5G Torino Black Sri Lanka', isPrimary: false, sortOrder: 1 },
      { id: 'img-inf-n60-3', productId: 'prod-infinix-note-60-pro', url: '/products/infinix-note-60-pro-deep-ocean-blue.jpg', alt: 'Infinix Note 60 Pro 5G Deep Ocean Blue Sri Lanka', isPrimary: false, sortOrder: 2 },
    ],
    categoryId: 'tecno-infinix',
    variants: [
      { id: 'v-inf-n60p-256-so', productId: 'prod-infinix-note-60-pro', size: '8GB+256GB', color: 'Solar Orange', price: 514.51, stock: 25, sku: 'MM-INF-N60P-256-SO' },
      { id: 'v-inf-n60p-256-tb', productId: 'prod-infinix-note-60-pro', size: '8GB+256GB', color: 'Torino Black', price: 514.51, stock: 30, sku: 'MM-INF-N60P-256-TB' },
      { id: 'v-inf-n60p-256-db', productId: 'prod-infinix-note-60-pro', size: '8GB+256GB', color: 'Deep Ocean Blue', price: 514.51, stock: 25, sku: 'MM-INF-N60P-256-DB' },
      { id: 'v-inf-n60p-256-mb', productId: 'prod-infinix-note-60-pro', size: '8GB+256GB', color: 'Mocha Brown', price: 514.51, stock: 15, sku: 'MM-INF-N60P-256-MB' },
      { id: 'v-inf-n60p-256-mt', productId: 'prod-infinix-note-60-pro', size: '8GB+256GB', color: 'Mist Titanium', price: 514.51, stock: 20, sku: 'MM-INF-N60P-256-MT' },
      { id: 'v-inf-n60p-256-fs', productId: 'prod-infinix-note-60-pro', size: '8GB+256GB', color: 'Frost Silver', price: 514.51, stock: 20, sku: 'MM-INF-N60P-256-FS' },
    ],
    rating: 5.0,
    totalSold: 64,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['⚡ 100W All-Round Charge', '✨ Dot-Matrix Smart Display', '📸 200MP OIS Camera', '📱 144Hz 3D Curved'],
    colorOptions: [
      { name: 'Solar Orange', hex: '#E67E22', image: '/products/infinix-note-60-pro-solar-orange.jpg' },
      { name: 'Torino Black', hex: '#17202A', image: '/products/infinix-note-60-pro-torino-black.jpg' },
      { name: 'Deep Ocean Blue', hex: '#1B4F72', image: '/products/infinix-note-60-pro-deep-ocean-blue.jpg' },
    ],
    createdAt: '2026-11-21T00:00:00Z',
    updatedAt: '2026-11-21T00:00:00Z',
  },
  // ─── 08. CORN XM530 45W TYPE-C CABLE (DARAZ IMPORT) ────────
  {
    id: 'daraz-1816799647',
    name: 'CORN XM530 45W Type-C to Type-C Fast Charging Data Cable | 5A Super Fast Charge | Premium Braided | 100CM (1M)',
    slug: 'corn-xm530-45w-type-c-fast-charging-cable',
    description: '⚡ 45W Super Fast Charging: Delivers an impressive 45W output with 5A high current to power up your devices in no time. 🔌 Type-C to Type-C: The standard Type-C to Type-C interface ensures Super Compatibility with modern smartphones, tablets, and even laptops. 💻 Data Syncing: Supports rapid data transfer alongside fast charging. 🛡️ Premium Braided Design: Built with a highly durable braided nylon exterior to withstand daily bending and pulling, significantly extending its lifespan. 📏 Ideal Length: Comes in a standard 100cm (1M) length, perfect for home, office, or car use. At Methmi Mobile, we offer 100% authentic, CE, FC, and RoHS certified cables.',
    basePrice: 3.33,
    salePrice: 2.724,
    images: [
      {
        id: 'img-corn-xm530',
        productId: 'daraz-1816799647',
        url: 'https://img.drz.lazcdn.com/static/lk/p/c4f23cdde802d43a53ed4ab4d162091b.jpg_720x720q80.jpg',
        alt: 'CORN XM530 45W Type-C Fast Charging Cable',
        isPrimary: true,
        sortOrder: 0
      }
    ],
    categoryId: 'mobile',
    variants: [
      {
        id: 'var-corn-xm530',
        productId: 'daraz-1816799647',
        size: '100CM (1M)',
        color: 'Braided Black',
        price: 2.724,
        stock: 20,
        sku: '1816799647-1793859699417-0'
      }
    ],
    rating: 4.9,
    totalSold: 18,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['⚡ 45W / 5A Super Fast Charge', '🔌 Type-C to Type-C', '🛡️ Premium Braided Nylon', '💻 Data Sync & Charging'],
    createdAt: '2026-11-22T00:00:00Z',
    updatedAt: '2026-11-22T00:00:00Z',
  },
  // ─── 09. CORN XM600 4-IN-1 65W CABLE (DARAZ IMPORT) ─────────
  {
    id: 'daraz-1780025565',
    name: 'CORN XM600 4-in-1 Super Fast Charging Cable | 65W & 27W PD | Type-C & Lightning | Premium Braided Mech Data Cable',
    slug: 'corn-xm600-4-in-1-super-fast-charging-cable',
    description: '⚡ Super Fast Charging: Supports 65W and 27W high-speed charging for your devices. 🔄 4-in-1 Versatility: Features multiple connection options in one cable: USB to Type-C, USB to Lightning, Type-C to Type-C, and Type-C to Lightning. Perfect for both Android and Apple devices. 💻 Charge & Data Sync: Supports fast data transfer alongside rapid charging. 🛡️ Premium Built: Engineered as a Mech Data Cable with a durable braided design to prevent tangling and breaking. 📏 Perfect Length: Comes in a standard 100CM (1 Meter) length for convenient everyday use. 100% authentic from Methmi Mobile.',
    basePrice: 3.63,
    salePrice: 3.023,
    images: [
      {
        id: 'img-corn-xm600',
        productId: 'daraz-1780025565',
        url: 'https://img.drz.lazcdn.com/static/lk/p/e33ea331c01f13e5628069a7a6e09458.jpg_720x720q80.jpg',
        alt: 'CORN XM600 4-in-1 Super Fast Charging Cable',
        isPrimary: true,
        sortOrder: 0
      }
    ],
    categoryId: 'mobile',
    variants: [
      {
        id: 'var-corn-xm600',
        productId: 'daraz-1780025565',
        size: '100CM (1M)',
        color: 'Braided Mech',
        price: 3.023,
        stock: 10,
        sku: '1780025565-1792741982591-0'
      }
    ],
    rating: 5.0,
    totalSold: 25,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['⚡ 65W & 27W PD Super Fast', '🔄 4-in-1 Android & Apple', '🛡️ Premium Mech Braided', '💻 High-Speed Data Sync'],
    createdAt: '2026-11-22T00:00:00Z',
    updatedAt: '2026-11-22T00:00:00Z',
  },
  // ─── 10. NOKIA 105 KEYPAD PHONE (DARAZ IMPORT) ─────────────
  {
    id: 'daraz-1780015988',
    name: 'Nokia 105 Original Keypad Phone | TRCSL Approved | Official Softlogic Warranty | 1.77" Display',
    slug: 'nokia-105-original-keypad-phone',
    description: '100% Authentic Nokia 105 with Official Softlogic Warranty. TRCSL Approved, original Nokia 105 by HMD. At Methmi Mobile, we guarantee complete authenticity. Sealed pack with Official softlogic WARRANTY (Hotline: 0777 726 724). 🔋 Long-Lasting Battery: Up to 12 hours talk time or 18 days standby. 📻 Wireless FM Radio: Listen without headsets. 💾 2000 Contacts storage. 💡 Built-in LED Torch. 📱 1.77" sharp display.',
    basePrice: 24.21,
    salePrice: 22.998,
    images: [
      {
        id: 'img-nokia-105',
        productId: 'daraz-1780015988',
        url: 'https://img.drz.lazcdn.com/static/lk/p/ba7cf390770bec675556ecd5758f805e.jpg_720x720q80.jpg',
        alt: 'Nokia 105 Original Keypad Phone TRCSL Approved',
        isPrimary: true,
        sortOrder: 0
      }
    ],
    categoryId: 'phones',
    variants: [
      {
        id: 'var-nokia-105-black',
        productId: 'daraz-1780015988',
        size: '1.77"',
        color: 'Charcoal Black',
        price: 22.998,
        stock: 10,
        sku: '1780015988-1792739416912-0'
      }
    ],
    rating: 5.0,
    totalSold: 39,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['🛡️ TRCSL Approved & Softlogic Warranty', '🔋 18 Days Standby Battery', '📻 Wireless FM Radio', '💡 Powerful LED Torch'],
    createdAt: '2026-11-22T00:00:00Z',
    updatedAt: '2026-11-22T00:00:00Z',
  },
  // ─── 11. PLUZZ Z108 HERO KEYPAD PHONE (DARAZ IMPORT) ────────
  {
    id: 'daraz-1771206904',
    name: 'PLUZZ Z108 Hero Original Keypad Mobile Phone | 1.77" QQVGA Display | Type-C Charging | 1000mAh Battery | Dual SIM',
    slug: 'pluzz-z108-hero-keypad-mobile-phone',
    description: 'PLUZZ Z108 Hero 100% Original Keypad Mobile Phone with Anti-Counterfeit Verification Scratch Code. Modern Type-C Charging port for convenient power-ups, long-lasting 1000mAh battery, Dual SIM Dual Standby, Wireless FM Radio, Camera, Video Recording, King Voice, Black List, and built-in LED Torch. Guaranteed original from Methmi Mobile.',
    basePrice: 15.13,
    salePrice: 14.224,
    images: [
      {
        id: 'img-pluzz-z108',
        productId: 'daraz-1771206904',
        url: 'https://img.drz.lazcdn.com/static/lk/p/49b1b883720e02e8f62412f942ce1f6f.jpg_720x720q80.jpg',
        alt: 'PLUZZ Z108 Hero Keypad Mobile Phone Type-C Charging',
        isPrimary: true,
        sortOrder: 0
      }
    ],
    categoryId: 'phones',
    variants: [
      {
        id: 'var-pluzz-z108',
        productId: 'daraz-1771206904',
        size: '1.77" QQVGA',
        color: 'Titanium Grey',
        price: 14.224,
        stock: 10,
        sku: '1771206904-1792739416912-0'
      }
    ],
    rating: 4.8,
    totalSold: 22,
    isActive: true,
    isFeatured: true,
    specsHighlights: ['🔌 Modern Type-C Charging', '🔋 1000mAh Long Battery', '📶 Dual SIM Dual Standby', '🔒 Scratch to Verify Authenticity'],
    createdAt: '2026-11-22T00:00:00Z',
    updatedAt: '2026-11-22T00:00:00Z',
  },
  {
  "id": "daraz-196795160",
  "name": "OMS OM-401 Auto ID Dual USB Port Charger",
  "slug": "oms-om-401-auto-id-dual-usb-port-charger-5160",
  "description": "OMS OM-401 Auto ID Dual USB Port Charger with 1 Year Warranty. Warranty: 1 Year Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 7.66,
  "salePrice": 6.66,
  "images": [
    {
      "id": "img-196795160-1",
      "productId": "daraz-196795160",
      "url": "https://static-01.daraz.lk/p/6e93e9a379ef6635e168d51f24cd8643.jpg",
      "alt": "OMS OM-401 Auto ID Dual USB Port Charger",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-196795160-1",
      "productId": "daraz-196795160",
      "size": "Standard",
      "color": "Original",
      "price": 6.66,
      "stock": 25,
      "sku": "DARAZ-196795160"
    }
  ],
  "rating": 4.6,
  "totalSold": 10,
  "isActive": true,
  "isFeatured": true,
  "specsHighlights": [
    "🛡️ 1 Year Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1754421262",
  "name": "OMS T32 Open-Ear Sports Wireless Earbuds | 3D Stereoscopic Sound",
  "slug": "oms-t32-open-ear-sports-wireless-earbuds-3d-stereo-1262",
  "description": "Master Sound Quality, Ergonomic Design, Touch Control, Digital Display. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 21.23,
  "salePrice": 18.46,
  "images": [
    {
      "id": "img-1754421262-1",
      "productId": "daraz-1754421262",
      "url": "https://static-01.daraz.lk/p/24c62444987c2789872394db0ecc47c7.jpg",
      "alt": "OMS T32 Open-Ear Sports Wireless Earbuds | 3D Stereoscopic Sound",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1754421262-1",
      "productId": "daraz-1754421262",
      "size": "Standard",
      "color": "Original",
      "price": 18.46,
      "stock": 25,
      "sku": "DARAZ-1754421262"
    }
  ],
  "rating": 4.7,
  "totalSold": 13,
  "isActive": true,
  "isFeatured": true,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1754443016",
  "name": "OMS T29 Smart LED Display Wireless Earbuds - BT 6.0",
  "slug": "oms-t29-smart-led-display-wireless-earbuds---bt-60-3016",
  "description": "Bluetooth 6.0, 16 Hours Playtime, Smart LED Touch Display. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 19.14,
  "salePrice": 16.65,
  "images": [
    {
      "id": "img-1754443016-1",
      "productId": "daraz-1754443016",
      "url": "https://static-01.daraz.lk/p/b51a33c5a7e8e5f647581faa4d9b9c7d.jpg",
      "alt": "OMS T29 Smart LED Display Wireless Earbuds - BT 6.0",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1754443016-1",
      "productId": "daraz-1754443016",
      "size": "Standard",
      "color": "Original",
      "price": 16.65,
      "stock": 25,
      "sku": "DARAZ-1754443016"
    }
  ],
  "rating": 4.8,
  "totalSold": 16,
  "isActive": true,
  "isFeatured": true,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1754704573",
  "name": "OMS V20 20000mAh Power Bank with Built-in 3-in-1 Cables",
  "slug": "oms-v20-20000mah-power-bank-with-built-in-3-in-1-c-4573",
  "description": "Type-C, Lightning, Micro Built-in cables, 20000mAh high capacity. Warranty: 1 Year Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 25.41,
  "salePrice": 22.09,
  "images": [
    {
      "id": "img-1754704573-1",
      "productId": "daraz-1754704573",
      "url": "https://static-01.daraz.lk/p/bce0c8fb6d34c11e19adac42855190fb.jpg",
      "alt": "OMS V20 20000mAh Power Bank with Built-in 3-in-1 Cables",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1754704573-1",
      "productId": "daraz-1754704573",
      "size": "Standard",
      "color": "Original",
      "price": 22.09,
      "stock": 25,
      "sku": "DARAZ-1754704573"
    }
  ],
  "rating": 4.9,
  "totalSold": 19,
  "isActive": true,
  "isFeatured": true,
  "specsHighlights": [
    "🛡️ 1 Year Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1754797367",
  "name": "M9S 4G LTE Advanced Pocket WiFi Router - All Network Support",
  "slug": "m9s-4g-lte-advanced-pocket-wifi-router---all-netwo-7367",
  "description": "High-Speed Mobile Hotspot, Ultra-Slim, Multi-Device connectivity. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 23.32,
  "salePrice": 20.28,
  "images": [
    {
      "id": "img-1754797367-1",
      "productId": "daraz-1754797367",
      "url": "https://static-01.daraz.lk/p/e75c593bc5c51281fef3b40166395f57.jpg",
      "alt": "M9S 4G LTE Advanced Pocket WiFi Router - All Network Support",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "computer",
  "variants": [
    {
      "id": "var-1754797367-1",
      "productId": "daraz-1754797367",
      "size": "Standard",
      "color": "Original",
      "price": 20.28,
      "stock": 25,
      "sku": "DARAZ-1754797367"
    }
  ],
  "rating": 5,
  "totalSold": 22,
  "isActive": true,
  "isFeatured": true,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1754876852",
  "name": "Papada A11 Wireless Neckband Bluetooth 5.3 - 50 Hours Playtime",
  "slug": "papada-a11-wireless-neckband-bluetooth-53---50-hou-6852",
  "description": "50 Hours Music Playtime, 400mAh battery, Bluetooth 5.3. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 12.53,
  "salePrice": 10.9,
  "images": [
    {
      "id": "img-1754876852-1",
      "productId": "daraz-1754876852",
      "url": "https://static-01.daraz.lk/p/afaec1e2bcf96dc3a0331991a0bfd50d.jpg",
      "alt": "Papada A11 Wireless Neckband Bluetooth 5.3 - 50 Hours Playtime",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1754876852-1",
      "productId": "daraz-1754876852",
      "size": "Standard",
      "color": "Original",
      "price": 10.9,
      "stock": 25,
      "sku": "DARAZ-1754876852"
    }
  ],
  "rating": 4.6,
  "totalSold": 25,
  "isActive": true,
  "isFeatured": true,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755653880",
  "name": "OMS OM422-H 45W Super Fast Charger (SuperVOOC / Warp / Turbo)",
  "slug": "oms-om422-h-45w-super-fast-charger-supervooc-warp--3880",
  "description": "45W SuperVOOC / SuperDart / Warp / Xiaomi Turbo Charge support. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 10.79,
  "salePrice": 9.38,
  "images": [
    {
      "id": "img-1755653880-1",
      "productId": "daraz-1755653880",
      "url": "https://static-01.daraz.lk/p/ecab86f578f451edd924b7884895d7b2.jpg",
      "alt": "OMS OM422-H 45W Super Fast Charger (SuperVOOC / Warp / Turbo)",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755653880-1",
      "productId": "daraz-1755653880",
      "size": "Standard",
      "color": "Original",
      "price": 9.38,
      "stock": 25,
      "sku": "DARAZ-1755653880"
    }
  ],
  "rating": 4.7,
  "totalSold": 28,
  "isActive": true,
  "isFeatured": true,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755661387",
  "name": "OMS OM-425 25W Fast Charger - Dual Port (USB-C PD 3.0 + USB-A QC)",
  "slug": "oms-om-425-25w-fast-charger---dual-port-usb-c-pd-3-1387",
  "description": "Dual Port Fast Charger, Type-C PD 3.0 + USB-A QC 3.0, Smart Chip. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 6.61,
  "salePrice": 5.75,
  "images": [
    {
      "id": "img-1755661387-1",
      "productId": "daraz-1755661387",
      "url": "https://static-01.daraz.lk/p/9342316e4d305eb7806c8f6e8255c963.jpg",
      "alt": "OMS OM-425 25W Fast Charger - Dual Port (USB-C PD 3.0 + USB-A QC)",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755661387-1",
      "productId": "daraz-1755661387",
      "size": "Standard",
      "color": "Original",
      "price": 5.75,
      "stock": 25,
      "sku": "DARAZ-1755661387"
    }
  ],
  "rating": 4.8,
  "totalSold": 31,
  "isActive": true,
  "isFeatured": true,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755669467",
  "name": "OMS OM410 20W Compact Super Fast Charger (Mi Turbo / Flash Charge)",
  "slug": "oms-om410-20w-compact-super-fast-charger-mi-turbo--9467",
  "description": "20W Compact Adapter, Fire-proof material, Mi Turbo supported. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 5.91,
  "salePrice": 5.14,
  "images": [
    {
      "id": "img-1755669467-1",
      "productId": "daraz-1755669467",
      "url": "https://static-01.daraz.lk/p/c2253b94637952aed511227bf9173829.jpg",
      "alt": "OMS OM410 20W Compact Super Fast Charger (Mi Turbo / Flash Charge)",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755669467-1",
      "productId": "daraz-1755669467",
      "size": "Standard",
      "color": "Original",
      "price": 5.14,
      "stock": 25,
      "sku": "DARAZ-1755669467"
    }
  ],
  "rating": 4.9,
  "totalSold": 34,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755835706",
  "name": "X-PERT XPC28 2.4A Travel Fast Charger with Micro USB Cable",
  "slug": "x-pert-xpc28-24a-travel-fast-charger-with-micro-us-5706",
  "description": "Complete travel kit with 2.4A fast charging and included cable. Warranty: 6 Months Brand Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 1.74,
  "salePrice": 1.51,
  "images": [
    {
      "id": "img-1755835706-1",
      "productId": "daraz-1755835706",
      "url": "https://static-01.daraz.lk/p/044cd16b59d51a3a35296e82e8ac12f6.jpg",
      "alt": "X-PERT XPC28 2.4A Travel Fast Charger with Micro USB Cable",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755835706-1",
      "productId": "daraz-1755835706",
      "size": "Standard",
      "color": "Original",
      "price": 1.51,
      "stock": 25,
      "sku": "DARAZ-1755835706"
    }
  ],
  "rating": 5,
  "totalSold": 37,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Brand Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755839653",
  "name": "X-PERT XPC26 2.4A Smart Travel Charger - Auto Power-Off (Black)",
  "slug": "x-pert-xpc26-24a-smart-travel-charger---auto-power-9653",
  "description": "Auto Power-Off overheat protection, 2.4A steady fast charge. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 2.09,
  "salePrice": 1.81,
  "images": [
    {
      "id": "img-1755839653-1",
      "productId": "daraz-1755839653",
      "url": "https://static-01.daraz.lk/p/27d42dd3f874c91ca5c7c2054225f063.jpg",
      "alt": "X-PERT XPC26 2.4A Smart Travel Charger - Auto Power-Off (Black)",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755839653-1",
      "productId": "daraz-1755839653",
      "size": "Standard",
      "color": "Original",
      "price": 1.81,
      "stock": 25,
      "sku": "DARAZ-1755839653"
    }
  ],
  "rating": 4.6,
  "totalSold": 40,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755865172",
  "name": "Samsung 20W Adaptive Fast Charger SFC 12 Wall Adapter",
  "slug": "samsung-20w-adaptive-fast-charger-sfc-12-wall-adap-5172",
  "description": "Samsung Adaptive Fast Charging, SFC 12 model, 3A high speed. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 2.78,
  "salePrice": 2.42,
  "images": [
    {
      "id": "img-1755865172-1",
      "productId": "daraz-1755865172",
      "url": "https://static-01.daraz.lk/p/ce16084c3eba39ae259c311d14540b7e.jpg",
      "alt": "Samsung 20W Adaptive Fast Charger SFC 12 Wall Adapter",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755865172-1",
      "productId": "daraz-1755865172",
      "size": "Standard",
      "color": "Original",
      "price": 2.42,
      "stock": 25,
      "sku": "DARAZ-1755865172"
    }
  ],
  "rating": 4.7,
  "totalSold": 43,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755932993",
  "name": "OMS S4 2.4A Dual USB Fast Charger with Micro USB Cable",
  "slug": "oms-s4-24a-dual-usb-fast-charger-with-micro-usb-ca-2993",
  "description": "Dual USB ports, optimal safety circuitry, free Micro USB cable. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 5.22,
  "salePrice": 4.54,
  "images": [
    {
      "id": "img-1755932993-1",
      "productId": "daraz-1755932993",
      "url": "https://static-01.daraz.lk/p/ac7acdc1debcdabffd2faee327ed73e8.jpg",
      "alt": "OMS S4 2.4A Dual USB Fast Charger with Micro USB Cable",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755932993-1",
      "productId": "daraz-1755932993",
      "size": "Standard",
      "color": "Original",
      "price": 4.54,
      "stock": 25,
      "sku": "DARAZ-1755932993"
    }
  ],
  "rating": 4.8,
  "totalSold": 46,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755934995",
  "name": "OMS OM423 45W Dual-Port Super Fast Charger (Type-C 25W + USB-A 20W)",
  "slug": "oms-om423-45w-dual-port-super-fast-charger-type-c--4995",
  "description": "Dual port 45W output, charge two devices at high speed simultaneously. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 8,
  "salePrice": 6.96,
  "images": [
    {
      "id": "img-1755934995-1",
      "productId": "daraz-1755934995",
      "url": "https://static-01.daraz.lk/p/63f39cc2a9a2005b511cd8d054972d60.jpg",
      "alt": "OMS OM423 45W Dual-Port Super Fast Charger (Type-C 25W + USB-A 20W)",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755934995-1",
      "productId": "daraz-1755934995",
      "size": "Standard",
      "color": "Original",
      "price": 6.96,
      "stock": 25,
      "sku": "DARAZ-1755934995"
    }
  ],
  "rating": 4.9,
  "totalSold": 49,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1755978093",
  "name": "OMS OM 190 2.4A Dual USB Fast Charger - Smart Temp Control",
  "slug": "oms-om-190-24a-dual-usb-fast-charger---smart-temp--8093",
  "description": "Dual USB ports, over-temperature & over-current protection. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 4.17,
  "salePrice": 3.63,
  "images": [
    {
      "id": "img-1755978093-1",
      "productId": "daraz-1755978093",
      "url": "https://static-01.daraz.lk/p/49e4afc54d1b3f8f625b44003ccf459a.jpg",
      "alt": "OMS OM 190 2.4A Dual USB Fast Charger - Smart Temp Control",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1755978093-1",
      "productId": "daraz-1755978093",
      "size": "Standard",
      "color": "Original",
      "price": 3.63,
      "stock": 25,
      "sku": "DARAZ-1755978093"
    }
  ],
  "rating": 5,
  "totalSold": 52,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1756098965",
  "name": "OMS OM188 S4 2.4A Fast Charger Kit with Cable",
  "slug": "oms-om188-s4-24a-fast-charger-kit-with-cable-8965",
  "description": "Smart Chip technology, 2.4A fast output, includes high-speed cable. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 2.43,
  "salePrice": 2.12,
  "images": [
    {
      "id": "img-1756098965-1",
      "productId": "daraz-1756098965",
      "url": "https://static-01.daraz.lk/p/7b87defe38250798383cd70492d7fde9.jpg",
      "alt": "OMS OM188 S4 2.4A Fast Charger Kit with Cable",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1756098965-1",
      "productId": "daraz-1756098965",
      "size": "Standard",
      "color": "Original",
      "price": 2.12,
      "stock": 25,
      "sku": "DARAZ-1756098965"
    }
  ],
  "rating": 4.6,
  "totalSold": 55,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1756361808",
  "name": "Samsung Galaxy A04 Luxury Signature Case - 9D Pro-Lens Guard",
  "slug": "samsung-galaxy-a04-luxury-signature-case---9d-pro--1808",
  "description": "Ultra-HD Original Print, 9D Raised Camera Border, Velvet Matte Texture. Warranty: Checking Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 2.26,
  "salePrice": 1.97,
  "images": [
    {
      "id": "img-1756361808-1",
      "productId": "daraz-1756361808",
      "url": "https://static-01.daraz.lk/p/c04e9d438ed20fd8e4f820f144f5a877.jpg",
      "alt": "Samsung Galaxy A04 Luxury Signature Case - 9D Pro-Lens Guard",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1756361808-1",
      "productId": "daraz-1756361808",
      "size": "Standard",
      "color": "Original",
      "price": 1.97,
      "stock": 25,
      "sku": "DARAZ-1756361808"
    }
  ],
  "rating": 4.7,
  "totalSold": 58,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ Checking Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1756622856",
  "name": "Samsung Galaxy A06 Luxury Ladies Edition Floral Back Cover",
  "slug": "samsung-galaxy-a06-luxury-ladies-edition-floral-ba-2856",
  "description": "Floral HD Art Print, 9D Camera Shield, Silk-Matte Velvet Touch. Warranty: Checking Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 2.26,
  "salePrice": 1.97,
  "images": [
    {
      "id": "img-1756622856-1",
      "productId": "daraz-1756622856",
      "url": "https://static-01.daraz.lk/p/6b02437f627ade75ccc2eea3e3cc0f00.jpg",
      "alt": "Samsung Galaxy A06 Luxury Ladies Edition Floral Back Cover",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1756622856-1",
      "productId": "daraz-1756622856",
      "size": "Standard",
      "color": "Original",
      "price": 1.97,
      "stock": 25,
      "sku": "DARAZ-1756622856"
    }
  ],
  "rating": 4.8,
  "totalSold": 61,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ Checking Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1756674153",
  "name": "Redmi Note 14 Luxury Ladies Edition Floral Back Cover",
  "slug": "redmi-note-14-luxury-ladies-edition-floral-back-co-4153",
  "description": "Elegant Floral Prints, 9D Pro Lens Guard, Silk-Matte Shockproof Soft Case. Warranty: Checking Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 2.26,
  "salePrice": 1.97,
  "images": [
    {
      "id": "img-1756674153-1",
      "productId": "daraz-1756674153",
      "url": "https://static-01.daraz.lk/p/927d59a6d2f3643a78867e9a879a2aae.jpg",
      "alt": "Redmi Note 14 Luxury Ladies Edition Floral Back Cover",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1756674153-1",
      "productId": "daraz-1756674153",
      "size": "Standard",
      "color": "Original",
      "price": 1.97,
      "stock": 25,
      "sku": "DARAZ-1756674153"
    }
  ],
  "rating": 4.9,
  "totalSold": 64,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ Checking Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1756692048",
  "name": "Redmi 14C Luxury Signature Case - 9D Pro-Lens Guard",
  "slug": "redmi-14c-luxury-signature-case---9d-pro-lens-guar-2048",
  "description": "Original Prints, Raised Circular Camera Frame, Non-Slip Grip. Warranty: Checking Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 2.26,
  "salePrice": 1.97,
  "images": [
    {
      "id": "img-1756692048-1",
      "productId": "daraz-1756692048",
      "url": "https://static-01.daraz.lk/p/3c854f82e000223b7e1588cbabbc34de.jpg",
      "alt": "Redmi 14C Luxury Signature Case - 9D Pro-Lens Guard",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1756692048-1",
      "productId": "daraz-1756692048",
      "size": "Standard",
      "color": "Original",
      "price": 1.97,
      "stock": 25,
      "sku": "DARAZ-1756692048"
    }
  ],
  "rating": 5,
  "totalSold": 67,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ Checking Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1769039237",
  "name": "OMS OM423 45W Dual-Port Fast Charger (UK 3-Pin)",
  "slug": "oms-om423-45w-dual-port-fast-charger-uk-3-pin-9237",
  "description": "Dual-Port 45W Max output, Type-C 25W + USB-A 20W, UK 3-Pin. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 11.03,
  "salePrice": 9.59,
  "images": [
    {
      "id": "img-1769039237-1",
      "productId": "daraz-1769039237",
      "url": "https://static-01.daraz.lk/p/f4e03f163ddf0576575f289eaa52a09a.jpg",
      "alt": "OMS OM423 45W Dual-Port Fast Charger (UK 3-Pin)",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1769039237-1",
      "productId": "daraz-1769039237",
      "size": "Standard",
      "color": "Original",
      "price": 9.59,
      "stock": 25,
      "sku": "DARAZ-1769039237"
    }
  ],
  "rating": 4.6,
  "totalSold": 70,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1769187398",
  "name": "OMS T32 Open Type Wireless Earbuds - Bluetooth V6.0 LED",
  "slug": "oms-t32-open-type-wireless-earbuds---bluetooth-v60-7398",
  "description": "Open Type Earbuds, Bluetooth 6.0, LED battery display, 24h playtime. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 20.88,
  "salePrice": 18.16,
  "images": [
    {
      "id": "img-1769187398-1",
      "productId": "daraz-1769187398",
      "url": "https://static-01.daraz.lk/p/91113914b32b7cc21cde5d772f8c490b.jpg",
      "alt": "OMS T32 Open Type Wireless Earbuds - Bluetooth V6.0 LED",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1769187398-1",
      "productId": "daraz-1769187398",
      "size": "Standard",
      "color": "Original",
      "price": 18.16,
      "stock": 25,
      "sku": "DARAZ-1769187398"
    }
  ],
  "rating": 4.7,
  "totalSold": 73,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1769524554",
  "name": "Zigo L788 Nova Feature Keypad Phone - 1.77\" LCD, 1000mAh",
  "slug": "zigo-l788-nova-feature-keypad-phone---177-lcd-1000-4554",
  "description": "Dual SIM, 1.77\" Display, 1000mAh battery, Wireless FM, LED Torch. Warranty: 1 Year Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 15.66,
  "salePrice": 13.62,
  "images": [
    {
      "id": "img-1769524554-1",
      "productId": "daraz-1769524554",
      "url": "https://static-01.daraz.lk/p/d7f15c458b68e530cca869b0cba84c38.jpg",
      "alt": "Zigo L788 Nova Feature Keypad Phone - 1.77\" LCD, 1000mAh",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "phones",
  "variants": [
    {
      "id": "var-1769524554-1",
      "productId": "daraz-1769524554",
      "size": "Standard",
      "color": "Original",
      "price": 13.62,
      "stock": 25,
      "sku": "DARAZ-1769524554"
    }
  ],
  "rating": 4.8,
  "totalSold": 76,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 1 Year Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1769568348",
  "name": "VIDVIE CB4049C6I 30W PD Type-C to Lightning Fast Charging Cable",
  "slug": "vidvie-cb4049c6i-30w-pd-type-c-to-lightning-fast-c-8348",
  "description": "30W Power Delivery, Type-C to Lightning cable for iPhone. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 0.52,
  "salePrice": 0.45,
  "images": [
    {
      "id": "img-1769568348-1",
      "productId": "daraz-1769568348",
      "url": "https://static-01.daraz.lk/p/fab065d80c7e3f08b879437c551a4d48.jpg",
      "alt": "VIDVIE CB4049C6I 30W PD Type-C to Lightning Fast Charging Cable",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1769568348-1",
      "productId": "daraz-1769568348",
      "size": "Standard",
      "color": "Original",
      "price": 0.45,
      "stock": 25,
      "sku": "DARAZ-1769568348"
    }
  ],
  "rating": 4.9,
  "totalSold": 79,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1770097646",
  "name": "CORN 20W Fast Charger Hub - 4-Port Rack Charger & Universal Sockets",
  "slug": "corn-20w-fast-charger-hub---4-port-rack-charger-un-7646",
  "description": "Dual Type-C + Dual USB-A 20W fast charging hub and desktop organizer. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 3.48,
  "salePrice": 3.03,
  "images": [
    {
      "id": "img-1770097646-1",
      "productId": "daraz-1770097646",
      "url": "https://static-01.daraz.lk/p/db131b42e2377a52f32196a73e58b4f4.jpg",
      "alt": "CORN 20W Fast Charger Hub - 4-Port Rack Charger & Universal Sockets",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1770097646-1",
      "productId": "daraz-1770097646",
      "size": "Standard",
      "color": "Original",
      "price": 3.03,
      "stock": 25,
      "sku": "DARAZ-1770097646"
    }
  ],
  "rating": 5,
  "totalSold": 82,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1770207566",
  "name": "OMS 25W Fast Charging Micro USB Cable | Tangle-Free OM118",
  "slug": "oms-25w-fast-charging-micro-usb-cable-tangle-free--7566",
  "description": "25W Rapid Charge, Braided fabric tangle-free, 1M length. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 3.48,
  "salePrice": 3.03,
  "images": [
    {
      "id": "img-1770207566-1",
      "productId": "daraz-1770207566",
      "url": "https://static-01.daraz.lk/p/21a0cdb53ad292ab5e502df67452141d.jpg",
      "alt": "OMS 25W Fast Charging Micro USB Cable | Tangle-Free OM118",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1770207566-1",
      "productId": "daraz-1770207566",
      "size": "Standard",
      "color": "Original",
      "price": 3.03,
      "stock": 25,
      "sku": "DARAZ-1770207566"
    }
  ],
  "rating": 4.6,
  "totalSold": 85,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1770299608",
  "name": "ONESAM OS-C27 Travel 2.4A Dual USB Charger with 1M Cable",
  "slug": "onesam-os-c27-travel-24a-dual-usb-charger-with-1m--9608",
  "description": "UK 3-pin plug, Dual USB output 2.4A, includes 1M data cable. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 5.88,
  "salePrice": 5.11,
  "images": [
    {
      "id": "img-1770299608-1",
      "productId": "daraz-1770299608",
      "url": "https://static-01.daraz.lk/p/21ff9b7c78b18cf7860dd800df7293ed.jpg",
      "alt": "ONESAM OS-C27 Travel 2.4A Dual USB Charger with 1M Cable",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1770299608-1",
      "productId": "daraz-1770299608",
      "size": "Standard",
      "color": "Original",
      "price": 5.11,
      "stock": 25,
      "sku": "DARAZ-1770299608"
    }
  ],
  "rating": 4.7,
  "totalSold": 88,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1770328632",
  "name": "HP39 Hi-Res Stereo Wired Earphones with HD Mic & 3.5mm Jack",
  "slug": "hp39-hi-res-stereo-wired-earphones-with-hd-mic-35m-8632",
  "description": "Deep Bass, In-line mic controls, universal gold-plated 3.5mm jack. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 2.44,
  "salePrice": 2.12,
  "images": [
    {
      "id": "img-1770328632-1",
      "productId": "daraz-1770328632",
      "url": "https://static-01.daraz.lk/p/0fb3da24ed4aa1f885e4d04378152464.jpg",
      "alt": "HP39 Hi-Res Stereo Wired Earphones with HD Mic & 3.5mm Jack",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1770328632-1",
      "productId": "daraz-1770328632",
      "size": "Standard",
      "color": "Original",
      "price": 2.12,
      "stock": 25,
      "sku": "DARAZ-1770328632"
    }
  ],
  "rating": 4.8,
  "totalSold": 91,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1770355960",
  "name": "OMS OM427 25W PD+USB Fast Charger - UK 3-Pin Adapter",
  "slug": "oms-om427-25w-pdusb-fast-charger---uk-3-pin-adapte-5960",
  "description": "25W PD + USB Dual Ports, Smart IC, Fire prevention materials. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 6.96,
  "salePrice": 6.05,
  "images": [
    {
      "id": "img-1770355960-1",
      "productId": "daraz-1770355960",
      "url": "https://static-01.daraz.lk/p/054b8f3e1c63e82db78e2fc28cb25c1b.jpg",
      "alt": "OMS OM427 25W PD+USB Fast Charger - UK 3-Pin Adapter",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1770355960-1",
      "productId": "daraz-1770355960",
      "size": "Standard",
      "color": "Original",
      "price": 6.05,
      "stock": 25,
      "sku": "DARAZ-1770355960"
    }
  ],
  "rating": 4.9,
  "totalSold": 94,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
},
  {
  "id": "daraz-1770942212",
  "name": "Samsung 20W Adaptive Fast Charger with Type-C Cable (Black)",
  "slug": "samsung-20w-adaptive-fast-charger-with-type-c-cabl-2212",
  "description": "Adaptive fast charging, includes Type-C to Type-C cable, UK 3-pin. Warranty: 6 Months Seller Warranty. 100% Genuine product guaranteed by Methmi Mobile Pvt Ltd.",
  "basePrice": 3.41,
  "salePrice": 2.97,
  "images": [
    {
      "id": "img-1770942212-1",
      "productId": "daraz-1770942212",
      "url": "https://static-01.daraz.lk/p/0270050556fd1b0847a5a1cd83ea1fe8.jpg",
      "alt": "Samsung 20W Adaptive Fast Charger with Type-C Cable (Black)",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "categoryId": "mobile",
  "variants": [
    {
      "id": "var-1770942212-1",
      "productId": "daraz-1770942212",
      "size": "Standard",
      "color": "Original",
      "price": 2.97,
      "stock": 25,
      "sku": "DARAZ-1770942212"
    }
  ],
  "rating": 5,
  "totalSold": 97,
  "isActive": true,
  "isFeatured": false,
  "specsHighlights": [
    "🛡️ 6 Months Seller Warranty",
    "⚡ 100% Original Brand Guaranteed",
    "🚚 Islandwide Fast Delivery",
    "💵 Cash on Delivery Available"
  ],
  "createdAt": "2026-11-22T00:00:00Z",
  "updatedAt": "2026-11-22T00:00:00Z"
}
];

export const reviews: Review[] = [
  {
    id: 'rev-01',
    productId: 'prod-vivo-y05',
    userId: 'u-101',
    userName: 'Kavinda M.',
    rating: 5,
    comment: 'Super fast delivery from Methmi Mobile! Genuine TRCSL approved Vivo Y05 sealed pack with 1-year company warranty. Screen is bright and battery easily lasts all day.',
    isVerified: true,
    createdAt: '2026-11-20T14:32:00Z',
  },
  {
    id: 'rev-02',
    productId: 'prod-infinix-note-60-pro',
    userId: 'u-102',
    userName: 'Nuwan D.',
    rating: 5,
    comment: 'The rear dot-matrix display on this Note 60 Pro is unbelievable! 100W charging fills up in minutes. Best price in Sri Lanka.',
    isVerified: true,
    createdAt: '2026-11-21T10:14:00Z',
  },
  {
    id: 'rev-03',
    productId: 'prod-tecno-camon-50-pro',
    userId: 'u-103',
    userName: 'Tharindu S.',
    rating: 5,
    comment: 'Camon 50 Pro camera quality is exceptional for portraits and low light. Delivered safely with original warranty card.',
    isVerified: true,
    createdAt: '2026-11-21T11:05:00Z',
  },
  {
    id: 'rev-04',
    productId: 'prod-vivo-y31d',
    userId: 'u-104',
    userName: 'Achintha K.',
    rating: 5,
    comment: 'Very smooth performance and premium Feather Gold look. Excellent service and support from Methmi Mobile team.',
    isVerified: true,
    createdAt: '2026-11-21T12:44:00Z',
  },
];

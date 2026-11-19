export const BRAND_NAME = 'Methmi Mobile';
export const BRAND_FULL_NAME = 'Methmi Mobile (Pvt) Ltd';
export const BRAND_TAGLINE = 'Your Trusted Mobile Partner';
export const BRAND_DESCRIPTION = 'Methmi Mobile (Pvt) Ltd is Sri Lanka’s premier tech destination for 100% genuine TRCSL-approved smartphones, premium mobile accessories, and cutting-edge retail Cloud POS software solutions.';

export const CURRENCY_SYMBOL = 'Rs.';
export const FREE_SHIPPING_THRESHOLD = 50000;
export const ITEMS_PER_PAGE = 12;

export const DIVISIONS = [
  {
    id: 'store',
    name: 'Methmi Store',
    shortName: 'Store',
    tagline: '100% Genuine TRCSL Approved Smartphones & Gear',
    description: 'Apple iPhones, Samsung Galaxy, Tecno, Infinix, Xiaomi Redmi, and genuine high-speed mobile peripherals with official company warranty.',
    href: '/store',
    icon: '📱',
    accentColor: 'brand-gold',
    badge: 'Smartphones & Gear',
  },
  {
    id: 'labs',
    name: 'Methmi Labs',
    shortName: 'Labs',
    tagline: 'Retail POS, Cloud Billing & Enterprise Software',
    description: 'Bespoke retail Point of Sale systems, multi-channel shop inventory, and custom digital software engineered for growing Sri Lankan enterprises.',
    href: '/labs',
    icon: '⚡',
    accentColor: 'labs-blue',
    badge: 'POS & Software',
  },
];

export interface NavChildItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: { label: string; href: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: NavChildItem[];
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Store',
    href: '/store',
    badge: 'Phones',
    children: [
      {
        label: 'Smartphones',
        href: '/store/phones',
        description: 'Apple iPhone, Samsung Galaxy, Tecno, Infinix & Xiaomi Redmi with 100% TRCSL company warranty.',
        children: [
          { label: 'Apple iPhone', href: '/store/phones/apple' },
          { label: 'Samsung Galaxy', href: '/store/phones/samsung' },
          { label: 'Tecno & Infinix', href: '/store/phones/tecno-infinix' },
          { label: 'Xiaomi Redmi', href: '/store/phones/redmi' },
        ],
      },
      {
        label: 'Accessories',
        href: '/store/accessories',
        description: 'Original high-speed chargers, MagSafe stands, premium wireless earbuds & smartwatches.',
        children: [
          { label: 'Fast Chargers & Cables', href: '/store/accessories/chargers' },
          { label: 'Audio & Earbuds', href: '/store/accessories/audio' },
          { label: 'Smart Watches', href: '/store/accessories/watches' },
        ],
      },
    ],
  },
  {
    label: 'Labs & POS',
    href: '/labs',
    badge: 'Software',
    children: [
      {
        label: 'Methmi Cloud POS Suite',
        href: '/labs/software',
        description: 'High-speed retail, grocery, supermarket & restaurant Point of Sale management suites.',
      },
      {
        label: 'Shop Reload & Cash Tracker',
        href: '/labs/solutions',
        description: 'Real-time daily payment & recharge reconciliation for telecommunication dealers.',
      },
      {
        label: 'VIP Device Care & Repair',
        href: '/labs/quote',
        description: 'Expert hardware diagnosis, display replacement, battery health & software servicing.',
      },
    ],
  },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = [
  {
    title: 'Methmi Store',
    links: [
      { label: 'All Smartphones', href: '/store' },
      { label: 'Apple iPhones', href: '/store' },
      { label: 'Samsung Galaxy', href: '/store' },
      { label: 'Original Accessories', href: '/store/accessories' },
      { label: 'Flash Deals', href: '/deals' },
    ],
  },
  {
    title: 'Methmi Labs',
    links: [
      { label: 'Retail Cloud POS Suite', href: '/labs/software' },
      { label: 'Shop Payment Tracker', href: '/labs/solutions' },
      { label: 'Request a Demo / Quote', href: '/labs/quote' },
    ],
  },
  {
    title: 'Support & Care',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Islandwide Delivery Policy', href: '/shipping' },
      { label: 'TRCSL Warranty & Returns', href: '/returns' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Methmi Mobile', href: '/about' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com/methmimobile' },
  { label: 'WhatsApp', href: 'https://wa.me/94770000000' },
  { label: 'TikTok', href: 'https://tiktok.com/@methmimobile' },
];

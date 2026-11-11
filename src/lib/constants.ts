export const BRAND_NAME = 'Qxyra';
export const BRAND_TAGLINE = 'Discover. Desire. Deliver.';
export const BRAND_DESCRIPTION = 'Qxyra represents modern innovation and style across two distinct divisions: Qxyra Store (curated streetwear and smart lifestyle accessories) and Qxyra Labs (tailored software, Web, and POS solutions).';

export const CURRENCY_SYMBOL = '$';
export const FREE_SHIPPING_THRESHOLD = 50;
export const ITEMS_PER_PAGE = 12;

export const DIVISIONS = [
  {
    id: 'store',
    name: 'Qxyra Store',
    shortName: 'Store',
    tagline: 'Premium Streetwear & Tech Lifestyle Accessories',
    description: 'Minimalist streetwear, oversized essentials, and curated mobile and computing gear.',
    href: '/store',
    icon: '🛍️',
    accentColor: 'brand-gold',
    badge: 'Apparel & Tech Gear',
  },
  {
    id: 'labs',
    name: 'Qxyra Labs',
    shortName: 'Labs',
    tagline: 'Engineering Next-Gen Web, POS & Software Solutions',
    description: 'Custom web platforms, smart retail POS software, and scalable digital solutions for growing enterprises.',
    href: '/labs',
    icon: '⚡',
    accentColor: 'labs-blue',
    badge: 'Digital Solutions',
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
    badge: 'Shop',
    children: [
      {
        label: 'Fashion',
        href: '/store/fashion',
        description: 'Crafted streetwear, heavy cotton silhouettes, and timeless hoodies.',
        children: [
          { label: 'Regular Fit Tee', href: '/store/fashion/regular-fit-tee' },
          { label: 'Oversized Tee', href: '/store/fashion/oversized-tee' },
          { label: 'Hoodie', href: '/store/fashion/hoodie' },
        ],
      },
      {
        label: 'Accessories',
        href: '/store/accessories',
        description: 'Precision mobile charging, cases, ergonomic peripherals & desk setups.',
        children: [
          { label: 'Mobile Accessories', href: '/store/accessories/mobile' },
          { label: 'Computer Accessories', href: '/store/accessories/computer' },
        ],
      },
    ],
  },
  {
    label: 'Labs',
    href: '/labs',
    badge: 'Tech',
    children: [
      {
        label: 'Software Products',
        href: '/labs/software',
        description: 'Ready-to-deploy POS systems, inventory management engines & business tools.',
      },
      {
        label: 'Web & POS Solutions',
        href: '/labs/solutions',
        description: 'Full-stack enterprise e-commerce, custom web apps, and modern POS deployments.',
      },
      {
        label: 'Request a Quote',
        href: '/labs/quote',
        description: 'Tell us about your project requirements for an instant consultation.',
      },
    ],
  },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = [
  {
    title: 'Qxyra Store',
    links: [
      { label: 'All Products', href: '/store' },
      { label: 'Fashion Collection', href: '/store/fashion' },
      { label: 'Accessories', href: '/store/accessories' },
      { label: 'Limited Deals', href: '/deals' },
    ],
  },
  {
    title: 'Qxyra Labs',
    links: [
      { label: 'Software Catalog', href: '/labs/software' },
      { label: 'Web & POS Solutions', href: '/labs/solutions' },
      { label: 'Request a Quote', href: '/labs/quote' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Returns & Exchanges', href: '/returns' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Qxyra', href: '/about' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com/qxyra' },
  { label: 'Instagram', href: 'https://instagram.com/qxyra' },
  { label: 'TikTok', href: 'https://tiktok.com/@qxyra' },
  { label: 'Twitter', href: 'https://twitter.com/qxyra' },
];

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
        label: 'Smartphones (TRCSL)',
        href: '/store/phones',
        description: 'Vivo, Infinix & Tecno smartphones with 100% genuine TRCSL approval and 1-Year Company Warranty.',
        children: [
          { label: 'Vivo Smartphones', href: '/store/phones/vivo' },
          { label: 'Infinix Mobile', href: '/store/phones/infinix' },
          { label: 'Tecno Smartphones', href: '/store/phones/tecno' },
          { label: 'All Smartphones', href: '/store/phones' },
        ],
      },
      {
        label: 'Accessories',
        href: '/store/accessories',
        description: 'Original high-speed fast chargers, MagSafe stands, premium cables and accessories.',
        children: [
          { label: 'Mobile Accessories', href: '/store/accessories/mobile' },
          { label: 'Computer Accessories', href: '/store/accessories/computer' },
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
      { label: 'Vivo Smartphones', href: '/store/phones/vivo' },
      { label: 'Infinix Smartphones', href: '/store/phones/infinix' },
      { label: 'Tecno Flagships', href: '/store/phones/tecno' },
      { label: 'All Smartphones', href: '/store/phones' },
      { label: 'Original Accessories', href: '/store/accessories' },
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

export const WHATSAPP_NUMBER = '94743031990';
export const WHATSAPP_DISPLAY_NUMBER = '074 303 1990';
export const HOTLINE_PHONE = '074 303 1990';
export const SUPPORT_EMAIL = 'info@methmimobilepvtltd.lk';
export const STORE_ADDRESS = 'Main Street, Mutur / Batticaloa Road, Periya Palam, Trincomalee, Sri Lanka';
export const STORE_HOURS = 'Monday – Saturday: 8:30 AM – 8:30 PM | Sunday: 9:00 AM – 5:00 PM';
export const STORE_MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15777.625624795777!2d81.2581!3d8.4552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afb955a8227e9f3%3A0x6a053c846d0a7935!2sMutur!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk';
export const STORE_MAP_DIRECTIONS_URL = 'https://maps.google.com/?q=Mutur,+Sri+Lanka';

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com/methmimobile' },
  { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: 'TikTok', href: 'https://tiktok.com/@methmimobile' },
];

import { mockCJCatalog, CJProductCatalogItem } from './mock-admin-data';
import { Product, ProductVariant, Address } from '@/types';

export interface CJConfig {
  apiKey?: string;
  email?: string;
  markupPercentage: number; // default e.g. 150 (meaning 2.5x base cost)
  autoForwardOrders: boolean;
  currency: string;
}

export const defaultCJConfig: CJConfig = {
  apiKey: process.env.CJ_DROPSHIPPING_API_KEY || '',
  email: process.env.CJ_DROPSHIPPING_EMAIL || '',
  markupPercentage: 160, // 160% markup ($10 wholesale -> $26 retail)
  autoForwardOrders: false,
  currency: 'USD'
};

export interface CJTrackingCheckpoint {
  time: string;
  location: string;
  description: string;
  status: 'info' | 'transit' | 'delivered' | 'warning';
}

export interface CJTrackingResult {
  trackingNumber: string;
  carrier: string;
  status: 'PENDING' | 'DISPATCHED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  originCountry: string;
  destinationCountry: string;
  estimatedDelivery: string;
  checkpoints: CJTrackingCheckpoint[];
}

export interface CJCreateOrderRequest {
  orderNumber: string;
  shippingAddress: Address;
  items: {
    cjProductId?: string;
    cjVariantId?: string;
    sku: string;
    quantity: number;
    title: string;
  }[];
}

export interface CJCreateOrderResponse {
  success: boolean;
  cjOrderId: string;
  trackingNumber?: string;
  message: string;
  estimatedShippingFee: number;
}

/**
 * CJ Dropshipping Integration Client
 */
export class CJDropshippingClient {
  private config: CJConfig;

  constructor(customConfig?: Partial<CJConfig>) {
    this.config = { ...defaultCJConfig, ...customConfig };
  }

  public getConfig(): CJConfig {
    return this.config;
  }

  public updateConfig(newConfig: Partial<CJConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Search CJ Dropshipping Product Catalog
   */
  public async searchProducts(query: string = '', category: string = ''): Promise<CJProductCatalogItem[]> {
    // If real API key is configured, can query CJ OpenAPI 2.0
    // Currently provides smart simulated response with the curated dropship database
    let results = [...mockCJCatalog];

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        item => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    return results;
  }

  /**
   * Calculate retail selling price with markup
   */
  public calculatePrice(wholesalePrice: number, customMarkup?: number): { salePrice: number; basePrice: number } {
    const markup = customMarkup ?? this.config.markupPercentage;
    const calculatedRetail = Number((wholesalePrice * (1 + markup / 100)).toFixed(2));
    // Anchor higher basePrice to showcase a discount for psychology
    const anchorBasePrice = Number((calculatedRetail * 1.25).toFixed(2));

    return {
      salePrice: calculatedRetail,
      basePrice: anchorBasePrice
    };
  }

  /**
   * Transform a CJ Catalog Item into a Qxyra Store Product
   */
  public convertCJItemToQxyraProduct(cjItem: CJProductCatalogItem, categoryId: string = 'c1'): Product {
    const prices = this.calculatePrice(cjItem.wholesalePrice);
    const slug = cjItem.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const variants: ProductVariant[] = cjItem.variants.map((v, idx) => {
      const variantPrices = this.calculatePrice(v.wholesalePrice);
      return {
        id: `var-${cjItem.id}-${idx + 1}`,
        productId: `prod-${cjItem.id}`,
        size: v.name.includes('Size') ? v.name : undefined,
        color: !v.name.includes('Size') ? v.name : undefined,
        price: variantPrices.salePrice,
        stock: v.stock,
        sku: `QX-${cjItem.cjProductId}-${idx + 1}`,
        cjVariantId: `CJ-VAR-${idx + 1}`
      };
    });

    return {
      id: `prod-${cjItem.id}`,
      name: cjItem.name,
      slug: slug,
      description: `${cjItem.description}\n\n• Shipped directly with premium Qxyra courier packaging.\n• Est. Delivery: ${cjItem.shippingDays}.`,
      basePrice: prices.basePrice,
      salePrice: prices.salePrice,
      categoryId: categoryId,
      images: [
        {
          id: `img-${cjItem.id}-1`,
          productId: `prod-${cjItem.id}`,
          url: cjItem.imageUrl,
          alt: cjItem.name,
          isPrimary: true,
          sortOrder: 0
        }
      ],
      variants: variants,
      rating: 4.8,
      totalSold: 320,
      isActive: true,
      isFeatured: true,
      cjProductId: cjItem.cjProductId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Forward a customer order to CJ Dropshipping for automated fulfillment
   */
  public async createOrder(req: CJCreateOrderRequest): Promise<CJCreateOrderResponse> {
    // Generates simulated CJ order reference with realistic tracking dispatch
    const cjOrderId = `CJ-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `CJTRK${Math.floor(100000000 + Math.random() * 900000000)}US`;

    return {
      success: true,
      cjOrderId: cjOrderId,
      trackingNumber: trackingNumber,
      message: `Order #${req.orderNumber} successfully transmitted to CJ Dropshipping fulfillment center.`,
      estimatedShippingFee: 4.95
    };
  }

  /**
   * Get Tracking Details for an Order
   */
  public async getTracking(trackingNumber: string): Promise<CJTrackingResult> {
    return {
      trackingNumber: trackingNumber,
      carrier: 'CJ Packet Express / USPS First-Class',
      status: 'IN_TRANSIT',
      originCountry: 'Yiwu Fulfillment Hub, China',
      destinationCountry: 'United States',
      estimatedDelivery: 'October 5, 2026',
      checkpoints: [
        {
          time: '2026-09-29 08:30',
          location: 'JFK International Airport, NY',
          description: 'Customs clearance processed successfully. Transferred to local carrier.',
          status: 'transit'
        },
        {
          time: '2026-09-27 14:10',
          location: 'International Air Hub, Shanghai',
          description: 'Departed airport of departure on flight QX-702.',
          status: 'transit'
        },
        {
          time: '2026-09-26 19:45',
          location: 'CJ Logistics Sorting Facility, Yiwu',
          description: 'Export customs inspection cleared. Dispatched to airport container.',
          status: 'transit'
        },
        {
          time: '2026-09-25 11:20',
          location: 'CJ Warehouse 3, Yiwu',
          description: 'Package picked, verified against Qxyra quality standards, and labeled.',
          status: 'info'
        }
      ]
    };
  }
}

export const cjClient = new CJDropshippingClient();

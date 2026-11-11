export interface SoftwareProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  badge?: string;
  category: 'software' | 'web-solution' | 'pos';
  features: string[];
  technologies: string[];
  screenshots?: string[];
  pricing: {
    type: 'one-time' | 'subscription' | 'custom-quote';
    startingAt?: number;
    period?: 'monthly' | 'yearly';
    currency?: string;
  };
  demoUrl?: string;
  status: 'available' | 'in-development' | 'beta';
  isActive: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  badge?: string;
  tagline: string;
  description: string;
  type: 'pos-system' | 'website' | 'web-app' | 'custom-software';
  features: string[];
  techStack: string[];
  startingPrice?: number;
  deliveryTime: string;
  isPopular?: boolean;
}

export interface QuoteRequest {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  projectType: 'pos-system' | 'ecommerce-web' | 'business-website' | 'custom-software' | 'other';
  budgetRange: string;
  timeline: string;
  projectDetails: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

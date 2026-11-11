'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { SoftwareProduct } from '@/types/labs';
import { useCurrency, CURRENCIES, Currency } from '@/context/CurrencyContext';
import { useProductStore } from '@/store/productStore';
import { useLabsStore } from '@/store/labsStore';
import CreatableCombobox from '@/components/admin/CreatableCombobox';

type DivisionType = 'FASHION' | 'TECH' | 'SOFTWARE';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

const FASHION_CATEGORIES = [
  { id: 'regular-fit-tee', label: 'Regular Fit Tee (240GSM Heavy Cotton)' },
  { id: 'oversized-tee', label: 'Oversized Tee (280GSM Drop-Shoulder)' },
  { id: 'hoodie', label: 'French Terry Hoodie (460GSM Loopback)' },
  { id: 'sweatshirt', label: 'Luxury Crewneck Sweatshirt (380GSM)' },
  { id: 'track-short', label: 'Heavy French Terry Shorts (340GSM)' },
];

const TECH_CATEGORIES = [
  { id: 'mobile', label: 'Mobile Gear (MagSafe Chargers, Braided Cables & Cases)' },
  { id: 'computer', label: 'Computer Gear (CNC Aluminum Stands, Docks & Desk Mats)' },
  { id: 'audio-desk', label: 'Audio & Workspace Lighting Accessories' },
];

const SOFTWARE_CATEGORIES = [
  { id: 'pos', label: 'Retail Point of Sale (POS) Suite & Till Cashier' },
  { id: 'software', label: 'Omnichannel Inventory Flow & Dropship Bridge' },
  { id: 'web-solution', label: 'Bespoke Luxury E-Commerce & Web Applications' },
  { id: 'restaurant-pos', label: 'Restaurant & Cafe Kitchen Order (KOT) System' },
  { id: 'custom-dev', label: 'Custom Enterprise Software / Automation Engine' },
];

// Presets for Dropdown & Quick Selection
const FABRIC_GSM_OPTIONS = [
  '240 GSM Combed Organic Cotton (Mid-Heavy)',
  '280 GSM Heavy Drop Cotton (Heavyweight Streetwear)',
  '320 GSM French Terry Loopback',
  '380 GSM Heavy Fleece Sweatshirt',
  '460 GSM Ultra-Heavy French Terry (Hoodies)',
  '180 GSM Lightweight Supima Cotton',
];

const FIT_TYPE_OPTIONS = [
  'Regular Boxy Fit',
  'Oversized Drop-Shoulder Fit',
  'Relaxed Streetwear Fit',
  'Athletic / Slim Fit',
  'Cropped Boxy Fit',
  'Tailored Luxury Silhouette',
];

const SIZE_BUNDLES = [
  { label: 'Standard: S, M, L, XL, 2XL', value: 'S, M, L, XL, 2XL' },
  { label: 'Extended: XS, S, M, L, XL, 2XL, 3XL', value: 'XS, S, M, L, XL, 2XL, 3XL' },
  { label: 'Compact: S, M, L, XL', value: 'S, M, L, XL' },
  { label: 'Free Size: One Size Fits All', value: 'One Size' },
];

const COLOR_PALETTES = [
  { label: 'Monochrome (Onyx Black, Pure Chalk, Heather Gray)', value: 'Onyx Black, Pure Chalk, Heather Gray' },
  { label: 'Earth Tones (Vintage Olive, Desert Sand, Mocha Brown)', value: 'Vintage Olive, Desert Sand, Mocha Brown' },
  { label: 'Minimalist (Jet Black, Off-White, Slate)', value: 'Jet Black, Off-White, Slate' },
  { label: 'Cyber (Midnight Navy, Cyber Lime, Stealth Gray)', value: 'Midnight Navy, Cyber Lime, Stealth Gray' },
  { label: 'Pastel (Vintage Lavender, Sage Green, Baby Blue)', value: 'Vintage Lavender, Sage Green, Baby Blue' },
];

const TECH_COMPATIBILITY_OPTIONS = [
  'MagSafe, iPhone 12-16, Qi2 Wireless Fast Charging',
  'Universal USB-C Power Delivery (100W PD)',
  'MacBook Pro 14"/16", MacBook Air, iPad Pro M4',
  'Dual 4K 60Hz HDMI, DisplayPort, Gigabit LAN',
  'All Qi-enabled Smartphones, AirPods & Apple Watch',
];

const TECH_MATERIAL_OPTIONS = [
  'CNC Anodized 6063 Aluminum Alloy (Space Gray)',
  'Aerospace Grade Titanium & Braided Kevlar',
  'Tempered Frosted Glass with Silicone Anti-Slip Padding',
  'Full Grain Horween Leather & Solid Brass Hardware',
  'Recycled Ocean Plastic & Matte Polycarbonate',
];

const PRESET_SAMPLE_PHOTOS = [
  { label: '👕 Regular Fit Tee', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800' },
  { label: '🥋 Oversized Tee', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800' },
  { label: '🧥 French Hoodie', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800' },
  { label: '⚡ MagSafe Stand', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800' },
  { label: '💻 CNC PC Riser', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800' },
];

export default function AdminProductsPage() {
  const { format, currency, setCurrency, exchangeRate, rates, detectedCountry } = useCurrency();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductStatus, 
    resetToDefault 
  } = useProductStore();

  const {
    softwareList,
    addSoftware,
    updateSoftware,
    deleteSoftware,
    toggleSoftwareStatus,
    resetSoftwareToDefault
  } = useLabsStore();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'FASHION' | 'TECH' | 'SOFTWARE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string; type: DivisionType } | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Division Choice
  const [itemType, setItemType] = useState<DivisionType>('FASHION');

  // Common Form Fields
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('regular-fit-tee');
  const [formStock, setFormStock] = useState('50');
  const [formDescription, setFormDescription] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(true);

  // =========================================================================
  // MULTI-CURRENCY PRICING ENGINE
  // =========================================================================
  // The admin can choose what currency they are typing the price in!
  const [adminInputCurrency, setAdminInputCurrency] = useState<Currency>('USD');
  const [formInputPrice, setFormInputPrice] = useState('38.00');
  const [formInputSalePrice, setFormInputSalePrice] = useState('28.00');

  // =========================================================================
  // MULTI-IMAGE GALLERY (1:1 Square Auto-Crop + Reordering + Removal)
  // =========================================================================
  const [formImages, setFormImages] = useState<GalleryImage[]>([
    {
      id: 'img-default-1',
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      alt: 'Cover Image',
      isPrimary: true,
      sortOrder: 0,
    }
  ]);
  const [imageUploadSource, setImageUploadSource] = useState<'PC' | 'URL'>('PC');
  const [manualUrlInput, setManualUrlInput] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // =========================================================================
  // FASHION SPECIFICATIONS (Dropdowns + Custom Typing)
  // =========================================================================
  const [fashionGsm, setFashionGsm] = useState('240 GSM Combed Organic Cotton (Mid-Heavy)');
  const [fashionFit, setFashionFit] = useState('Regular Boxy Fit');
  const [fashionSizes, setFashionSizes] = useState('S, M, L, XL, 2XL');
  const [fashionColors, setFashionColors] = useState('Onyx Black, Pure Chalk, Vintage Olive');

  // Tech Specific Fields
  const [techCompatibility, setTechCompatibility] = useState('MagSafe, iPhone 12-16, Qi Wireless');
  const [techMaterial, setTechMaterial] = useState('CNC Anodized Space Gray Aluminum');
  const [techSpecs, setTechSpecs] = useState('15W Fast Charge / 4K@60Hz HDMI');

  // Software Specific Fields
  const [softwareIcon, setSoftwareIcon] = useState('🛒');
  const [softwareBadge, setSoftwareBadge] = useState('Flagship POS');
  const [softwarePricingType, setSoftwarePricingType] = useState<'one-time' | 'subscription' | 'custom-quote'>('one-time');
  const [softwarePeriod, setSoftwarePeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [softwareFeatures, setSoftwareFeatures] = useState(
    'Offline-First Local Transaction Queue\nInstant Barcode & Bluetooth Scanner Integration\nDual Currency Real-Time Display\nMulti-Staff Till Shifts'
  );
  const [softwareTechStack, setSoftwareTechStack] = useState('Next.js, TypeScript, PostgreSQL, Tailwind');
  const [softwareDemoUrl, setSoftwareDemoUrl] = useState('/labs/quote?type=software');

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  /**
   * Process uploaded image from PC: Center-crop to 1:1 Square Canvas
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessingImage(true);

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const img = new window.Image();

        img.onload = () => {
          const origW = img.width;
          const origH = img.height;

          // Calculate 1:1 Square Center Crop
          const minSide = Math.min(origW, origH);
          const startX = (origW - minSide) / 2;
          const startY = (origH - minSide) / 2;
          const targetDimension = Math.min(1000, minSide);

          const canvas = document.createElement('canvas');
          canvas.width = targetDimension;
          canvas.height = targetDimension;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, startX, startY, minSide, minSide, 0, 0, targetDimension, targetDimension);
            const squareDataUrl = canvas.toDataURL('image/jpeg', 0.92);

            setFormImages(prev => [
              ...prev,
              {
                id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                url: squareDataUrl,
                alt: `${formName || 'Product'} Image ${prev.length + 1}`,
                isPrimary: prev.length === 0,
                sortOrder: prev.length,
              }
            ]);
            showToast(`✓ Image added & cropped to 1:1 Square (${targetDimension}×${targetDimension}px)`);
          }
          setIsProcessingImage(false);
        };

        img.src = dataUrl;
      };

      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /**
   * Add image via URL
   */
  const handleAddUrlImage = () => {
    if (!manualUrlInput || !manualUrlInput.trim()) return;
    setFormImages(prev => [
      ...prev,
      {
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        url: manualUrlInput.trim(),
        alt: `${formName || 'Product'} Image ${prev.length + 1}`,
        isPrimary: prev.length === 0,
        sortOrder: prev.length,
      }
    ]);
    setManualUrlInput('');
    showToast('✓ Image URL added to gallery');
  };

  /**
   * Remove Image from Gallery
   */
  const handleRemoveImage = (indexToRemove: number) => {
    setFormImages(prev => {
      const filtered = prev.filter((_, idx) => idx !== indexToRemove);
      return filtered.map((img, idx) => ({
        ...img,
        isPrimary: idx === 0,
        sortOrder: idx,
      }));
    });
    showToast('Photo removed from gallery');
  };

  /**
   * Reorder Images: Move Left or Move Right
   */
  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    setFormImages(prev => {
      const targetIndex = direction === 'left' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const reordered = [...prev];
      const temp = reordered[index];
      reordered[index] = reordered[targetIndex];
      reordered[targetIndex] = temp;
      return reordered.map((img, idx) => ({
        ...img,
        isPrimary: idx === 0,
        sortOrder: idx,
      }));
    });
  };

  /**
   * Set an image as the Main Cover Photo (sortOrder: 0)
   */
  const handleMakeCover = (index: number) => {
    setFormImages(prev => {
      const chosen = prev[index];
      const others = prev.filter((_, idx) => idx !== index);
      const updated = [chosen, ...others];
      return updated.map((img, idx) => ({
        ...img,
        isPrimary: idx === 0,
        sortOrder: idx,
      }));
    });
    showToast('✓ Set as Main Cover Photo (#1)');
  };

  /**
   * Toggle a specific size on/off
   */
  const handleToggleSize = (size: string) => {
    const list = fashionSizes.split(',').map(s => s.trim()).filter(Boolean);
    if (list.includes(size)) {
      setFashionSizes(list.filter(s => s !== size).join(', '));
    } else {
      setFashionSizes([...list, size].join(', '));
    }
  };

  // Reset form to clean state
  const resetForm = () => {
    setItemType('FASHION');
    setEditingId(null);
    setFormName('');
    setFormSlug('');
    setFormCategory('regular-fit-tee');
    setAdminInputCurrency('USD');
    setFormInputPrice('38.00');
    setFormInputSalePrice('28.00');
    setFormStock('50');
    setFormDescription('');
    setFormIsActive(true);
    setFormIsFeatured(true);
    setFormImages([
      {
        id: 'img-default-1',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
        alt: 'Cover Image',
        isPrimary: true,
        sortOrder: 0,
      }
    ]);
    setFashionGsm('240 GSM Combed Organic Cotton (Mid-Heavy)');
    setFashionFit('Regular Boxy Fit');
    setFashionSizes('S, M, L, XL, 2XL');
    setFashionColors('Onyx Black, Pure Chalk, Vintage Olive');
    setTechCompatibility('MagSafe, iPhone 12-16, Qi Wireless');
    setTechMaterial('CNC Anodized Space Gray Aluminum');
    setTechSpecs('15W Fast Charge / 4K@60Hz HDMI');
    setSoftwareIcon('🛒');
    setSoftwareBadge('Flagship POS');
    setSoftwarePricingType('one-time');
    setSoftwarePeriod('yearly');
    setSoftwareFeatures(
      'Offline-First Local Transaction Queue\nInstant Barcode & Bluetooth Scanner Integration\nDual Currency Real-Time Display\nMulti-Staff Till Shifts'
    );
    setSoftwareTechStack('Next.js, TypeScript, PostgreSQL, Tailwind');
    setSoftwareDemoUrl('/labs/quote?type=software');
  };

  const openCreateModal = (type: DivisionType = 'FASHION') => {
    resetForm();
    setItemType(type);
    if (type === 'FASHION') setFormCategory('regular-fit-tee');
    else if (type === 'TECH') setFormCategory('mobile');
    else if (type === 'SOFTWARE') setFormCategory('pos');
    setShowModal(true);
  };

  const openEditProduct = (p: Product) => {
    const isTech = ['mobile', 'computer', 'audio-desk'].includes(p.categoryId);
    const chosenType = isTech ? 'TECH' : 'FASHION';
    
    setEditingId(p.id);
    setItemType(chosenType);
    setFormName(p.name);
    setFormSlug(p.slug);
    setFormCategory(p.categoryId);
    setAdminInputCurrency('USD');
    setFormInputPrice(p.basePrice.toString());
    setFormInputSalePrice(p.salePrice ? p.salePrice.toString() : '');
    setFormStock(p.variants.reduce((acc, v) => acc + v.stock, 0).toString());
    setFormDescription(p.description || '');
    setFormIsActive(p.isActive ?? true);
    setFormIsFeatured(p.isFeatured ?? true);

    // Load existing images
    if (p.images && p.images.length > 0) {
      setFormImages(p.images.map((img, idx) => ({
        id: img.id || `img-${idx}`,
        url: img.url,
        alt: img.alt || p.name,
        isPrimary: idx === 0,
        sortOrder: idx,
      })));
    }

    const sizes = Array.from(new Set(p.variants.map(v => v.size).filter(Boolean))).join(', ') || 'S, M, L, XL';
    const colors = Array.from(new Set(p.variants.map(v => v.color).filter(Boolean))).join(', ') || 'Standard';
    setFashionSizes(sizes);
    setFashionColors(colors);

    setShowModal(true);
  };

  const openEditSoftware = (sw: SoftwareProduct) => {
    setEditingId(sw.id);
    setItemType('SOFTWARE');
    setFormName(sw.name);
    setFormSlug(sw.slug);
    setFormCategory(sw.category);
    setAdminInputCurrency('USD');
    setFormInputPrice(sw.pricing.startingAt ? sw.pricing.startingAt.toString() : '');
    setFormDescription(sw.description || '');
    setSoftwareIcon(sw.icon || '🛒');
    setSoftwareBadge(sw.badge || 'Software');
    setSoftwarePricingType(sw.pricing.type);
    setSoftwarePeriod(sw.pricing.period || 'yearly');
    setSoftwareFeatures(sw.features.join('\n'));
    setSoftwareTechStack(sw.technologies.join(', '));
    setSoftwareDemoUrl(sw.demoUrl || '/labs/quote');
    setFormIsActive(sw.isActive ?? true);

    setShowModal(true);
  };

  const handleNameChange = (name: string) => {
    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormName(name);
    if (!editingId) {
      setFormSlug(autoSlug);
    }
  };

  // Convert entered price into standard USD base price
  const getUsdBasePrice = (amount: number, inputCur: Currency): number => {
    if (inputCur === 'USD') return amount;
    const rate = rates[inputCur] || 1;
    if (rate <= 0) return amount;
    return Number((amount / rate).toFixed(2));
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const slug = formSlug || formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const rawPrice = parseFloat(formInputPrice) || 0;
    const rawSalePrice = formInputSalePrice ? parseFloat(formInputSalePrice) : undefined;

    // Convert into canonical USD base price
    const basePriceUSD = getUsdBasePrice(rawPrice, adminInputCurrency);
    const salePriceUSD = rawSalePrice != null ? getUsdBasePrice(rawSalePrice, adminInputCurrency) : undefined;

    if (itemType === 'SOFTWARE') {
      const featArray = softwareFeatures.split('\n').map(f => f.trim()).filter(Boolean);
      const techArray = softwareTechStack.split(',').map(t => t.trim()).filter(Boolean);

      const swItem: SoftwareProduct = {
        id: editingId || `sw-${Date.now()}`,
        name: formName,
        slug,
        tagline: formDescription.slice(0, 120) || 'Engineered by Qxyra Labs.',
        description: formDescription || 'Enterprise digital infrastructure and point of sale automation.',
        longDescription: formDescription || 'Enterprise digital infrastructure and point of sale automation.',
        icon: softwareIcon || '🛒',
        badge: softwareBadge || 'Enterprise',
        category: formCategory as any,
        features: featArray.length > 0 ? featArray : ['Turnkey High Speed Architecture', 'Zero-Latency Offline Mode'],
        technologies: techArray.length > 0 ? techArray : ['Next.js', 'TypeScript', 'PostgreSQL'],
        pricing: {
          type: softwarePricingType,
          startingAt: basePriceUSD > 0 ? basePriceUSD : undefined,
          period: softwarePeriod,
          currency: 'USD',
        },
        demoUrl: softwareDemoUrl,
        status: 'available',
        isActive: formIsActive,
      };

      if (editingId) {
        updateSoftware(editingId, swItem);
        showToast(`✓ Software updated: "${formName}"`);
      } else {
        addSoftware(swItem);
        showToast(`✓ New software published to Qxyra Labs: "${formName}"`);
      }
    } else {
      // Physical Store Product
      const prodId = editingId || `prod-${Date.now()}`;
      const stockTotal = parseInt(formStock) || 50;

      const sizeList = itemType === 'FASHION'
        ? fashionSizes.split(',').map(s => s.trim()).filter(Boolean)
        : ['One Size'];
      const colorList = fashionColors.split(',').map(c => c.trim()).filter(Boolean);
      const effectiveSizes = sizeList.length > 0 ? sizeList : ['Standard'];
      const effectiveColors = colorList.length > 0 ? colorList : ['Standard'];

      const variants = [];
      const stockPerVariant = Math.max(1, Math.floor(stockTotal / (effectiveSizes.length * effectiveColors.length)));

      for (const size of effectiveSizes) {
        for (const color of effectiveColors) {
          variants.push({
            id: `var-${slug}-${size}-${color}`.toLowerCase().replace(/[^a-z0-9-]/g, ''),
            productId: prodId,
            sku: `QXY-${slug.slice(0, 6).toUpperCase()}-${size}-${color.slice(0, 3).toUpperCase()}`,
            size,
            color,
            price: salePriceUSD || basePriceUSD,
            stock: stockPerVariant,
            inStock: true,
          });
        }
      }

      // Map gallery images
      const imagesPayload = formImages.length > 0 ? formImages.map((img, idx) => ({
        id: img.id,
        productId: prodId,
        url: img.url,
        alt: img.alt || formName,
        isPrimary: idx === 0,
        sortOrder: idx,
      })) : [
        {
          id: `img-${Date.now()}`,
          productId: prodId,
          url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
          alt: formName,
          isPrimary: true,
          sortOrder: 0,
        }
      ];

      const productItem: Product = {
        id: prodId,
        name: formName,
        slug,
        description: formDescription || `${formName} engineered by Qxyra.`,
        basePrice: basePriceUSD,
        salePrice: salePriceUSD,
        categoryId: formCategory,
        images: imagesPayload,
        variants,
        rating: 5.0,
        totalSold: 0,
        isFeatured: formIsFeatured,
        isActive: formIsActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        updateProduct(editingId, productItem);
        showToast(`✓ Product updated: "${formName}"`);
      } else {
        addProduct(productItem);
        showToast(`✓ New product added to Qxyra Store: "${formName}"`);
      }
    }

    setShowModal(false);
    resetForm();
  };

  // Delete Handler
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === 'SOFTWARE') {
      deleteSoftware(itemToDelete.id);
      showToast(`Removed software "${itemToDelete.name}" from Labs`);
    } else {
      deleteProduct(itemToDelete.id);
      showToast(`Removed product "${itemToDelete.name}" from Store`);
    }
    setItemToDelete(null);
  };

  // Filter lists
  const filteredProducts = products.filter(p => {
    const isFashion = ['regular-fit-tee', 'oversized-tee', 'hoodie', 'sweatshirt', 'track-short'].includes(p.categoryId);
    const isTech = ['mobile', 'computer', 'audio-desk'].includes(p.categoryId);

    if (activeTab === 'FASHION' && !isFashion) return false;
    if (activeTab === 'TECH' && !isTech) return false;
    if (activeTab === 'SOFTWARE') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.categoryId.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredSoftware = softwareList.filter(sw => {
    if (activeTab === 'FASHION' || activeTab === 'TECH') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return sw.name.toLowerCase().includes(q) || sw.slug.toLowerCase().includes(q) || sw.badge?.toLowerCase().includes(q);
    }
    return true;
  });

  const fashionCount = products.filter(p => ['regular-fit-tee', 'oversized-tee', 'hoodie', 'sweatshirt', 'track-short'].includes(p.categoryId)).length;
  const techCount = products.filter(p => ['mobile', 'computer', 'audio-desk'].includes(p.categoryId)).length;
  const softwareCount = softwareList.length;

  if (!mounted) {
    return <div className="p-8 text-center text-gray-500 font-mono text-xs">Loading Qxyra Unified Inventory Engine...</div>;
  }

  // Live conversion calculations for the form
  const rawInputNumeric = parseFloat(formInputPrice) || 0;
  const convertedUsd = getUsdBasePrice(rawInputNumeric, adminInputCurrency);

  return (
    <div className="space-y-8 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-brand-gold text-brand-black font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner with Geo-Currency Notification */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121D] border border-gray-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">
              Qxyra Global Inventory & Engineering Suite
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-medium text-white">
            Universal Product & Software Catalog
          </h1>
          <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
            Multi-image gallery manager with 1:1 auto-cropping, dropdown & custom specs, and automatic visitor geo-currency localization.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => openCreateModal('FASHION')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black text-xs font-bold shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-opacity flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Add Fashion Item</span>
          </button>

          <button
            onClick={() => openCreateModal('TECH')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Add Tech Gear</span>
          </button>

          <button
            onClick={() => openCreateModal('SOFTWARE')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Add Labs Software</span>
          </button>
        </div>
      </div>

      {/* Stats Counter & Dynamic Currency Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121622] border border-gray-800 space-y-1">
          <span className="text-2xl font-mono font-bold text-white">{products.length}</span>
          <p className="text-xs text-gray-400">Total Store Items</p>
          <p className="text-[10px] text-brand-gold font-mono">{fashionCount} Fashion • {techCount} Tech</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121622] border border-blue-500/20 space-y-1">
          <span className="text-2xl font-mono font-bold text-blue-400">{softwareCount}</span>
          <p className="text-xs text-gray-400">Labs Software Suites</p>
          <p className="text-[10px] text-blue-300 font-mono">Retail POS, Web & Automation</p>
        </div>

        {/* Dynamic Currency Box with 1-Click Tester */}
        <div className="p-5 rounded-2xl bg-[#121622] border border-emerald-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase font-mono text-emerald-400 flex items-center gap-1">
              <span>🌐</span> Currency Auto-Sync
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Live Forex
            </span>
          </div>
          <p className="text-lg font-mono font-bold text-white">
            1 USD = {CURRENCIES[currency]?.symbol}{exchangeRate.toFixed(2)}
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {(['LKR', 'USD', 'EUR', 'GBP'] as Currency[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                  currency === cur
                    ? 'bg-brand-gold text-brand-black font-bold'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
                title={`Switch display to ${cur}`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121622] border border-gray-800 space-y-1">
          <span className="text-xs font-semibold text-gray-400 uppercase font-mono">Visitor Geo-Location</span>
          <p className="text-lg font-heading font-medium text-white flex items-center gap-1.5">
            <span>{CURRENCIES[currency]?.flag}</span>
            <span>{detectedCountry || 'Sri Lanka (Auto)'}</span>
          </p>
          <p className="text-[10px] text-emerald-400 font-mono">Auto-selected: {currency} ({CURRENCIES[currency]?.symbol.trim()})</p>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-1 bg-[#121622] p-1 rounded-2xl border border-gray-800 self-start">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'ALL' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            All Items ({products.length + softwareList.length})
          </button>

          <button
            onClick={() => setActiveTab('FASHION')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'FASHION' ? 'bg-brand-gold text-brand-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            👕 Fashion ({fashionCount})
          </button>

          <button
            onClick={() => setActiveTab('TECH')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'TECH' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚡ Tech ({techCount})
          </button>

          <button
            onClick={() => setActiveTab('SOFTWARE')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'SOFTWARE' ? 'bg-blue-600 text-white font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            💻 Software ({softwareCount})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search items, categories, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#121622] border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-gold w-64"
          />

          <button
            onClick={() => setShowResetModal(true)}
            className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium cursor-pointer"
            title="Reset catalog back to defaults"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Table: Combined Physical Products & Software */}
      <div className="bg-[#0F141F] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800/80 bg-[#141926] text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">Item / Media Gallery</th>
                <th className="py-4">Division & Type</th>
                <th className="py-4">Specifications & Architecture</th>
                <th className="py-4">USD Base Price</th>
                <th className="py-4">Localized Price ({currency})</th>
                <th className="py-4">Inventory / Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-xs">
              {/* Render Physical Products */}
              {activeTab !== 'SOFTWARE' && filteredProducts.map((p) => {
                const isFashion = ['regular-fit-tee', 'oversized-tee', 'hoodie', 'sweatshirt', 'track-short'].includes(p.categoryId);
                const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
                const imgCount = p.images?.length || 1;

                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Item & 1:1 Thumbnail with Photo Count */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 overflow-hidden shrink-0 aspect-square shadow-sm">
                          {p.images?.[0]?.url ? (
                            <Image
                              src={p.images[0].url}
                              alt={p.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                              unoptimized={p.images[0].url.startsWith('data:')}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg">📦</div>
                          )}
                          {imgCount > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/80 text-brand-gold px-1 rounded font-mono font-bold">
                              {imgCount}📷
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-heading font-medium text-white text-sm line-clamp-1">{p.name}</h3>
                          <span className="text-[10px] text-gray-500 font-mono">/store/{p.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* Division */}
                    <td className="py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                        isFashion
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {isFashion ? '👕 Fashion' : '⚡ Tech Gear'}
                      </span>
                    </td>

                    {/* Specifications */}
                    <td className="py-4 text-gray-300">
                      <div className="font-mono text-[11px] text-gray-400">{p.categoryId}</div>
                      <div className="text-[10px] text-gray-500">
                        {p.variants.length} variant(s) • {p.variants.map(v => v.size).filter(Boolean).slice(0, 3).join(', ')}
                      </div>
                    </td>

                    {/* USD Price */}
                    <td className="py-4 font-mono text-gray-400">
                      ${p.basePrice.toFixed(2)}
                      {p.salePrice && <span className="block text-[10px] text-brand-gold">Sale: ${p.salePrice.toFixed(2)}</span>}
                    </td>

                    {/* Localized Price */}
                    <td className="py-4 font-mono font-semibold text-brand-gold">
                      {format(p.salePrice || p.basePrice)}
                      <span className="block text-[9px] text-gray-500 font-sans font-normal">Auto-detected for {detectedCountry || 'Visitor'}</span>
                    </td>

                    {/* Stock Status */}
                    <td className="py-4">
                      <button
                        onClick={() => toggleProductStatus(p.id)}
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                          p.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        {p.isActive ? `Active (${totalStock} pcs)` : 'Draft'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/store/${p.slug}`}
                          target="_blank"
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium inline-flex items-center gap-1"
                          title="View live product"
                        >
                          ↗ View
                        </Link>
                        <button
                          onClick={() => openEditProduct(p)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all text-xs font-medium cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setItemToDelete({ id: p.id, name: p.name, type: isFashion ? 'FASHION' : 'TECH' })}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs font-medium cursor-pointer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Render Software Products */}
              {activeTab !== 'FASHION' && activeTab !== 'TECH' && filteredSoftware.map((sw) => {
                return (
                  <tr key={sw.id} className="hover:bg-white/[0.02] transition-colors bg-blue-950/10">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-2xl shrink-0 aspect-square shadow-sm">
                          {sw.icon}
                        </div>
                        <div>
                          <h3 className="font-heading font-medium text-white text-sm line-clamp-1">{sw.name}</h3>
                          <span className="text-[10px] text-blue-400 font-mono">/labs/software#{sw.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        💻 Labs Software
                      </span>
                    </td>

                    <td className="py-4 text-gray-300">
                      <div className="font-mono text-[11px] text-blue-300 font-semibold">{sw.badge}</div>
                      <div className="text-[10px] text-gray-400 line-clamp-1">{sw.technologies.slice(0, 3).join(', ')}</div>
                    </td>

                    <td className="py-4 font-mono text-gray-400">
                      {sw.pricing.type === 'custom-quote' ? 'Quote' : `$${sw.pricing.startingAt}`}
                      {sw.pricing.period && <span className="block text-[9px] text-gray-500">/{sw.pricing.period}</span>}
                    </td>

                    <td className="py-4 font-mono font-semibold text-blue-400">
                      {sw.pricing.type === 'custom-quote' ? 'Custom Quote' : format(sw.pricing.startingAt || 0)}
                      <span className="block text-[9px] text-gray-500 font-sans font-normal">Auto-converted for visitor</span>
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() => toggleSoftwareStatus(sw.id)}
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                          sw.isActive
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                      >
                        {sw.isActive ? 'Live on Labs' : 'Hidden'}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href="/labs/software"
                          target="_blank"
                          className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-all text-xs font-medium inline-flex items-center gap-1"
                        >
                          ↗ View
                        </Link>
                        <button
                          onClick={() => openEditSoftware(sw)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all text-xs font-medium cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setItemToDelete({ id: sw.id, name: sw.name, type: 'SOFTWARE' })}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs font-medium cursor-pointer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =======================================================================
          DYNAMIC ADD / EDIT MODAL (WITH MULTI-IMAGE GALLERY & DROPDOWN SPECS)
          ======================================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121622] border border-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs uppercase text-brand-gold font-mono font-semibold">Qxyra Unified Creator</span>
                <h3 className="text-xl font-heading text-white font-medium">
                  {editingId ? `Edit ${itemType} Item` : `Add New ${itemType} Item`}
                </h3>
              </div>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Division Switcher */}
            {!editingId && (
              <div className="space-y-1.5">
                <label className="text-gray-300 block font-medium text-xs">Select Department / Item Type:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setItemType('FASHION');
                      setFormCategory('regular-fit-tee');
                    }}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      itemType === 'FASHION'
                        ? 'bg-amber-500/15 border-brand-gold text-white shadow-lg'
                        : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">👕</span>
                    <span>Fashion Drop</span>
                    <span className="text-[10px] text-gray-500 font-mono">Tees, Hoodies, Cotton</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setItemType('TECH');
                      setFormCategory('mobile');
                    }}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      itemType === 'TECH'
                        ? 'bg-purple-500/15 border-purple-400 text-white shadow-lg'
                        : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">⚡</span>
                    <span>Tech Gear</span>
                    <span className="text-[10px] text-gray-500 font-mono">MagSafe, Aluminum</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setItemType('SOFTWARE');
                      setFormCategory('pos');
                    }}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      itemType === 'SOFTWARE'
                        ? 'bg-blue-500/15 border-blue-400 text-white shadow-lg'
                        : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">💻</span>
                    <span>Labs Software</span>
                    <span className="text-[10px] text-gray-500 font-mono">POS Suites, Web Apps</span>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Product/Software Name */}
              <div>
                <label className="text-gray-300 block mb-1.5 font-medium">
                  {itemType === 'SOFTWARE' ? 'Software / Solution Name *' : 'Product Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    itemType === 'FASHION'
                      ? 'e.g. Qxyra Heavyweight Acid Wash Oversized Tee'
                      : itemType === 'TECH'
                      ? 'e.g. Qxyra Dual-Tilt MagSafe Fast Wireless Stand'
                      : 'e.g. Qxyra Retail POS Suite v2.6'
                  }
                  value={formName}
                  onChange={e => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* URL Slug & Category Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">URL Slug (Identifier)</label>
                  <input
                    type="text"
                    required
                    placeholder="qxyra-item-slug"
                    value={formSlug}
                    onChange={e => setFormSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white font-mono text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <CreatableCombobox
                    label="Category / Department"
                    sublabel="Select preset or type custom to add"
                    value={formCategory}
                    options={
                      itemType === 'FASHION'
                        ? FASHION_CATEGORIES
                        : itemType === 'TECH'
                        ? TECH_CATEGORIES
                        : SOFTWARE_CATEGORIES
                    }
                    onChange={val => setFormCategory(val)}
                    placeholder="Select department or type new category..."
                    accentColor={itemType === 'SOFTWARE' ? 'blue' : itemType === 'TECH' ? 'purple' : 'gold'}
                    storageKey={`category_${itemType.toLowerCase()}`}
                    required
                  />
                </div>
              </div>

              {/* =============================================================
                  PHOTO GALLERY STUDIO: REORDER, REMOVE & 1:1 SQUARE PC UPLOAD
                  ============================================================= */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-gray-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
                  <div>
                    <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                      <span>🖼️</span> Item Photo Gallery ({formImages.length} Photos)
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      1:1 Square Enforced • #1 is Cover Photo • Reorder with ◀ ▶
                    </span>
                  </div>

                  {/* Upload Source Selector */}
                  <div className="flex items-center gap-1 bg-[#1a2030] p-1 rounded-xl border border-gray-800 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setImageUploadSource('PC')}
                      className={`px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                        imageUploadSource === 'PC' ? 'bg-brand-gold text-brand-black font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      💻 Upload from PC
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadSource('URL')}
                      className={`px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                        imageUploadSource === 'URL' ? 'bg-brand-gold text-brand-black font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🌐 Add by URL
                    </button>
                  </div>
                </div>

                {/* Upload Action Area */}
                {imageUploadSource === 'PC' ? (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      multiple
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-700 hover:border-brand-gold/60 rounded-2xl p-6 text-center cursor-pointer transition-all bg-[#0a0d14]/60 hover:bg-black/50 group"
                    >
                      <div className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">📸</div>
                      <p className="text-xs font-semibold text-white mb-0.5">
                        Click or drag to select photos from your PC
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        Select multiple photos. All images are center-cropped into an exact <span className="text-brand-gold font-bold">1:1 Square</span> automatically!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Paste image URL (https://images.unsplash.com/...)"
                        value={manualUrlInput}
                        onChange={e => setManualUrlInput(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs font-mono focus:outline-none focus:border-brand-gold"
                      />
                      <button
                        type="button"
                        onClick={handleAddUrlImage}
                        className="px-4 py-2.5 rounded-xl bg-brand-gold text-brand-black font-bold text-xs cursor-pointer hover:opacity-90"
                      >
                        + Add Photo
                      </button>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex flex-wrap gap-1.5 items-center pt-1">
                      <span className="text-[10px] text-gray-500 font-mono">1-Click Presets:</span>
                      {PRESET_SAMPLE_PHOTOS.map(pr => (
                        <button
                          key={pr.label}
                          type="button"
                          onClick={() => {
                            setFormImages(prev => [
                              ...prev,
                              {
                                id: `img-pr-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
                                url: pr.url,
                                alt: pr.label,
                                isPrimary: prev.length === 0,
                                sortOrder: prev.length,
                              }
                            ]);
                            showToast(`Added ${pr.label}`);
                          }}
                          className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-gray-800 text-[10px] font-mono cursor-pointer"
                        >
                          + {pr.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Reorder & Gallery Grid */}
                {formImages.length > 0 ? (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                      <span>Customer Presentation Order (Left to Right):</span>
                      <span className="text-emerald-400">✓ 1:1 Aspect Ratio Verified</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {formImages.map((img, idx) => (
                        <div
                          key={img.id}
                          className={`relative rounded-2xl overflow-hidden border-2 bg-gray-900 group transition-all p-1.5 ${
                            idx === 0
                              ? 'border-brand-gold shadow-lg shadow-brand-gold/15 bg-brand-gold/5'
                              : 'border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          {/* Image Box 1:1 */}
                          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/60">
                            <Image
                              src={img.url}
                              alt={img.alt || `Photo ${idx + 1}`}
                              fill
                              className="object-cover"
                              unoptimized={img.url.startsWith('data:')}
                            />

                            {/* Badge #1 Cover */}
                            {idx === 0 ? (
                              <span className="absolute top-1.5 left-1.5 bg-brand-gold text-brand-black px-1.5 py-0.5 rounded-md font-mono text-[9px] font-bold shadow-md">
                                ★ COVER #1
                              </span>
                            ) : (
                              <span className="absolute top-1.5 left-1.5 bg-black/75 text-gray-300 px-1.5 py-0.5 rounded-md font-mono text-[9px]">
                                #{idx + 1}
                              </span>
                            )}

                            {/* Delete Photo Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-transform hover:scale-110 shadow-lg"
                              title="Delete this photo"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Reordering Controls (Move Left / Move Right / Make Cover) */}
                          <div className="flex items-center justify-between gap-1 mt-2 px-1 text-[10px]">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveImage(idx, 'left')}
                                className={`w-6 h-6 rounded-md flex items-center justify-center font-mono cursor-pointer ${
                                  idx === 0 ? 'text-gray-700 cursor-not-allowed bg-white/5' : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                                title="Move Earlier (Left)"
                              >
                                ◀
                              </button>

                              <button
                                type="button"
                                disabled={idx === formImages.length - 1}
                                onClick={() => handleMoveImage(idx, 'right')}
                                className={`w-6 h-6 rounded-md flex items-center justify-center font-mono cursor-pointer ${
                                  idx === formImages.length - 1 ? 'text-gray-700 cursor-not-allowed bg-white/5' : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                                title="Move Later (Right)"
                              >
                                ▶
                              </button>
                            </div>

                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleMakeCover(idx)}
                                className="px-1.5 py-0.5 rounded bg-brand-gold/15 hover:bg-brand-gold/30 text-brand-gold text-[9px] font-mono font-semibold cursor-pointer"
                                title="Make this image the main cover"
                              >
                                Set Cover
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500 font-mono text-xs">
                    No photos added yet. Upload an image from your PC or paste a URL above!
                  </p>
                )}
              </div>

              {/* =============================================================
                  FASHION DROPDOWN SELECTORS + TYPE-TO-ADD COMBOBOXES
                  ============================================================= */}
              {itemType === 'FASHION' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/10 border border-amber-500/20 space-y-5">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                      <span>👕</span>
                      <span>Fashion Drop Specifications</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Choose from presets or type to add custom options
                    </span>
                  </div>

                  {/* 1. Fabric GSM & Composition */}
                  <CreatableCombobox
                    label="Fabric GSM & Composition"
                    sublabel="Select preset or type custom to add"
                    value={fashionGsm}
                    options={FABRIC_GSM_OPTIONS}
                    onChange={val => setFashionGsm(val)}
                    placeholder="Select fabric or type custom (e.g. 240 GSM Combed Organic Cotton)..."
                    accentColor="gold"
                    storageKey="fashion_gsm"
                  />

                  {/* 2. Silhouette / Fit Type */}
                  <CreatableCombobox
                    label="Silhouette / Fit Type"
                    sublabel="Select fit or type custom to add"
                    value={fashionFit}
                    options={FIT_TYPE_OPTIONS}
                    onChange={val => setFashionFit(val)}
                    placeholder="Select silhouette or type custom (e.g. Regular Boxy Fit)..."
                    accentColor="gold"
                    storageKey="fashion_fit"
                  />

                  {/* 3. Available Sizes (Presets + Quick Toggle Chips + Type-to-Add) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-gray-300 font-medium text-xs">Available Sizes</label>
                      <div className="flex gap-1 items-center flex-wrap">
                        {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(sz => {
                          const isSelected = fashionSizes.split(',').map(s => s.trim()).includes(sz);
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => handleToggleSize(sz)}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-brand-gold text-brand-black font-bold'
                                  : 'bg-white/5 text-gray-400 hover:text-white'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <CreatableCombobox
                      value={fashionSizes}
                      options={SIZE_BUNDLES}
                      onChange={val => setFashionSizes(val)}
                      placeholder="Select size bundle or type custom sizes (e.g. S, M, L, XL)..."
                      accentColor="gold"
                      storageKey="fashion_sizes"
                    />
                  </div>

                  {/* 4. Available Colors (Palettes + Type-to-Add) */}
                  <CreatableCombobox
                    label="Available Colors"
                    sublabel="Select palette or type custom colors"
                    value={fashionColors}
                    options={COLOR_PALETTES}
                    onChange={val => setFashionColors(val)}
                    placeholder="Select palette or type custom colors (e.g. Onyx Black, Pure Chalk)..."
                    accentColor="gold"
                    storageKey="fashion_colors"
                  />
                </div>
              )}

              {/* Tech Specific Details */}
              {itemType === 'TECH' && (
                <div className="p-4 rounded-2xl bg-purple-950/10 border border-purple-500/20 space-y-4">
                  <div className="flex items-center gap-2 text-purple-400 font-semibold">
                    <span>⚡</span>
                    <span>Tech Gear Specifications</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CreatableCombobox
                      label="Device Compatibility"
                      sublabel="Select preset or type custom"
                      value={techCompatibility}
                      options={TECH_COMPATIBILITY_OPTIONS}
                      onChange={val => setTechCompatibility(val)}
                      placeholder="MagSafe, iPhone 12-16, Qi Wireless..."
                      accentColor="purple"
                      storageKey="tech_compatibility"
                    />

                    <CreatableCombobox
                      label="Material & Finish"
                      sublabel="Select preset or type custom"
                      value={techMaterial}
                      options={TECH_MATERIAL_OPTIONS}
                      onChange={val => setTechMaterial(val)}
                      placeholder="CNC Anodized Space Gray Aluminum..."
                      accentColor="purple"
                      storageKey="tech_material"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-1 font-medium text-xs">Hardware Specs (Wattage / Ports)</label>
                    <input
                      type="text"
                      placeholder="15W Fast Charge / 100W PD Pass-through / 4K@60Hz"
                      value={techSpecs}
                      onChange={e => setTechSpecs(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-xs focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
              )}

              {/* Software Specific Details */}
              {itemType === 'SOFTWARE' && (
                <div className="p-4 rounded-2xl bg-blue-950/15 border border-blue-500/25 space-y-4">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold">
                    <span>💻</span>
                    <span>Labs Software & System Architecture</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Icon Emoji & Version Badge</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="🛒"
                          value={softwareIcon}
                          onChange={e => setSoftwareIcon(e.target.value)}
                          className="w-16 px-3 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-center text-lg focus:outline-none focus:border-blue-400"
                        />
                        <input
                          type="text"
                          placeholder="Flagship POS / v2.6 Stable"
                          value={softwareBadge}
                          onChange={e => setSoftwareBadge(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Tech Stack (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="Next.js, Flutter, Node.js, PostgreSQL"
                        value={softwareTechStack}
                        onChange={e => setSoftwareTechStack(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">Core Capabilities (1 per line)</label>
                    <textarea
                      rows={3}
                      placeholder="Offline-first till cashier sync&#10;Instant Bluetooth thermal receipt printing&#10;Live gross profit & COGS margins"
                      value={softwareFeatures}
                      onChange={e => setSoftwareFeatures(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-400 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* =============================================================
                  PRICING WITH INPUT CURRENCY SELECTOR & VISITOR AUTO-DETECT
                  ============================================================= */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-gray-800/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
                  <div>
                    <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                      <span>💰</span> Pricing & Currency Structure
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Enter in your preferred currency • Auto-converts for each visitor&apos;s country
                    </span>
                  </div>

                  {/* Input Currency Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">Pricing in:</span>
                    <select
                      value={adminInputCurrency}
                      onChange={e => setAdminInputCurrency(e.target.value as Currency)}
                      className="px-2.5 py-1 rounded-xl bg-[#1a2030] border border-gray-700 text-white font-mono text-xs font-semibold focus:outline-none focus:border-brand-gold cursor-pointer"
                    >
                      {(Object.keys(CURRENCIES) as Currency[]).map(cur => (
                        <option key={cur} value={cur} className="bg-[#121622]">
                          {CURRENCIES[cur].flag} {cur} ({CURRENCIES[cur].symbol.trim()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">
                      Base Retail Price ({CURRENCIES[adminInputCurrency].symbol.trim()}) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="38.00"
                      value={formInputPrice}
                      onChange={e => setFormInputPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white font-mono text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  {itemType !== 'SOFTWARE' ? (
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">
                        Sale Price ({CURRENCIES[adminInputCurrency].symbol.trim()} Optional)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="28.00"
                        value={formInputSalePrice}
                        onChange={e => setFormInputSalePrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-brand-gold font-mono text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">License / Pricing Model</label>
                      <select
                        value={softwarePricingType}
                        onChange={e => setSoftwarePricingType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-400"
                      >
                        <option value="one-time" className="bg-[#121622]">One-Time Lifetime License</option>
                        <option value="subscription" className="bg-[#121622]">SaaS Subscription (Monthly/Yearly)</option>
                        <option value="custom-quote" className="bg-[#121622]">Custom Quote Only</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Real-Time Live Conversion Badge */}
                {rawInputNumeric > 0 && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-emerald-300 font-mono font-medium block">
                        🌍 Visitor Auto-Localization:
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Visitors from {detectedCountry || 'their region'} automatically see:
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold font-mono text-emerald-400 text-base">
                        {format(convertedUsd)}
                      </span>
                      <span className="block text-[10px] text-gray-500 font-mono">
                        Base: ${convertedUsd.toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description & Overview */}
              <div>
                <label className="text-gray-300 block mb-1.5 font-medium">Description & Overview</label>
                <textarea
                  rows={3}
                  placeholder="Detailed description, craftsmanship, materials, or architecture..."
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-gold leading-relaxed"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={e => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold bg-black/40 border-gray-700"
                  />
                  <span>Active & Live on Website</span>
                </label>

                {itemType !== 'SOFTWARE' && (
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={e => setFormIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold bg-black/40 border-gray-700"
                    />
                    <span>Featured on Homepage</span>
                  </label>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className={`px-7 py-2.5 rounded-xl text-xs font-bold transition-opacity cursor-pointer ${
                    itemType === 'SOFTWARE'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black shadow-lg shadow-brand-gold/15'
                  }`}
                >
                  {editingId ? 'Save Changes' : `Publish ${itemType} Item`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-heading text-white font-medium">Delete Item</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Are you sure you want to remove &quot;{itemToDelete.name}&quot; ({itemToDelete.type})?
            </p>
            <div className="pt-3 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Catalog Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-lg font-heading text-white font-medium">Reset Catalog to Default?</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              This will restore all default demo physical products and software platforms to their original factory state.
            </p>
            <div className="pt-3 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefault();
                  resetSoftwareToDefault();
                  setShowResetModal(false);
                  showToast('Catalog reset to default items');
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

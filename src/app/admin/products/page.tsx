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

export type ProductDepartment = 
  | 'ACCESSORIES'       // 🔌 Mobile Accessories (Cases, Chargers, Cables, Earbuds, Power Banks, Glass)
  | 'PHONES'            // 📱 Smartphones (Apple, Samsung, Vivo, Tecno, Infinix, Redmi)
  | 'AUDIO_WEARABLES'   // ⌚ Smartwatches & Audio (Smartwatches, TWS, Speakers, Bands)
  | 'COMPUTER'          // 💻 Computer & Gaming Gear (Hubs, Stands, Keyboards, Mice)
  | 'SOFTWARE';         // 💼 Methmi Labs POS & Software

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

// ─── CATEGORY PRESETS BY DEPARTMENT ──────────────────────────────────────────

const ACCESSORY_CATEGORIES = [
  { id: 'mobile', label: '🔌 All Mobile Accessories (General)' },
  { id: 'mobile-charger', label: '⚡ Fast Chargers & Wall Adapters (20W / 33W / 67W / 120W GaN)' },
  { id: 'mobile-cable', label: '🧵 Fast Charging Cables (Type-C, Lightning, 100W PD, 3-in-1)' },
  { id: 'mobile-case', label: '🛡️ Protective Back Covers & Cases (Silicone, MagSafe, Shockproof)' },
  { id: 'mobile-glass', label: '💎 Tempered Glass & Screen Protectors (9D, Matte, Privacy Anti-Spy)' },
  { id: 'mobile-powerbank', label: '🔋 Power Banks & Magnetic Wireless Batteries (10K / 20K mAh)' },
  { id: 'mobile-audio', label: '🎵 Handsfree, Earbuds & Type-C Headphones' },
  { id: 'mobile-holder', label: '🚗 Car Mounts, Dashboard Holders & Desk Stands' },
  { id: 'mobile-lens', label: '📷 Camera Lens Protectors & Ring Covers' },
];

const PHONE_CATEGORIES = [
  { id: 'vivo', label: 'Vivo Smartphones (Y05 / Y11D / Y31D / V-Series)' },
  { id: 'infinix', label: 'Infinix Smartphones (Note 60 Pro / Hot 70 / Smart 20)' },
  { id: 'tecno', label: 'Tecno Smartphones (Camon 50 Pro / Spark / Pova)' },
  { id: 'apple', label: 'Apple iPhone (TRCSL Approved 16 / 15 Series)' },
  { id: 'samsung', label: 'Samsung Galaxy (S25 / S24 / A-Series)' },
  { id: 'redmi', label: 'Xiaomi Redmi & POCO Series' },
  { id: 'phones', label: 'Other TRCSL Approved Smartphones' },
];

const AUDIO_WEARABLE_CATEGORIES = [
  { id: 'audio-desk', label: '⌚ Smartwatches & Fitness Bands (AMOLED, Calling, IP68)' },
  { id: 'mobile', label: '🎧 True Wireless (TWS) Earbuds & ANC Bluetooth Pods' },
  { id: 'audio-desk', label: '🔊 Portable Wireless Bluetooth Speakers' },
  { id: 'mobile', label: '🏃 Sports Wireless Bluetooth Neckbands' },
  { id: 'audio-desk', label: '🎮 Over-Ear ANC Gaming Headsets' },
];

const COMPUTER_CATEGORIES = [
  { id: 'computer', label: '💻 Multi-Port USB-C Hubs & Docking Stations (4K HDMI, PD)' },
  { id: 'computer', label: '📐 Ergonomic Aluminum Laptop & iPad Stands' },
  { id: 'computer', label: '⌨️ Wireless Keyboards & Optical Mice' },
  { id: 'computer', label: '🔌 Computer Cables, OTG Adapters & Display Adapters' },
];

const SOFTWARE_CATEGORIES = [
  { id: 'pos', label: '🛒 Retail Point of Sale (POS) Suite & Till Cashier' },
  { id: 'restaurant-pos', label: '🍽️ Restaurant & Cafe Kitchen Order (KOT) System' },
  { id: 'software', label: '📦 Omnichannel Inventory Flow & Cloud Stock Sync' },
  { id: 'web-solution', label: '🌐 Bespoke Luxury E-Commerce & Web Applications' },
  { id: 'custom-dev', label: '⚡ Custom Enterprise Software & Automated Workflows' },
];

// ─── QUICK FIELD PRESETS & CHIPS ─────────────────────────────────────────────

const ACCESSORY_COMPATIBILITY_PRESETS = [
  'Universal All Type-C Smartphones',
  'Apple iPhone 16 / 15 / 14 / 13 Series',
  'Samsung Galaxy S25 / S24 / A Series',
  'Vivo Y05 / Y11D / Y31D Series',
  'Infinix Note 60 Pro / Hot 70 / Smart 20',
  'Tecno Camon 50 Pro 5G',
  'All Qi & MagSafe Wireless Devices',
];

const ACCESSORY_MATERIAL_PRESETS = [
  'Shockproof Soft TPU & Matte Hard PC',
  '9H Diamond Hardness Tempered Glass',
  'Braided Heavy-Duty Kevlar & Nylon',
  'GaN (Gallium Nitride) Semiconductor',
  'Liquid Silicone with Microfiber Lining',
  'Aviation Grade CNC Anodized Aluminum',
  'Full Grain Leather with Magnetic Ring',
];

const ACCESSORY_WARRANTY_OPTIONS = [
  '6 Months Official Company Warranty',
  '1 Year Replacement Warranty',
  '3 Months Checking Warranty',
  '7 Days Return / Checking Warranty',
  'No Warranty (Wear & Tear Item)',
];

const PHONE_BRAND_OPTIONS = [
  'Vivo',
  'Infinix',
  'Tecno',
  'Apple iPhone',
  'Samsung Galaxy',
  'Xiaomi Redmi',
  'Other Brand',
];

const PHONE_STORAGE_OPTIONS = [
  '4GB RAM + 64GB Storage',
  '6GB RAM + 128GB Storage',
  '8GB RAM + 128GB Storage',
  '8GB RAM + 256GB Storage',
  '12GB RAM + 256GB Storage',
  '12GB RAM + 512GB Storage',
  '16GB RAM + 1TB Storage',
];

const PHONE_WARRANTY_OPTIONS = [
  '1-Year Official Company Warranty',
  '2-Year Extended Company Warranty (Company Certified)',
  '6 Months Hardware + 1 Year Software Warranty',
];

const COLOR_PRESET_CHIPS = [
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy Blue', hex: '#1B2A4A' },
  { name: 'Gold', hex: '#D4AF37' },
  { name: 'Titanium Gray', hex: '#717378' },
  { name: 'Clear Transparent', hex: '#E5E7EB' },
  { name: 'Purple', hex: '#6D28D9' },
  { name: 'Green', hex: '#15803D' },
];

const SAMPLE_PHOTO_PRESETS: Record<ProductDepartment, { label: string; url: string }[]> = {
  ACCESSORIES: [
    { label: '⚡ 67W GaN Charger', url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800' },
    { label: '🧵 Type-C Braided Cable', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800' },
    { label: '🛡️ MagSafe Silicone Case', url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=800' },
    { label: '🔋 20000mAh Power Bank', url: 'https://images.unsplash.com/photo-1609592424361-b5526315ef74?auto=format&fit=crop&q=80&w=800' },
    { label: '💎 9D Tempered Glass', url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=800' },
  ],
  PHONES: [
    { label: '📱 Vivo Gold Flagship', url: '/products/vivo-y31d-feather-gold.jpg' },
    { label: '📱 Tecno Camon Green', url: '/products/tecno-camon-50-pro-malachite-green.jpg' },
    { label: '📱 Infinix Solar Orange', url: '/products/infinix-note-60-pro-solar-orange.jpg' },
    { label: '📱 Vivo Summit Platinum', url: '/products/vivo-y05-summit-platinum.jpg' },
  ],
  AUDIO_WEARABLES: [
    { label: '🎧 TWS ANC Wireless Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800' },
    { label: '⌚ AMOLED Calling Smartwatch', url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800' },
    { label: '🔊 Portable Bluetooth Speaker', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800' },
  ],
  COMPUTER: [
    { label: '💻 8-in-1 Dual 4K USB-C Hub', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800' },
    { label: '📐 CNC Aluminum Laptop Riser', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800' },
  ],
  SOFTWARE: [
    { label: '🛒 Cloud POS Till Screenshot', url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=800' },
  ],
};

export default function AdminProductsPage() {
  const { format, currency, setCurrency, exchangeRate, rates, detectedCountry } = useCurrency();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductStatus, 
  } = useProductStore();

  const {
    softwareList,
    addSoftware,
    updateSoftware,
    deleteSoftware,
    toggleSoftwareStatus,
  } = useLabsStore();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | ProductDepartment>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string; type: ProductDepartment } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ─── FORM STATE ────────────────────────────────────────────────────────────
  const [department, setDepartment] = useState<ProductDepartment>('ACCESSORIES');
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('mobile');
  const [formStock, setFormStock] = useState('50');
  const [formDescription, setFormDescription] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(true);
  const [formCodEnabled, setFormCodEnabled] = useState(true);

  // Pricing: Default to LKR for Sri Lankan store owners
  const [adminInputCurrency, setAdminInputCurrency] = useState<Currency>('LKR');
  const [formInputPrice, setFormInputPrice] = useState('2500');
  const [formInputSalePrice, setFormInputSalePrice] = useState('1950');

  // Multi-Image Gallery
  const [formImages, setFormImages] = useState<GalleryImage[]>([
    {
      id: 'img-def-1',
      url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
      alt: 'Cover Image',
      isPrimary: true,
      sortOrder: 0,
    }
  ]);
  const [imageUploadSource, setImageUploadSource] = useState<'PC' | 'URL'>('PC');
  const [manualUrlInput, setManualUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── DYNAMIC CATEGORY FIELDS ───────────────────────────────────────────────
  
  // 1. Mobile Accessories
  const [accCompatibility, setAccCompatibility] = useState('Universal All Type-C Smartphones');
  const [accMaterial, setAccMaterial] = useState('Shockproof Soft TPU & Matte Hard PC');
  const [accWarranty, setAccWarranty] = useState('6 Months Official Company Warranty');
  const [accFeatureChips, setAccFeatureChips] = useState<string[]>([
    '⚡ Fast Charging Supported',
    '🛡️ 360° Shockproof Drop Protection',
    '🚚 Islandwide Cash on Delivery (COD)'
  ]);

  // 2. Smartphones
  const [phoneBrand, setPhoneBrand] = useState('Vivo');
  const [phoneStorageVariant, setPhoneStorageVariant] = useState('8GB RAM + 256GB Storage');
  const [phoneTrcslApproved, setPhoneTrcslApproved] = useState(true);
  const [phoneWarranty, setPhoneWarranty] = useState('1-Year Official Company Warranty');
  const [phoneDisplay, setPhoneDisplay] = useState('6.78" 120Hz Sunlight AMOLED Display');
  const [phoneCamera, setPhoneCamera] = useState('50MP Sony OIS Main Camera + 32MP Selfie');
  const [phoneBattery, setPhoneBattery] = useState('5000mAh Battery + 70W FastCharge');

  // 3. Audio & Wearables
  const [audioPlaytime, setAudioPlaytime] = useState('Up to 40 Hours Total Playtime');
  const [audioWaterproof, setAudioWaterproof] = useState('IP68 Water & Dust Resistant');
  const [audioBluetooth, setAudioBluetooth] = useState('Bluetooth v5.4 with Ultra Low Latency');

  // 4. Computer & IT Gear
  const [compPorts, setCompPorts] = useState('Dual 4K HDMI, 100W PD Type-C, 3x USB 3.0');
  const [compOs, setCompOs] = useState('Windows 11, macOS, iPadOS, Android');

  // 5. Software (Labs)
  const [softwareIcon, setSoftwareIcon] = useState('🛒');
  const [softwareBadge, setSoftwareBadge] = useState('Flagship Retail POS');
  const [softwarePricingType, setSoftwarePricingType] = useState<'one-time' | 'subscription' | 'custom-quote'>('one-time');
  const [softwarePeriod, setSoftwarePeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [softwareFeatures, setSoftwareFeatures] = useState(
    'Offline-First Local Cashier Till\nInstant Thermal Receipt & Barcode Bluetooth Printing\nLive Gross Profit & COGS Analytics\nMulti-Staff Cashier Shift Closing'
  );
  const [softwareTechStack, setSoftwareTechStack] = useState('Next.js, TypeScript, PostgreSQL, Thermal ESC/POS');

  // 6. Common Colors / Variations
  const [selectedColors, setSelectedColors] = useState<string[]>(['Black', 'Navy Blue']);
  const [customColorInput, setCustomColorInput] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  /**
   * Process multiple uploaded images from PC: Center-crop to 1:1 Square Canvas
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const img = new window.Image();

        img.onload = () => {
          const origW = img.width;
          const origH = img.height;

          // 1:1 Square Center Crop
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
                alt: `${formName || 'Item'} Photo`,
                isPrimary: prev.length === 0,
                sortOrder: prev.length,
              }
            ]);
            showToast(`✓ Image cropped to 1:1 Square (${targetDimension}×${targetDimension}px)`);
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddUrlImage = () => {
    if (!manualUrlInput || !manualUrlInput.trim()) return;
    setFormImages(prev => [
      ...prev,
      {
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        url: manualUrlInput.trim(),
        alt: `${formName || 'Item'} Photo`,
        isPrimary: prev.length === 0,
        sortOrder: prev.length,
      }
    ]);
    setManualUrlInput('');
    showToast('✓ Photo added to gallery');
  };

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

  const toggleFeatureChip = (chip: string) => {
    if (accFeatureChips.includes(chip)) {
      setAccFeatureChips(prev => prev.filter(c => c !== chip));
    } else {
      setAccFeatureChips(prev => [...prev, chip]);
    }
  };

  const toggleColorChip = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(prev => prev.filter(c => c !== colorName));
    } else {
      setSelectedColors(prev => [...prev, colorName]);
    }
  };

  const addCustomColor = () => {
    if (!customColorInput.trim()) return;
    const clean = customColorInput.trim();
    if (!selectedColors.includes(clean)) {
      setSelectedColors(prev => [...prev, clean]);
    }
    setCustomColorInput('');
  };

  // Switch Department & automatically set appropriate category defaults
  const handleSelectDepartment = (dept: ProductDepartment) => {
    setDepartment(dept);
    if (dept === 'ACCESSORIES') {
      setFormCategory('mobile');
      setAdminInputCurrency('LKR');
      setFormInputPrice('2500');
      setFormInputSalePrice('1950');
      setFormImages([
        {
          id: 'sample-acc',
          url: SAMPLE_PHOTO_PRESETS.ACCESSORIES[0].url,
          alt: 'Sample Accessory',
          isPrimary: true,
          sortOrder: 0,
        }
      ]);
    } else if (dept === 'PHONES') {
      setFormCategory('vivo');
      setAdminInputCurrency('LKR');
      setFormInputPrice('95000');
      setFormInputSalePrice('89500');
      setFormImages([
        {
          id: 'sample-phone',
          url: SAMPLE_PHOTO_PRESETS.PHONES[0].url,
          alt: 'Sample Smartphone',
          isPrimary: true,
          sortOrder: 0,
        }
      ]);
    } else if (dept === 'AUDIO_WEARABLES') {
      setFormCategory('audio-desk');
      setAdminInputCurrency('LKR');
      setFormInputPrice('8500');
      setFormInputSalePrice('6900');
      setFormImages([
        {
          id: 'sample-audio',
          url: SAMPLE_PHOTO_PRESETS.AUDIO_WEARABLES[0].url,
          alt: 'Sample Wearable',
          isPrimary: true,
          sortOrder: 0,
        }
      ]);
    } else if (dept === 'COMPUTER') {
      setFormCategory('computer');
      setAdminInputCurrency('LKR');
      setFormInputPrice('5500');
      setFormInputSalePrice('4800');
      setFormImages([
        {
          id: 'sample-comp',
          url: SAMPLE_PHOTO_PRESETS.COMPUTER[0].url,
          alt: 'Sample Computer Gear',
          isPrimary: true,
          sortOrder: 0,
        }
      ]);
    } else if (dept === 'SOFTWARE') {
      setFormCategory('pos');
      setAdminInputCurrency('USD');
      setFormInputPrice('499');
      setFormInputSalePrice('');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormName('');
    setFormSlug('');
    setFormCategory('mobile');
    setDepartment('ACCESSORIES');
    setAdminInputCurrency('LKR');
    setFormInputPrice('2500');
    setFormInputSalePrice('1950');
    setFormStock('50');
    setFormDescription('');
    setFormIsActive(true);
    setFormIsFeatured(true);
    setFormCodEnabled(true);
    setSelectedColors(['Black', 'Navy Blue']);
    setFormImages([
      {
        id: 'img-def-1',
        url: SAMPLE_PHOTO_PRESETS.ACCESSORIES[0].url,
        alt: 'Cover Image',
        isPrimary: true,
        sortOrder: 0,
      }
    ]);
  };

  const openCreateModal = (dept: ProductDepartment = 'ACCESSORIES') => {
    resetForm();
    handleSelectDepartment(dept);
    setShowModal(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingId(p.id);
    setFormName(p.name);
    setFormSlug(p.slug);
    setFormCategory(p.categoryId);
    setFormStock(p.variants.reduce((acc, v) => acc + v.stock, 0).toString());
    setFormDescription(p.description || '');
    setFormIsActive(p.isActive ?? true);
    setFormIsFeatured(p.isFeatured ?? true);

    // Detect Department
    const isPhone = ['vivo', 'infinix', 'tecno', 'tecno-infinix', 'apple', 'samsung', 'redmi', 'phones'].includes(p.categoryId);
    const isComp = p.categoryId === 'computer';
    const isAudio = p.categoryId === 'audio-desk';
    
    if (isPhone) setDepartment('PHONES');
    else if (isComp) setDepartment('COMPUTER');
    else if (isAudio) setDepartment('AUDIO_WEARABLES');
    else setDepartment('ACCESSORIES');

    // Convert canonical USD basePrice to user display currency (e.g. LKR)
    const lkrRate = rates['LKR'] || 300;
    const lkrPrice = Math.round(p.basePrice * lkrRate);
    const lkrSale = p.salePrice ? Math.round(p.salePrice * lkrRate) : '';
    setAdminInputCurrency('LKR');
    setFormInputPrice(lkrPrice.toString());
    setFormInputSalePrice(lkrSale.toString());

    // Load images
    if (p.images && p.images.length > 0) {
      setFormImages(p.images.map((img, idx) => ({
        id: img.id || `img-${idx}`,
        url: img.url,
        alt: img.alt || p.name,
        isPrimary: idx === 0,
        sortOrder: idx,
      })));
    }

    // Load colors
    const colors = Array.from(new Set(p.variants.map(v => v.color).filter(Boolean))) as string[];
    if (colors.length > 0) setSelectedColors(colors);

    setShowModal(true);
  };

  const openEditSoftware = (sw: SoftwareProduct) => {
    setEditingId(sw.id);
    setDepartment('SOFTWARE');
    setFormName(sw.name);
    setFormSlug(sw.slug);
    setFormCategory(sw.category);
    setAdminInputCurrency('USD');
    setFormInputPrice(sw.pricing.startingAt ? sw.pricing.startingAt.toString() : '');
    setFormDescription(sw.description || '');
    setSoftwareIcon(sw.icon || '🛒');
    setSoftwareBadge(sw.badge || 'Flagship POS');
    setSoftwarePricingType(sw.pricing.type);
    setSoftwarePeriod(sw.pricing.period || 'yearly');
    setSoftwareFeatures(sw.features.join('\n'));
    setSoftwareTechStack(sw.technologies.join(', '));
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

  // Currency Converter: Entered Currency -> Canonical USD
  const getUsdBasePrice = (amount: number, inputCur: Currency): number => {
    if (inputCur === 'USD') return amount;
    const rate = rates[inputCur] || 1;
    if (rate <= 0) return amount;
    return Number((amount / rate).toFixed(2));
  };

  // Convert USD canonical back to LKR for preview
  const getLkrPreviewPrice = (rawAmount: number, inputCur: Currency): number => {
    if (inputCur === 'LKR') return rawAmount;
    const lkrRate = rates['LKR'] || 300;
    const usd = getUsdBasePrice(rawAmount, inputCur);
    return Math.round(usd * lkrRate);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const slug = formSlug.trim() || formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const rawPrice = parseFloat(formInputPrice) || 0;
    const rawSalePrice = formInputSalePrice ? parseFloat(formInputSalePrice) : undefined;

    const basePriceUSD = getUsdBasePrice(rawPrice, adminInputCurrency);
    const salePriceUSD = rawSalePrice != null && rawSalePrice > 0 ? getUsdBasePrice(rawSalePrice, adminInputCurrency) : undefined;

    if (department === 'SOFTWARE') {
      const featArray = softwareFeatures.split('\n').map(f => f.trim()).filter(Boolean);
      const techArray = softwareTechStack.split(',').map(t => t.trim()).filter(Boolean);

      const swItem: SoftwareProduct = {
        id: editingId || `sw-${Date.now()}`,
        name: formName.trim(),
        slug,
        tagline: formDescription.slice(0, 120) || 'Engineered by Methmi Mobile Labs.',
        description: formDescription || 'Enterprise retail automation and point of sale architecture.',
        longDescription: formDescription || 'Enterprise retail automation and point of sale architecture.',
        icon: softwareIcon || '🛒',
        badge: softwareBadge || 'Enterprise POS',
        category: formCategory as any,
        features: featArray.length > 0 ? featArray : ['Turnkey High Speed Architecture', 'Zero-Latency Offline Mode'],
        technologies: techArray.length > 0 ? techArray : ['Next.js', 'TypeScript', 'PostgreSQL'],
        pricing: {
          type: softwarePricingType,
          startingAt: basePriceUSD > 0 ? basePriceUSD : undefined,
          period: softwarePeriod,
          currency: 'USD',
        },
        demoUrl: '/labs/quote?type=software',
        status: 'available',
        isActive: formIsActive,
      };

      if (editingId) {
        updateSoftware(editingId, swItem);
        showToast(`✓ Updated Labs software: "${formName}"`);
      } else {
        addSoftware(swItem);
        showToast(`✓ Published to Methmi Labs: "${formName}"`);
      }
    } else {
      // Store Product (Accessories, Smartphones, Audio, Computer)
      const prodId = editingId || `prod-${Date.now()}`;
      const stockTotal = parseInt(formStock) || 50;

      // Color and variant assembly
      const colors = selectedColors.length > 0 ? selectedColors : ['Standard'];
      const variants = colors.map((col, idx) => ({
        id: `var-${slug}-${col}`.toLowerCase().replace(/[^a-z0-9-]/g, ''),
        productId: prodId,
        sku: `MM-${slug.slice(0, 6).toUpperCase()}-${col.slice(0, 3).toUpperCase()}`,
        color: col,
        price: salePriceUSD || basePriceUSD,
        stock: Math.max(1, Math.floor(stockTotal / colors.length)),
        inStock: true,
      }));

      // Gallery mapping
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
          url: SAMPLE_PHOTO_PRESETS.ACCESSORIES[0].url,
          alt: formName,
          isPrimary: true,
          sortOrder: 0,
        }
      ];

      // Formulate detailed specs highlights based on department
      const specsHighlights: string[] = [];
      if (department === 'ACCESSORIES') {
        specsHighlights.push(`Compatibility: ${accCompatibility}`);
        specsHighlights.push(`Material: ${accMaterial}`);
        specsHighlights.push(`Warranty: ${accWarranty}`);
        accFeatureChips.forEach(c => specsHighlights.push(c));
      } else if (department === 'PHONES') {
        specsHighlights.push(`Brand: ${phoneBrand}`);
        specsHighlights.push(`Memory: ${phoneStorageVariant}`);
        if (phoneTrcslApproved) specsHighlights.push('100% Genuine TRCSL Approved & Sealed');
        specsHighlights.push(`Warranty: ${phoneWarranty}`);
        if (phoneDisplay) specsHighlights.push(`Display: ${phoneDisplay}`);
        if (phoneCamera) specsHighlights.push(`Camera: ${phoneCamera}`);
        if (phoneBattery) specsHighlights.push(`Battery: ${phoneBattery}`);
      } else if (department === 'AUDIO_WEARABLES') {
        specsHighlights.push(`Playtime: ${audioPlaytime}`);
        specsHighlights.push(`Protection: ${audioWaterproof}`);
        specsHighlights.push(`Bluetooth: ${audioBluetooth}`);
      } else if (department === 'COMPUTER') {
        specsHighlights.push(`Ports: ${compPorts}`);
        specsHighlights.push(`Compatibility: ${compOs}`);
      }

      // Build rich description
      const fullDescription = formDescription.trim() || [
        `${formName} — Genuine product available at Methmi Mobile (Pvt) Ltd showroom and online store.`,
        department === 'PHONES' ? 'Includes 100% TRCSL Approval and Official Company Warranty.' : 'Includes warranty and islandwide fast delivery.',
        'Islandwide Cash on Delivery (COD) available with direct WhatsApp order confirmation.'
      ].join(' ');

      const productItem: Product = {
        id: prodId,
        name: formName.trim(),
        slug,
        description: fullDescription,
        basePrice: basePriceUSD,
        salePrice: salePriceUSD,
        categoryId: formCategory,
        images: imagesPayload,
        variants,
        rating: 5.0,
        totalSold: 0,
        isFeatured: formIsFeatured,
        isActive: formIsActive,
        specsHighlights,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        updateProduct(editingId, productItem);
        showToast(`✓ Updated product: "${formName}"`);
      } else {
        addProduct(productItem);
        showToast(`✓ Published product to Store: "${formName}"`);
      }
    }

    setShowModal(false);
    resetForm();
  };

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

  // ─── FILTER PRODUCTS ───────────────────────────────────────────────────────
  const filteredProducts = products.filter(p => {
    const isPhone = ['vivo', 'infinix', 'tecno', 'tecno-infinix', 'apple', 'samsung', 'redmi', 'phones'].includes(p.categoryId);
    const isComp = p.categoryId === 'computer';
    const isAudio = p.categoryId === 'audio-desk';
    const isAcc = !isPhone && !isComp && !isAudio;

    if (activeTab === 'PHONES' && !isPhone) return false;
    if (activeTab === 'ACCESSORIES' && !isAcc) return false;
    if (activeTab === 'AUDIO_WEARABLES' && !isAudio) return false;
    if (activeTab === 'COMPUTER' && !isComp) return false;
    if (activeTab === 'SOFTWARE') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.categoryId.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredSoftware = softwareList.filter(sw => {
    if (activeTab !== 'ALL' && activeTab !== 'SOFTWARE') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return sw.name.toLowerCase().includes(q) || sw.slug.toLowerCase().includes(q) || sw.badge?.toLowerCase().includes(q);
    }
    return true;
  });

  const accCount = products.filter(p => !['vivo', 'infinix', 'tecno', 'tecno-infinix', 'apple', 'samsung', 'redmi', 'phones', 'computer', 'audio-desk'].includes(p.categoryId)).length;
  const phoneCount = products.filter(p => ['vivo', 'infinix', 'tecno', 'tecno-infinix', 'apple', 'samsung', 'redmi', 'phones'].includes(p.categoryId)).length;
  const audioCount = products.filter(p => p.categoryId === 'audio-desk').length;
  const compCount = products.filter(p => p.categoryId === 'computer').length;
  const softwareCount = softwareList.length;

  if (!mounted) {
    return <div className="p-8 text-center text-gray-500 font-mono text-xs">Loading Methmi Mobile Inventory Engine...</div>;
  }

  // Live calculations for Preview Card
  const rawBase = parseFloat(formInputPrice) || 0;
  const rawSale = formInputSalePrice ? parseFloat(formInputSalePrice) : 0;
  const discountPercent = rawSale > 0 && rawBase > rawSale 
    ? Math.round(((rawBase - rawSale) / rawBase) * 100) 
    : 0;

  const previewBaseLKR = getLkrPreviewPrice(rawBase, adminInputCurrency);
  const previewSaleLKR = rawSale > 0 ? getLkrPreviewPrice(rawSale, adminInputCurrency) : 0;

  return (
    <div className="space-y-8 pb-24 font-body">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-brand-gold text-brand-black font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="text-base">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121622] via-[#0E121B] to-[#0A0D14] border border-gray-800 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">
              Methmi Mobile Official Seller Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-medium text-white tracking-wide">
            Product & Inventory Command Center
          </h1>
          <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
            Professional category-adaptive item registration for TRCSL approved smartphones, fast chargers, tempered glass, back covers, smart audio, and retail POS software.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openCreateModal('ACCESSORIES')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold text-brand-black text-xs font-bold shadow-xl shadow-brand-gold/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span className="text-base">🔌</span>
            <span>+ Add Mobile Accessory</span>
          </button>

          <button
            onClick={() => openCreateModal('PHONES')}
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>📱</span>
            <span>+ Add Smartphone</span>
          </button>

          <button
            onClick={() => openCreateModal('SOFTWARE')}
            className="px-4 py-3 rounded-2xl bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>💻</span>
            <span>+ Add POS Software</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        <div 
          onClick={() => setActiveTab('ACCESSORIES')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'ACCESSORIES' ? 'bg-brand-gold/10 border-brand-gold' : 'bg-[#121622] border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-medium">Accessories</span>
            <span className="text-base">🔌</span>
          </div>
          <span className="text-xl font-mono font-bold text-brand-gold">{accCount} Items</span>
          <p className="text-[10px] text-gray-400 mt-0.5">Chargers, Covers, Glass</p>
        </div>

        <div 
          onClick={() => setActiveTab('PHONES')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'PHONES' ? 'bg-amber-500/10 border-amber-400' : 'bg-[#121622] border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-medium">Smartphones</span>
            <span className="text-base">📱</span>
          </div>
          <span className="text-xl font-mono font-bold text-white">{phoneCount} Devices</span>
          <p className="text-[10px] text-gray-400 mt-0.5">100% TRCSL Approved</p>
        </div>

        <div 
          onClick={() => setActiveTab('AUDIO_WEARABLES')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'AUDIO_WEARABLES' ? 'bg-purple-500/10 border-purple-400' : 'bg-[#121622] border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-medium">Audio & Watches</span>
            <span className="text-base">⌚</span>
          </div>
          <span className="text-xl font-mono font-bold text-purple-300">{audioCount} Devices</span>
          <p className="text-[10px] text-gray-400 mt-0.5">TWS & Smartwatches</p>
        </div>

        <div 
          onClick={() => setActiveTab('COMPUTER')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'COMPUTER' ? 'bg-cyan-500/10 border-cyan-400' : 'bg-[#121622] border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-medium">Computer Gear</span>
            <span className="text-base">💻</span>
          </div>
          <span className="text-xl font-mono font-bold text-cyan-300">{compCount} Items</span>
          <p className="text-[10px] text-gray-400 mt-0.5">Hubs, Stands, Input</p>
        </div>

        <div 
          onClick={() => setActiveTab('SOFTWARE')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'SOFTWARE' ? 'bg-blue-500/10 border-blue-400' : 'bg-[#121622] border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[11px] font-medium">Labs Software</span>
            <span className="text-base">🛒</span>
          </div>
          <span className="text-xl font-mono font-bold text-blue-400">{softwareCount} Suites</span>
          <p className="text-[10px] text-gray-400 mt-0.5">Retail POS & KOT</p>
        </div>
      </div>

      {/* Main Table / Management Container */}
      <div className="bg-[#10141E] border border-gray-800/80 rounded-3xl overflow-hidden shadow-2xl">
        {/* Navigation Tabs & Search Toolbar */}
        <div className="p-5 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'ALL', label: 'All Items', count: products.length + softwareList.length },
              { id: 'ACCESSORIES', label: '🔌 Accessories', count: accCount },
              { id: 'PHONES', label: '📱 Smartphones', count: phoneCount },
              { id: 'AUDIO_WEARABLES', label: '⌚ Audio & Wearables', count: audioCount },
              { id: 'COMPUTER', label: '💻 Computer', count: compCount },
              { id: 'SOFTWARE', label: '💼 Labs POS', count: softwareCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-brand-gold text-brand-black font-bold shadow-md shadow-brand-gold/15'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search product title, slug, brand..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-gray-800 text-white text-xs focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#0C0F17] text-gray-400 text-[11px] uppercase tracking-wider font-mono border-b border-gray-800">
              <tr>
                <th className="py-3.5 px-6">Item Information</th>
                <th className="py-3.5 px-4">Category / Dept</th>
                <th className="py-3.5 px-4">Specifications</th>
                <th className="py-3.5 px-4">Selling Price (LKR)</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-body">
              {filteredProducts.map((p) => {
                const isPhone = ['vivo', 'infinix', 'tecno', 'tecno-infinix', 'apple', 'samsung', 'redmi', 'phones'].includes(p.categoryId);
                const isComp = p.categoryId === 'computer';
                const isAudio = p.categoryId === 'audio-desk';
                const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);

                const lkrRate = rates['LKR'] || 300;
                const priceLkr = Math.round(p.basePrice * lkrRate);
                const salePriceLkr = p.salePrice ? Math.round(p.salePrice * lkrRate) : null;

                const primaryImg = p.images?.find(i => i.isPrimary)?.url || p.images?.[0]?.url || '/products/vivo-y05-summit-platinum.jpg';

                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl bg-black/60 border border-gray-800 overflow-hidden shrink-0 aspect-square">
                          <Image
                            src={primaryImg}
                            alt={p.name}
                            fill
                            className="object-cover"
                            unoptimized={primaryImg.startsWith('data:')}
                          />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="font-heading font-medium text-white text-sm line-clamp-1 group-hover:text-brand-gold transition-colors">
                            {p.name}
                          </h3>
                          <span className="text-[10px] text-gray-500 font-mono">/store/{p.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
                        isPhone 
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : isComp 
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                          : isAudio
                          ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      }`}>
                        {isPhone ? '📱 Smartphone' : isComp ? '💻 Computer' : isAudio ? '⌚ Audio/Wearable' : '🔌 Mobile Gear'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-0.5 max-w-xs">
                        <div className="text-[11px] text-gray-300 font-medium line-clamp-1">
                          {p.specsHighlights?.[0] || p.categoryId}
                        </div>
                        <div className="text-[10px] text-gray-500 line-clamp-1">
                          {p.variants.map(v => v.color).filter(Boolean).join(', ') || 'Standard'}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono">
                      {salePriceLkr ? (
                        <div>
                          <span className="text-brand-gold font-bold text-sm">Rs. {salePriceLkr.toLocaleString()}</span>
                          <span className="block text-[10px] text-gray-500 line-through">Rs. {priceLkr.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="text-white font-semibold text-sm">Rs. {priceLkr.toLocaleString()}</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleProductStatus(p.id)}
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                          p.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        {p.isActive ? `Live (${totalStock} in stock)` : 'Draft / Hidden'}
                      </button>
                    </td>

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
                          onClick={() => setItemToDelete({ id: p.id, name: p.name, type: isPhone ? 'PHONES' : 'ACCESSORIES' })}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs font-medium cursor-pointer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Render Software items */}
              {(activeTab === 'ALL' || activeTab === 'SOFTWARE') && filteredSoftware.map((sw) => (
                <tr key={sw.id} className="hover:bg-white/[0.02] transition-colors bg-blue-950/10">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-2xl shrink-0 aspect-square">
                        {sw.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-medium text-white text-sm line-clamp-1">{sw.name}</h3>
                        <span className="text-[10px] text-blue-400 font-mono">/labs/software#{sw.slug}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      💻 Labs POS Suite
                    </span>
                  </td>

                  <td className="py-4 px-4 text-gray-300">
                    <div className="font-mono text-[11px] text-blue-300 font-semibold">{sw.badge}</div>
                    <div className="text-[10px] text-gray-400 line-clamp-1">{sw.technologies.slice(0, 3).join(', ')}</div>
                  </td>

                  <td className="py-4 px-4 font-mono text-blue-300 font-semibold">
                    {sw.pricing.type === 'custom-quote' ? 'Quote' : `$${sw.pricing.startingAt}`}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleSoftwareStatus(sw.id)}
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                        sw.isActive
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =======================================================================
          PROFESSIONAL CATEGORY-ADAPTIVE ITEM CREATION MODAL (DARAZ / SHOPIFY STYLE)
          ======================================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#121622] border border-gray-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 my-6 max-h-[94vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Top Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[10px] font-mono uppercase tracking-wider font-semibold">
                  <span>⚡</span>
                  <span>Methmi Mobile Product Architecture Suite</span>
                </div>
                <h3 className="text-xl font-heading text-white font-medium">
                  {editingId ? `Edit Product: ${formName || 'Item'}` : `Add New Product to Store`}
                </h3>
              </div>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Department / Category Selector Cards */}
            {!editingId && (
              <div className="space-y-2">
                <label className="text-gray-300 block font-medium text-xs">
                  Step 1: Select Product Department (Form adapts automatically)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'ACCESSORIES', label: 'Mobile Accessories', icon: '🔌', desc: 'Chargers, Cases, Glass' },
                    { id: 'PHONES', label: 'Smartphones', icon: '📱', desc: 'TRCSL Approved Flagships' },
                    { id: 'AUDIO_WEARABLES', label: 'Audio & Watches', icon: '⌚', desc: 'Smartwatches & TWS' },
                    { id: 'COMPUTER', label: 'Computer Gear', icon: '💻', desc: 'Hubs, Stands, Mice' },
                    { id: 'SOFTWARE', label: 'Labs POS', icon: '🛒', desc: 'Retail Cloud Systems' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSelectDepartment(tab.id as ProductDepartment)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        department === tab.id
                          ? 'bg-brand-gold/15 border-brand-gold text-white shadow-lg shadow-brand-gold/10 ring-1 ring-brand-gold/50'
                          : 'bg-black/40 border-gray-800/80 text-gray-400 hover:text-white hover:border-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-1.5">{tab.icon}</span>
                      <div>
                        <div className="text-xs font-semibold text-white leading-tight">{tab.label}</div>
                        <div className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{tab.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              
              {/* ─── SECTION 1: BASIC INFORMATION ────────────────────────────── */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gray-800 space-y-4">
                <div className="border-b border-gray-800/80 pb-2.5 flex items-center justify-between">
                  <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                    <span>🏷️</span> 1. Basic Information
                  </span>
                  <span className="text-[10px] text-brand-gold font-mono">Department: {department}</span>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1.5 font-medium">
                    Product Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      department === 'ACCESSORIES'
                        ? 'e.g. 67W GaN Ultra-Fast Dual Port Type-C Wall Charger'
                        : department === 'PHONES'
                        ? 'e.g. Vivo Y31D (8GB RAM | 256GB Storage) Feather Gold'
                        : department === 'AUDIO_WEARABLES'
                        ? 'e.g. Methmi Pro TWS Wireless ANC Earbuds (40h Playtime)'
                        : department === 'COMPUTER'
                        ? 'e.g. 8-in-1 Dual 4K HDMI USB-C Aluminum Docking Station'
                        : 'e.g. Methmi Mobile Cloud POS Retail Suite v2.6'
                    }
                    value={formName}
                    onChange={e => handleNameChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 block mb-1.5 font-medium">Store URL Identifier (Slug)</label>
                    <input
                      type="text"
                      required
                      placeholder="item-slug-identifier"
                      value={formSlug}
                      onChange={e => setFormSlug(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white font-mono text-xs focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <CreatableCombobox
                      label="Store Category Classification"
                      sublabel="Select preset or type custom to add"
                      value={formCategory}
                      options={
                        department === 'ACCESSORIES'
                          ? ACCESSORY_CATEGORIES
                          : department === 'PHONES'
                          ? PHONE_CATEGORIES
                          : department === 'AUDIO_WEARABLES'
                          ? AUDIO_WEARABLE_CATEGORIES
                          : department === 'COMPUTER'
                          ? COMPUTER_CATEGORIES
                          : SOFTWARE_CATEGORIES
                      }
                      onChange={val => setFormCategory(val)}
                      placeholder="Select category or type new..."
                      accentColor="gold"
                      storageKey={`category_${department.toLowerCase()}`}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ─── SECTION 2: CATEGORY-SPECIFIC ATTRIBUTES ───────────────────── */}
              {department === 'ACCESSORIES' && (
                <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/25 space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-1.5">
                      <span>🔌</span> 2. Mobile Accessory Technical Specifications
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Tailored for Phone Accessories</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CreatableCombobox
                      label="Device Compatibility"
                      sublabel="Which smartphones does this fit?"
                      value={accCompatibility}
                      options={ACCESSORY_COMPATIBILITY_PRESETS}
                      onChange={val => setAccCompatibility(val)}
                      placeholder="e.g. iPhone 15/16, Universal Type-C..."
                      accentColor="emerald"
                      storageKey="acc_compat"
                    />

                    <CreatableCombobox
                      label="Material & Build Quality"
                      sublabel="Component texture and protection grade"
                      value={accMaterial}
                      options={ACCESSORY_MATERIAL_PRESETS}
                      onChange={val => setAccMaterial(val)}
                      placeholder="e.g. Shockproof Soft TPU, GaN..."
                      accentColor="emerald"
                      storageKey="acc_material"
                    />
                  </div>

                  <div>
                    <CreatableCombobox
                      label="Warranty Coverage Duration"
                      sublabel="Showroom warranty provided to customer"
                      value={accWarranty}
                      options={ACCESSORY_WARRANTY_OPTIONS}
                      onChange={val => setAccWarranty(val)}
                      placeholder="Select warranty duration..."
                      accentColor="emerald"
                      storageKey="acc_warranty"
                    />
                  </div>

                  {/* Quick Feature Badges Toggle Chips */}
                  <div className="space-y-1.5">
                    <label className="text-gray-300 block font-medium">Quick Feature Badges (Click to toggle)</label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        '⚡ 67W/33W Fast Charging',
                        '🧲 MagSafe Magnetic Compatible',
                        '🛡️ 360° Shockproof Drop Protection',
                        '💎 9H Scratch Resistant',
                        '👁️ Privacy Anti-Spy Filter',
                        '🔋 High Capacity 20,000mAh',
                        '📶 Bluetooth 5.4 Low Latency',
                        '💦 Splash & Sweat Proof',
                        '🚚 Islandwide Cash on Delivery (COD)'
                      ].map(chip => {
                        const isSelected = accFeatureChips.includes(chip);
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => toggleFeatureChip(chip)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                                : 'bg-black/50 text-gray-400 border border-gray-800 hover:text-white'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {department === 'PHONES' && (
                <div className="p-5 rounded-2xl bg-amber-950/10 border border-amber-500/25 space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
                    <span className="font-semibold text-amber-400 text-sm flex items-center gap-1.5">
                      <span>📱</span> 2. Smartphone Hardware & TRCSL Specifications
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Tailored for Smartphones</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CreatableCombobox
                      label="Phone Brand"
                      sublabel="Manufacturer flagship"
                      value={phoneBrand}
                      options={PHONE_BRAND_OPTIONS}
                      onChange={val => setPhoneBrand(val)}
                      placeholder="e.g. Vivo, Infinix, Tecno..."
                      accentColor="gold"
                      storageKey="phone_brand"
                    />

                    <CreatableCombobox
                      label="RAM & Storage Variant"
                      sublabel="Hardware memory specifications"
                      value={phoneStorageVariant}
                      options={PHONE_STORAGE_OPTIONS}
                      onChange={val => setPhoneStorageVariant(val)}
                      placeholder="e.g. 8GB RAM + 256GB Storage..."
                      accentColor="gold"
                      storageKey="phone_ram_rom"
                    />
                  </div>

                  {/* TRCSL Certification Card */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🇱🇰</span>
                      <div>
                        <div className="font-semibold text-white text-xs">TRCSL Approval Status</div>
                        <div className="text-[10px] text-gray-400">Telecommunications Regulatory Commission of Sri Lanka Approved</div>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-amber-300">
                      <input
                        type="checkbox"
                        checked={phoneTrcslApproved}
                        onChange={e => setPhoneTrcslApproved(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold bg-black/40 border-gray-700 cursor-pointer"
                      />
                      <span>100% TRCSL Certified</span>
                    </label>
                  </div>

                  <CreatableCombobox
                    label="Official Company Warranty"
                    sublabel="Sri Lanka authorized agent warranty"
                    value={phoneWarranty}
                    options={PHONE_WARRANTY_OPTIONS}
                    onChange={val => setPhoneWarranty(val)}
                    placeholder="e.g. 1-Year Official Company Warranty..."
                    accentColor="gold"
                    storageKey="phone_warranty"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Display Specification</label>
                      <input
                        type="text"
                        value={phoneDisplay}
                        onChange={e => setPhoneDisplay(e.target.value)}
                        placeholder="6.78 AMOLED 120Hz..."
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Camera Specification</label>
                      <input
                        type="text"
                        value={phoneCamera}
                        onChange={e => setPhoneCamera(e.target.value)}
                        placeholder="50MP Sony OIS + 32MP Selfie..."
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Battery & Fast Charge</label>
                      <input
                        type="text"
                        value={phoneBattery}
                        onChange={e => setPhoneBattery(e.target.value)}
                        placeholder="5000mAh + 70W FlashCharge..."
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {department === 'AUDIO_WEARABLES' && (
                <div className="p-5 rounded-2xl bg-purple-950/10 border border-purple-500/25 space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2.5">
                    <span className="font-semibold text-purple-400 text-sm flex items-center gap-1.5">
                      <span>⌚</span> 2. Audio & Smartwatch Specifications
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Battery Life / Playtime</label>
                      <input
                        type="text"
                        value={audioPlaytime}
                        onChange={e => setAudioPlaytime(e.target.value)}
                        placeholder="e.g. Up to 40 Hours Playtime..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-purple-400"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Water Resistance Rating</label>
                      <input
                        type="text"
                        value={audioWaterproof}
                        onChange={e => setAudioWaterproof(e.target.value)}
                        placeholder="e.g. IP68 Water & Dust Resistant..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-purple-400"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Bluetooth & Connectivity</label>
                      <input
                        type="text"
                        value={audioBluetooth}
                        onChange={e => setAudioBluetooth(e.target.value)}
                        placeholder="e.g. Bluetooth v5.4 Low Latency..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {department === 'COMPUTER' && (
                <div className="p-5 rounded-2xl bg-cyan-950/10 border border-cyan-500/25 space-y-4">
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
                    <span className="font-semibold text-cyan-400 text-sm flex items-center gap-1.5">
                      <span>💻</span> 2. Computer & Peripheral Specifications
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Interface Ports & Speed</label>
                      <input
                        type="text"
                        value={compPorts}
                        onChange={e => setCompPorts(e.target.value)}
                        placeholder="e.g. Dual 4K HDMI, 100W PD Type-C, USB 3.0..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Operating System Compatibility</label>
                      <input
                        type="text"
                        value={compOs}
                        onChange={e => setCompOs(e.target.value)}
                        placeholder="e.g. Windows 11, macOS, iPadOS, Android..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {department === 'SOFTWARE' && (
                <div className="p-5 rounded-2xl bg-blue-950/15 border border-blue-500/25 space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-500/20 pb-2.5">
                    <span className="font-semibold text-blue-400 text-sm flex items-center gap-1.5">
                      <span>💻</span> 2. Labs Software & System Architecture
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Icon Emoji & Version Badge</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={softwareIcon}
                          onChange={e => setSoftwareIcon(e.target.value)}
                          className="w-16 px-3 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-center text-lg focus:outline-none focus:border-blue-400"
                        />
                        <input
                          type="text"
                          value={softwareBadge}
                          onChange={e => setSoftwareBadge(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-300 block mb-1 font-medium">Tech Stack (Technologies)</label>
                      <input
                        type="text"
                        value={softwareTechStack}
                        onChange={e => setSoftwareTechStack(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">Core Capabilities (1 per line)</label>
                    <textarea
                      rows={3}
                      value={softwareFeatures}
                      onChange={e => setSoftwareFeatures(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-400 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* ─── SECTION 3: MULTI-IMAGE GALLERY ──────────────────────────── */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gray-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
                  <div>
                    <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                      <span>🖼️</span> 3. Product Photo Gallery ({formImages.length} Photos)
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      1:1 Square Enforced • #1 is Main Storefront Photo • Reorder with ◀ ▶
                    </span>
                  </div>

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
                        Click to select 1 or multiple photos from your PC / Phone
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        Auto-crops images into an exact <span className="text-brand-gold font-bold">1:1 Square</span> for uniform customer presentation!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Paste image URL (https://...)"
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

                    {/* Quick Presets for current department */}
                    <div className="flex flex-wrap gap-1.5 items-center pt-1">
                      <span className="text-[10px] text-gray-500 font-mono">Quick Presets:</span>
                      {SAMPLE_PHOTO_PRESETS[department]?.map(pr => (
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

                {/* Gallery Visual Grid */}
                {formImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {formImages.map((img, idx) => (
                      <div
                        key={img.id}
                        className={`relative rounded-2xl overflow-hidden border-2 bg-gray-900 group transition-all p-1.5 ${
                          idx === 0
                            ? 'border-brand-gold shadow-lg shadow-brand-gold/15 bg-brand-gold/5'
                            : 'border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/60">
                          <Image
                            src={img.url}
                            alt={img.alt || `Photo ${idx + 1}`}
                            fill
                            className="object-cover"
                            unoptimized={img.url.startsWith('data:')}
                          />
                          {idx === 0 ? (
                            <span className="absolute top-1.5 left-1.5 bg-brand-gold text-brand-black px-1.5 py-0.5 rounded-md font-mono text-[9px] font-bold shadow-md">
                              ★ COVER #1
                            </span>
                          ) : (
                            <span className="absolute top-1.5 left-1.5 bg-black/75 text-gray-300 px-1.5 py-0.5 rounded-md font-mono text-[9px]">
                              #{idx + 1}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-transform hover:scale-110 shadow-lg"
                            title="Delete this photo"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Reorder Controls */}
                        <div className="flex items-center justify-between gap-1 mt-2 px-1 text-[10px]">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveImage(idx, 'left')}
                              className={`w-6 h-6 rounded-md flex items-center justify-center font-mono cursor-pointer ${
                                idx === 0 ? 'text-gray-700 cursor-not-allowed bg-white/5' : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                              title="Move Left"
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
                              title="Move Right"
                            >
                              ▶
                            </button>
                          </div>
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleMakeCover(idx)}
                              className="px-1.5 py-0.5 rounded bg-brand-gold/15 hover:bg-brand-gold/30 text-brand-gold text-[9px] font-mono font-semibold cursor-pointer"
                            >
                              Set Cover
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ─── SECTION 4: PRICING & INVENTORY ──────────────────────────── */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gray-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
                  <div>
                    <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                      <span>💰</span> 4. Pricing & Inventory
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Native Sri Lankan Rupee (LKR) default with live discount calculation
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">Currency:</span>
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">
                      Regular Price ({CURRENCIES[adminInputCurrency].symbol.trim()}) *
                    </label>
                    <input
                      type="number"
                      step="1"
                      required
                      placeholder="2500"
                      value={formInputPrice}
                      onChange={e => setFormInputPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white font-mono text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">
                      Sale / Offer Price ({CURRENCIES[adminInputCurrency].symbol.trim()} Optional)
                    </label>
                    <input
                      type="number"
                      step="1"
                      placeholder="1950"
                      value={formInputSalePrice}
                      onChange={e => setFormInputSalePrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-brand-gold font-mono text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-1 font-medium">Stock Inventory Quantity</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formStock}
                      onChange={e => setFormStock(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white font-mono text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                {/* Live Discount & Conversion Preview Pill */}
                {rawBase > 0 && (
                  <div className="p-3.5 rounded-xl bg-[#0F1420] border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">🚚 Islandwide COD:</span>
                      <span className="text-gray-300">Customers pay upon delivery to courier</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-semibold">
                        <span>🔥 Special Deal:</span>
                        <span>SAVE {discountPercent}% OFF</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── SECTION 5: AVAILABLE COLORS & VARIATIONS ────────────────── */}
              {department !== 'SOFTWARE' && (
                <div className="p-5 rounded-2xl bg-black/40 border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800/80 pb-2.5">
                    <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                      <span>🎨</span> 5. Available Colors & Variations
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Selected: {selectedColors.join(', ')}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    {COLOR_PRESET_CHIPS.map(c => {
                      const isSel = selectedColors.includes(c.name);
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => toggleColorChip(c.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                            isSel
                              ? 'bg-white text-black font-semibold shadow-md'
                              : 'bg-black/50 text-gray-300 border border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full border border-gray-600 shrink-0" style={{ backgroundColor: c.hex }} />
                          <span>{c.name}</span>
                          {isSel && <span className="text-[10px]">✓</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Color */}
                  <div className="flex gap-2 max-w-sm pt-1">
                    <input
                      type="text"
                      placeholder="Add custom color (e.g. Feather Gold)..."
                      value={customColorInput}
                      onChange={e => setCustomColorInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomColor(); } }}
                      className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-white text-xs focus:outline-none focus:border-brand-gold"
                    />
                    <button
                      type="button"
                      onClick={addCustomColor}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              )}

              {/* ─── SECTION 6: DESCRIPTION & STOREFRONT TOGGLES ─────────────── */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gray-800 space-y-4">
                <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                  <span>📝</span> 6. Product Description & Store Visibility
                </span>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Enter detailed description, warranty coverage terms, features or showroom details..."
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-gold leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300 font-medium">
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={e => setFormIsActive(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold bg-black/40 border-gray-700 cursor-pointer"
                    />
                    <span>Active & Visible on Website</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-gray-300 font-medium">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={e => setFormIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold bg-black/40 border-gray-700 cursor-pointer"
                    />
                    <span>Featured on Store Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-gray-300 font-medium">
                    <input
                      type="checkbox"
                      checked={formCodEnabled}
                      onChange={e => setFormCodEnabled(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold bg-black/40 border-gray-700 cursor-pointer"
                    />
                    <span>Allow Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>

              {/* ─── SECTION 7: LIVE STOREFRONT CUSTOMER PREVIEW ─────────────── */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-gold/10 via-[#151924] to-[#121622] border border-brand-gold/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-gold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>👁️</span> Live Customer Card Preview (Daraz & Website Look)
                  </span>
                  <span className="text-[10px] text-gray-400">Updates live as you type</span>
                </div>

                <div className="max-w-xs mx-auto sm:mx-0 p-3 rounded-2xl bg-[#0E121B] border border-gray-800 shadow-xl space-y-2.5">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/60">
                    <Image
                      src={formImages[0]?.url || SAMPLE_PHOTO_PRESETS.ACCESSORIES[0].url}
                      alt={formName || 'Product'}
                      fill
                      className="object-cover"
                      unoptimized={formImages[0]?.url.startsWith('data:')}
                    />
                    {discountPercent > 0 && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                        -{discountPercent}%
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {department}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading font-medium text-white text-xs line-clamp-1">
                      {formName || 'Enter product title above...'}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-1 font-mono">
                      {previewSaleLKR > 0 ? (
                        <>
                          <span className="text-brand-gold font-bold text-sm">Rs. {previewSaleLKR.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-500 line-through">Rs. {previewBaseLKR.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="text-white font-bold text-sm">Rs. {previewBaseLKR.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-800/80 text-[10px]">
                    <span className="text-emerald-400 font-medium">✓ In Stock</span>
                    <span className="text-gray-400">COD Available</span>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-bold shadow-lg shadow-brand-gold/15 hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-1.5"
                >
                  <span>✓</span>
                  <span>{editingId ? 'Save & Update Product' : 'Publish Product to Store'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121622] border border-gray-800 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="text-center space-y-2">
              <span className="text-3xl block">⚠️</span>
              <h3 className="text-lg font-heading text-white font-medium">Remove Product?</h3>
              <p className="text-xs text-gray-400">
                Are you sure you want to remove &ldquo;<span className="text-white font-semibold">{itemToDelete.name}</span>&rdquo; from the live catalog?
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

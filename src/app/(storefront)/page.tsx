import { Metadata } from 'next';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';
import { GatewayHero } from '@/components/home/GatewayHero';
import { StorePreview } from '@/components/home/StorePreview';
import { LabsShowcase } from '@/components/home/LabsShowcase';
import { BrandStory } from '@/components/home/BrandStory';
import { TrustBadges } from '@/components/home/TrustBadges';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${BRAND_TAGLINE} — Store & Labs`,
  description: 'Qxyra operates two distinct divisions: Qxyra Store (curated streetwear and smart tech accessories) and Qxyra Labs (Point of Sale software and custom web engineering).',
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-black text-white">
      {/* 1. Flagship Dual Division Split Hero */}
      <GatewayHero />

      {/* 2. Store Collection Preview (Fashion & Accessories) */}
      <StorePreview />

      {/* 3. Labs Suite Showcase (Retail POS & Web Solutions) */}
      <LabsShowcase />

      {/* 4. Brand Story & Dual Philosophy */}
      <BrandStory />

      {/* 5. Trust Badges & Global Guarantees */}
      <TrustBadges />
    </div>
  );
}

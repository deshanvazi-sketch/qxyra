import { Metadata } from 'next';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';
import {
  HeroBanner,
  TrustBadges,
  CategoryShowcase,
  FeaturedProducts,
  PromoBar,
  Testimonials,
  Newsletter
} from '@/components/home';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
  description: 'Discover the world-class premium collection at Qxyra.',
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <HeroBanner />
      <TrustBadges />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBar />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

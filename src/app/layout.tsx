import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { TrackingPixels } from "@/components/analytics/TrackingPixels";

const inter = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qxyra.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Qxyra | Discover. Desire. Deliver.",
    template: "%s | Qxyra",
  },
  description: "Qxyra is an elite global e-commerce and dropshipping brand delivering world-class craftsmanship, innovative smart lifestyle essentials, and curated luxury.",
  keywords: ["Qxyra", "e-commerce", "premium dropshipping", "luxury electronics", "lifestyle", "boutique", "CJ dropshipping"],
  authors: [{ name: "Qxyra Global" }],
  creator: "Qxyra",
  publisher: "Qxyra Inc.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Qxyra | Discover. Desire. Deliver.",
    description: "Discover world-class quality and exceptional design with Qxyra.",
    url: siteUrl,
    siteName: "Qxyra",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Qxyra Official Brand Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qxyra | Discover. Desire. Deliver.",
    description: "Curated world-class lifestyle products & global dropshipping.",
    creator: "@qxyra",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Qxyra",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: "World-class e-commerce brand and curated lifestyle catalog.",
    sameAs: [
      "https://facebook.com/qxyra",
      "https://instagram.com/qxyra",
      "https://tiktok.com/@qxyra",
      "https://twitter.com/qxyra"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} font-body antialiased text-brand-black bg-white min-h-screen flex flex-col`}
      >
        <TrackingPixels />
        {children}
      </body>
    </html>
  );
}

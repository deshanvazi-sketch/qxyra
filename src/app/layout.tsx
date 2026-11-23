import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { TrackingPixels } from "@/components/analytics/TrackingPixels";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { WhatsAppFloatingButton } from "@/components/common/WhatsAppFloatingButton";

const inter = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://methmimobilepvtltd.lk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/methmi-emblem.png" },
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/methmi-emblem.png",
    apple: [
      { url: "/methmi-emblem.png" },
      { url: "/apple-icon.png" },
    ],
  },
  title: {
    default: "Methmi Mobile (Pvt) Ltd | Your Trusted Mobile Partner",
    template: "%s | Methmi Mobile",
  },
  description: "Sri Lanka's premier technology flagship: 100% genuine TRCSL-approved Apple iPhones, Samsung Galaxy, Tecno, Infinix, Xiaomi Redmi, premium accessories, and retail Cloud POS software solutions.",
  keywords: [
    "Methmi Mobile",
    "Methmi Mobile Pvt Ltd",
    "iPhone Sri Lanka",
    "Samsung Galaxy Sri Lanka",
    "Tecno Camon 50 Pro",
    "Infinix Note 60 Pro",
    "TRCSL Approved Phones",
    "Methmi POS",
    "Retail POS System Sri Lanka",
    "Mobile Shop Sri Lanka"
  ],
  authors: [{ name: "Methmi Mobile (Pvt) Ltd" }],
  creator: "Methmi Mobile (Pvt) Ltd",
  publisher: "Methmi Mobile (Pvt) Ltd",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Methmi Mobile (Pvt) Ltd | Your Trusted Mobile Partner",
    description: "Experience 100% genuine TRCSL-approved smartphones, premium mobile gear, and cutting-edge retail Cloud POS software solutions in Sri Lanka.",
    url: siteUrl,
    siteName: "Methmi Mobile",
    images: [
      {
        url: "/methmi-logo.jpg",
        width: 1024,
        height: 571,
        alt: "Methmi Mobile (Pvt) Ltd Official Brand",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Methmi Mobile (Pvt) Ltd | Your Trusted Mobile Partner",
    description: "100% genuine TRCSL-approved smartphones, accessories & retail Cloud POS software solutions.",
    creator: "@methmimobile",
    images: ["/methmi-logo.jpg"],
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
    name: "Methmi Mobile (Pvt) Ltd",
    url: siteUrl,
    logo: `${siteUrl}/methmi-logo.jpg`,
    description: "Sri Lanka's trusted flagship for original TRCSL approved mobile phones, premium accessories, and Cloud POS systems.",
    sameAs: [
      "https://facebook.com/methmimobile",
      "https://tiktok.com/@methmimobile"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/methmi-logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} font-body antialiased text-brand-black bg-white min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <CurrencyProvider>
            <TrackingPixels />
            {children}
            <WhatsAppFloatingButton />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

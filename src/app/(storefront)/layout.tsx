import React from 'react';
import { Header, Footer, MobileBottomNav } from '@/components/layout';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import { OrderConfirmationClient } from '@/components/checkout/OrderConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmed (Cash on Delivery) | Methmi Mobile',
  description: 'Your Cash on Delivery order has been successfully placed with Methmi Mobile (Pvt) Ltd.',
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  return <OrderConfirmationClient orderId={orderId} />;
}

import { NextResponse } from 'next/server';
import { cjClient } from '@/lib/cj-dropshipping';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderNumber, shippingAddress, items } = body;

    if (!orderNumber || !shippingAddress || !items || !items.length) {
      return NextResponse.json(
        { success: false, error: 'Missing required order forwarding details' },
        { status: 400 }
      );
    }

    const response = await cjClient.createOrder({
      orderNumber,
      shippingAddress,
      items
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to forward order to CJ Dropshipping' },
      { status: 500 }
    );
  }
}

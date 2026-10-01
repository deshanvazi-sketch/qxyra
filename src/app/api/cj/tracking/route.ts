import { NextResponse } from 'next/server';
import { cjClient } from '@/lib/cj-dropshipping';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get('number') || 'CJTRK982314991US';

    const trackingData = await cjClient.getTracking(trackingNumber);

    return NextResponse.json({
      success: true,
      data: trackingData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve tracking data' },
      { status: 500 }
    );
  }
}

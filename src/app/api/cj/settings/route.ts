import { NextResponse } from 'next/server';
import { cjClient, defaultCJConfig } from '@/lib/cj-dropshipping';

let activeConfig = { ...defaultCJConfig };

export async function GET() {
  return NextResponse.json({
    success: true,
    config: activeConfig
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    activeConfig = {
      ...activeConfig,
      ...body
    };
    cjClient.updateConfig(activeConfig);

    return NextResponse.json({
      success: true,
      message: 'CJ Dropshipping configuration updated successfully',
      config: activeConfig
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

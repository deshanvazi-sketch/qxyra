import { NextResponse } from 'next/server';
import { cjClient } from '@/lib/cj-dropshipping';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';

    const results = await cjClient.searchProducts(query, category);

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch CJ products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cjItem, categoryId, customMarkup } = body;

    if (!cjItem) {
      return NextResponse.json(
        { success: false, error: 'Missing cjItem payload' },
        { status: 400 }
      );
    }

    const convertedProduct = cjClient.convertCJItemToQxyraProduct(cjItem, categoryId || 'c1');

    return NextResponse.json({
      success: true,
      message: `Product "${convertedProduct.name}" imported to Qxyra catalog successfully!`,
      product: convertedProduct
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to import CJ product' },
      { status: 500 }
    );
  }
}

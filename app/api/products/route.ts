import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/woo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Собираем параметры из URL
  const params: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  try {
    const products = await getProducts(params);
    return NextResponse.json(products);
  } catch (error) {
    console.error('API Products Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

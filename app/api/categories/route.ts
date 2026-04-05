import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/woo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const params: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  try {
    const categories = await getCategories(params);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('API Categories Error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

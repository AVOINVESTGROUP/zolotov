import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/woo';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(`API Single Product Error (${slug}):`, error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

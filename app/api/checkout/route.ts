import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
    const wpUrl = process.env.NEXT_PUBLIC_WP_URL;

    if (!consumerKey || !consumerSecret || !wpUrl) {
      console.error('Missing WooCommerce credentials in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Создаем заказ в WooCommerce
    const response = await axios.post(
      `${wpUrl}/wp-json/wc/v3/orders`,
      body,
      {
        params: {
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
        },
      }
    );

    return NextResponse.json({ 
      success: true, 
      orderId: response.data.id 
    });
  } catch (error: any) {
    console.error('Order creation failed:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.response?.data },
      { status: 500 }
    );
  }
}

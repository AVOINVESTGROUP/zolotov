import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/woo';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total } = body;

    // Валидация
    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    // Формирование структуры для WooCommerce
    const orderData = {
      payment_method: 'cod', // Cash on Delivery (для начала)
      payment_method_title: 'Cash on Delivery',
      set_paid: false,
      billing: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        address_1: customer.address,
        city: customer.city || 'Dubai',
        country: 'AE', // United Arab Emirates
        email: customer.email,
        phone: customer.phone,
      },
      shipping: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        address_1: customer.address,
        city: customer.city || 'Dubai',
        country: 'AE',
      },
      line_items: items.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      meta_data: [
        {
          key: '_whatsapp_number',
          value: customer.whatsapp,
        },
        {
          key: '_checkout_source',
          value: 'Next.js Headless Store',
        }
      ],
      customer_note: `WhatsApp: ${customer.whatsapp}`,
    };

    const order = await createOrder(orderData);

    return NextResponse.json({ 
      success: true, 
      orderId: order.id, 
      orderNumber: order.number 
    });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' }, 
      { status: 500 }
    );
  }
}

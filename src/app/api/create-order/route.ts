import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const key = process.env.WC_CONSUMER_KEY;
const secret = process.env.WC_CONSUMER_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer } = body;

    // Preparamos los ítems para la API de WooCommerce v3
    const line_items = items.map((i: any) => ({
      product_id: i.product.id,
      quantity: i.quantity,
    }));

    const orderData = {
      payment_method: "cod", // Pago contra entrega / manual (WhatsApp)
      payment_method_title: "Cotización por WhatsApp",
      set_paid: false,
      billing: {
        first_name: customer?.name || "Cliente WhatsApp",
        email: customer?.email || "cliente@whatsapp.com",
        phone: customer?.phone || "",
      },
      line_items,
    };

    const endpoint = `${url}/wp-json/wc/v3/orders?consumer_key=${key}&consumer_secret=${secret}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al crear la orden en WooCommerce");
    }

    const order = await res.json();

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error("Error creating WooCommerce order:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
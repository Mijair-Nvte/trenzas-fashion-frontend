const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const key = process.env.WC_CONSUMER_KEY;
const secret = process.env.WC_CONSUMER_SECRET;

export async function getProducts(query = "") {
  // WooCommerce REST API v3 endpoint (añadimos &${query} al final)
  const endpoint = `${url}/wp-json/wc/v3/products?consumer_key=${key}&consumer_secret=${secret}&${query}`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 60 } }); // Revalida caché cada 60 segundos
    if (!res.ok) throw new Error("Error al obtener productos de WooCommerce");
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("WooCommerce API Error:", error);
    return [];
  }
}
import { getProducts } from "@/lib/woocommerce";
import HomePageClient from "@/app/HomePageClient";

export default async function HomePage() {
  // Obtenemos los productos desde la API de WooCommerce
  const wooProducts = await getProducts();

  // Mapeamos los datos al formato exacto que necesita tu frontend
  const products = wooProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price) || 0,
    category: p.categories && p.categories.length > 0 ? p.categories[0].slug : "sin-categoria",
    image: p.images && p.images.length > 0 ? p.images[0].src : "/placeholder.jpg",
    description: p.short_description ? p.short_description.replace(/(<([^>]+)>)/gi, "") : "", // Limpia etiquetas HTML de WP
  }));

  // Seleccionamos solo los 8 primeros para la sección de Destacados
  const featuredProducts = products.slice(0, 8);

  return <HomePageClient featuredProducts={featuredProducts} />;
}
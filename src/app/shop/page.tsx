import { getProducts } from "@/lib/woocommerce";
import ShopClient from "@/app/shop/ShopClient";

export default async function ShopPage() {
  // Solicitamos hasta 100 productos para traer el catálogo completo
  const wooProducts = await getProducts("per_page=100");

  const products = wooProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price) || 0,
    category: p.categories && p.categories.length > 0 ? p.categories[0].name : "General",
    image: p.images && p.images.length > 0 ? p.images[0].src : "/placeholder.jpg",
    description: p.short_description ? p.short_description.replace(/(<([^>]+)>)/gi, "") : "",
  }));

  // Extraemos las categorías reales y especificamos que es un string[]
  const categoriesMap = Array.from(new Set(products.map((p: any) => p.category))) as string[];

  return <ShopClient products={products} categories={categoriesMap} />;
}
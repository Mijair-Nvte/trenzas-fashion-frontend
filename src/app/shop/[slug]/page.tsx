import { notFound } from "next/navigation";
import { getProducts } from "@/lib/woocommerce";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  const wooProducts = await getProducts("per_page=100");
  return wooProducts.map((product: any) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wooProducts = await getProducts("per_page=100");
  
  const wooProduct = wooProducts.find((p: any) => p.slug === slug);

  if (!wooProduct) {
    notFound();
  }

  // Mapear el producto actual y extraer la galería completa de WooCommerce
  const product = {
    id: wooProduct.id,
    name: wooProduct.name,
    slug: wooProduct.slug,
    price: Number(wooProduct.price) || 0,
    category: wooProduct.categories && wooProduct.categories.length > 0 ? wooProduct.categories[0].name : "General",
    image: wooProduct.images && wooProduct.images.length > 0 ? wooProduct.images[0].src : "/placeholder.jpg",
    gallery: wooProduct.images ? wooProduct.images.map((img: any) => img.src) : [],
    description: wooProduct.description ? wooProduct.description.replace(/(<([^>]+)>)/gi, "") : "",
  };

  // Mapear todos los productos para los "relacionados"
  const allProducts = wooProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price) || 0,
    category: p.categories && p.categories.length > 0 ? p.categories[0].name : "General",
    image: p.images && p.images.length > 0 ? p.images[0].src : "/placeholder.jpg",
    gallery: p.images ? p.images.map((img: any) => img.src) : [],
    description: p.short_description ? p.short_description.replace(/(<([^>]+)>)/gi, "") : "",
  }));

  return <ProductDetailClient product={product} allProducts={allProducts} />;
}
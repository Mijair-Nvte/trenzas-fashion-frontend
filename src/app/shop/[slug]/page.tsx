import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import ProductDetailClient from "@/app/shop/[slug]/ProductDetailClient";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

const products = productsData as Product[];

// Genera las rutas estáticas en el build (Soluciona el error prerender-dynamic)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // En Server Components de Next 15, params se resuelve con await
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
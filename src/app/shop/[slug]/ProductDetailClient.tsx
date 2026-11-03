"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import productsData from "@/data/products.json";

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

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  // Mini galería simple: imagen principal + 3 miniaturas
  const images = [
    product.image,
    product.image.replace("600x600", "600x600/262626"),
    product.image.replace("600x600", "600x600/333333"),
    product.image.replace("600x600", "600x600/404040"),
  ];
  const [selected, setSelected] = useState(0);

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setCartOpen(true);
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black transition-colors">Tienda</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Contenido del Producto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-16">
              {images.map((img, i) => (
                <button
                  key={i}
                  id={`thumb-${i}`}
                  onClick={() => setSelected(i)}
                  className={`relative aspect-square w-16 border-2 overflow-hidden transition-all ${
                    selected === i ? "border-black" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 relative aspect-square bg-gray-100">
              <Image
                src={images[selected]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              {product.category.replace(/-/g, " ")}
            </span>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-black mb-6">${product.price}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Selector de cantidad */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs uppercase tracking-wide font-medium">Cantidad</span>
              <div className="flex items-center border border-gray-300">
                <button
                  id="qty-minus"
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 py-2 text-sm font-medium border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  id="qty-plus"
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              id="add-to-cart-btn"
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2 w-full h-14 uppercase tracking-widest text-sm font-bold transition-all ${
                added
                  ? "bg-gray-800 text-white"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {added ? "¡Agregado al carrito!" : "Agregar al carrito"}
            </button>

            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mt-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Seguir comprando
            </Link>
          </div>
        </div>

        {/* Productos Relacionados */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">
              También te puede gustar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  className="bg-white group"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold line-clamp-1">{p.name}</p>
                    <p className="text-sm font-black">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
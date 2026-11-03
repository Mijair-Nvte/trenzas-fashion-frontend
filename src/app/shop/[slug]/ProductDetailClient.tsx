"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Plus, Minus, X, ZoomIn } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  gallery?: string[];
  description: string;
};

export default function ProductDetailClient({ product, allProducts }: { product: Product; allProducts: Product[] }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  // Usar la galería real de WooCommerce o por defecto la imagen principal
  const images =
    product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const [selected, setSelected] = useState(0);

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setCartOpen(true);
  }

  // Filtrar productos relacionados por la misma categoría
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 min-w-0">
            <Link href="/" className="hover:text-black transition-colors shrink-0">Inicio</Link>
            <span className="shrink-0">/</span>
            <Link href="/shop" className="hover:text-black transition-colors shrink-0">Tienda</Link>
            <span className="shrink-0">/</span>
            <span className="text-black truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Contenido del Producto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">

          {/* Columna Izquierda: Galería de imágenes */}
          <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 w-full min-w-0 lg:sticky lg:top-24">
            {images.length > 1 && (
              <div className="flex md:flex-col gap-2 md:w-20 md:flex-shrink-0 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    id={`thumb-${i}`}
                    onClick={() => setSelected(i)}
                    className={`relative aspect-square w-16 sm:w-20 md:w-full flex-shrink-0 border-2 overflow-hidden bg-white transition-all ${
                      selected === i ? "border-black" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Imagen Principal con opción de Zoom al hacer clic */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative aspect-square bg-white w-full md:flex-1 min-w-0 overflow-hidden border border-gray-200 cursor-zoom-in group"
            >
              <Image
                src={images[selected] || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 bg-black/75 text-white p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Columna Derecha: Información del producto */}
          <div className="flex flex-col w-full min-w-0">
            <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 sm:mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter uppercase mb-3 sm:mb-4 leading-tight break-words">
              {product.name}
            </h1>
            <p className="text-2xl sm:text-3xl font-black mb-5 sm:mb-6">${product.price}</p>

            {/* Descripción (WooCommerce devuelve HTML) */}
            {product.description && (
              <div
                className="text-gray-600 text-sm leading-relaxed mb-6 sm:mb-8 break-words
                  [&_p]:mb-3 [&_p:last-child]:mb-0
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                  [&_li]:mb-1
                  [&_strong]:text-black [&_strong]:font-semibold
                  [&_a]:underline [&_a]:text-black
                  [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-black [&_h2]:mb-2
                  [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-black [&_h3]:mb-2
                  [&_img]:max-w-full [&_img]:h-auto
                  [&_table]:block [&_table]:overflow-x-auto [&_table]:max-w-full"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Selector de cantidad */}
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <span className="text-xs uppercase tracking-wide font-medium">Cantidad</span>
              <div className="flex items-center border border-gray-300">
                <button
                  id="qty-minus"
                  type="button"
                  aria-label="Disminuir cantidad"
                  className="px-3 py-2.5 hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 py-2 text-sm font-medium border-x border-gray-300 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  id="qty-plus"
                  type="button"
                  aria-label="Aumentar cantidad"
                  className="px-3 py-2.5 hover:bg-gray-100 transition-colors"
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
              className={`flex items-center justify-center gap-2 w-full h-12 sm:h-14 uppercase tracking-widest text-xs sm:text-sm font-bold transition-all ${
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
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mt-5 sm:mt-6 self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Seguir comprando
            </Link>
          </div>
        </div>

        {/* Modal de Imagen Ampliada (Lightbox) */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 sm:p-3 rounded-full transition-colors z-50"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <div
              className="relative w-full max-w-4xl h-[75vh] sm:h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selected] || product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        )}

        {/* Productos Relacionados */}
        {related.length > 0 && (
          <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-6 sm:mb-8">
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
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-2 sm:p-3">
                    <p className="text-xs sm:text-sm font-semibold line-clamp-1">{p.name}</p>
                    <p className="text-xs sm:text-sm font-black">${p.price}</p>
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
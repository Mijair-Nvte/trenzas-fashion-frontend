"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
const CATEGORIES = ["trenzas", "pelucas-afro", "extensiones"];
const MIN_PRICE = 0;
const MAX_PRICE = 500;
const PER_PAGE = 12;

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  return (
    <div className="bg-white group flex flex-col border border-gray-100 hover:border-gray-300 transition-colors">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-[10px] uppercase tracking-widest text-gray-400">
          {product.category.replace("-", " ")}
        </span>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-tight hover:underline line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-black">${product.price}</p>
        <button
          className="mt-auto border border-black text-black hover:bg-black hover:text-white text-xs uppercase tracking-wide py-2 px-3 flex items-center justify-center gap-1 transition-colors"
          onClick={() => {
            addItem(product);
            setCartOpen(true);
          }}
        >
          <ShoppingCart className="h-3 w-3" />
          Agregar
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catOk =
        selectedCats.length === 0 || selectedCats.includes(p.category);
      const priceOk = p.price <= maxPrice;
      return catOk && priceOk;
    });
  }, [selectedCats, maxPrice]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleCat(cat: string) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setPage(1);
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxPrice(Number(e.target.value));
    setPage(1);
  }

  const Sidebar = () => (
    <aside className="flex flex-col gap-8">
      {/* Price */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
          Precio máximo
        </h3>
        <input
          id="price-slider"
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={10}
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-black"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span className="font-bold text-black">${maxPrice}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
          Categorías
        </h3>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCats.includes(cat)}
                onCheckedChange={() => toggleCat(cat)}
                className="border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label
                htmlFor={`cat-${cat}`}
                className="text-sm cursor-pointer capitalize"
              >
                {cat.replace("-", " ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      {(selectedCats.length > 0 || maxPrice < MAX_PRICE) && (
        <button
          onClick={() => {
            setSelectedCats([]);
            setMaxPrice(MAX_PRICE);
            setPage(1);
          }}
          className="text-xs uppercase tracking-wide text-gray-500 hover:text-black underline self-start"
        >
          Limpiar filtros
        </button>
      )}
    </aside>
  );

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-1">
            Tienda
          </p>
          <h1 className="text-5xl font-black uppercase tracking-tighter">Colección</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle + count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {filtered.length} productos
              </p>
              <button
                className="lg:hidden flex items-center gap-2 text-sm font-medium border border-black px-3 py-1.5"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </button>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
                <div
                  className="absolute left-0 top-0 h-full w-72 bg-white p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between mb-6">
                    <span className="font-bold uppercase text-sm">Filtros</span>
                    <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
                  </div>
                  <Sidebar />
                </div>
              </div>
            )}

            {/* Product grid */}
            {paginated.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No hay productos con esos filtros.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200">
                {paginated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm border border-gray-300 disabled:opacity-40 hover:border-black transition-colors"
                >
                  ← Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 text-sm border transition-colors ${
                      n === page
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm border border-gray-300 disabled:opacity-40 hover:border-black transition-colors"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

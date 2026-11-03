"use client";

import { useState } from "react";
import Image from "next/image";
import galleryData from "@/data/gallery.json";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

type GalleryCategory = {
  category: string;
  title: string;
  images: GalleryImage[];
};

export function GallerySection() {
  const [active, setActive] = useState("todos");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = galleryData as GalleryCategory[];

  // Recopilar todas las imágenes o filtrar según la categoría seleccionada
  const allImages = categories.flatMap((cat) =>
    cat.images.map((img) => ({ ...img, category: cat.category }))
  );

  const filtered =
    active === "todos"
      ? allImages
      : allImages.filter((img) => img.category === active);

  return (
    <section id="gallery" className="py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Galería</p>
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-8">
          Nuestro trabajo
        </h2>

        {/* Botones de filtro dinámicos basados en el JSON agrupado */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActive("todos")}
            className={`px-4 py-1.5 text-xs uppercase tracking-wide font-medium border transition-colors ${
              active === "todos"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActive(cat.category)}
              className={`px-4 py-1.5 text-xs uppercase tracking-wide font-medium border transition-colors ${
                active === cat.category
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {filtered.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="aspect-square relative overflow-hidden bg-gray-100 cursor-pointer group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase tracking-widest font-bold">
                Ampliar
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Visor expandido */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              className="absolute -top-10 right-0 text-white text-sm font-bold uppercase tracking-widest hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ✕ Cerrar
            </button>
            <div className="relative w-full h-[75vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white text-xs tracking-widest uppercase mt-4">
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
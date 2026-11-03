"use client";

import Image from "next/image";

const sectionTwoItems = [
  {
    title: "TRENZAS",
    subtitle: "African Styles & Kanekalon",
    description: "Extensiones para trenzas africanas, kanekalon y sintéticas económicas de alta calidad y máxima duración.",
    image: "/trenzas-braids/9.jpeg",
  },
  {
    title: "PELUCAS AFRO",
    subtitle: "Natural & Synthetic",
    description: "Pelucas Afro, pelucas de cabello sintético y de cabello humano con acabados sofisticados y ultra naturales.",
    image: "/recursos/1.jpg",
  },
  {
    title: "EXTENSIONES",
    subtitle: "Crochet & Rastas",
    description: "Extensiones curly para aplicación método crochet, extensiones rastas y rizos en largos desde 8 hasta 32 pulgadas.",
    image: "/recursos/2.webp",
  },
];

export function SectionTwo() {
  return (
    <section className="py-16 bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid de tarjetas informativas directas sin texto de sección */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {sectionTwoItems.map((item, index) => (
            <article
              key={index}
              className="relative group overflow-hidden bg-zinc-900 min-h-[380px] flex flex-col justify-end p-8 border border-zinc-800 transition-all duration-500"
            >
              {/* Imagen de fondo con opacidad y efecto zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={`Especialistas en ${item.title} - Trenzas Fashion`}
                  fill
                  className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Degradado oscuro para legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30" />
              </div>

              {/* Contenido */}
              <div className="relative z-10 flex flex-col justify-end h-full">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-2">
                  {item.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {item.description}
                </p>
                {/* Línea decorativa inferior */}
                <div className="w-12 h-[2px] bg-white mt-6 group-hover:w-full transition-all duration-500" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
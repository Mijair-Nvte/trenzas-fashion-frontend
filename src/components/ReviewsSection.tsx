"use client";

import Image from "next/image";
import reviewsData from "@/data/reviews.json";

type Review = {
  name: string;
  role: string;
  text: string;
  stars: number;
  avatar: string;
};

export function ReviewsSection() {
  const reviews = reviewsData as Review[];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Reseñas</p>
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-12">
          Lo que dicen nuestras clientas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 flex flex-col gap-4 justify-between">
              <div className="flex flex-col gap-4">
                <p className="text-yellow-400 text-sm">{"★".repeat(r.stars)}</p>
                <p className="text-gray-700 text-sm leading-relaxed">"{r.text}"</p>
              </div>

              {/* Contenedor del Avatar y Nombre */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide">{r.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    image: "/recursos/hero-1.png",
    subtitle: "Arte y estilo en cada diseño",
    titlePrimary: "Tu cabello,",
    titleSecondary: "tu poder.",
    description: "Especialistas en trenzas africanas, pelucas afro y extensiones de cabello humano. Belleza auténtica con técnica impecable.",
  },
  {
    image: "/recursos/hero-2.png",
    subtitle: "Tendencia y elegancia urbana",
    titlePrimary: "Transforma",
    titleSecondary: "tu estilo.",
    description: "Descubre nuestra colección exclusiva de extensiones y productos profesionales diseñados para realzar tu personalidad.",
  },
  {
    image: "/recursos/hero-3.webp",
    subtitle: "Profesionalismo garantizado",
    titlePrimary: "Calidad que",
    titleSecondary: "se nota.",
    description: "Eleva tu look diario con acabados de alta gama, texturas naturales y la asesoría de expertos en estilismo capilar.",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative bg-black text-white min-h-[90vh] flex items-center overflow-hidden">
      {/* ── Fondo con Carrusel de Imágenes y Transición Fade ── */}
      {heroSlides.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={item.image}
            alt={item.titlePrimary}
            fill
            priority={index === 0}
            className="object-cover object-center scale-105"
          />
          {/* Overlay oscuro degradado para contraste profesional */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </div>
      ))}

      {/* ── Contenido del Hero ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl transition-all duration-700 transform translate-y-0">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-300 mb-6 font-semibold">
            {slide.subtitle}
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tighter uppercase mb-8">
            {slide.titlePrimary}
            <br />
            <span className="text-gray-400">{slide.titleSecondary}</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-normal">
            {slide.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 uppercase tracking-widest font-bold px-8 h-12 text-xs transition-colors shadow-lg"
            >
              Ver colección <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center border border-white/70 text-white hover:bg-white hover:text-black uppercase tracking-widest font-bold px-8 h-12 text-xs transition-colors backdrop-blur-sm"
            >
              Nuestros servicios
            </Link>
          </div>
        </div>
      </div>

      {/* ── Controles de Navegación del Slider ── */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all rounded-full ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
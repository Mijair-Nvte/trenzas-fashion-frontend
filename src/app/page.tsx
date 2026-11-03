"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, ArrowRight, Check, Clock, Phone, Mail,MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import products from "@/data/products.json";
import servicesData from "@/data/services.json";
import { GallerySection } from "@/components/GallerySection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SectionTwo } from "@/components/SectionTwo";
import { HeroSection } from "@/components/HeroSection";

// ── Types ──────────────────────────────────────────────────────────────────
type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

type Service = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

const services = servicesData as Service[];

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

// ── Static data ────────────────────────────────────────────────────────────
const FEATURED = (products as Product[]).slice(0, 8);
const GALLERY_CATEGORIES = [
  "todos",
  "trenzas",
  "rastas",
  "pelucas",
  "extensiones",
  "keratina",
  "pestanas",
];





// Tu número de WhatsApp configurado
const WHATSAPP_NUMBER = "529842072150";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
          Servicios
        </h2>
        <p className="text-4xl font-black uppercase tracking-tighter text-white mb-12 max-w-xl">
          Lo que hacemos por ti
        </p>

        {/* Grid de servicios simplificado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800">
          {services.map((svc) => {
            // Pre-armamos el mensaje de WhatsApp para que sea automático
            const whatsappMessage = encodeURIComponent(
              `Hola, me interesa solicitar una cotización o más información sobre el servicio de: ${svc.name}`
            );
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

            return (
              <div key={svc.id} className="bg-zinc-900 p-8 flex flex-col gap-4 border border-zinc-800 transition-colors hover:bg-zinc-800/50">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {svc.name}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  {svc.description}
                </p>

                {/* Botón de acción directo a WhatsApp */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-gray-200 transition-colors py-3 px-4 text-xs font-bold uppercase tracking-widest"
                >
                  <MessageCircle className="h-4 w-4" />
                  Cotizar por WhatsApp
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Featured Products ──────────────────────────────────────────────────────
function FeaturedProductsSection() {
  return (
    <section className="py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
              Destacados
            </p>
            <h2 className="text-4xl font-black tracking-tighter uppercase">
              Productos populares
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium uppercase tracking-wide text-gray-500 hover:text-black transition-colors flex items-center gap-1"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  return (
    <div className="bg-white group flex flex-col">
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
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-tight hover:underline line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-black">${product.price}</p>
        <Button
          size="sm"
          variant="outline"
          className="mt-auto border-black text-black hover:bg-black hover:text-white text-xs uppercase tracking-wide rounded-none"
          onClick={() => {
            addItem(product);
            setCartOpen(true);
          }}
        >
          <ShoppingCart className="h-3 w-3 mr-1" />
          Agregar
        </Button>
      </div>
    </div>
  );
}





// ── Íconos SVG de marcas (lucide no los incluye) ───────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

// ── Datos de contacto ──────────────────────────────────────────────────────
const PHONE_DISPLAY = "984 207 2150";
const PHONE_TEL = "+529842072150";
const EMAIL = "trenzasfachion@gmail.com";
const WHATSAPP_DISPLAY = "98 4207 2150";
const WHATSAPP_URL =
  "https://wa.me/529842072150?text=" +
  encodeURIComponent("Hola, me gustaría más información sobre sus servicios.");

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Trenzasfashion.lei?mibextid=JRoKGi",
    Icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/trenzasfashion.le?igsh=OWwxYWx0YXJ5YTV4",
    Icon: InstagramIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@ilovekiss2020?_t=8kM5jXw7Nm2&_r=1",
    Icon: TikTokIcon,
  },
  {
    name: "WhatsApp",
    href: WHATSAPP_URL,
    Icon: WhatsAppIcon,
  },
];
// ── Contact ────────────────────────────────────────────────────────────────
function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Contacto</p>
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-8">
              Escríbenos
            </h2>
            {sent ? (
              <div className="border border-black p-8 text-center">
                <Check className="h-8 w-8 mx-auto mb-4" />
                <p className="font-semibold">¡Mensaje enviado!</p>
                <p className="text-gray-500 text-sm mt-1">Te contactamos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="text-xs uppercase tracking-wide font-medium block mb-1.5">
                    Nombre
                  </label>
                  <input
                    required
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Tu nombre"
                    id="contact-name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-xs uppercase tracking-wide font-medium block mb-1.5">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                    placeholder="tu@email.com"
                    id="contact-email"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-wide font-medium block mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                    id="contact-message"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-900 uppercase tracking-widest text-xs font-bold px-8 h-12 rounded-none w-full"
                >
                  Enviar mensaje
                </Button>
              </form>
            )}
          </div>

          {/* Map + datos */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 bg-gray-100 overflow-hidden min-h-[300px]">
             <iframe
  src="https://www.google.com/maps?cid=16139580609429434300&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0, minHeight: 300 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Mapa TrenzasFashion"
/>
            </div>

            <div className="bg-black text-white p-8 space-y-5">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-4 font-semibold hover:text-gray-300 transition-colors"
              >
                <Phone className="h-6 w-6 shrink-0" />
                {PHONE_DISPLAY}
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 font-semibold hover:text-gray-300 transition-colors break-all"
              >
                <Mail className="h-6 w-6 shrink-0" />
                {EMAIL}
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 font-semibold hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="h-6 w-6 shrink-0" />
                {WHATSAPP_DISPLAY}
              </a>

              <p className="flex items-center gap-4 text-sm text-gray-400">
                <Clock className="h-6 w-6 shrink-0" />
                Lun–Sáb: 9am – 7pm
              </p>

              {/* Redes sociales */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/20">
                <span className="text-xs uppercase tracking-[0.25em] text-gray-400 mr-2">
                  Síguenos
                </span>
                {SOCIALS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="h-10 w-10 flex items-center justify-center border border-white/30 hover:bg-white hover:text-black transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ── Page ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionTwo />
      <FeaturedProductsSection />
      <ServicesSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}

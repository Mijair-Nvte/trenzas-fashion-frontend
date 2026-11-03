"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CartSheet from "./CartSheet";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/shop", label: "Tienda" },
  { href: "/#services", label: "Servicios" },
  { href: "/#gallery", label: "Galería" },
  { href: "/#contact", label: "Contacto" },
];

export default function Header() {
  const { setCartOpen, isCartOpen, totalItems } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = totalItems();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group py-2">
              <div className="relative h-12 w-36 sm:h-14 sm:w-44 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo/logo.jpg"
                  alt="Trenzas Fashion Hair Stylist"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-bold text-gray-800 hover:text-black transition-colors uppercase tracking-[0.2em] relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <Button
                variant="outline"
                size="icon"
                className="relative border-black rounded-full h-11 w-11 hover:bg-black hover:text-white transition-colors duration-300"
                onClick={() => setCartOpen(true)}
                aria-label="Abrir carrito"
                id="cart-button"
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-bold border-2 border-white">
                    {count}
                  </Badge>
                )}
              </Button>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full h-11 w-11 hover:bg-gray-100"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menú"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-[0.15em] text-gray-800 hover:text-black transition-colors border-b border-gray-50 pb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartSheet open={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
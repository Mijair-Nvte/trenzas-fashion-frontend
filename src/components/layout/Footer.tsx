"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          {/* Brand */}
          <div>
            <p className="text-2xl font-black tracking-tighter uppercase mb-4">
              Trenzas<span className="text-gray-400">Fashion</span>
            </p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Especialistas en trenzas, pelucas afro y extensiones. Arte en cada hebra, elegancia en cada peinado.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Navegación</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/shop", label: "Tienda" },
                { href: "/#services", label: "Servicios" },
                { href: "/#gallery", label: "Galería" },
                { href: "/checkout", label: "Checkout" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>📍 Ciudad, País</li>
              <li>📱 +1 (555) 000-0000</li>
              <li>✉️ info@trenzasfashion.com</li>
              <li>🕐 Lun–Sáb: 9am – 7pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} TrenzasFashion. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
              aria-label="Facebook"
            >
              FB
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
              aria-label="Twitter"
            >
              TW
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

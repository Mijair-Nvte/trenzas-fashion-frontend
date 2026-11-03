"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { useState } from "react";

// ── Número de WhatsApp del negocio ─────────────────────────────────────────
// +52 984 207 2150  →  sin espacios ni '+'
const WHATSAPP_NUMBER = "529842072150";

// ── Esquema de validación ──────────────────────────────────────────────────
const schema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  address: z
    .string()
    .min(10, "Ingresa una dirección completa (mínimo 10 caracteres)"),
  phone: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .regex(/^[\d\s+\-()]+$/, "Solo se permiten números y caracteres: + - ( )"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// ── Generador del mensaje de WhatsApp ──────────────────────────────────────
function buildWhatsAppMessage(data: FormData, items: ReturnType<typeof useCartStore.getState>["items"], total: number): string {
  const lines: string[] = [
    "🛒 *Nuevo Pedido – TrenzasFashion*",
    "─────────────────────",
    "📋 *Productos:*",
    ...items.map(
      ({ product, quantity }) =>
        `  • ${quantity}x ${product.name} – $${(product.price * quantity).toFixed(2)}`
    ),
    "─────────────────────",
    `💰 *Total: $${total.toFixed(2)}*`,
    "─────────────────────",
    `👤 *Cliente:* ${data.name}`,
    `📍 *Dirección:* ${data.address}`,
    `📱 *Teléfono:* ${data.phone}`,
  ];

  if (data.notes?.trim()) {
    lines.push(`📝 *Notas:* ${data.notes.trim()}`);
  }

  lines.push("─────────────────────");
  lines.push("Pedido realizado desde TrenzasFashion 🌟");

  return lines.join("\n");
}

// ── Componente principal ───────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, clearCart, totalPrice, removeItem } = useCartStore();
  const total = totalPrice();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    if (items.length === 0) return;
    setSubmitting(true);

    try {
      // 1. Guardar pedido como backup en orders.txt
      const order = {
        timestamp: new Date().toISOString(),
        customer: data,
        items: items.map(({ product, quantity }) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          subtotal: product.price * quantity,
        })),
        total,
      };

      await fetch("/api/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch {
      // El backup es opcional; no bloqueamos si falla
      console.warn("No se pudo guardar el pedido en el servidor.");
    }

    // 2. Construir URL de WhatsApp y abrir conversación
    const message = buildWhatsAppMessage(data, items, total);
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    // Abrir en nueva pestaña
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // 3. Limpiar carrito
    clearCart();
    setSubmitting(false);
  }

  // Carrito vacío
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag className="h-20 w-20 text-gray-200" />
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-500 text-sm">Agrega productos antes de continuar.</p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la página */}
      <div className="border-b border-gray-200 bg-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-1">Finalizar compra</p>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Checkout</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start"
        >
          {/* ── Columna izquierda: formulario ────────────────────────────── */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 p-6 space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-100 pb-4">
                Datos de entrega
              </h2>

              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium uppercase tracking-wide mb-1.5"
                >
                  Nombre completo *
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${
                    errors.name ? "border-red-400" : "border-gray-300 focus:border-black"
                  }`}
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-xs font-medium uppercase tracking-wide mb-1.5"
                >
                  Dirección completa *
                </label>
                <input
                  id="address"
                  {...register("address")}
                  className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${
                    errors.address ? "border-red-400" : "border-gray-300 focus:border-black"
                  }`}
                  placeholder="Calle, número, colonia, ciudad"
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium uppercase tracking-wide mb-1.5"
                >
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${
                    errors.phone ? "border-red-400" : "border-gray-300 focus:border-black"
                  }`}
                  placeholder="+52 984 000 0000"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Notas */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-xs font-medium uppercase tracking-wide mb-1.5"
                >
                  Notas adicionales{" "}
                  <span className="text-gray-400 normal-case">(opcional)</span>
                </label>
                <textarea
                  id="notes"
                  {...register("notes")}
                  rows={4}
                  className="w-full border border-gray-300 focus:border-black px-4 py-3 text-sm focus:outline-none resize-none transition-colors"
                  placeholder="Color preferido, instrucciones especiales, horario para entrega…"
                />
              </div>
            </div>
          </div>

          {/* ── Columna derecha: resumen + CTA ──────────────────────────── */}
          <div className="space-y-4 lg:sticky lg:top-24">
            {/* Resumen del carrito */}
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold uppercase tracking-widest">
                  Resumen del pedido
                </h2>
              </div>

              <ul className="divide-y divide-gray-100">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-3 px-6 py-4 items-center">
                    <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-2">{product.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {quantity} × ${product.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-xs font-black">
                        ${(product.price * quantity).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest font-medium">Total</span>
                  <span className="text-xl font-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              id="whatsapp-submit-btn"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white h-14 text-sm font-bold uppercase tracking-widest transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              {submitting ? "Preparando pedido…" : "Enviar pedido por WhatsApp"}
            </button>

            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              Al hacer clic serás redirigido a WhatsApp con tu pedido pre-formateado.
              El número{" "}
              <strong className="text-gray-600">+52 984 207 2150</strong>{" "}
              recibirá tu solicitud.
            </p>

            <Link
              href="/shop"
              className="block text-center text-xs text-gray-400 hover:text-black underline transition-colors"
            >
              ← Seguir comprando
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

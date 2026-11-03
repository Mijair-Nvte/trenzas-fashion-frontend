"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";

type CartSheetProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartSheet({ open, onClose }: CartSheetProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-white border-l border-black p-0">
        <SheetHeader className="px-6 py-5 border-b border-gray-200">
          <SheetTitle className="text-lg font-black uppercase tracking-wide flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
            <ShoppingCart className="h-16 w-16 text-gray-200" />
            <p className="text-gray-500 text-sm">Tu carrito está vacío</p>
            <Link
              href="/shop"
              onClick={onClose}
              className="inline-flex items-center justify-center border border-black px-6 py-2 text-xs uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-colors"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 items-start">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 border border-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      ${product.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="border-gray-300"
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                        aria-label="Restar"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-6 text-center font-medium">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="border-gray-300"
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                        aria-label="Sumar"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-bold">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => removeItem(product.id)}
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-5 space-y-4">
              <Separator className="bg-gray-100" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium uppercase tracking-wide">Total</span>
                <span className="text-lg font-black">${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex items-center justify-center w-full bg-black text-white hover:bg-gray-900 uppercase tracking-widest text-xs font-bold h-12 transition-colors"
              >
                Ir al Checkout →
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

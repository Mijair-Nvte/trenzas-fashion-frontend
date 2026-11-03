import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Ruta al archivo de backup en la raíz del proyecto
const ORDERS_FILE = path.join(process.cwd(), "orders.txt");

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();

    // Formato de la línea: timestamp + JSON en una sola línea
    const line = JSON.stringify(order) + "\n";

    // Append al archivo (lo crea si no existe)
    fs.appendFileSync(ORDERS_FILE, line, "utf-8");

    return NextResponse.json(
      { success: true, message: "Pedido guardado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[save-order] Error al guardar el pedido:", error);
    return NextResponse.json(
      { success: false, message: "Error interno al guardar el pedido" },
      { status: 500 }
    );
  }
}

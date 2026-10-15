import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET() {
  try {
    // Jalankan query nyata ke database untuk memverifikasi koneksi aktif dan keep-alive
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "ok",
        app: "InvenSmart",
        timestamp: new Date().toISOString(),
        database: "connected",
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // Log di server tanpa membocorkan kredensial
    console.error("[HEALTH CHECK ERROR]", message);

    return NextResponse.json(
      {
        status: "degraded",
        app: "InvenSmart",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: "Koneksi database bermasalah",
      },
      { status: 503 },
    );
  }
}

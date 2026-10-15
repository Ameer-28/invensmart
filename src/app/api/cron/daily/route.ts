import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Dukungan maksimum Hobby/Pro untuk pekerjaan harian

function verifyCronAuth(authHeader: string | null, secret: string): boolean {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.slice(7);
  const tokenBuffer = Buffer.from(token);
  const secretBuffer = Buffer.from(secret);

  if (tokenBuffer.length !== secretBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(tokenBuffer, secretBuffer);
}

export async function GET(request: NextRequest) {
  // 1. Verifikasi header Authorization Bearer token CRON_SECRET secara timing-safe
  const authHeader = request.headers.get("authorization");

  if (!verifyCronAuth(authHeader, env.CRON_SECRET)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized: Invalid cron secret" },
      { status: 401 },
    );
  }

  const startTime = Date.now();
  const summary: Record<string, unknown> = {
    keepAlive: false,
    alertsBuilt: 0,
    forecastsGenerated: 0,
    logsCleaned: 0,
  };

  try {
    // 2. Keep-alive database (query nyata, mencegah Supabase free tier pause)
    await prisma.$queryRaw`SELECT 1`;
    summary.keepAlive = true;

    // Catatan: logika alert, forecast, dan cleanup log akan bertambah seiring penyelesaian fase terkait

    return NextResponse.json(
      {
        ok: true,
        message: "Daily cron job executed successfully",
        summary,
        durationMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[CRON DAILY ERROR]", message);

    return NextResponse.json(
      {
        ok: false,
        error: "Cron execution failed",
        summary,
        durationMs: Date.now() - startTime,
      },
      { status: 500 },
    );
  }
}

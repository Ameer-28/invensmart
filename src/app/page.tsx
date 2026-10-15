import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Sparkles,
  ShoppingBag,
  ChefHat,
  CheckCircle2,
  Clock,
  Database,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
            <Sparkles className="h-4 w-4" />
            GTNIC 2026 — Web Development
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            InvenSmart <span className="text-amber-600">(Anti-Mubazir)</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
            Sistem terintegrasi POS kasir, inventori bahan baku (FEFO),
            perhitungan HPP dinamis, dan estimasi produksi cerdas untuk menekan
            limbah UMKM kuliner.
          </p>
        </header>

        {/* Status Fondasi Phase 0 */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg text-amber-950">
                <CheckCircle2 className="h-5 w-5 text-amber-600" />
                Status Pengembangan: Fondasi Phase 0
              </CardTitle>
              <Badge
                variant="outline"
                className="border-amber-300 bg-amber-100 text-amber-900"
              >
                Phase 0 Verified
              </Badge>
            </div>
            <CardDescription className="text-amber-800">
              Kerangka Next.js App Router, PostgreSQL via Prisma, CI workflow,
              dan endpoint sistem telah aktif.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-white p-3 shadow-2xs">
              <Database className="h-4 w-4 shrink-0 text-emerald-600" />
              <div>
                <p className="font-medium text-slate-900">Koneksi Database</p>
                <p className="text-xs text-slate-500">
                  Prisma ORM & PostgreSQL
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-white p-3 shadow-2xs">
              <Clock className="h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <p className="font-medium text-slate-900">Keep-Alive Cron</p>
                <p className="text-xs text-slate-500">03:00 WIB (0 20 * * *)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-white p-3 shadow-2xs">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              <div>
                <p className="font-medium text-slate-900">Health Check</p>
                <p className="text-xs text-slate-500">/api/health (Dinamis)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fitur yang sedang disiapkan */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingBag className="h-5 w-5 text-amber-600" />
                  Kasir POS & Struk Digital
                </CardTitle>
                <StatusBadge status="neutral" label="Rencana Phase 3" />
              </div>
              <CardDescription>
                Antarmuka kasir tablet-first, kalkulasi ketersediaan bahan
                otomatis, dan struk publik WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-500">
                Modul POS dijadwalkan pada Phase 3 setelah implementasi
                autentikasi RBAC dan master data produk pada Phase 1.
              </p>
              <Button
                disabled
                variant="outline"
                className="w-full cursor-not-allowed opacity-60"
              >
                Akan Hadir di Phase 3
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ChefHat className="h-5 w-5 text-amber-600" />
                  Inventori FEFO & HPP
                </CardTitle>
                <StatusBadge status="warning" label="Antrean Phase 1-2" />
              </div>
              <CardDescription>
                Pelacakan batch bahan baku kedaluwarsa (FEFO) dan kalkulasi HPP
                otomatis per porsi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-500">
                Modul master data bahan & resep sedang dipersiapkan untuk Phase
                1, dilanjutkan pencatatan stok di Phase 2.
              </p>
              <Button
                disabled
                variant="outline"
                className="w-full cursor-not-allowed opacity-60"
              >
                Akan Hadir di Phase 1
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-8 text-center text-xs text-slate-500">
          InvenSmart &copy; 2026. Platform Efisiensi UMKM Kuliner — GTNIC 2026
          Web Development Competition.
        </footer>
      </div>
    </main>
  );
}

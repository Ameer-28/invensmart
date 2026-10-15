import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Money } from "@/components/shared/money";
import { Sparkles, ShoppingBag, ChefHat } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
            <Sparkles className="h-4 w-4" />
            GTNIC 2026 — InvenSmart
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Solusi <span className="text-amber-600">Anti-Mubazir</span> untuk UMKM Kuliner
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
            Sistem terintegrasi POS, inventori bahan baku metode FEFO, perhitungan HPP dinamis,
            dan rekomendasi produksi cerdas untuk menekan sisa dagangan.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingBag className="h-5 w-5 text-amber-600" />
                  Kasir POS & Struk Digital
                </CardTitle>
                <StatusBadge status="safe" label="Siap Pakai" />
              </div>
              <CardDescription>
                Desain tablet-first cepat (target sentuh 44px+), integrasi WhatsApp struk publik.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Contoh Menu: Roti Cokelat</span>
                <Money amount={12500} highlight />
              </div>
              <Button asChild className="w-full">
                <Link href="/pos">Buka POS Kasir</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ChefHat className="h-5 w-5 text-amber-600" />
                  Inventori & Produksi
                </CardTitle>
                <StatusBadge status="warning" label="Peringatan Stok" />
              </div>
              <CardDescription>
                Pelacakan batch kedaluwarsa (FEFO) dan rekomendasi produksi harian Newsvendor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Status Bahan Mentega</span>
                <span className="font-medium text-amber-700">Tersisa 1,2 kg (≤ 2 hari)</span>
              </div>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/dashboard">Lihat Dashboard Owner</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <footer className="text-center text-xs text-slate-500 pt-8 border-t border-slate-200">
          InvenSmart &copy; 2026. Dibuat untuk GTNIC 2026 — Web Development Competition.
        </footer>
      </div>
    </main>
  );
}

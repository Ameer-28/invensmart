# TODO.md — Pelacak Progres & Memori Proyek

> File ini adalah **memori kerja** AI dan tim. Baca di awal sesi, perbarui setiap selesai satu tugas (lihat `WORKFLOW.md` §5).

## Status Legend

| Tanda | Arti                                               |
| ----- | -------------------------------------------------- |
| `[ ]` | Todo                                               |
| `[/]` | In Progress (maksimal 2 tugas sekaligus per orang) |
| `[x]` | Done (memenuhi Definition of Done)                 |
| `[~]` | Blocked (tulis penyebab di bagian Blocked)         |
| `[-]` | Cancelled (tulis alasan di Decision Log)           |

## Status Saat Ini

- **Fase aktif:** Phase 0 — Setup & Registrasi (Selesai & Terverifikasi di Vercel + CI)
- **Fokus berikutnya:** T-010 → T-019 (Phase 1 — Fondasi & Master Data)
- **Terakhir diperbarui:** 15 Okt 2026 oleh AI Coding Agent
- **Tenggat kunci:** Daftar Gel. 3: 16 Okt · TM: 18 Okt · Kerja: 19 Okt–10 Nov · Submit: 10 Nov 23:59 WIB (target ≤ 18:00) · Final: 14 Nov

---

## 🔥 High Priority — Foundation & Core MVP (P0)

### Phase 0 — Setup (15–18 Okt)

- [ ] T-001 Konfirmasi pendaftaran GTNIC Gel. 3 **sebelum 16 Okt** (bukan kode)
- [ ] T-002 Hadiri Technical Meeting 18 Okt; catat ketentuan tambahan (template surat pernyataan, format form) → perbarui `PRD.md` Lampiran B
- [x] T-003 Init repo GitHub (akun pribadi, bukan organization), scaffold Next.js + TS strict, pnpm, ESLint/Prettier, `.nvmrc`
- [x] T-004 Tailwind + shadcn/ui, tema (warna hangat), layout dasar, komponen shared awal
- [x] T-005 Supabase + Prisma + `lib/env.ts` (validasi Zod diperketat) + `.env.example`
- [x] T-006 Deploy kerangka ke Vercel + `/api/health` + `/api/cron/daily` (keep-alive) + `CRON_SECRET`
- [x] T-007 CI GitHub Actions (lint, typecheck, test, build) (hijau di GitHub Actions run)

### Phase 1 — Fondasi & Master Data (19–21 Okt)

- [ ] T-010 Schema Prisma inti: User, StoreSettings, Ingredient, IngredientAlias, Supplier, Product, RecipeItem + migrasi
- [ ] T-011 Auth.js Credentials + bcrypt + sesi JWT + proteksi rute (FR-001)
- [ ] T-012 `requireRole()` / RBAC + tes (FR-002)
- [ ] T-013 Rate limit login via `LoginAttempt` (FR-001)
- [ ] T-014 App shell responsif (sidebar/topbar, navigasi per peran)
- [ ] T-015 CRUD Ingredient + konstanta konversi satuan (FR-010)
- [ ] T-016 CRUD Product (FR-011)
- [ ] T-017 Editor Recipe (FR-012)
- [ ] T-018 Domain `money.ts`, `units.ts`, `hpp.ts` + tes unit (FR-022)
- [ ] T-019 Tampilan HPP + margin + badge di daftar menu

### Phase 2 — Inventori (22–24 Okt)

- [ ] T-020 Schema: StockBatch, StockMovement, Purchase, PurchaseItem + migrasi CHECK `qtyRemaining >= 0`
- [ ] T-021 Domain `fefo.ts` + tes (termasuk batch kedaluwarsa & expiry null)
- [ ] T-022 Form pembelian manual → batch + update biaya + hitung ulang HPP (FR-020)
- [ ] T-023 Halaman stok per bahan/batch + status kedaluwarsa
- [ ] T-024 Perhitungan alert stok rendah/kedaluwarsa + badge dashboard (FR-023)

### Phase 3 — POS (25–28 Okt)

- [ ] T-030 Schema Sale, SaleItem + generator invoice aman konkurensi
- [ ] T-031 UI POS: grid, pencarian, keranjang (`useReducer`), tablet-first (FR-030)
- [ ] T-032 Perhitungan ketersediaan ("Habis") di server + UI (FR-031)
- [ ] T-033 Server Action checkout transaksional + idempotency key (FR-032)
- [ ] T-034 Pembayaran CASH/QRIS/TRANSFER + kembalian (FR-033)
- [ ] T-035 Struk digital `/r/[token]` + `wa.me` + CSS cetak (FR-034)
- [ ] T-036 Tes integrasi checkout: potong stok, stok kurang, konkurensi, double submit
- [ ] T-037 Seed v1: master data, resep, riwayat pembelian & penjualan 6 bulan, akun demo (FR-062)

### Phase 4 — Produksi & Dashboard (29 Okt–1 Nov)

- [ ] T-040 Schema ProductionRun, FinishedGoodsMovement + form produksi (FR-040)
- [ ] T-041 Tutup toko terpandu + DailyClosing/Item + penguncian (FR-041)
- [ ] T-042 Dashboard owner: KPI, grafik 7/30 hari, skeleton/empty state (FR-060)
- [ ] T-043 Seed v2: produksi, sisa, limbah, lonjakan harga, kejadian kehabisan

### Phase 5 — AI P0 (2–5 Nov)

- [ ] T-050 Adapter `AiProvider` + implementasi Gemini (`@google/genai`), timeout, `AiLog`, `AI_ENABLED` (FR-057)
- [ ] T-051 Endpoint baca nota + validasi file + `receiptSchema` + sanity check + kompres di klien (FR-050)
- [ ] T-052 Matcher bahan (alias → fuzzy) + layar review + konfirmasi + alias learning (FR-051)
- [ ] T-053 Domain `forecast.ts` (§5.3) + tes unit + `scripts/backtest.ts` (FR-052)
- [ ] T-054 Cron prediksi + kartu rekomendasi di halaman produksi/dashboard + alur terima (FR-052)
- [ ] T-055 Uji jalur fallback AI (mati, 429, JSON invalid, bukan nota)

### Phase 7 — Pengumpulan (9–10 Nov)

- [ ] T-060 README (setup, akun demo, env, arsitektur, cara menjalankan tes)
- [ ] T-061 Proposal PDF (≤ 15 hlm, TNR 12, spasi 1,5, margin kiri 4/lainnya 3 cm, logo GTNIC cover, diagram DB & arsitektur, screenshot, batasan, future development)
- [ ] T-062 Video demo 3–5 menit (perkenalan tim, masalah, solusi, demo alur utama + AI), unggah publik
- [ ] T-063 Surat Pernyataan Keaslian Karya
- [ ] T-064 Verifikasi: website live, repo publik, uji Chrome/Firefox/Safari/Edge, `pg_dump`
- [ ] T-065 Submit Google Form (≤ 10 Nov 18:00 WIB); nama berkas `GTNIC2026_WebDev_NamaTim.pdf`

---

## 🟡 Medium Priority — Fitur Sekunder & Polish UX (P1)

- [ ] T-100 Manajemen pengguna (buat/nonaktifkan kasir, reset password) (FR-003)
- [ ] T-101 Promo sisa: domain `promo.ts` + teks AI + terapkan di POS (FR-036, FR-054)
- [ ] T-102 Ringkasan tutup toko AI + template fallback (FR-055)
- [ ] T-103 Draf restock supplier + `wa.me` (FR-025)
- [ ] T-104 Alert lonjakan harga bahan + menu terdampak (FR-026)
- [ ] T-105 Void transaksi (OWNER) + pemulihan stok (FR-035)
- [ ] T-106 AuditLog untuk aksi sensitif
- [ ] T-107 Laporan penjualan/margin/limbah + ekspor CSV (FR-061)
- [ ] T-108 Penyesuaian stok dengan alasan (FR-024)
- [ ] T-109 Deteksi selisih saat tutup toko (FR-042)
- [ ] T-110 Penjelasan prediksi AI + template (FR-053)
- [ ] T-111 StoreSettings UI (FR-013)
- [ ] T-112 Polish UX: skeleton, toast, empty state, error boundary, pesan validasi Indonesia
- [ ] T-113 Security hardening: header CSP dll., cookie flags, `pnpm audit`, review `SKILL.md §2`
- [ ] T-114 QA responsif (360/768/1280) + 4 peramban
- [ ] T-115 Pass aksesibilitas dasar (kontras, label, fokus)
- [ ] T-116 Skrip pitching + rekaman cadangan demo

---

## 🟢 Low Priority — Technical Debt, Optimasi & Nice-to-Have (P2)

- [ ] T-200 Draf resep AI dari nama menu (FR-056)
- [ ] T-201 Poin loyalitas by nomor HP + layar antrean (FR-037)
- [ ] T-202 Stock opname bahan (FR-043)
- [ ] T-203 Saran menu spesial dari bahan hampir kedaluwarsa
- [ ] T-204 Ekspor laporan PDF
- [ ] T-205 Alur reopen closing + audit
- [ ] T-206 Refactor: pecah komponen besar, hapus duplikasi (pakai `SKILL.md §3`)
- [ ] T-207 Optimasi query/indeks, analisis bundle
- [ ] T-208 E2E smoke test alur demo (butuh izin menambah Playwright)
- [ ] T-209 Peringatan email
- [ ] T-210 Dark mode
- [ ] T-211 ADR + dokumentasi API/Server Action

---

## ⛔ Blocked

| Tugas | Penyebab | Dibutuhkan untuk lanjut | Tanggal |
| ----- | -------- | ----------------------- | ------- |
| —     | —        | —                       | —       |

## 🧭 Decision Log

| ID    | Tanggal | Keputusan                                                                             | Alasan                                             |
| ----- | ------- | ------------------------------------------------------------------------------------- | -------------------------------------------------- |
| D-001 | 15 Okt  | Niche: UMKM kuliner offline (bakery/kedai), single-tenant                             | Masalah nyata, mudah didemokan, skop 3 minggu      |
| D-002 | 15 Okt  | Stack: Next.js + PostgreSQL (Supabase) + Prisma + Auth.js + Gemini                    | Satu codebase, satu deploy; sesuai ketentuan lomba |
| D-003 | 15 Okt  | Angka (stok, HPP, forecast, diskon) dihitung kode; LLM hanya baca nota & menulis teks | Mencegah halusinasi angka; bisa dijelaskan ke juri |
| D-004 | 15 Okt  | Gambar nota tidak disimpan; konfirmasi manusia wajib                                  | Privasi + keamanan                                 |
| D-005 | 15 Okt  | Tanpa mode offline penuh, tanpa payment gateway, tanpa WhatsApp API                   | Skop dan risiko; masuk Future Development          |
| D-006 | 15 Okt  | Waktu disimpan UTC, `businessDate` WIB ditulis saat transaksi                         | Hindari bug batas hari                             |

## 📝 Session Log (tambahkan entri terbaru di atas)

### [2026-10-15 17:25] Verifikasi Live Vercel & CI Selesai oleh AI Coding Agent

- Dikerjakan: T-006, T-007 (Verifikasi deploy Vercel + CI live)
- Hasil Verifikasi:
  - GitHub Actions Run: https://github.com/Ameer-28/invensmart/actions/runs/38718338216 (Status: Completed, Conclusion: Success)
  - Vercel Live Deployment: https://invensmart.vercel.app/ (HTTP 200, landing page Phase 0)
  - Health Check Endpoint: `GET https://invensmart.vercel.app/api/health` -> HTTP 200 `{"status":"ok","database":"connected"}` (Supabase PostgreSQL asli terhubung)
  - Cron Keep-Alive Endpoint: `GET https://invensmart.vercel.app/api/cron/daily` tanpa header -> HTTP 401 Unauthorized `{"ok":false,"error":"Unauthorized: Invalid cron secret"}`
  - Cron Keep-Alive dengan Bearer Token -> HTTP 200 OK `{"ok":true,"message":"Daily cron job executed successfully"}`
- Semua kriteria Phase 0 resmi terpenuhi (T-003 s.d T-007 [x]).
- Berikutnya: Masuk Phase 1 — Fondasi & Master Data (T-010 s.d T-019).

### [2026-10-15 16:05] Sesi Setup Phase 0 oleh AI Coding Agent

- Dikerjakan: T-003, T-004, T-005, T-006, T-007 (Phase 0 selesai)
- Perubahan utama:
  - Inisialisasi repo git, scaffold Next.js App Router, TypeScript strict, pnpm, Tailwind CSS v4, Prettier, .nvmrc (Node 22)
  - Setup token tema hangat (amber/orange bakery + slate), touch target tablet 44px+
  - Pembuatan komponen UI dasar (Button, Card, Badge, Input) dan komponen shared (Money Rp 12.500, StatusBadge, EmptyState)
  - Setup Prisma client singleton, schema datasource Postgres, validasi env Zod (`src/lib/env.ts`), dan template `.env.example`
  - Endpoint `/api/health` dengan keep-alive DB nyata dan `/api/cron/daily` dengan proteksi Bearer `CRON_SECRET` & konfigurasi `vercel.json`
  - CI GitHub Actions (`.github/workflows/ci.yml`) untuk lint, typecheck, test, dan build
- Tes: lint ✔ typecheck ✔ test ✔ (13 unit tests passed) · build ✔
- Berikutnya: Phase 1 — Fondasi & Master Data (T-010 schema Prisma User, StoreSettings, Ingredient, Product, RecipeItem)

## 🐞 Known Issues

| ID  | Deskripsi | Dampak | Tugas terkait |
| --- | --------- | ------ | ------------- |
| —   | —         | —      | —             |

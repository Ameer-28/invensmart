# AGENTS.md — Aturan Teknis & Konvensi untuk AI Coding Agent

> Wajib dibaca di **awal setiap sesi**. Urutan baca: `AGENTS.md` → `TODO.md` → `PRD.md` → `ARCHITECTURE.md` → `WORKFLOW.md`.
> Bila ada konflik: instruksi langsung dari user > `AGENTS.md` > `PRD.md` > `ARCHITECTURE.md` > `TODO.md`. Laporkan konflik, jangan menebak.

## 1. Project Identity

| | |
|---|---|
| Nama | **InvenSmart** (konsep "Anti-Mubazir") |
| Tipe | Web app full-stack, single-tenant, untuk kompetisi GTNIC 2026 (Web Dev) |
| Domain | POS + inventori bahan baku + HPP + prediksi produksi untuk UMKM kuliner offline |
| Stack | Next.js (App Router) · TypeScript strict · PostgreSQL (Supabase) · Prisma · Tailwind CSS + shadcn/ui · Auth.js (Credentials) · Zod · Gemini API (`@google/genai`) · Vitest · Vercel |
| Bahasa | UI & dokumen: Indonesia. Kode, identifier, komentar, commit message: English |
| Karakter UI | Hangat, bersih, ramah. Warna primer hangat (amber/oranye "bakery") + netral slate, tema terang. Tablet-first untuk POS (target sentuh ≥ 44 px, teks besar). Wajib ada skeleton loading, toast sukses/gagal, empty state, dan pesan validasi berbahasa Indonesia. Warna semantik: hijau = aman, kuning = peringatan, merah = kritis. Format uang `Rp 12.500`, tanggal WIB |

Perintah standar (pnpm):

```bash
pnpm dev            # development server
pnpm build          # production build
pnpm lint           # ESLint
pnpm typecheck      # tsc --noEmit
pnpm test           # Vitest (run once)
pnpm db:migrate     # prisma migrate dev (hanya DB lokal/dev)
pnpm db:seed        # seed data demo (idempoten)
```

## 2. Tech Stack Notice (hindari sintaks lama)

**Versi pasti dikunci di `package.json` dan lockfile. BACA `package.json` sebelum menulis kode.** Jangan mengandalkan memori untuk API library; bila ragu, baca dokumentasi resmi versi terpasang atau definisi tipenya di `node_modules`.

Jebakan yang sering terjadi (verifikasi terhadap versi terpasang):
- **Next.js:** hanya **App Router** (`src/app`). Dilarang membuat folder `pages/`. Komponen adalah Server Component secara default; `"use client"` hanya bila perlu interaktivitas. Pada Next.js versi baru, API request-time seperti `params`, `searchParams`, `cookies()`, `headers()` bersifat **async** (gunakan `await`). Cek apakah proyek memakai `middleware.ts` atau `proxy.ts` (nama berkas berbeda antar versi) dan ikuti dokumentasi versi terpasang.
- **React 19:** `ref` dapat berupa prop biasa; gunakan `useActionState` / `useFormStatus` untuk form action (bukan API lama `useFormState`).
- **Tailwind CSS:** cek mayor versi. Pada v4 konfigurasi bersifat CSS-first (`@import "tailwindcss"`, `@theme`), bukan `tailwind.config.js` + `@tailwind base`.
- **shadcn/ui:** komponen disalin ke repo lewat CLI; ikuti dokumentasi yang cocok dengan versi Tailwind terpasang.
- **Prisma:** ikuti pola generate/client sesuai versi terpasang (cek blok `generator` di `schema.prisma` dan `prisma.config.ts` bila ada). Runtime memakai koneksi **pooled**; migrasi memakai koneksi **direct** (lihat env).
- **Zod:** cek mayor versi (v3 vs v4) sebelum memakai API (mis. `z.email()` vs `z.string().email()`).
- **Auth.js:** Credentials provider dengan strategi **JWT**; ikuti API versi terpasang (`auth()` helper).
- **Google GenAI SDK:** gunakan paket **`@google/genai`**. Jangan memakai `@google/generative-ai` (SDK lama). Nama model dibaca dari env `GEMINI_MODEL`, **jangan di-hardcode**.
- **Node.js:** versi LTS yang dikunci di `.nvmrc` dan `engines`.

Pustaka yang **disetujui** (selain itu = minta izin): `next`, `react`, `typescript`, `tailwindcss`, `shadcn/ui` (+ `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`), `lucide-react`, `sonner`, `prisma` + `@prisma/client`, `zod`, `react-hook-form` + `@hookform/resolvers`, `next-auth` (Auth.js), `bcryptjs`, `decimal.js` (atau `Prisma.Decimal`), `date-fns` + `date-fns-tz`, `recharts`, `@google/genai`, `vitest`, `@testing-library/react`, `eslint`, `prettier`.

## 3. Coding Conventions & Best Practices

**Penamaan**
- Berkas & folder: `kebab-case` (`stock-batch-list.tsx`). Komponen React: `PascalCase`. Fungsi/variabel: `camelCase`. Konstanta & enum value: `UPPER_SNAKE_CASE`. Tipe/interface: `PascalCase` tanpa awalan `I`.
- Model Prisma `PascalCase`; field `camelCase`; enum `PascalCase` dengan value `UPPER_SNAKE_CASE`.
- Tes berdampingan dengan sumber: `fefo.ts` → `fefo.test.ts`.

**Struktur & modularitas**
- Organisasi **per fitur** di `src/features/<feature>/` (`actions.ts`, `queries.ts`, `schemas.ts`, `components/`, `types.ts`). Detail di `ARCHITECTURE.md` §2.
- Logika bisnis (HPP, FEFO, forecast, promo, konversi satuan) adalah **fungsi murni** di `src/server/domain/*`, tanpa akses DB/HTTP, sehingga mudah dites. Server Action hanya: autentikasi → otorisasi → validasi → panggil domain/DB → revalidate.
- Komponen ≤ ~150 baris; pecah bila lebih. Komponen UI generik di `components/ui`, komponen lintas fitur di `components/shared`.

**State management**
- Data server: Server Components + Server Actions + `revalidatePath`/`revalidateTag`. Jangan menduplikasi data server ke state klien.
- State klien lokal: `useState`/`useReducer` (keranjang POS = `useReducer` + context). **Jangan tambah library state global tanpa izin.**
- Form: `react-hook-form` + `zodResolver`, memakai skema yang sama dengan validasi server (`features/<x>/schemas.ts`).

**Tipe data**
- `strict: true`, `noUncheckedIndexedAccess: true`. Gunakan tipe turunan Zod (`z.infer`) dan tipe Prisma; hindari duplikasi tipe manual.
- Uang = integer Rupiah. Kuantitas/biaya = `Decimal`. **Dilarang aritmetika float untuk domain.**
- Tanggal: simpan UTC; `businessDate` dihitung dalam WIB lewat helper `lib/date.ts`. Jangan memakai `new Date()` mentah untuk logika hari operasional.

**Kontrak Server Action**

```ts
// src/lib/action-result.ts
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; fieldErrors?: Record<string, string[]> } };
```

```ts
// pola standar Server Action
"use server";
export async function createIngredient(input: unknown): Promise<ActionResult<{ id: string }>> {
  const session = await requireRole(["OWNER"]);            // 1. authN + authZ
  const parsed = createIngredientSchema.safeParse(input);  // 2. validasi
  if (!parsed.success) return fail("VALIDATION_ERROR", "Data tidak valid", parsed.error);
  // 3. domain/DB (dalam transaksi bila mutasi >1 tabel)
  // 4. audit log bila sensitif, 5. revalidate
  return ok({ id });
}
```

**Error handling & logging**
- Error yang diharapkan dikembalikan sebagai `ActionResult` (pesan Indonesia, ramah). Error tak terduga: log di server (tanpa PII/rahasia), kembalikan pesan generik. Jangan pernah mengirim stack trace ke klien.
- Gunakan `error.tsx` dan `loading.tsx` per segmen rute penting.

**Komentar & gaya**
- Komentar menjelaskan **mengapa**, bukan **apa**. Fungsi domain wajib punya JSDoc (parameter, return, edge case). Hapus kode mati dan `console.log` sebelum selesai.
- Import: library eksternal → alias `@/` → relatif. Prettier + ESLint adalah sumber kebenaran format.
- Commit: Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`), merujuk ID tugas (`feat(pos): checkout transaction [T-033]`).

## 4. Core Rules — "Never Do This"

**Kualitas kode**
1. Dilarang `any`, `@ts-ignore`, `@ts-expect-error` (kecuali dengan komentar alasan + tugas pelacak di `TODO.md`), dan `eslint-disable` untuk meloloskan lint.
2. Dilarang menghapus atau melonggarkan tes agar tes lolos. Perbaiki kode atau diskusikan dulu.
3. Dilarang merusak fungsi yang sudah berjalan tanpa instruksi. Jalankan `pnpm test` sebelum dan sesudah perubahan.
4. Dilarang menambah library baru (atau mengganti versi mayor) tanpa izin.
5. Dilarang menyisakan `console.log`, kode yang dikomentari, atau TODO tanpa ID tugas.

**Keamanan & data**
6. Dilarang hardcode kredensial/API key/token. Semua rahasia dari env; `.env*` tidak boleh di-commit (`.env.example` boleh, tanpa nilai nyata).
7. Dilarang memakai kunci/rahasia server di kode klien (`NEXT_PUBLIC_*` hanya untuk data publik).
8. Dilarang mempercayai input klien: validasi Zod + cek peran/kepemilikan **di server** untuk setiap mutasi dan query sensitif.
9. Dilarang `$queryRawUnsafe` atau menyusun SQL dengan interpolasi string. Gunakan Prisma query atau tagged template `$queryRaw` yang berparameter.
10. Dilarang `dangerouslySetInnerHTML` dengan konten user atau AI.
11. Dilarang menyimpan token/sesi di `localStorage`.
12. Dilarang menulis PII, API key, atau payload AI penuh ke log.
13. Dilarang menjalankan operasi destruktif (`prisma migrate reset`, `DROP`, `TRUNCATE`, `deleteMany` tanpa `where`) terhadap database bersama/produksi. Dilarang mengedit file migrasi yang sudah diterapkan; buat migrasi baru.

**Domain & AI**
14. Dilarang membiarkan **LLM menghitung angka** yang disimpan atau ditampilkan sebagai fakta (stok, HPP, margin, jumlah produksi, diskon). Semua angka dari kode domain; LLM hanya membaca dokumen dan menulis teks.
15. Dilarang menyimpan output AI yang mengubah stok/harga **tanpa konfirmasi manusia** dan validasi skema.
16. Dilarang memanggil API AI dari klien. Hanya dari server, dengan timeout, rate limit, dan fallback non-AI.
17. Dilarang mengirim data pelanggan asli (nama, nomor HP) ke penyedia AI.
18. Dilarang membuat stok negatif; semua pemotongan stok harus transaksional dan FEFO.

**Proses**
19. Dilarang mengubah ruang lingkup di `PRD.md` atau skema database tanpa izin (lihat `WORKFLOW.md`).
20. Dilarang deploy ke production atau mengubah konfigurasi hosting/env produksi tanpa izin.
21. Dilarang membuat folder `pages/` atau mencampur Pages Router dengan App Router.
22. Dilarang menandai tugas selesai di `TODO.md` bila Definition of Done belum terpenuhi.

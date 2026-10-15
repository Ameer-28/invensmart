# WORKFLOW.md — SOP & Aturan Main Kolaborasi AI

## 1. Prinsip Umum

1. **Kualitas di atas kecepatan:** kode yang rapi, bertipe, dan teruji lebih penting daripada fitur tambahan. P0 harus stabil sebelum P1 disentuh.
2. **Transparan:** jelaskan rencana sebelum mengubah banyak berkas, dan catat asumsi secara eksplisit. Jangan diam-diam mengubah ruang lingkup.
3. **Aman secara default:** ikuti Core Rules di `AGENTS.md`. Saat ragu antara aman dan cepat, pilih aman lalu tanyakan.
4. **Perubahan kecil dan bertahap:** satu tugas = satu cabang = satu PR kecil yang bisa direview.
5. **Komunikasi jelas:** laporan singkat, faktual, tanpa klaim "selesai" yang belum diverifikasi. Sampaikan masalah dan risiko sejak dini, termasuk kemungkinan terlambat dari jadwal.
6. **Jangan menebak:** bila dokumen bertentangan atau kebutuhan ambigu, berhenti dan tanyakan (urutan prioritas ada di `AGENTS.md` bagian atas).

## 2. Kapan WAJIB Minta Izin (Ask Permission First)

Hentikan pekerjaan, jelaskan **apa, mengapa, dampak, alternatif**, dan tunggu persetujuan eksplisit sebelum:

- Menghapus, memindahkan, atau menulis ulang file penting (config, migrasi, tes, dokumen blueprint).
- **Mengubah skema database** (tabel/kolom/indeks/constraint) atau membuat migrasi baru.
- Menjalankan operasi destruktif pada data (`migrate reset`, `DROP`, `TRUNCATE`, hapus massal) di database mana pun yang berisi data demo bersama.
- Menginstal, menghapus, atau mengganti versi mayor dependency (termasuk library di luar daftar `AGENTS.md`).
- Mengubah konfigurasi hosting, variabel lingkungan produksi, domain, cron, atau **deploy ke production**.
- Mengubah ruang lingkup/prioritas di `PRD.md`, atau mengubah rumus inti (HPP, FEFO, forecast, promo).
- Mengubah arsitektur lintas fitur (struktur folder, pola auth, pola Server Action, provider AI).
- Mengubah perilaku yang sudah berjalan dan lolos tes, selain perbaikan bug yang diminta.
- Mengirim data apa pun ke layanan eksternal baru, atau mengubah data yang dikirim ke penyedia AI.
- Melonggarkan aturan lint/TS, menghapus atau menonaktifkan tes.

## 3. Kapan BOLEH Jalan Sendiri (Autonomous Actions)

Selama sesuai arsitektur, tugas ada di `TODO.md`, dan tidak menyentuh daftar §2:

- Membuat komponen, halaman, fungsi domain, schema Zod, dan berkas baru di lokasi yang sudah ditetapkan `ARCHITECTURE.md`.
- Menulis dan memperbaiki **unit test** dan integration test (tanpa melemahkan tes yang ada).
- Memperbaiki bug terisolasi (satu fungsi/komponen) beserta tes regresi.
- Merapikan kode lokal: penamaan, ekstraksi fungsi kecil, menghapus kode mati dan `console.log` di berkas yang sedang dikerjakan.
- Memperbarui dokumentasi (README, JSDoc, `docs/`) dan `TODO.md`.
- Menjalankan `pnpm lint`, `typecheck`, `test`, `build`, dan perintah baca-saja (git status/diff/log).
- Menambah data seed dummy (di `prisma/seed.ts`) yang tidak mengubah skema.
- Memperbaiki masalah aksesibilitas/UX kecil yang tidak mengubah perilaku fitur.

## 4. Definition of Done (DoD)

Sebuah tugas **hanya** boleh ditandai `[x]` bila semua terpenuhi:

- [ ] Memenuhi **acceptance criteria** pada FR di `PRD.md` dan kriteria fase di `ARCHITECTURE.md §4`.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` bebas error dan peringatan baru.
- [ ] `pnpm test` hijau; logika baru punya tes (happy path + edge case relevan); tes lama tidak dimodifikasi untuk meloloskan perubahan.
- [ ] Tidak ada `any`, `@ts-ignore`, `console.log`, kode dikomentari, atau TODO tanpa ID.
- [ ] Validasi input (Zod) dan otorisasi (RBAC) di server terpasang untuk semua mutasi baru; tidak ada rahasia di kode.
- [ ] UI: ada loading state, empty state, pesan error/validasi berbahasa Indonesia, responsif di 360/768/1280 px.
- [ ] Fitur AI: ada fallback non-AI yang diuji, konfirmasi manusia untuk perubahan data, dan tidak ada angka dari LLM.
- [ ] Dokumentasi relevan diperbarui (README/JSDoc/`docs/`).
- [ ] `TODO.md` sudah diperbarui (status, Session Log) dan laporan ringkas diberikan (§5).

## 5. Protokol Pelaporan

**Awal sesi:** baca `AGENTS.md` → `TODO.md` → bagian relevan `PRD.md`/`ARCHITECTURE.md`. Konfirmasi tugas yang akan dikerjakan (maks 2 berstatus `[/]`).

**Selama bekerja:** tandai tugas `[/]`; bila terblokir, ubah ke `[~]` dan isi tabel Blocked dengan penyebab dan hal yang dibutuhkan.

**Setiap selesai satu tugas (wajib):**
1. Jalankan `pnpm lint && pnpm typecheck && pnpm test` (dan `pnpm build` bila menyentuh konfigurasi/rute).
2. Perbarui `TODO.md`: status → `[x]`, tambahkan entri Session Log, catat keputusan baru di Decision Log.
3. Commit dengan Conventional Commits yang merujuk ID tugas, di cabang `feat/T-0xx-deskripsi` (atau `fix/…`, `chore/…`), dan buka PR kecil.
4. Kirim laporan dengan format:

```text
✅ Selesai: T-0xx — <judul>
Perubahan: <3–5 poin, file kunci>
Verifikasi: lint ✔ typecheck ✔ test ✔ (n tes baru) · build ✔/—
Asumsi/keputusan: <jika ada>
Risiko/utang teknis: <jika ada, dengan ID tugas baru>
Berikutnya: T-0yy (menunggu persetujuan bila menyentuh §2)
```

**Saat meminta izin (§2):**

```text
⚠️ Butuh izin: <tindakan>
Alasan: <mengapa perlu>   Dampak: <apa yang berubah/berisiko>
Alternatif: <opsi lain>   Rekomendasi: <pilihan terbaik>
```

**Akhir sesi:** ringkas progres, daftar tugas terbuka, dan blocker; pastikan `TODO.md` mencerminkan kondisi terakhir sehingga sesi berikutnya dapat melanjutkan tanpa konteks percakapan.

## 6. Konvensi Git

- Cabang dari `main`; `main` selalu dapat dibangun dan dideploy. Repo berada di akun GitHub pribadi anggota tim (bukan organization), publik saat pengumpulan.
- Satu PR = satu tugas; deskripsi PR memuat ID tugas, ringkasan, cara uji, dan screenshot untuk perubahan UI.
- Dilarang force-push ke `main`. Jangan commit `.env`, dump database, atau berkas besar.
- Sebelum 10 Nov: bekukan fitur baru (feature freeze) 8 Nov; hanya perbaikan bug dan polish.

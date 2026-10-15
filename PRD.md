# PRD — InvenSmart (Konsep "Anti-Mubazir")

| | |
| --- | --- |
| Versi | 1.0 (Draft) |
| Tanggal | 15 Oktober 2026 |
| Konteks | GTNIC 2026 — Web Development · Sub-tema "Accelerating Digital Transformation for Business and SMEs" |
| Status | Draft — menunggu konfirmasi tim atas asumsi di bawah |

> **Asumsi kerja (ubah di sini bila berbeda, lalu sinkronkan ke file lain):**
>
> 1. Niche: UMKM kuliner offline skala kecil (bakery/toko kue, kedai kopi, warung makan), 1 outlet, 1–5 staf.
> 2. Nama kerja aplikasi: **InvenSmart**.
> 3. Fitur AI: baca foto nota belanja, prediksi produksi harian, saran promo sisa dagangan, ringkasan tutup toko. Draf resep otomatis = P2.
> 4. Single-tenant (satu usaha per deployment). UI berbahasa Indonesia. Tanpa mode offline penuh.

---

## 1. Problem Statement

UMKM kuliner kecil menjalankan usaha dengan margin tipis, tetapi hampir tidak punya data untuk mengelolanya. Resep ada di kepala pemilik, nota belanja menumpuk di laci, dan jumlah produksi ditebak dari kebiasaan. Akibatnya empat kebocoran terjadi bersamaan dan jarang disadari: harga jual tidak mengikuti biaya bahan, produksi berlebih berakhir di tempat sampah, bahan habis atau kedaluwarsa tanpa peringatan, dan pembukuan tidak pernah lengkap sehingga sulit dinilai bank.

Aplikasi pencatatan (POS/inventori biasa) belum menyelesaikan ini karena menambah pekerjaan input bagi pemilik yang sudah kewalahan, sehingga datanya jarang lengkap dan fitur "pintar" tidak berguna. **InvenSmart dibangun dengan prinsip sebaliknya: fitur pintar bekerja di atas data yang sudah muncul dari aktivitas harian (penjualan kasir, foto nota), dan AI dipakai untuk mengurangi pekerjaan pemilik, bukan menambahnya.**

### 1.1 Pain points

| # | Pain point | Dampak |
|---|---|---|
| P1 | HPP per porsi tidak dihitung atau dihitung kasar; harga jual mengikuti pasar | Margin tergerus tanpa disadari saat harga bahan naik |
| P2 | Jumlah produksi harian ditebak | Sisa dibuang (rugi biaya produksi) atau kehabisan di jam ramai (rugi omzet) |
| P3 | Stok bahan tidak dipantau per batch | Bahan mendadak habis atau kedaluwarsa terbuang |
| P4 | Mencatat nota belanja dan stok secara manual itu melelahkan | Data tidak lengkap, pembukuan sulit dipakai untuk akses kredit |
| P5 | Kasir tidak tahu menu mana yang bahannya sudah habis; pelanggan tidak mendapat struk | Layanan kurang baik, komplain, tidak ada bukti transaksi |

### 1.2 Pemetaan ke tantangan GTNIC

| Pilar tantangan | Jawaban InvenSmart |
|---|---|
| Mengelola proses operasional | POS, stok per batch (FEFO), resep, produksi, tutup toko terpandu |
| Meningkatkan produktivitas | Foto nota → stok & harga otomatis, HPP dinamis, rekomendasi produksi, ringkasan harian |
| Layanan lebih baik bagi pelanggan | Menu "Habis" otomatis, struk digital via WhatsApp, promo sore untuk sisa dagangan |

### 1.3 Bukti pendukung yang harus diverifikasi tim sebelum dikutip di proposal

Tim mengambil angka dan kutipan langsung dari artikel aslinya, bukan dari dokumen ini.

| Topik | Sumber untuk dicari | Gunakan untuk |
|---|---|---|
| Pembukuan belum rapi sebagai hambatan akses pembiayaan | Pernyataan OJK (UMKM Finance Summit, Agustus 2026) via Investortrust | P4 |
| Kesalahan menghitung HPP umum di UMKM kuliner | RRI Palembang, 24 Juli 2026 | P1 |
| Produksi tanpa mempertimbangkan penjualan menyebabkan kue terbuang | Studi bakery di Lhokseumawe (repositori Universitas Malikussaleh) | P2 |
| Pencatatan bahan belum disiplin sehingga limbah sulit diukur | Artikel UKM Indonesia tentang bisnis kuliner sirkular | P2, P3 |
| Omzet katering/UMKM makanan tertekan, bahan baku naik | RRI Samarinda, 24 Mei 2026; INDEF, 8 Oktober 2026 | Konteks urgensi |

---

## 2. Goals & Objectives

| ID | Goal | Metrik keberhasilan | Target terukur |
|---|---|---|---|
| G1 | HPP akurat dan selalu mutakhir | % menu aktif dengan HPP terhitung; latensi pembaruan HPP | 100% menu seed; HPP berubah ≤ 5 detik setelah harga bahan berubah |
| G2 | Mengurangi pekerjaan input | Waktu mencatat 1 nota belanja (10 item) | ≤ 60 detik dengan AI vs ≥ 5 menit manual (uji internal ≥ 3 orang, dicatat) |
| G3 | Stok otomatis dan akurat | Stok negatif; transaksi yang memotong stok | 0 kejadian stok negatif; 100% checkout memotong stok sesuai resep |
| G4 | Mengurangi sisa produksi | Persentase sisa pada backtest data seed: dengan vs tanpa rekomendasi | ≥ 20% lebih rendah di backtest (metode didokumentasikan; jangan diklaim sebagai hasil lapangan) |
| G5 | Kasir cepat | Waktu checkout 3 item | ≤ 15 detik dan ≤ 6 ketukan |
| G6 | Demo andal | Error pada alur utama; ketersediaan URL | 0 error kritis pada 3 kali demo berturut-turut; URL live ≥ 99% pada 10–14 Nov 2026 (best-effort) |
| G7 | Skor kompetisi | Cakupan rubrik | Setiap kriteria rubrik punya fitur dan bukti di proposal serta demo (lihat Lampiran A) |

---

## 3. Target Users

### Persona 1 — Bu Rina, Pemilik (OWNER)
- **Profil:** 38 tahun, pemilik toko roti dan kue dengan 2 karyawan, 1 outlet. Mengelola usaha dari HP dan buku tulis.
- **Kebutuhan:** tahu menu mana yang untung, produksi besok berapa, bahan apa yang harus dibeli.
- **Pain points:** tidak tahu HPP, sering membuang roti sisa, stok bahan kejutan, malas mengetik data.
- **Skenario:** sore hari Bu Rina menerima saran promo untuk roti yang diperkirakan tersisa, menyetujuinya satu ketukan, lalu malam hari membaca ringkasan harian di HP. Pagi berikutnya ia memotret nota dari pasar dan hanya mengonfirmasi hasil bacaan AI.

### Persona 2 — Dimas, Kasir/Barista (CASHIER)
- **Profil:** 22 tahun, memakai tablet murah di kasir.
- **Kebutuhan:** input pesanan cepat, tahu menu yang habis, tutup toko tanpa ribet.
- **Pain points:** pelanggan memesan menu yang bahannya habis, antrean menumpuk, hitung sisa manual saat tutup.
- **Skenario:** memilih 3 menu, memasukkan uang tunai, mengirim struk ke WhatsApp pelanggan; malam hari menghitung sisa roti lewat form tutup toko terpandu.

### Persona 3 — Pelanggan walk-in (tanpa akun)
- **Kebutuhan:** tahu menu tersedia, mendapat struk, harga promo jelas.
- **Skenario:** menerima tautan struk digital (`/r/[token]`) di WhatsApp.

### Persona 4 — Juri/Evaluator (stakeholder lomba)
- **Kebutuhan:** akun demo siap pakai, data contoh realistis, README jelas, fitur AI tetap berfungsi saat dinilai.

---

## 4. User Stories

| ID | User story | P | FR |
|---|---|---|---|
| US-01 | Sebagai pemilik, saya ingin melihat HPP dan margin tiap menu otomatis supaya tahu menu mana yang untung atau rugi tanpa menghitung manual | P0 | FR-022 |
| US-02 | Sebagai pemilik, saya ingin memotret nota belanja dan hasilnya otomatis menjadi stok masuk dan harga bahan supaya tidak perlu mengetik ulang | P0 | FR-050, 051, 020 |
| US-03 | Sebagai pemilik, saya ingin rekomendasi jumlah produksi besok per menu supaya sisa berkurang dan tidak kehabisan | P0 | FR-052 |
| US-04 | Sebagai pemilik, saya ingin peringatan bahan hampir habis atau mendekati kedaluwarsa supaya tidak kehabisan atau membuang | P0 | FR-023 |
| US-05 | Sebagai pemilik, saya ingin dashboard ringkas harian supaya paham kondisi usaha dalam satu layar | P0 | FR-060 |
| US-06 | Sebagai pemilik, saya ingin saran promo untuk sisa dagangan sore hari supaya sisa tetap menghasilkan uang tanpa menjual rugi | P1 | FR-054 |
| US-07 | Sebagai pemilik, saya ingin ringkasan tutup toko dalam bahasa sederhana supaya cepat mengambil keputusan | P1 | FR-055 |
| US-08 | Sebagai pemilik, saya ingin peringatan saat harga bahan naik beserta menu yang terdampak supaya bisa menyesuaikan harga | P1 | FR-026 |
| US-09 | Sebagai pemilik, saya ingin draf pesan restock ke supplier supaya pemesanan cepat | P1 | FR-025 |
| US-10 | Sebagai pemilik, saya ingin mengelola akun kasir dan hak aksesnya supaya data sensitif aman | P1 | FR-003 |
| US-11 | Sebagai pemilik, saya ingin laporan penjualan, margin, dan limbah yang bisa diekspor supaya mudah dievaluasi | P1 | FR-061 |
| US-12 | Sebagai pemilik, saya ingin membatalkan (void) transaksi dengan alasan tercatat supaya koreksi bisa ditelusuri | P1 | FR-035 |
| US-13 | Sebagai kasir, saya ingin checkout cepat dengan beberapa ketukan supaya antrean tidak menumpuk | P0 | FR-030, 033 |
| US-14 | Sebagai kasir, saya ingin menu yang bahannya habis otomatis ditandai "Habis" supaya tidak menawarkan yang tidak ada | P0 | FR-031 |
| US-15 | Sebagai kasir, saya ingin mencatat produksi hari ini supaya stok bahan dan barang jadi akurat | P0 | FR-040 |
| US-16 | Sebagai kasir, saya ingin tutup toko terpandu (hitung sisa) supaya selesai kurang dari 5 menit | P0 | FR-041 |
| US-17 | Sebagai kasir, saya ingin mengirim struk digital ke WhatsApp pelanggan supaya pelanggan punya bukti | P0 | FR-034 |
| US-18 | Sebagai pelanggan, saya ingin melihat harga promo sore dengan jelas supaya tahu penghematan saya | P1 | FR-036 |
| US-19 | Sebagai pelanggan, saya ingin mengumpulkan poin loyalitas dengan nomor HP supaya mendapat manfaat belanja ulang | P2 | FR-037 |
| US-20 | Sebagai juri, saya ingin akun demo dan data contoh siap pakai supaya dapat menilai tanpa setup | P0 | FR-062 |

---

## 5. Functional Requirements

Prioritas: **P0** = Kritis/MVP, **P1** = Penting, **P2** = Nice to have. Semua baris harus bisa diuji (testable).

### 5.1 Auth & Akses

| ID | Requirement | P | Validasi · Error handling · Edge case |
|---|---|---|---|
| FR-001 | Login email + password; peran OWNER/CASHIER; sesi berakhir dalam 8 jam; logout | P0 | Email valid; password ≥ 8 karakter. Pesan gagal selalu generik "Email atau password salah" (anti user-enumeration). Maks 5 gagal per 15 menit per email+IP, lalu HTTP 429 dengan pesan jelas |
| FR-002 | RBAC di sisi server pada setiap Server Action/Route Handler | P0 | CASHIER hanya POS, produksi, tutup toko, stok (read-only). Akses ditolak → 403 tanpa membocorkan keberadaan data. Cek wajib di server, bukan hanya menyembunyikan menu |
| FR-003 | Owner membuat/menonaktifkan akun kasir dan mereset password | P1 | Email unik; akun nonaktif tidak bisa login dan sesi aktifnya ditolak |

### 5.2 Master Data (Bahan, Menu, Resep, Pengaturan)

| ID | Requirement | P | Validasi · Error handling · Edge case |
|---|---|---|---|
| FR-010 | CRUD Ingredient: nama, satuan dasar (G/ML/PCS), batas stok minimum, masa simpan default | P0 | Nama unik (case-insensitive); minimum ≥ 0. Bahan yang sudah dipakai resep/transaksi hanya bisa dinonaktifkan (soft delete) |
| FR-011 | CRUD Product: nama, kategori, harga (Rupiah bulat > 0), tipe `MADE_TO_ORDER`/`PRE_PRODUCED`, `yieldQty` ≥ 1 | P0 | Harga di bawah HPP → peringatan, bukan blokir. Menu nonaktif tidak muncul di POS |
| FR-012 | Editor Recipe: daftar bahan + `qtyPerYield` > 0 per `yieldQty` | P0 | Tanpa duplikat bahan. Menu tanpa resep boleh dijual tetapi berlabel "HPP belum lengkap" dan tidak memotong stok |
| FR-013 | StoreSettings: target margin %, overhead per porsi, hari cakupan stok minimum, hari peringatan kedaluwarsa, diskon promo maks %, margin minimum promo %, jam mulai promo, jam tutup | P1 | Persentase 0–100; jam format HH:mm; nilai default tersedia dari seed |

### 5.3 Inventori & HPP

| ID | Requirement | P | Validasi · Error handling · Edge case |
|---|---|---|---|
| FR-020 | Pembelian manual → membuat `StockBatch`, `StockMovement PURCHASE_IN`, memperbarui `currentCostPerBaseUnit` bahan | P0 | qty > 0; harga ≥ 0; konversi satuan valid (kg→G, l→ML; satuan kemasan butuh `packSizeInBase`); expiry ≥ tanggal terima |
| FR-021 | Pemotongan stok bahan memakai FEFO (expiry terdekat dulu, tanpa expiry terakhir, lalu terima terlama) dalam satu transaksi DB | P0 | Batch kedaluwarsa tidak dipakai. Stok tidak cukup → operasi gagal utuh (tanpa pemotongan parsial) dengan daftar bahan yang kurang |
| FR-022 | HPP per porsi = Σ(qtyPerYield × currentCost) ÷ yieldQty + overhead; margin % = (harga − HPP) ÷ harga; dihitung ulang saat harga bahan berubah | P0 | Perhitungan Decimal (tanpa float); tampilan dibulatkan half-up ke Rupiah; badge merah bila margin < target |
| FR-023 | Peringatan: stok rendah (cakupan hari < ambang atau qty < minimum), mendekati kedaluwarsa (≤ N hari), kedaluwarsa | P0 | Alert tidak duplikat (dedupeKey). Batch kedaluwarsa bisa dibuang oleh owner (`WASTE_EXPIRED`) |
| FR-024 | Penyesuaian stok manual dengan alasan wajib | P1 | Hanya OWNER; tercatat di AuditLog |
| FR-025 | Draf restock supplier: bahan di bawah ambang → qty saran (cakupan N hari dari rata-rata pemakaian) → teks + tautan `wa.me` | P1 | Tanpa nomor supplier → hanya salin teks |
| FR-026 | Peringatan lonjakan harga bahan (> 10% dari harga sebelumnya) + daftar menu terdampak dan margin barunya | P1 | Ambang bisa dikonfigurasi |

### 5.4 POS & Layanan Pelanggan

| ID | Requirement | P | Validasi · Error handling · Edge case |
|---|---|---|---|
| FR-030 | Grid menu dengan filter kategori + pencarian, keranjang (tambah/kurang/hapus), tablet-first | P0 | Qty 1–99; keranjang kosong tidak bisa checkout |
| FR-031 | Status "Habis": `MADE_TO_ORDER` habis bila ada bahan resep tidak cukup untuk 1 porsi; `PRE_PRODUCED` habis bila stok barang jadi 0 | P0 | Dicek di UI **dan** divalidasi ulang di server saat checkout |
| FR-032 | Checkout membuat `Sale` + `SaleItem` (dengan `unitCostSnapshot`) dan memotong stok secara transaksional | P0 | Dua kasir menghabiskan stok bersamaan → satu berhasil, satu gagal dengan pesan jelas. Idempotency key mencegah transaksi ganda saat double-click atau retry |
| FR-033 | Pembayaran: CASH (hitung kembalian), QRIS/TRANSFER (konfirmasi manual, tanpa gateway). Nomor `INV-YYYYMMDD-####` unik dan aman konkurensi | P0 | `amountPaid` ≥ total untuk CASH; kembalian tidak negatif |
| FR-034 | Struk digital publik `/r/[token]` (token acak ≥ 128 bit, tanpa PII/email kasir), CSS cetak 58/80 mm, tombol kirim WhatsApp (`wa.me`) | P0 | Token salah → 404 generik. Nomor HP opsional, tidak disimpan tanpa persetujuan |
| FR-035 | Void transaksi: hanya OWNER, alasan wajib, stok dikembalikan, status `VOID` | P1 | Tidak bisa void dua kali; tercatat di AuditLog |
| FR-036 | Promo aktif diterapkan otomatis di POS dengan harga coret | P1 | Promo berakhir saat tutup toko atau `endsAt` |
| FR-037 | Poin loyalitas berbasis nomor HP; layar antrean/status pesanan | P2 | — |

### 5.5 Produksi & Tutup Toko

| ID | Requirement | P | Validasi · Error handling · Edge case |
|---|---|---|---|
| FR-040 | Catat `ProductionRun` untuk menu `PRE_PRODUCED`: memotong bahan (FEFO) sesuai resep × (qty ÷ yieldQty) dan menambah stok barang jadi | P0 | qty bilangan bulat > 0; bahan kurang → ditolak dengan daftar kekurangan |
| FR-041 | Tutup toko terpandu: per menu tampil diproduksi, terjual, sisa teoretis; kasir mengisi sisa fisik; pilih DISCARD (menjadi limbah bernilai HPP) atau CARRY_OVER (hanya jika `shelfLifeDays` > 1) | P0 | Sisa fisik 0..stok teoretis. Satu penutupan per tanggal; setelah ditutup, penjualan di tanggal itu diblokir sampai OWNER membuka kembali (tercatat audit) |
| FR-042 | Deteksi selisih: |sisa fisik − teoretis| ≥ 5% atau ≥ 3 unit ditandai dan membutuhkan catatan | P1 | — |
| FR-043 | Stock opname bahan baku | P2 | — |

### 5.6 Fitur AI

| ID | Requirement | P | Validasi · Error handling · Edge case |
|---|---|---|---|
| FR-050 | **Baca nota:** unggah JPG/PNG/WebP, kompres di klien (≤ 1600 px, ≤ 1,5 MB), server memvalidasi MIME + magic bytes + ukuran ≤ 5 MB, memanggil AI, memvalidasi output dengan Zod, membuat `Purchase DRAFT` dengan pencocokan bahan | P0 | Timeout 25 detik, HTTP 429, JSON tidak valid, atau bukan nota → pesan jelas + fallback form manual. Tidak ada data tersimpan sebelum konfirmasi. Gambar tidak disimpan. Teks di dalam gambar tidak boleh dianggap instruksi (prompt injection) |
| FR-051 | Layar review nota: edit item, pemetaan bahan, konfirmasi → menjalankan FR-020; pemetaan baru disimpan sebagai `IngredientAlias` | P0 | Sanity check: total ≈ Σ baris (±1%); harga satuan > 3× atau < 1/3× harga terakhir diberi flag; satuan tidak terkonversi diberi flag |
| FR-052 | **Prediksi produksi** per menu `PRE_PRODUCED` untuk hari operasional berikutnya (cron harian + on-demand), memakai algoritma di ARCHITECTURE §5.3 | P0 | Data < 4 titik se-hari-minggu → confidence LOW (fallback rata-rata 14 hari terakhir, label "data terbatas"). Hasil dibatasi `maxDailyCapacity`. Owner bisa terima (mengisi form produksi) atau ubah |
| FR-053 | Penjelasan prediksi ≤ 2 kalimat dari LLM | P1 | Angka tidak pernah dibuat LLM; gagal → template teks |
| FR-054 | **Promo sisa:** mulai jam promo, untuk menu dengan proyeksi sisa > ambang, hitung diskon aman (harga setelah diskon ≥ HPP × (1 + margin minimum promo), ≤ diskon maksimum); LLM menulis teks promo; owner menyetujui → `Promotion` aktif | P1 | Tidak ada diskon aman → tampil "Tidak ada diskon yang aman". Teks LLM gagal → template |
| FR-055 | **Ringkasan tutup toko:** KPI dihitung kode (omzet, COGS, laba kotor, nilai limbah, menu margin tertinggi, kejadian kehabisan, rekomendasi besok); LLM menarasikan ≤ 5 kalimat | P1 | Gagal → template; disimpan di `DailyClosing` |
| FR-056 | Draf resep dari nama menu (ditandai "Draf AI", wajib diedit/dikonfirmasi) | P2 | — |
| FR-057 | Rate limit AI (≤ 10 panggilan/menit/user, batas harian), `AiLog` tanpa payload, kill switch `AI_ENABLED` | P1 | Limit terlampaui → HTTP 429 dan pesan jelas |

### 5.7 Dashboard, Laporan, Data Demo

| ID | Requirement | P | Validasi · Error handling · Edge case |
|---|---|---|---|
| FR-060 | Dashboard owner: omzet hari ini, laba kotor, jumlah transaksi, jumlah stok rendah/kedaluwarsa, limbah minggu ini, kartu rekomendasi produksi, ringkasan AI terakhir, grafik 7/30 hari | P0 | Skeleton saat loading; empty state saat belum ada data; muat < 2 detik pada data seed |
| FR-061 | Laporan: penjualan (rentang tanggal/menu/pembayaran), margin per menu, limbah; ekspor CSV | P1 | Rentang maks 366 hari; paginasi |
| FR-062 | Seed reproducible: ±6 bulan data dummy berpola (akhir pekan lebih ramai, lonjakan harga bahan, kejadian kehabisan, limbah), akun demo OWNER & CASHIER | P0 | `pnpm db:seed` idempoten; perintah reset khusus lingkungan demo |

### 5.8 Edge case global

- **Zona waktu:** simpan UTC, hitung `businessDate` dalam WIB (Asia/Jakarta) saat menulis. Penjualan pukul 23:59 dan 00:01 harus masuk hari yang benar.
- **Presisi:** uang = integer Rupiah; kuantitas dan biaya = Decimal. Dilarang float untuk perhitungan domain.
- **Idempotensi:** checkout dan konfirmasi nota memakai idempotency key.
- **Koneksi putus saat checkout:** tampilkan "Coba lagi"; idempotency key mencegah ganda. Tidak ada antrean offline di MVP.
- **Soft delete** untuk entitas yang sudah punya histori.
- **Output AI tidak dipercaya:** divalidasi skema + sanity check + konfirmasi manusia sebelum mengubah stok atau harga.

---

## 6. Non-Functional Requirements

| Kategori | Requirement | Target |
|---|---|---|
| Performa | Interaksi POS di klien | < 100 ms (state lokal) |
| Performa | Checkout (server) | p95 < 800 ms pada data seed |
| Performa | LCP halaman POS & dashboard (4G, perangkat menengah) | < 2,5 detik |
| Performa | Baca nota end-to-end | p95 ≤ 15 detik; hard timeout 25 detik dengan fallback |
| Performa | Cron harian (prediksi + alert) | ≤ 60 detik untuk 100 menu |
| Konkurensi | Pengguna login bersamaan | ≥ 10 |
| Konkurensi | Checkout paralel | ≥ 3 kasir tanpa stok negatif (dibuktikan dengan tes konkurensi) |
| Ketersediaan | URL live | 24/7 best-effort; target ≥ 99% pada 10–14 Nov 2026; endpoint `/api/health`; keep-alive DB harian; `pg_dump` sebelum demo |
| Keamanan | Autentikasi | Password di-hash (bcrypt cost ≥ 12); cookie sesi httpOnly + Secure + SameSite=Lax |
| Keamanan | Otorisasi | RBAC di server pada semua mutasi dan query sensitif; cek kepemilikan/peran (cegah IDOR) |
| Keamanan | Input | Semua input divalidasi Zod di server; Prisma query berparameter; tanpa raw SQL berinterpolasi string |
| Keamanan | Header & rahasia | Security headers (CSP, X-Content-Type-Options, Referrer-Policy, frame-ancestors); rahasia hanya di env; `.env` tidak di-commit |
| Keamanan | Unggahan | Validasi MIME + magic bytes + ukuran; gambar tidak disimpan |
| Keamanan | AI | Panggilan hanya dari server; tanpa PII pelanggan ke AI; output divalidasi; rate limit + log tanpa payload |
| Privasi | Paket gratis penyedia AI dapat memakai data untuk perbaikan model | Hanya kirim foto nota dan angka agregat; demo memakai nota dummy |
| Responsivitas | Breakpoint | Mobile 360 px dapat dipakai; tablet ≥ 768 px (utama untuk POS); desktop ≥ 1280 px (owner) |
| Responsivitas | Peramban | Chrome, Firefox, Safari, Edge (2 versi terakhir) |
| Aksesibilitas | Dasar | Kontras AA, label form, fokus keyboard, target sentuh ≥ 44 px, input ≥ 16 px |
| Kualitas | Tipe & tes | TypeScript strict; cakupan tes ≥ 80% untuk `server/domain/*`; CI: lint + typecheck + test |
| Integritas data | DB | Transaksi untuk mutasi stok; constraint `qtyRemaining >= 0`; unique pada invoice dan idempotency key |
| Lokalisasi | Format | `id-ID`, Rupiah via `Intl`, WIB |

---

## 7. Scope

### 7.1 In-Scope (MVP — dikerjakan 19 Okt–10 Nov 2026)
- Semua requirement **P0** (wajib selesai dan stabil).
- Requirement **P1** sesuai urutan di `TODO.md` selama waktu cukup. Bila terlambat, potong P1 paling bawah lebih dulu, jangan P0.
- Deliverable lomba: website live, repo publik, proposal PDF, video demo, surat pernyataan keaslian.

### 7.2 Out-of-Scope (ditulis sebagai "Future Development" di proposal)

| Item | Alasan ditunda |
|---|---|
| Mode offline penuh dengan sinkronisasi | Kompleks dan berisiko untuk 3 minggu; mitigasi: UI ringan dan retry aman |
| Payment gateway / QRIS dinamis / integrasi bank | Butuh legalitas dan integrasi eksternal |
| WhatsApp Business API | Butuh persetujuan; MVP memakai tautan `wa.me` |
| Multi-outlet / multi-tenant SaaS | Di luar kebutuhan demo |
| Model ML lanjutan (Prophet/LSTM) | Data terbatas; statistik ringan lebih andal dan bisa dijelaskan |
| Scan barcode, printer thermal langsung (ESC/POS) | Nilai tambah kecil terhadap rubrik |
| Ekspor akuntansi/pajak | Aturan pajak harus diverifikasi ke sumber resmi |
| Pesanan online / marketplace / kulakan bareng | Fokus MVP adalah operasional offline |
| Aplikasi native | PWA/responsif cukup |

### 7.3 Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Kuota/error API AI saat demo | Fallback manual untuk semua fitur AI, `AI_ENABLED` kill switch, rekaman video cadangan |
| Database gratis di-pause karena sepi | Cron keep-alive harian yang benar-benar melakukan query; `pg_dump` berkala |
| Waktu 3 minggu terlampaui | Urutan P0 → P1 ketat; pemotongan P1 dicatat di `TODO.md` |
| Data dummy terlihat dibuat-buat / bias | Wawancara minimal 1 pemilik usaha nyata; jelaskan batasan akurasi di proposal |
| Klaim "tidak ada pesaing" | Cek fitur aplikasi kasir yang ada (Moka, Majoo, Olsera, dll.) sebelum menulis klaim keunikan; posisikan pembeda sebagai fokus pada pengurangan sisa produksi + AI tanpa beban input |

---

## Lampiran A — Pemetaan ke Rubrik Penilaian GTNIC

| Kriteria (bobot) | Bukti di produk | Bukti di proposal/demo |
|---|---|---|
| Relevansi Masalah & Inovasi (20%) | P1–P5, otomatisasi tanpa beban input | Latar belakang bersumber, wawancara pemilik usaha, perbandingan dengan sistem serupa |
| Fungsionalitas & Kualitas Implementasi (25%) | Semua P0 stabil, tes konkurensi, tanpa error di alur utama | Video demo alur end-to-end |
| Kualitas Teknis & Arsitektur (20%) | TS strict, domain murni + tes, RBAC, validasi, repo rapi, README | Diagram arsitektur dan DB, bagian keamanan |
| UX & Interface (15%) | Tablet-first POS, loading/notifikasi/validasi jelas, responsif | Screenshot dan alur pengguna |
| Dampak Bisnis & Skalabilitas (10%) | Dashboard margin/limbah, backtest | Estimasi dampak (berlabel asumsi), roadmap |
| Dokumentasi, Demo & Presentasi (10%) | README, akun demo | Proposal ≤ 15 hlm, video 3–5 menit, pitching |

## Lampiran B — Deliverable & Tenggat Lomba

| Item | Detail |
|--- | --- |
| Pendaftaran Gel. 3 | s.d. 16 Okt 2026 |
| Technical Meeting | 18 Okt 2026 |
| Masa pengerjaan | 19 Okt–10 Nov 2026 |
| Batas pengumpulan | 10 Nov 2026 pukul 23:59 WIB (Google Form; target aman ≤ 18:00 WIB) |
| Isi pengumpulan | Tautan website live, repo GitHub publik, proposal PDF, tautan video demo, surat pernyataan keaslian |
| Format proposal | PDF, maks 15 halaman, A4, Times New Roman 12, spasi 1,5, margin kiri 4 cm lainnya 3 cm, logo GTNIC di cover, nama berkas `GTNIC2026_WebDev_NamaTim.pdf` |
| Pengumuman Top 5 | 12 Nov 2026 |
| Grand Final (Zoom, live pitching) | 14 Nov 2026 |
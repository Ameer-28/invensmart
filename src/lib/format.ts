/**
 * Helper pemformatan Rupiah dan angka sesuai spesifikasi InvenSmart.
 * Simpan uang dalam integer Rupiah, tampilkan sebagai "Rp 12.500".
 */

export function formatRupiah(amount: number): string {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  // Normalisasi spasi non-breaking jika ada
  return formatted.replace(/\u00A0/, " ");
}

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

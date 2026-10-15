import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvenSmart - Solusi Anti-Mubazir UMKM Kuliner",
  description:
    "POS, inventori bahan baku, HPP akurat, dan rekomendasi produksi cerdas untuk UMKM kuliner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}

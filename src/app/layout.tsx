// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/custom/header"; // IMPORTAMOS SEU HEADER

export const metadata: Metadata = {
  title: "Emagrify Store",
  description: "Loja oficial Emagrify",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white">
        {/* AQUI O HEADER É RENDERIZADO EM TODAS AS PÁGINAS */}
        <Header />

        {/* CONTEÚDO DA PÁGINA */}
        {children}
      </body>
    </html>
  );
}

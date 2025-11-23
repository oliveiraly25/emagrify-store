// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/custom/header";
import { ThemeProvider } from "@/providers/ThemeProvider"; // ⬅ IMPORTANTE

export const metadata: Metadata = {
  title: "Emagrify Store",
  description: "Loja oficial Emagrify",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-all">
        {/* PROVEDOR DO TEMA (OBRIGATÓRIO) */}
        <ThemeProvider>
          {/* HEADER EM TODAS AS PÁGINAS */}
          <Header />

          {/* CONTEÚDO DAS PÁGINAS */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

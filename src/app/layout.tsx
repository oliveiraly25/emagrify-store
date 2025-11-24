// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/custom/header";
import Footer from "@/components/custom/footer"; // ✔ CORRIGIDO
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Emagrify Store",
  description: "Loja oficial Emagrify",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-all">

        {/* PROVIDER DO TEMA */}
        <ThemeProvider>

          {/* HEADER EM TODAS AS PÁGINAS */}
          <Header />

          {/* CONTEÚDO DAS PÁGINAS */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* FOOTER EM TODAS AS PÁGINAS */}
          <Footer />

        </ThemeProvider>
      </body>
    </html>
  );
}

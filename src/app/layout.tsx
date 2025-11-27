import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/custom/header";
import Footer from "@/components/custom/footer";

// 🔤 Importando as fontes
import { Tusca, Flawless } from "./fonts";

export const metadata: Metadata = {
  title: "Emagrify Store",
  description: "Loja oficial Emagrify",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${Tusca.variable} ${Flawless.variable}`} // <- ativa as duas fontes
    >
      <body className="min-h-screen bg-white text-black">

        {/* FAIXA PRETA */}
        <div className="top-black-bar"></div>

        {/* HEADER */}
        <Header />

        {/* PÁGINAS */}
        <main className="min-h-screen pt-4">{children}</main>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}

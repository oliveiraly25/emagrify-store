// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/custom/header";

export const metadata: Metadata = {
  title: "Emagrify Store",
  description: "Loja oficial Emagrify",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

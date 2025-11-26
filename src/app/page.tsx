"use client";

import Link from "next/link";
import ProductCard from "@/components/custom/product-card";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";

// Produtos em destaque (mock para layout)
const featuredProducts = [
  {
    id: 1,
    tag: "Novo",
    name: "Vestido Floral Elegante",
    category: "Roupas",
    price: "R$ 149,90",
    oldPrice: "R$ 199,90",
    discount: "-25%",
    rating: "4.8",
  },
  {
    id: 2,
    tag: "Promoção",
    name: "Bolsa Transversal Premium",
    category: "Acessórios",
    price: "R$ 89,90",
    oldPrice: "R$ 129,90",
    discount: "-30%",
    rating: "4.7",
  },
  {
    id: 3,
    tag: "Promoção",
    name: "Tênis Esportivo Confort",
    category: "Calçados",
    price: "R$ 199,90",
    oldPrice: "R$ 259,90",
    discount: "-23%",
    rating: "4.9",
  },
  {
    id: 4,
    tag: "Novo",
    name: "Kit Skincare Completo",
    category: "Beleza",
    price: "R$ 129,90",
    oldPrice: "R$ 159,90",
    discount: "-18%",
    rating: "4.8",
  },
];

// helpers para converter textos em número
function parseBRLToNumber(value: string): number {
  return Number(
    value
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
}

function parsePercentToNumber(value: string): number {
  return Number(value.replace("%", "").replace("-", "").trim());
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* FAIXA DE BENEFÍCIOS / CONFIANÇA */}
      <section className="border-b border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#406945]/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#406945]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Compra Segura
              </p>
              <p className="text-sm text-muted-foreground">
                Proteção em todas as etapas do pedido.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-900/5 flex items-center justify-center">
              <Truck className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Envio Inteligente
              </p>
              <p className="text-sm text-muted-foreground">
                Logística otimizada e rastreio simplificado.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-900/5 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Pagamento Flexível
              </p>
              <p className="text-sm text-muted-foreground">
                Até 10x sem juros nos principais cartões.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HERO PRINCIPAL – BRANCO + DETALHES PRETOS */}
      <section className="bg-background pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="
              relative overflow-hidden rounded-3xl border border-border
              bg-white
              min-h-[260px]
              flex flex-col md:flex-row items-center justify-between
              px-6 md:px-10 py-8 md:py-10
              shadow-[0_18px_55px_rgba(15,15,15,0.08)]
            "
          >
            {/* Formas geométricas minimalistas em preto */}
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -top-6 right-6 w-32 h-32 border border-black/10 rounded-[2rem]" />
              <div className="absolute bottom-4 left-10 w-24 h-24 border border-black/10 rounded-full" />
              <div className="absolute top-10 left-1/3 w-32 h-16 border border-black/10 rounded-3xl rotate-2" />
            </div>

            <div className="relative max-w-xl space-y-4">
              <p className="uppercase tracking-[0.24em] text-xs md:text-sm font-semibold text-gray-600">
                Emagrify Store
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900">
                Produtos selecionados para um dia a dia mais leve.
              </h1>
              <p className="text-sm md:text-base max-w-md text-muted-foreground">
                Combine praticidade, estilo e bem-estar em uma experiência de
                compra pensada nos mínimos detalhes.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="#destaques"
                  className="
                    px-6 py-3 rounded-full 
                    bg-black text-white 
                    text-sm font-semibold
                    hover:bg-gray-900
                    transition
                  "
                >
                  Ver produtos em destaque
                </Link>
                <span className="text-xs md:text-sm text-muted-foreground">
                  + de 300 itens com envio para todo Brasil
                </span>
              </div>
            </div>

            {/* Lado direito – bloco minimalista */}
            <div className="relative mt-6 md:mt-0 md:ml-6 w-full md:w-64 lg:w-72">
              <div
                className="
                  relative rounded-2xl border border-border
                  aspect-[3/4]
                  flex flex-col items-center justify-center
                  text-center text-xs text-gray-700
                  overflow-hidden bg-gray-50
                "
              >
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_0_0,rgba(0,0,0,0.08),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.05),transparent_55%)]" />
                <div className="relative space-y-2 px-4">
                  <p className="uppercase tracking-[0.18em] text-[10px] text-gray-500">
                    Vitrine destaque
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    Espaço ideal para um banner ou coleção principal.
                  </p>
                  <p className="text-[11px] text-gray-600">
                    Depois você pode trocar por fotos reais dos seus produtos
                    mais vendidos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS EM DESTAQUE */}
      <section className="bg-white border-y border-border py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Navegue por categorias
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Moda & Estilo", tag: "Roupas" },
              { label: "Acessórios", tag: "Bolsas & mais" },
              { label: "Beleza & Skincare", tag: "Autocuidado" },
              { label: "Fitness & Bem-estar", tag: "Treinos" },
            ].map((cat) => (
              <button
                key={cat.label}
                className="
                  group rounded-2xl px-4 py-3 text-left
                  bg-white
                  border border-border
                  hover:border-[#406945]
                  hover:bg-[#406945]/3
                  transition-all duration-200
                "
                type="button"
              >
                <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-[#406945]">
                  {cat.tag}
                </span>
                <span className="block text-sm font-semibold mt-1 text-gray-900">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE – COM ProductCard REAL */}
      <section
        id="destaques"
        className="bg-background pb-14 pt-8 border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-4 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Produtos em Destaque
            </h2>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-gray-900 underline-offset-2 hover:underline"
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((item) => {
              const price = parseBRLToNumber(item.price);
              const originalPrice = parseBRLToNumber(item.oldPrice);
              const discount = parsePercentToNumber(item.discount);
              const rating = Number(item.rating);

              return (
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    price,
                    originalPrice,
                    discount,
                    rating,
                    reviewCount: 200,
                    images: ["/images/placeholder-product.jpg"],
                    tags: [item.tag],
                    stock: 20,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO PRETA – “POR QUE EMAGRIFY STORE?” */}
      <section className="bg-black text-white py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <h2 className="text-lg md:text-xl font-semibold">
            Por que comprar na Emagrify Store?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-white/10 px-4 py-5 space-y-2 bg-black/40">
              <p className="text-sm font-semibold">Curadoria inteligente</p>
              <p className="text-sm text-gray-300">
                Produtos selecionados com foco em qualidade, avaliação real e
                experiência de uso.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 px-4 py-5 space-y-2 bg-black/40">
              <p className="text-sm font-semibold">Processo transparente</p>
              <p className="text-sm text-gray-300">
                Comunicação clara sobre prazos, políticas e suporte em todas as
                etapas da compra.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 px-4 py-5 space-y-2 bg-black/40">
              <p className="text-sm font-semibold">Experiência premium</p>
              <p className="text-sm text-gray-300">
                Layout leve, navegação simples e foco total em uma jornada de
                compra confortável.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

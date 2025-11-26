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

// helpers para converter os textos em números para o ProductCard
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
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* FAIXA DE BENEFÍCIOS / CONFIANÇA */}
      <section className="border-b border-border/60 bg-card/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
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
            <div className="w-9 h-9 rounded-full bg-sky-500/15 flex items-center justify-center">
              <Truck className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Envio Inteligente
              </p>
              <p className="text-sm text-muted-foreground">
                Logística otimizada para dropshipping.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/15 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-amber-300" />
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

      {/* HERO PRINCIPAL – FENTY VIBES */}
      <section className="bg-background pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="
              relative overflow-hidden rounded-3xl
              bg-gradient-to-r from-[#f668ff] via-[#ff4da0] to-[#f2c94c]
              min-h-[280px]
              flex flex-col md:flex-row items-center justify-between
              px-6 md:px-10 py-8 md:py-10
              shadow-[0_24px_80px_rgba(0,0,0,0.55)]
            "
          >
            {/* textura geométrica suave no hero */}
            <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light">
              <div className="absolute -top-10 -right-10 w-56 h-56 rounded-[3rem] border border-white/25" />
              <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full border border-white/20" />
              <div className="absolute top-10 left-1/3 w-32 h-32 rotate-12 border border-white/30 rounded-3xl" />
            </div>

            <div className="relative max-w-xl space-y-4">
              <p className="uppercase tracking-[0.24em] text-xs md:text-sm font-semibold text-white/80">
                Mega Promoção Emagrify Store
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-md">
                Até 70% OFF em produtos selecionados
              </h1>
              <p className="text-sm md:text-base max-w-md text-white/90">
                Curadoria de produtos pensados para quem ama praticidade,
                estilo e bem-estar. Aproveite antes que os estoques acabem.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="#destaques"
                  className="
                    px-6 py-3 rounded-full 
                    bg-black/90 text-white 
                    text-sm font-semibold
                    hover:bg-white hover:text-black
                    transition
                    shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                  "
                >
                  Ver produtos em destaque
                </Link>
                <span className="text-xs md:text-sm text-white/90">
                  + de 300 produtos com condições especiais
                </span>
              </div>
            </div>

            {/* Lado direito – “mock” de vitrine / dropshipping */}
            <div className="relative mt-6 md:mt-0 md:ml-6 w-full md:w-64 lg:w-72">
              <div
                className="
                  relative rounded-3xl bg-black/35 border border-white/35
                  aspect-[3/4]
                  flex flex-col items-center justify-center
                  text-center text-xs text-white/85
                  overflow-hidden
                "
              >
                <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_0_0,rgba(255,255,255,0.4),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.25),transparent_55%)]" />
                <div className="relative space-y-2 px-4">
                  <p className="uppercase tracking-[0.18em] text-[10px]">
                    Vitrine inteligente
                  </p>
                  <p className="text-sm font-semibold">
                    Área para foto do banner ou produtos em destaque
                  </p>
                  <p className="text-[11px] text-white/80">
                    Ideal para mostrar o seu combo mais vendido ou coleção nova.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS EM DESTAQUE */}
      <section className="bg-card/40 border-y border-border/60 py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg md:text-xl font-semibold">
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
                  bg-background/70 dark:bg-[#141518]
                  border border-border/70
                  hover:border-emerald-500/80 hover:bg-emerald-500/5
                  transition-all duration-200
                "
                type="button"
              >
                <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-emerald-300">
                  {cat.tag}
                </span>
                <span className="block text-sm font-semibold mt-1">
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
        className="bg-background pb-14 pt-8 border-b border-border/60"
      >
        <div className="max-w-6xl mx-auto px-4 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-2xl font-bold">
              Produtos em Destaque
            </h2>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const price = parseBRLToNumber(product.price);
              const originalPrice = parseBRLToNumber(product.oldPrice);
              const discount = parsePercentToNumber(product.discount);
              const rating = Number(product.rating);

              return (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price,
                    originalPrice,
                    discount,
                    rating,
                    reviewCount: 200,
                    images: ["/images/placeholder-product.jpg"],
                    tags: [product.tag],
                    stock: 20,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO “POR QUE EMAGRIFY STORE?” – PERTO DO FOOTER */}
      <section className="bg-card/40 py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <h2 className="text-lg md:text-xl font-semibold">
            Por que comprar na Emagrify Store?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-background/80 border border-border/70 px-4 py-5 space-y-2">
              <p className="text-sm font-semibold">Curadoria inteligente</p>
              <p className="text-sm text-muted-foreground">
                Selecionamos fornecedores confiáveis, produtos com boa
                avaliação e foco em experiência real do cliente.
              </p>
            </div>

            <div className="rounded-2xl bg-background/80 border border-border/70 px-4 py-5 space-y-2">
              <p className="text-sm font-semibold">Dropshipping transparente</p>
              <p className="text-sm text-muted-foreground">
                Prazos e políticas claras, com acompanhamento de pedido
                simplificado e suporte dedicado.
              </p>
            </div>

            <div className="rounded-2xl bg-background/80 border border-border/70 px-4 py-5 space-y-2">
              <p className="text-sm font-semibold">Experiência premium</p>
              <p className="text-sm text-muted-foreground">
                Layout clean, modo escuro elegante e navegação pensada para ser
                leve em qualquer dispositivo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

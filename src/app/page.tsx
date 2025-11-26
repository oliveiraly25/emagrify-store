"use client";

import Link from "next/link";
import ProductCard from "@/components/custom/product-card";

// Produtos em destaque (dados mockados só para exibir layout)
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
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#0b2618] dark:text-white transition-colors duration-300">
      {/* FAIXA DE BENEFÍCIOS */}
      <section className="bg-slate-50 dark:bg-[#0b2618] pt-6 pb-4 border-b border-slate-200/60 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Compra Segura", desc: "Proteção total" },
            { title: "Ganhe Pontos", desc: "A cada compra" },
            { title: "Entrega Rápida", desc: "Em todo Brasil" },
            { title: "Suporte", desc: "9h às 19h" },
          ].map((item) => (
            <div
              key={item.title}
              className="
                rounded-2xl px-4 py-3 
                bg-white/90 dark:bg-[#123021]/80
                border border-slate-200 dark:border-white/10
                flex flex-col gap-1
                shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)]
              "
            >
              <span className="text-sm font-semibold tracking-wide">
                {item.title}
              </span>
              <span className="text-xs text-slate-500 dark:text-gray-300">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* HERO PRINCIPAL */}
      <section className="bg-white dark:bg-[#0b2618] pb-8 pt-4">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="
              mt-4 rounded-3xl overflow-hidden 
              bg-gradient-to-r from-[#f668ff] via-[#ff4da0] to-[#f2c94c]
              min-h-[260px]
              flex flex-col md:flex-row items-center justify-between
              px-6 md:px-10 py-8 md:py-10
              shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            "
          >
            <div className="max-w-xl space-y-4">
              <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-semibold">
                Mega Promoção
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Até 70% OFF em produtos selecionados
              </h1>
              <p className="text-sm md:text-base max-w-md">
                Descubra ofertas exclusivas em moda, beleza, acessórios e muito
                mais. Aproveite agora antes que acabe!
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="#destaques"
                  className="
                    px-6 py-3 rounded-full 
                    bg-black text-white 
                    text-sm font-semibold
                    hover:bg-white hover:text-black
                    transition
                  "
                >
                  Comprar Agora
                </Link>
                <span className="text-xs md:text-sm">
                  + de 300 produtos em promoção
                </span>
              </div>
            </div>

            {/* LADO DIREITO – ÁREA DE IMAGEM */}
            <div className="mt-6 md:mt-0 md:ml-6 w-full md:w-64 lg:w-72">
              <div
                className="
                  rounded-3xl bg-black/40 border border-white/30
                  aspect-[3/4]
                  flex items-center justify-center
                  text-center text-sm text-white/80
                "
              >
                Área para foto do banner ou produto em destaque
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section
        id="destaques"
        className="bg-slate-50 dark:bg-transparent pb-12 pt-6 border-t border-slate-200/60 dark:border-white/5"
      >
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold">
              Produtos em Destaque
            </h2>
            <Link
              href="#"
              className="text-sm text-slate-600 dark:text-gray-300 hover:text-black dark:hover:text-white underline-offset-2 hover:underline"
            >
              Ver todas &rarr;
            </Link>
          </div>

          {/* GRID usando ProductCard real */}
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
                    images: ["/images/placeholder-product.jpg"], // coloque sua imagem aqui
                    tags: [product.tag],
                    stock: 20,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

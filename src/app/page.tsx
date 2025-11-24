"use client";

import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b2618] text-white">
      {/* FAIXA DE BENEFÍCIOS */}
      <section className="bg-[#0b2618] pt-6 pb-4">
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
                bg-[#123021]/80 
                border border-white/10
                flex flex-col gap-1
              "
            >
              <span className="text-sm font-semibold">{item.title}</span>
              <span className="text-xs text-gray-300">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HERO PRINCIPAL */}
      <section className="bg-[#0b2618] pb-8">
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

            {/* LADO DIREITO – “IMAGEM” SIMPLIFICADA */}
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
        className="bg-[#0b2618] pb-12 pt-4 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold">
              Produtos em Destaque
            </h2>
            <Link
              href="#"
              className="text-sm text-gray-300 hover:text-white underline-offset-2 hover:underline"
            >
              Ver todas &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <article
                key={product.id}
                className="
                  rounded-3xl overflow-hidden 
                  bg-[#10241a] 
                  border border-white/8
                  flex flex-col
                  shadow-[0_12px_35px_rgba(0,0,0,0.35)]
                "
              >
                {/* “Imagem” do produto */}
                <div className="relative h-44 bg-gray-300/20 flex items-center justify-center">
                  <span className="text-xs text-gray-200">
                    Imagem do produto
                  </span>

                  {/* Tag no canto superior esquerdo */}
                  <span
                    className="
                      absolute left-3 top-3 
                      px-2 py-1 rounded-full 
                      bg-[#f2c94c] text-black 
                      text-[11px] font-semibold uppercase tracking-wide
                    "
                  >
                    {product.tag}
                  </span>

                  {/* Desconto no canto superior direito */}
                  <span
                    className="
                      absolute right-3 top-3 
                      px-2 py-1 rounded-full 
                      bg-black/80 text-white 
                      text-[11px] font-semibold
                    "
                  >
                    {product.discount}
                  </span>
                </div>

                {/* Conteúdo */}
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-gray-300">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-semibold leading-snug">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-bold">
                      {product.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-300">
                      ⭐ {product.rating} • 200+ avaliações
                    </span>
                    <button
                      type="button"
                      className="
                        text-xs px-3 py-1.5 rounded-full 
                        bg-white text-black font-semibold
                        hover:bg-[#f2c94c]
                        transition
                      "
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

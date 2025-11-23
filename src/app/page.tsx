'use client';

import HeroBanner from '@/components/custom/hero-banner';
import ProductCard from '@/components/custom/product-card';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants';
import { Gift, Shield, Zap, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured);
  const newProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen dark:bg-[#0d2417] transition-colors">

      {/* Hero Banner */}
      <section className="container mx-auto px-4 py-6 sm:py-8">
        <HeroBanner />
      </section>

      {/* Features */}
      <section className="bg-[#CFE0BC] dark:bg-[#0d2417] text-black dark:text-white py-8 sm:py-12 shadow-sm transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, title: 'Compra Segura', desc: 'Proteção total' },
              { icon: Gift, title: 'Ganhe Pontos', desc: 'A cada compra' },
              { icon: Zap, title: 'Entrega Rápida', desc: 'Em todo Brasil' },
              { icon: Headphones, title: 'Suporte', desc: '9h às 19h' },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-white/20 dark:bg-white/5 backdrop-blur-sm shadow-md hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-black dark:text-white text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-black/70 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
            Categorias
          </h2>
          <Link
            href="/categorias"
            className="text-black dark:text-white hover:text-[#63783D] dark:hover:text-[#CFE0BC] font-medium text-sm sm:text-base"
          >
            Ver Todas →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.id}`}
              className="group bg-white dark:bg-[#123524] rounded-2xl p-4 sm:p-6 text-center shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">
                  {category.id === 'roupas' && '👕'}
                  {category.id === 'acessorios' && '⌚'}
                  {category.id === 'calcados' && '👟'}
                  {category.id === 'suplementos' && '💪'}
                </span>
              </div>
              <h3 className="font-semibold text-black dark:text-white text-xs sm:text-sm group-hover:text-pink-600 transition">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
            Produtos em Destaque
          </h2>

        <Link
            href="/produtos"
            className="text-black dark:text-white hover:text-[#63783D] dark:hover:text-[#CFE0BC] font-medium text-sm sm:text-base"
          >
            Ver Todos →
          </Link>
        </div>

        {/* Novo layout dos cards: menores e mais luxuosos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-[#CFE0BC] dark:bg-[#0d2417] py-8 sm:py-12 transition-colors">
        <div className="container mx-auto px-4">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
              Novidades
            </h2>
            <Link
              href="/novidades"
              className="text-black dark:text-white hover:text-[#63783D] dark:hover:text-[#CFE0BC] font-medium text-sm sm:text-base"
            >
              Ver Todas →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* Points Banner */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="bg-[#CFE0BC] dark:bg-[#123524] dark:text-white rounded-3xl p-8 sm:p-12 text-center text-black font-bold shadow-2xl transition">
          
          <Gift className="w-16 h-16 mx-auto mb-4" />

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 dark:text-white">
            Programa de Pontos Emagrify
          </h2>

          <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto dark:text-gray-200">
            Ganhe pontos a cada compra e troque por descontos incríveis! <br />
            <span className="font-semibold">
              100 pontos = R$ 10,00 de desconto
            </span>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 dark:bg-[#0d2417] py-8 sm:py-12 transition">
        <div className="container mx-auto px-4">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            O Que Nossos Clientes Dizem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[ // Testimonials */}
              {
                name: 'Maria Silva',
                rating: 5,
                comment:
                  'Adorei a experiência de compra! Produtos de qualidade e entrega rápida.',
                avatar:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              },
              {
                name: 'João Santos',
                rating: 5,
                comment:
                  'O sistema de pontos é incrível! Já consegui vários descontos.',
                avatar:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
              },
              {
                name: 'Ana Costa',
                rating: 5,
                comment:
                  'Atendimento excelente e produtos sempre chegam bem embalados.',
                avatar:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
              },
            ].map((t, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#123524] rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-200 dark:border-[#1A4D33]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </h4>

                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300">
                  {t.comment}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

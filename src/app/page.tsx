'use client';

import HeroBanner from '@/components/custom/hero-banner';
import ProductCard from '@/components/custom/product-card';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants';
import { TrendingUp, Zap, Gift, Truck, Shield, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured);
  const newProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen">

      {/* Hero Banner */}
      <section className="container mx-auto px-4 py-6 sm:py-8">
        <HeroBanner />
      </section>

      {/* Features (AGORA PRETO COM TEXTO BRANCO) */}
      <section className="bg-gradient-to-r from-[#CFE0BC] to-[#CFE0BC] text-black py-8 sm:py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { icon: Shield, title: 'Compra Segura', desc: 'Proteção total' },
              { icon: Gift, title: 'Ganhe Pontos', desc: 'A cada compra' },
              { icon: Zap, title: 'Entrega Rápida', desc: 'Em todo Brasil' },
              { icon: Headphones, title: 'Suporte', desc: '9h às 19h' },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/80">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Categorias
          </h2>
          <Link
            href="/categorias"
            className="text-pink-600 hover:text-pink-700 font-medium text-sm sm:text-base"
          >
            Ver Todas →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.id}`}
              className="group bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">
                  {category.id === 'roupas' && '👕'}
                  {category.id === 'acessorios' && '⌚'}
                  {category.id === 'calcados' && '👟'}
                  {category.id === 'suplementos' && '💪'}

                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-xs sm:text-sm group-hover:text-pink-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>


      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-white text-sm mb-1">
<p className="text-xs text-white/80">
            Produtos em Destaque
          </h2>
          <Link
            href="/produtos"
            className="text-black hover:text-black font-medium text-sm sm:text-base"
          >
            Ver Todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
<section className="bg-[#CFE0BC] py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Novidades
            </h2>
            <Link
              href="/novidades"
              className="text-pink-600 hover:text-pink-700 font-medium text-sm sm:text-base"
            >
              Ver Todas →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Points Banner */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
<div className="bg-gradient-to-r from-[#CFE0BC] to-[#CFE0BC] rounded-3xl p-8 sm:p-12 text-center text-black font-bold shadow-2xl">
          <Gift className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Programa de Pontos Emagrify
          </h2>
          <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
            Ganhe pontos a cada compra e troque por descontos incríveis!
            <br />
            <span className="font-semibold">
              100 pontos = R$ 10,00 de desconto
            </span>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
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
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

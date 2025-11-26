"use client";

import { Product } from "@/lib/types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="card-clean shadow-sm transition hover:shadow-lg overflow-hidden group">

      <Link href={`/produto/${product.id}`} className="block relative">
        {/* Imagem */}
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition group-hover:scale-105"
          />

          {/* TAG */}
          {product.tags?.[0] && (
            <span className="absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full bg-[#406945] text-white shadow">
              {product.tags[0]}
            </span>
          )}

          {/* DESCONTO */}
          {product.discount > 0 && (
            <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full bg-black text-white shadow">
              -{product.discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-2">

        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </p>

        <Link href={`/produto/${product.id}`}>
          <h3 className="font-semibold text-sm leading-tight hover:text-[#406945] transition">
            {product.name}
          </h3>
        </Link>

        {/* AVALIAÇÃO */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-600">
            ({product.reviewCount})
          </span>
        </div>

        {/* PREÇOS */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">R$ {product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              R$ {product.originalPrice}
            </span>
          )}
        </div>

        {/* Botão */}
        <button
          onClick={(e) => e.preventDefault()}
          className="btn-black w-full mt-2 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4" />
          Adicionar ao carrinho
        </button>

      </div>
    </div>
  );
}

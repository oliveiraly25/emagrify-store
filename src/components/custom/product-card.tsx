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

  const productImage =
    product.images?.[0] ||
    "https://via.placeholder.com/400x500.png?text=Sem+Imagem";

  return (
    <div className="card-clean shadow-sm transition hover:shadow-xl overflow-hidden group rounded-2xl">

      {/* LINK DO PRODUTO */}
      <Link href={`/produto/${product.id}`} className="block relative">

        {/* IMAGEM */}
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover transition group-hover:scale-105"
          />

          {/* TAG (ex: Novo, Promoção) */}
          {product.tags?.length > 0 && (
            <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full bg-[#406945] text-white shadow">
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

      {/* DADOS DO PRODUTO */}
      <div className="p-4 space-y-2">

        {/* CATEGORIA */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category || "Sem categoria"}
        </p>

        {/* NOME */}
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
                i < Math.floor(product.rating || 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-600">
            ({product.reviewCount || 0})
          </span>
        </div>

        {/* PREÇO */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">
            R$ {product.price?.toFixed(2)}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              R$ {product.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>

        {/* BOTÃO */}
        <button
          onClick={(e) => e.preventDefault()}
          className="
            btn-black w-full mt-2 
            flex items-center justify-center gap-2
            rounded-full py-2
          "
        >
          <ShoppingCart className="w-4" />
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

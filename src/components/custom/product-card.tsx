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
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercent = product.discount || 0;
  const hasDiscount = discountPercent > 0;

  const isNew = product.tags?.includes("Novo");
  const isPromo = product.tags?.includes("Promoção");

  return (
    <div
      className="
        group rounded-xl
        bg-white dark:bg-[#152418]
        border border-gray-200 dark:border-[#325436]/70
        shadow-md dark:shadow-[0_16px_40px_rgba(0,0,0,0.55)]
        hover:shadow-xl dark:hover:shadow-[0_22px_60px_rgba(0,0,0,0.8)]
        transition-all duration-300 overflow-hidden
      "
    >
      {/* Image Container */}
      <Link
        href={`/produto/${product.id}`}
        className="
          relative block aspect-[3/4]
          overflow-hidden
          bg-gray-100 dark:bg-[#111718]
        "
      >
        {/* Tags */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-lg">
              NOVO
            </span>
          )}
          {isPromo && (
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
              PROMOÇÃO
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{discountPercent}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="
            absolute bottom-3 right-3 z-10 w-9 h-9
            bg-white/95 dark:bg-[#141d18]
            rounded-full flex items-center justify-center
            shadow-lg hover:scale-110 transition-transform
          "
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? "fill-emerald-500 text-emerald-500"
                : "text-gray-400 dark:text-gray-200"
            } transition-colors`}
          />
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-300 dark:bg-[#152418] animate-pulse" />
          )}

          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Add to Cart button on Hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-all duration-300">
          <button className="w-full bg-[#325436] hover:bg-[#273f29] text-white py-3 text-sm font-semibold flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Adicionar ao Carrinho
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <p className="text-[11px] text-gray-500 dark:text-emerald-200/80 uppercase tracking-[0.18em] mb-1">
          {product.category}
        </p>

        <Link href={`/produto/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 hover:text-[#325436] dark:hover:text-emerald-200 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-200">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-bold text-gray-900 dark:text-emerald-50">
            R$ {product.price.toFixed(2)}
          </span>

          {hasDiscount && product.originalPrice && (
            <span className="text-xs text-gray-400 line-through dark:text-emerald-200/60">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-[11px] text-orange-600 dark:text-amber-300 font-medium">
            Apenas {product.stock} unidades restantes!
          </p>
        )}

        {product.stock === 0 && (
          <p className="text-[11px] text-red-600 dark:text-red-400 font-medium">
            Esgotado
          </p>
        )}
      </div>
    </div>
  );
}

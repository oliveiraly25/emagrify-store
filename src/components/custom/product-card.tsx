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
    <div className="group bg-white dark:bg-[#123524] rounded-2xl shadow-md hover:shadow-2xl dark:hover:shadow-black/40 border border-gray-200 dark:border-[#1A4D33] transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <Link
        href={`/produto/${product.id}`}
        className="relative block aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-[#0d2417]"
      >
        {/* Tags */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full shadow-lg">
              NOVO
            </span>
          )}
          {isPromo && (
            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
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
          className="absolute bottom-3 right-3 z-10 w-10 h-10 bg-white dark:bg-[#0d2417] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? "fill-pink-500 text-pink-500"
                : "text-gray-400 dark:text-gray-200"
            } transition-colors`}
          />
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-300 dark:bg-[#123524] animate-pulse" />
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
          <button className="w-full bg-[#63783D] hover:bg-[#4E5F30] text-white py-3 font-semibold flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Adicionar ao Carrinho
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        <Link href={`/produto/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-[#63783D] dark:hover:text-[#CFE0BC] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-500"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            R$ {product.price.toFixed(2)}
          </span>

          {hasDiscount && product.originalPrice && (
            <span className="text-sm text-gray-400 line-through dark:text-gray-500">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
            Apenas {product.stock} unidades restantes!
          </p>
        )}

        {product.stock === 0 && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            Esgotado
          </p>
        )}
      </div>
    </div>
  );
}

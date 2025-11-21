'use client';

import { Product } from '@/lib/types';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercent = product.discount || 0;
  const hasDiscount = discountPercent > 0;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <Link href={`/produto/${product.id}`} className="relative block aspect-[3/4] overflow-hidden bg-gray-100">
        {/* Tags */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{discountPercent}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute bottom-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'
            } transition-colors`}
          />
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Quick Add to Cart - Appears on Hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 font-semibold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            Adicionar ao Carrinho
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Product Name */}
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-pink-600 transition-colors">
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
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">
            R$ {product.price.toFixed(2)}
          </span>
          {hasDiscount && product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-orange-600 font-medium">
            Apenas {product.stock} unidades restantes!
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-600 font-medium">Esgotado</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ProductCard from "@/components/custom/product-card";
import { Product } from "@/lib/types";

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data as Product[]);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6 font-tusca tracking-wide">
        Catálogo
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 mt-10">Carregando produtos...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          Nenhum produto disponível no momento.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  };
}

export default function ProdutoPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    async function loadProduct() {
      // produto
      const { data: prod } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      setProduct(prod);

      // reviews
      const { data: rev } = await supabase
        .from("reviews")
        .select("*, profiles(first_name,last_name)")
        .eq("product_id", id)
        .order("created_at", { ascending: false });

      if (rev) {
        setReviews(rev);

        const avg =
          rev.reduce((sum, r) => sum + r.rating, 0) /
          (rev.length === 0 ? 1 : rev.length);

        setAverage(Number(avg.toFixed(1)));
      }

      setLoading(false);
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Carregando produto...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Produto não encontrado.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* IMAGEM + INFO */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* imagem principal */}
        <div className="w-full md:w-1/2">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-xl object-cover border"
          />
        </div>

        {/* detalhes */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-lg font-medium">R$ {product.price}</p>

          {/* MÉDIA DE ESTRELAS */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={`w-6 h-6 ${
                  n <= Math.round(average)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600 text-sm">
              {average} de 5 ({reviews.length} avaliações)
            </span>
          </div>

          {/* botão avaliar */}
          <Link
            href={`/produto/${id}/avaliar`}
            className="px-5 py-2 bg-black text-white rounded-full inline-flex items-center gap-2 hover:bg-[#406945] transition"
          >
            <MessageSquare size={18} />
            Avaliar produto
          </Link>
        </div>
      </div>

      {/* LISTA DE REVIEWS */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Avaliações dos clientes</h2>

        {reviews.length === 0 && (
          <p className="text-gray-600">Nenhuma avaliação ainda.</p>
        )}

        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className="p-4 border rounded-xl shadow-sm bg-white">
              {/* estrelas individuais */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`w-5 h-5 ${
                      n <= r.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* texto */}
              <p className="mt-2 text-gray-800">{r.comment}</p>

              {/* autor */}
              <p className="mt-1 text-sm text-gray-500">
                — {r.profiles?.first_name || "Usuário"}{" "}
                {r.profiles?.last_name || ""}
              </p>

              {/* data */}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(r.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AvaliarProduto() {
  const { id } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Escolha uma nota.");
      return;
    }

    setLoading(true);

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Você precisa estar logado para avaliar.");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      product_id: id,
      user_id: user.id,
      rating,
      comment,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Avaliação enviada!");
    router.push(`/produto/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Avaliar Produto</h1>

      {/* Estrelas */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl ${
              rating >= star ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Comentário */}
      <textarea
        className="w-full border p-3 rounded mb-4"
        rows={5}
        placeholder="Escreva um comentário (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Botão */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-black w-full py-3 text-lg"
      >
        {loading ? "Enviando..." : "Enviar Avaliação"}
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star } from "lucide-react";
import supabase from "@/lib/supabaseClient";

export default function AvaliarProduto() {
  const { id } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  async function enviar() {
    setSending(true);

    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) {
      alert("Você precisa estar logado para avaliar.");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      product_id: id,
      user_id: user.user.id,
      rating,
      comment,
    });

    if (error) {
      alert("Erro ao enviar avaliação.");
      setSending(false);
      return;
    }

    alert("Avaliação enviada!");
    router.push(`/produto/${id}`);
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10">

      <h1 className="text-2xl font-bold mb-6">Avaliar Produto</h1>

      {/* estrelas */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`w-8 h-8 cursor-pointer ${
              n <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-400"
            }`}
            onClick={() => setRating(n)}
          />
        ))}
      </div>

      {/* comentário */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-3 rounded-lg"
        rows={4}
        placeholder="Escreva sua opinião..."
      ></textarea>

      <button
        onClick={enviar}
        disabled={sending}
        className="mt-4 px-5 py-2 bg-black text-white rounded-full hover:bg-[#406945] transition"
      >
        {sending ? "Enviando..." : "Enviar avaliação"}
      </button>

    </div>
  );
}

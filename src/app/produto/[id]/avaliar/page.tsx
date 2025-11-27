"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star } from "lucide-react";
import supabase from "@/lib/supabaseClient";

export default function AvaliarProduto() {
  const { id } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Verificar se o usuário já avaliou recentemente
  // ==========================================
  useEffect(() => {
    async function checkReview() {
      const { data: session } = await supabase.auth.getUser();

      if (!session?.user) {
        setBlockedMsg("Você precisa estar logado para avaliar.");
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      const { data: review } = await supabase
        .from("reviews")
        .select("created_at")
        .eq("product_id", id)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (review && review.length > 0) {
        const last = new Date(review[0].created_at);
        const days = (Date.now() - last.getTime()) / (1000 * 60 * 60 * 24);

        if (days < 15) {
          setBlockedMsg(
            `Você já avaliou este produto há ${Math.floor(
              days
            )} dias. Só poderá avaliar novamente após 15 dias.`
          );
        }
      }

      setLoading(false);
    }

    checkReview();
  }, [id]);

  // ==========================================
  // Enviar avaliação
  // ==========================================
  async function enviar() {
    if (sending) return;

    if (rating === 0) {
      alert("Selecione uma nota entre 1 e 5.");
      return;
    }

    setSending(true);

    const { data: session } = await supabase.auth.getUser();

    if (!session?.user) {
      alert("Você precisa estar logado.");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      product_id: id,
      user_id: session.user.id,
      rating,
      comment,
    });

    if (error) {
      console.log(error);
      alert("Erro ao enviar avaliação.");
      setSending(false);
      return;
    }

    alert("Avaliação enviada com sucesso!");
    router.push(`/produto/${id}`);
  }

  if (loading) {
    return <p className="p-6 text-center">Carregando...</p>;
  }

  if (blockedMsg) {
    return (
      <div className="max-w-xl mx-auto px-6 py-10 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Você não pode avaliar agora ❗
        </h2>
        <p className="text-gray-700">{blockedMsg}</p>

        <button
          onClick={() => router.push(`/produto/${id}`)}
          className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-[#406945] transition"
        >
          Voltar ao produto
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Avaliar Produto</h1>

      {/* estrelas */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`w-9 h-9 cursor-pointer ${
              n <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
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
        className="
          mt-4 px-5 py-2 
          bg-black text-white rounded-full 
          hover:bg-[#406945] 
          transition
        "
      >
        {sending ? "Enviando..." : "Enviar avaliação"}
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleReset(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/resetar-senha`,
    });

    if (error) {
      setError("Não foi possível enviar o email. Verifique se o email está correto.");
      setLoading(false);
      return;
    }

    setMessage("Enviamos um link para redefinir sua senha! 📨");
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-[#F7F7F7]">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-7"
      >
        {/* TÍTULO */}
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Recuperar Senha
        </h1>

        {/* INPUT */}
        <label className="block text-sm font-medium text-black mb-1">
          Email cadastrado
        </label>
        <input
          type="email"
          required
          className="
            w-full border border-[#D9D9D9]
            rounded-lg p-3 mb-4
            bg-white text-black
            placeholder-gray-600
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* MENSAGENS */}
        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {message && (
          <p className="text-green-600 text-sm mb-3">{message}</p>
        )}

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-lg font-semibold
            bg-[#406945] text-white hover:bg-[#355536]
            transition
          "
        >
          {loading ? "Enviando..." : "Enviar link"}
        </button>
      </form>
    </div>
  );
}

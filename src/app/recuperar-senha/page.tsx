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
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-[#111] px-4">
      <form
        onSubmit={handleReset}
        className="bg-white dark:bg-[#1a1a1a] p-8 rounded-xl shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
          Recuperar Senha
        </h1>

        <label className="block text-sm font-medium mb-1 text-black dark:text-white">
          Email cadastrado
        </label>
        <input
          type="email"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-3">{message}</p>}

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold bg-black text-white dark:bg-[#CFE0BC] dark:text-black"
        >
          {loading ? "Enviando..." : "Enviar Link"}
        </button>
      </form>
    </div>
  );
}

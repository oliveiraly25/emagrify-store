"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../../lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleRegister(e: any) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
      setCarregando(false);
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        <label className="block text-sm font-medium mb-1">Email:</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1">Senha:</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          disabled={carregando}
        >
          {carregando ? "Criando conta..." : "Registrar"}
        </button>

        <p className="text-center text-sm mt-4">
          Já tem conta?{" "}
          <a href="/login" className="text-pink-600 hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}

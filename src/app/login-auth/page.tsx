"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

function LoginAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Preenche o email vindo da URL
  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  async function handleLogin(e: any) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Email ou senha incorretos.");
      setCarregando(false);
      return;
    }

    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white border border-gray-200 shadow-md px-8 py-10 rounded-xl flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Entrar</h1>

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-3 rounded-lg"
        />

        {/* Campo de senha com mostrar/ocultar */}
        <div className="relative">
          <input
            type={showSenha ? "text" : "password"}
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="border p-3 rounded-lg w-full"
          />

          <button
            type="button"
            onClick={() => setShowSenha(!showSenha)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

        <button className="bg-[#63783D] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm mt-4">
          Esqueceu a senha?{" "}
          <span className="text-green-700 underline cursor-pointer">
            Recuperar acesso
          </span>
        </p>
      </form>
    </div>
  );
}

export default function LoginAuthPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Carregando...</div>}>
      <LoginAuthContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

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
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-[#F7F7F7]
      "
    >
      <div
        className="
          w-full max-w-sm bg-white
          border border-[#E5E5E5]
          shadow-sm rounded-2xl p-7
          flex flex-col gap-4 text-black
        "
      >
        {/* TÍTULO */}
        <h1 className="text-center text-2xl font-bold mb-2 tracking-tight">
          Entrar
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              border border-[#D9D9D9]
              rounded-lg p-3 w-full bg-white
              text-black placeholder-gray-600
            "
            required
          />

          {/* SENHA */}
          <div className="relative">
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="
                border border-[#D9D9D9]
                rounded-lg p-3 w-full bg-white
                text-black placeholder-gray-600
              "
              required
            />

            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
            >
              {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* ERRO */}
          {erro && (
            <p className="text-red-500 text-center text-sm">{erro}</p>
          )}

          {/* BOTÃO ENTRAR */}
          <button
            className="
              w-full py-3 rounded-lg font-semibold transition
              bg-[#406945] text-white hover:bg-[#355536]
            "
            type="submit"
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* ESQUECEU A CONTA */}
        <p className="text-center text-sm text-black cursor-pointer hover:underline">
          Esqueceu a conta?
        </p>

        {/* DIVISOR */}
        <div className="flex items-center my-1">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-3 text-gray-500 text-sm">ou</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* BOTÃO CRIAR CONTA */}
        <button
          onClick={() => router.push("/register")}
          className="
            w-full py-3 rounded-lg font-semibold transition
            bg-white text-[#406945] border border-[#406945]
            hover:bg-[#F3F6F3]
          "
        >
          Criar nova conta
        </button>
      </div>
    </div>
  );
}

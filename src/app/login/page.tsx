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

  async function handleLogin(e) {
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
        min-h-screen flex items-center justify-center px-4 transition-colors
        bg-[#F2F2F2] dark:bg-[#111]
      "
    >
      <div
        className="
          w-full max-w-sm bg-white dark:bg-[#1a1a1a]
          shadow-lg rounded-xl p-6 flex flex-col gap-4
        "
      >
        {/* TÍTULO */}
        <h1 className="text-center text-2xl font-bold mb-2 text-black dark:text-white">
          Entrar
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            type="text"
            placeholder="Email ou telefone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              border rounded-lg p-3 w-full
              bg-white dark:bg-[#222]
              text-black dark:text-black
              placeholder-gray-600 dark:placeholder-gray-300
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
                border rounded-lg p-3 w-full
                bg-white dark:bg-[#222]
                text-black dark:text-black
                placeholder-gray-600 dark:placeholder-gray-300
              "
              required
            />

            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-white"
            >
              {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* ERRO */}
          {erro && (
            <p className="text-red-500 text-center text-sm">{erro}</p>
          )}

          {/* BOTÃO ENTRAR — COR INVERTIDA */}
          <button
            className="
              w-full py-3 rounded-lg font-semibold transition
              bg-black text-white
              dark:bg-[#CFE0BC] dark:text-#0d2417
            "
            type="submit"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* ESQUECEU A CONTA */}
        <p className="text-center text-sm text-black dark:text-white cursor-pointer hover:underline">
          Esqueceu a conta?
        </p>

        {/* DIVISOR */}
        <div className="flex items-center my-2">
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></span>
          <span className="px-3 text-gray-500 dark:text-gray-300 text-sm">
            ou
          </span>
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></span>
        </div>

        {/* BOTÃO CRIAR CONTA — COR INVERTIDA */}
        <button
          onClick={() => router.push("/register")}
          className="
            w-full py-3 rounded-lg font-semibold transition
            bg-black text-white
            dark:bg-[#CFE0BC] dark:text-#0d2417
          "
        >
          Criar nova conta
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

export default function LoginAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Preenche o e-mail vindo da tela anterior automaticamente
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
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gray-100 dark:bg-[#111]
        transition-colors
      "
    >
      <div
        className="
          w-full max-w-sm bg-white dark:bg-white
          shadow-xl rounded-xl p-6 flex flex-col gap-4
          transition-colors
        "
      >
        <h1 className="text-center text-2xl font-bold mb-2 text-black">
          Entrar
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email ou telefone */}
          <input
            type="text"
            placeholder="Email ou telefone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              border rounded-lg p-3 w-full 
              bg-white dark:bg-white 
              text-black placeholder-gray-500
            "
            required
          />

          {/* Senha com mostrar/ocultar */}
          <div className="relative">
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="
                border rounded-lg p-3 w-full
                bg-white dark:bg-white
                text-black placeholder-gray-500
              "
              required
            />

            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
            >
              {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Erro */}
          {erro && <p className="text-red-500 text-center text-sm">{erro}</p>}

          {/* Botão entrar */}
          <button
            className="
              w-full py-3 rounded-lg text-black font-semibold
              transition-colors
              dark:text-white
            "
            style={{
              backgroundColor: "#CFE0BC",
            }}
            type="submit"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Esqueceu a conta */}
        <p
          className="
            text-center text-sm cursor-pointer hover:underline
          "
          style={{ color: "#111" }} // sempre preto
        >
          Esqueceu a conta?
        </p>

        {/* Divider */}
        <div className="flex items-center my-2">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-3 text-gray-500 text-sm">ou</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* Criar nova conta */}
        <button
          onClick={() => router.push("/login")}
          className="
            w-full py-3 rounded-lg text-black font-semibold
            transition-colors dark:text-white
          "
          style={{
            backgroundColor: "#CFE0BC",
          }}
        >
          Criar nova conta
        </button>
      </div>
    </div>
  );
}

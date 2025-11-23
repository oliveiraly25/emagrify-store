"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

function LoginAuthContent() {
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

  async function handleLogin(e: React.FormEvent) {
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
        bg-[#F2F2F2] dark:bg-[#111]
        transition-colors duration-300
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="
          w-full max-w-sm
          bg-white rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.10)]
          p-6 sm:p-8
          flex flex-col gap-4
        "
      >
        <h1 className="text-center text-2xl font-bold mb-2 text-black">
          Entrar
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email ou telefone */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Email ou telefone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full p-3 rounded-lg border border-gray-300
                bg-white text-black placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#CFE0BC] focus:border-transparent
                text-sm
              "
              required
            />
          </div>

          {/* Senha com mostrar/ocultar */}
          <div className="relative flex flex-col gap-1">
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="
                w-full p-3 rounded-lg border border-gray-300
                bg-white text-black placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#CFE0BC] focus:border-transparent
                text-sm
              "
              required
            />

            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-600 hover:text-gray-800
                transition-colors
              "
            >
              {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {erro && (
            <p className="text-red-600 text-center text-xs font-medium">
              {erro}
            </p>
          )}

          {/* Botão entrar */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="
              w-full py-3 rounded-lg font-semibold
              bg-[#CFE0BC] text-black
              dark:bg-[#0d2417] dark:text-white
              shadow-md hover:shadow-lg
              transition-all duration-200
            "
            type="submit"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </motion.button>
        </form>

        {/* Esqueceu a conta */}
        <button
          type="button"
          className="
            text-center text-sm font-medium
            text-black
            underline-offset-2 hover:underline
            mt-1
          "
        >
          Esqueceu a conta?
        </button>

        {/* Divider */}
        <div className="flex items-center my-2 gap-3">
          <span className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-xs uppercase tracking-[0.18em]">
            ou
          </span>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Criar nova conta */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => router.push("/login")}
          className="
            w-full py-3 rounded-lg font-semibold
            bg-[#CFE0BC] text-black
            dark:bg-[#0d2417] dark:text-white
            shadow-md hover:shadow-lg
            transition-all duration-200
          "
        >
          Criar nova conta
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function LoginAuth() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Carregando...</p>}>
      <LoginAuthContent />
    </Suspense>
  );
}

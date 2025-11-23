"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function LoginRegister() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [identifier, setIdentifier] = useState("");

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleIdentifierCheck(e: any) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const inputEmail = identifier.toLowerCase().trim();

    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", inputEmail)
      .maybeSingle();

    if (data) {
      router.push(`/login-auth?email=${encodeURIComponent(inputEmail)}`);
      return;
    }

    setEmail(inputEmail);
    setStep(2);
    setCarregando(false);
  }

  async function handleRegister(e: any) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    if (email !== emailConfirm) {
      setErro("Os e-mails não coincidem.");
      setCarregando(false);
      return;
    }

    if (senha !== senhaConfirm) {
      setErro("As senhas não coincidem.");
      setCarregando(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
      setCarregando(false);
      return;
    }

    await supabase.from("profiles").insert({
      id: data.user?.id,
      full_name: `${nome} ${sobrenome}`,
      email,
      phone: telefone,
      age: idade,
      gender: genero,
      role: "user",
    });

    await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    router.push("/");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-colors
      bg-[#F2F2F2] dark:bg-[#111]"
    >
      <div
        className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4
        transition-all duration-300"
      >
        <h1 className="text-2xl font-bold text-center">
          Seja bem-vindo(a) à Loja Emagrify
        </h1>

        <p className="text-xs text-green-700 text-center">
          🔒 Seus dados estão protegidos.
        </p>

        {/* ===================== ETAPA 1 ===================== */}
        {step === 1 && (
          <form onSubmit={handleIdentifierCheck} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Número de celular ou E-mail"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="border p-3 rounded-lg bg-white text-black dark:text-black dark:bg-white"
              required
            />

            {/* BOTÃO AJUSTADO */}
            <button
              className="
                w-full py-3 rounded-lg font-semibold transition
                bg-black text-white
                dark:bg-[#CFE0BC] dark:text-black
              "
            >
              {carregando ? "Verificando..." : "CONTINUAR"}
            </button>
          </form>
        )}

        {/* ===================== ETAPA 2 ===================== */}
        {step === 2 && (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Criar Conta</h2>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border p-3 rounded-lg w-1/2 bg-white text-black dark:bg-white dark:text-black"
                required
              />

              <input
                type="text"
                placeholder="Sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                className="border p-3 rounded-lg w-1/2 bg-white text-black dark:bg-white dark:text-black"
                required
              />
            </div>

            <input
              type="number"
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              className="border p-3 rounded-lg bg-white text-black dark:bg-white dark:text-black"
              required
            />

            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="border p-3 rounded-lg bg-white text-black dark:bg-white dark:text-black"
              required
            >
              <option value="">Selecione o gênero</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              disabled
              className="border p-3 rounded-lg bg-gray-200 text-black dark:bg-gray-300"
            />

            <input
              type="email"
              placeholder="Confirmar e-mail"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              className="border p-3 rounded-lg bg-white text-black dark:bg-white dark:text-black"
              required
            />

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="border p-3 rounded-lg bg-white text-black dark:bg-white dark:text-black"
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border p-3 rounded-lg bg-white text-black dark:bg-white dark:text-black"
              required
            />

            <input
              type="password"
              placeholder="Confirmar senha"
              value={senhaConfirm}
              onChange={(e) => setSenhaConfirm(e.target.value)}
              className="border p-3 rounded-lg bg-white text-black dark:bg-white dark:text-black"
              required
            />

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            {/* BOTÃO AJUSTADO */}
            <button
              className="
                w-full py-3 rounded-lg font-semibold transition
                bg-black text-white
                dark:bg-[#CFE0BC] dark:text-black
              "
            >
              {carregando ? "Criando conta..." : "Registrar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

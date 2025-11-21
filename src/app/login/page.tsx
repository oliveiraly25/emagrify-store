"use client";

import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function LoginRegister() {
  const [step, setStep] = useState<1 | 2>(1);

  // Etapa 1
  const [identifier, setIdentifier] = useState("");

  // Etapa 2
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

    let inputEmail = identifier.toLowerCase().trim();

    // verifica se já existe
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", inputEmail)
      .maybeSingle();

    // Se já existe → login
    if (existingUser) {
      window.location.href = "/login-real";
      return;
    }

    // Se não existe → ir para etapa 2
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

    // salva dados no perfil
    await supabase.from("profiles").insert({
      id: data.user?.id,
      full_name: `${nome} ${sobrenome}`,
      email: email,
      phone: telefone,
      age: idade,
      gender: genero,
      role: "user",
    });

    alert("Conta criada com sucesso!");
    window.location.href = "/login-real";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-2xl font-bold mb-3">Já Sou Cliente/Registrar</h1>
      <p className="text-green-700 text-xs mb-6">🔒 Seus dados estão protegidos.</p>

      {/* ETAPA 1 */}
      {step === 1 && (
        <form
          onSubmit={handleIdentifierCheck}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Número de celular ou E-mail"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <button className="bg-black text-white py-3 rounded-lg font-semibold">
            {carregando ? "Verificando..." : "CONTINUAR"}
          </button>

          <p className="text-center text-xs text-gray-600 mt-8">
            Ao continuar, você concorda com nossa{" "}
            <span className="underline cursor-pointer">Política de Privacidade</span>{" "}
            e{" "}
            <span className="underline cursor-pointer">Termos e Condições</span>.
          </p>
        </form>
      )}

      {/* ETAPA 2 */}
      {step === 2 && (
        <form
          onSubmit={handleRegister}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold mb-2">Criar Conta</h2>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="border p-3 rounded-lg w-1/2"
            />

            <input
              type="text"
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
              className="border p-3 rounded-lg w-1/2"
            />
          </div>

          <input
            type="number"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
            className="border p-3 rounded-lg"
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
            className="border p-3 rounded-lg bg-gray-100"
            disabled
          />

          <input
            type="email"
            placeholder="Confirmar e-mail"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={senhaConfirm}
            onChange={(e) => setSenhaConfirm(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold">
            {carregando ? "Criando conta..." : "Registrar"}
          </button>
        </form>
      )}
    </div>
  );
}

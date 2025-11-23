"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email !== confirmEmail) {
      setError("Os emails não coincidem.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (!gender) {
      setError("Selecione um gênero.");
      setLoading(false);
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const userId = authData.user?.id;

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      gender,
      age: Number(age),
      phone,
      email_confirmed: true,
      role: "user",
    });

    if (profileError) {
      setError("Erro ao salvar dados do perfil.");
      setLoading(false);
      return;
    }

    router.push("/login-auth");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-[#111] px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-[#1a1a1a] p-8 rounded-xl shadow-md w-full max-w-lg text-black dark:text-white"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        {/* Inputs */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded-lg mb-4 text-black dark:text-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Sobrenome</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded-lg mb-4 text-black dark:text-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

{/* Gênero */}
<label className="block text-sm font-medium mb-1 text-black dark:text-white">
  Gênero
</label>

<select
  required
  className="
    w-full border px-3 py-2 rounded-lg mb-4
    bg-white text-black
    dark:bg-[#222] dark:text-white
    dark:[color-scheme:dark]
  "
  value={gender}
  onChange={(e) => setGender(e.target.value)}
>
  <option value="">Selecione...</option>
  <option value="feminino">Feminino</option>
  <option value="masculino">Masculino</option>
  <option value="outro">Outro</option>
</select>


        {/* Idade */}
        <label className="block text-sm font-medium mb-1">Idade</label>
        <input
          type="number"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 text-black dark:text-white"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* Telefone */}
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <input
          type="text"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 text-black dark:text-white"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 text-black dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Confirmar Email */}
        <label className="block text-sm font-medium mb-1">Confirmar Email</label>
        <input
          type="email"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 text-black dark:text-white"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />

        {/* Senha */}
        <label className="block text-sm font-medium mb-1">Senha</label>
        <input
          type="password"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 text-black dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirmar Senha */}
        <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
        <input
          type="password"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 text-black dark:text-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* BOTÃO REGISTRAR */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-lg font-semibold transition
            bg-[#0d2417] text-white
            dark:bg-[#CFE0BC] dark:text-black
          "
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Registrar"}
        </button>

        <p className="text-center text-sm mt-4 text-black dark:text-white">
          Já tem conta?{" "}
          <a
            href="/login-auth"
            className="text-green-700 dark:text-green-400 hover:underline"
          >
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}

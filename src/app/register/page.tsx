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

    // Validações básicas
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

    // CREA USER NO SUPABASE
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

    // SALVA DADOS EXTRAS NA TABELA PROFILES
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      gender,
      age: Number(age),
      phone,
      email_confirmed: true, // porque os emails coincidiram manualmente
      role: "user",
    });

    if (profileError) {
      setError("Erro ao salvar dados do perfil.");
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        {/* NOME */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded-lg mb-4"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Sobrenome</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded-lg mb-4"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* GÊNERO */}
        <label className="block text-sm font-medium mb-1">Gênero</label>
        <select
          required
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="outro">Outro</option>
        </select>

        {/* IDADE */}
        <label className="block text-sm font-medium mb-1">Idade</label>
        <input
          type="number"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* TELEFONE */}
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <input
          type="text"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* EMAIL */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* CONFIRMAR EMAIL */}
        <label className="block text-sm font-medium mb-1">Confirmar Email</label>
        <input
          type="email"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />

        {/* SENHA */}
        <label className="block text-sm font-medium mb-1">Senha</label>
        <input
          type="password"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRMAR SENHA */}
        <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
        <input
          type="password"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Registrar"}
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

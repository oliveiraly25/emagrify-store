"use client";

import { useState } from "react";
import supabase from '../../../lib/supabaseClient';

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("As senhas não coincidem.");
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          gender: form.gender,
          birthdate: form.birthdate,
        },
      },
    });

    setLoading(false);

    if (error) {
      return setError(error.message);
    }

    router.push("/login?registered=1");
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 shadow-lg rounded-xl bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Criar Conta</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium">Nome:</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Email:</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Gênero:</label>
          <select
            name="gender"
            className="w-full border p-2 rounded"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
            <option value="nao_informar">Prefiro não informar</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Data de nascimento:</label>
          <input
            type="date"
            name="birthdate"
            className="w-full border p-2 rounded"
            value={form.birthdate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Senha:</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Confirmar senha:</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border p-2 rounded"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90"
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Já tem uma conta?{" "}
        <a href="/login" className="text-pink-500 font-medium">
          Entrar
        </a>
      </p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
      setCarregando(false);
      return;
    }

    router.push('/admin');
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Entrar</h1>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {erro && (
          <p className="text-red-600 text-sm mb-2">{erro}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-300 to-blue-300 py-3 rounded font-semibold"
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

        {/* 🔥 AQUI ESTÁ O BOTÃO DE REGISTRAR */}
        <p className="text-center text-sm mt-4">
          Não tem conta?{' '}
         <a href="/register" className="text-pink-600 hover:underline">
  Criar conta
</a>

        </p>
      </form>
    </div>
  );
}

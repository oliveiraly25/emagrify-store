"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, ShoppingCart, Heart, Menu, X } from "lucide-react";
import supabase from "@/lib/supabaseClient";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState(false);

  // 🔥 Carregar usuário + perfil automaticamente
  useEffect(() => {
    async function loadUser() {
      const { data: auth } = await supabase.auth.getUser();
      if (auth?.user) {
        setUser(auth.user);

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", auth.user.id)
          .maybeSingle();

        setProfile(profileData);
      }
    }

    // Primeiro carregamento
    loadUser();

    // Atualiza automaticamente quando login/logout acontecer
    supabase.auth.onAuthStateChange(() => {
      loadUser();
    });
  }, []);

  // 🔥 Logout
  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.href = "/";
  }

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center font-bold">
            E
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Emagrify Store
          </span>
        </Link>

        {/* ÍCONES */}
        <div className="flex items-center gap-4">

          {/* FAVORITOS */}
          <Heart className="w-6 h-6 cursor-pointer text-gray-700" />

          {/* CARRINHO */}
          <ShoppingCart className="w-6 h-6 cursor-pointer text-gray-700" />

          {/* 🔥 SE ESTIVER LOGADO → MOSTRA MENU DO USUÁRIO */}
          {user && profile ? (
            <div className="relative group">
              <button className="flex items-center gap-2 bg-[#63783D] text-white px-4 py-2 rounded-full">
                <User className="w-4 h-4" />
                {profile.full_name?.split(" ")[0] ?? "Conta"}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl p-4 w-48 hidden group-hover:block">
                <p className="font-semibold mb-2">{profile.full_name}</p>

                <Link href="/profile" className="block py-1 hover:text-pink-600">Minha conta</Link>
                <Link href="/pedidos" className="block py-1 hover:text-pink-600">Meus pedidos</Link>
                <Link href="/pontos" className="block py-1 hover:text-pink-600">Meus pontos</Link>

                <button
                  onClick={logout}
                  className="mt-3 w-full text-left text-red-500"
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            /* 🔥 SE NÃO ESTIVER LOGADO → BOTÃO ENTRAR/REGISTRAR */
            <Link
              href="/login"
              className="bg-[#63783D] text-white px-4 py-2 rounded-full hover:opacity-90"
            >
              Entrar / Registrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

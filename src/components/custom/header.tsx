"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ======================================================
  //       CARREGA USUÁRIO E PERFIL SOMENTE UMA VEZ
  // ======================================================
  useEffect(() => {
    async function load() {
      const { data: auth } = await supabase.auth.getUser();

      if (auth?.user) {
        setUser(auth.user);

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", auth.user.id)
          .maybeSingle();

        if (profileData) setProfile(profileData);
      }

      setLoading(false);
    }

    load();

    // escuta login / logout (SEM LOOP INFINITO)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white py-2 text-center text-sm">
        Frete Grátis acima de R$ 99,90 • Ganhe 100 pontos no primeiro pedido!
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">
            Emagrify Store
          </span>
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar produtos, marcas e muito mais..."
              className="w-full px-4 py-3 pr-12 rounded-full border-2 border-gray-200"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search />
            </button>
          </div>
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-4">
          <Heart className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />

          {/* ======================= */}
          {/*      LOGIN / AVATAR     */}
          {/* ======================= */}

          {loading ? (
            <span className="text-sm text-gray-500">Carregando...</span>
          ) : (
            <>
              {/* SE NÃO ESTIVER LOGADO */}
              {!user && (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full bg-[#63783D] text-white font-medium hidden sm:block"
                >
                  Entrar / Registrar
                </Link>
              )}

              {/* SE ESTIVER LOGADO */}
              {user && (
                <div className="relative group">
                  {/* AVATAR */}
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                    <User className="text-gray-700" />
                  </div>

                  {/* MENU */}
                  <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg p-4 hidden group-hover:block">
                    <p className="font-medium mb-3">
                      Olá, {profile?.full_name || user.email.split("@")[0]}
                    </p>

                    <Link href="/profile" className="block py-1 hover:text-pink-600">
                      Minha Conta
                    </Link>

                    <Link href="/pedidos" className="block py-1 hover:text-pink-600">
                      Meus Pedidos
                    </Link>

                    <Link href="/pontos" className="block py-1 hover:text-pink-600">
                      Meus Pontos
                    </Link>

                    {profile?.role === "admin" && (
                      <Link href="/admin" className="block py-1 text-blue-600 font-semibold">
                        Painel Admin
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

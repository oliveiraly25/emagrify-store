'use client';

import Link from "next/link";
import { Search, ShoppingCart, Heart, Menu, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        setUser(data.user);

        // Carrega role do perfil
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("id", data.user.id)
          .maybeSingle();

        if (profile?.role) setRole(profile.role);
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    }

    loadUser();

    // Atualiza automaticamente quando logar/deslogar
    supabase.auth.onAuthStateChange(() => loadUser());
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white py-2 text-center text-sm">
        Frete Grátis acima de R$ 99,90 • Ganhe 100 pontos no primeiro pedido!
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">
            Emagrify Store
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar produtos, marcas e muito mais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-full border-2 border-gray-200"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search />
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Heart className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />

          {/* ============================= */}
          {/* LOGIN / REGISTRO / AVATAR */}
          {/* ============================= */}

          {loading ? null : (
            <>
              {/* Se NÃO estiver logado */}
              {!user && (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full bg-[#63783D] text-white font-medium hidden sm:block"
                >
                  Entrar / Registrar
                </Link>
              )}

              {/* Se estiver logado */}
              {user && (
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="text-gray-700" />
                    </div>
                  </div>

                  {/* MENU */}
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block">
                    <p className="font-medium mb-2">
                      Olá, {user.email.split("@")[0]}
                    </p>

                    <Link href="/profile" className="block py-1">
                      Minha Conta
                    </Link>

                    <Link href="/pedidos" className="block py-1">
                      Meus Pedidos
                    </Link>

                    <Link href="/pontos" className="block py-1">
                      Meus Pontos
                    </Link>

                    {role === "admin" && (
                      <Link href="/admin" className="block py-1 text-blue-600">
                        Painel Admin
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg"
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

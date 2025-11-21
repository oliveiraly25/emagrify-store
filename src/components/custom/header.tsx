"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import supabase from "@/lib/supabaseClient";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Carrega usuário logado
  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) return;

      setUser(data.user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      setProfile(profileData);
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const avatarUrl =
    profile?.avatar_url ||
    "https://ui-avatars.com/api/?background=63783D&color=fff&name=" +
      encodeURIComponent(profile?.full_name || "U");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white py-2 text-center text-sm">
        🎉 Frete grátis acima de R$ 99,90 • Ganhe 100 pontos no primeiro pedido!
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            Emagrify Store
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-full border focus:border-[#63783D]"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full">
            <Heart className="w-6 h-6 text-gray-700" />
          </button>

          {/* Cart */}
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
          </button>

          {/* --------------------------- */}
          {/*     BOTÕES BASEADOS NO LOGIN */}
          {/* --------------------------- */}

          {!user && (
            <Link
              href="/login"
              className="hidden sm:flex px-4 py-2 bg-[#63783D] text-white rounded-full hover:opacity-90 transition"
            >
              Entrar / Registrar
            </Link>
          )}

          {user && (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center">
                <img
                  src={avatarUrl}
                  className="w-10 h-10 rounded-full object-cover border border-[#63783D]"
                />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-xl w-48 p-3 border">
                  <p className="font-medium text-sm px-2">{profile?.full_name}</p>
                  <hr className="my-2" />

                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                  >
                    Minha Conta
                  </Link>

                  <Link
                    href="/meus-pedidos"
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                  >
                    Meus Pedidos
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

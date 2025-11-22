"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Bell } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import supabase from "@/lib/supabaseClient";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

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

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.href = "/";
  }

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-black shadow-md">
      {/* Top Banner */}
      <div className="bg-black text-white py-2 text-center text-sm font-semibold">
        Envio para todo o Brasil  •  Ganhe 100 pontos no primeiro pedido!
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

   {/* LOGO */}
<Link href="/" className="flex items-center gap-3">
<span
  className="text-4xl tracking-wide"
  style={{ fontFamily: "Canela", color: "#FFFFFF", fontWeight: 700 }}
>
  Emagrify
</span>

</Link>


        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div
            className="relative w-full rounded-full"
            style={{ backgroundColor: "white" }}
          >
            <input
              type="text"
              placeholder="Buscar produtos, marcas e muito mais..."
              className="w-full px-4 py-3 pr-12 rounded-full"
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "600",
              }}
            />

            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-black">
              <Search />
            </button>
          </div>
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-4 text-white">
          <Heart className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />

          {/* LOGIN / AVATAR */}
          {loading ? (
            <span className="text-sm text-gray-300">Carregando...</span>
          ) : (
            <>
{!user && (
  <Link
    href="/login-auth"
    className="px-4 py-2 rounded-full bg-black text-white font-medium hidden sm:block"
  >
    Entrar / Registrar
  </Link>
)}


              {user && (
                <div className="relative" ref={menuRef}>
                  {/* Ícone do usuário */}
                  <div
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <User className="text-gray-700" />
                  </div>

                  {/* MENU — aparece somente ao clicar */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-2xl p-4 border">
                      {/* TÍTULO */}
                      <p className="text-gray-800 font-semibold mb-4 text-base">
                        Sua conta
                      </p>

                      {/* Meus Pedidos */}
                      <Link
                        href="/pedidos"
                        className="flex items-center justify-between py-3 border-b text-gray-700 hover:text-pink-600"
                      >
                        <span>Meus pedidos</span>
                        <ShoppingCart className="w-5 h-5" />
                      </Link>

                      {/* Dados Pessoais */}
                      <Link
                        href="/profile"
                        className="flex items-center justify-between py-3 border-b text-gray-700 hover:text-pink-600"
                      >
                        <span>Dados pessoais</span>
                        <User className="w-5 h-5" />
                      </Link>

                      {/* Notificações */}
                      <Link
                        href="/notificacoes"
                        className="flex items-center justify-between py-3 border-b text-gray-700 hover:text-pink-600"
                      >
                        <span>Notificações</span>
                        <Bell className="w-5 h-5" />
                      </Link>

                      {/* Meus Pontos */}
                      <Link
                        href="/pontos"
                        className="flex items-center justify-between py-3 border-b text-gray-700 hover:text-pink-600"
                      >
                        <span>Meus pontos</span>
                        <span className="font-bold text-pink-600">
                          {profile?.points ?? 0}
                        </span>
                      </Link>

                      {/* Sair */}
                      <button
                        onClick={handleLogout}
                        className="mt-4 w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

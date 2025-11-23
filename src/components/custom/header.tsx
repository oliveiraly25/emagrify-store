"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Bell } from "lucide-react";
import { useEffect, useState, useRef } from "react";
<<<<<<< HEAD
import { supabase } from "@/lib/supabaseClient";
=======
import supabase from "@/lib/supabaseClient";
>>>>>>> 04ce066a94e47516ab583aa49fd4905861492113
import ThemeToggle from "@/components/ThemeToggle";

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
    <header className="sticky top-0 z-50 bg-white shadow-md transition-all">
      
{/* Top Banner — invisível */}
<div className="bg-transparent dark:bg-transparent text-transparent dark:text-transparent py-0 h-0 overflow-hidden">
  Ganhe 100 pontos no primeiro pedido! •
</div>


      {/* Main */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

{/* LOGO */}
<Link href="/" className="flex items-center gap-3">
  <span
    className="text-5xl tracking-wide text-black dark:text-white font-bold"
    style={{ fontFamily: "arialbold" }}
  >
    Emagrify
  </span>
</Link>


     {/* SEARCH */}
<div className="hidden md:flex flex-1 max-w-xl mx-6">
  <div
    className="
      relative w-full 
      rounded-full 
      bg-black dark:bg-white
      border border-white dark:border-black
      transition-all
    "
  >
    <input
      type="text"
      placeholder="Busque por produtos em todo o site"
      className="
        w-full px-4 py-3 pr-12 
        rounded-full 
        bg-black dark:bg-white
        text-white dark:text-black
        placeholder-white dark:placeholder-black
        font-semibold
      "
    />

    <button
      className="
        absolute right-3 top-1/2 -translate-y-1/2 
        text-white dark:text-black
      "
    >
      <Search />
    </button>
  </div>
</div>

        {/* ICONS */}
        <div className="flex items-center gap-4 text-black dark:text-white">
          
          <Heart 
            className="
              cursor-pointer 
              transition-colors 
              hover:text-[#63783D] 
              dark:hover:text-[#63783D]
            " 
          />

          <ShoppingCart 
            className="
              cursor-pointer 
              transition-colors 
              hover:text-[#63783D] 
              dark:hover:text-[#63783D]
            "
          />

          {/* DARK MODE */}
          <ThemeToggle />

          {/* LOGIN / AVATAR */}
          {loading ? (
            <span className="text-sm text-gray-600">Carregando...</span>
          ) : (
            <>
              {!user && (
                <Link
                  href="/login-auth"
                  className="px-4 py-2 rounded-full bg-white text-black border border-black font-medium hidden sm:block"
                >
                  Entrar / Registrar
                </Link>
              )}

              {user && (
                <div className="relative" ref={menuRef}>
                  <div
                    className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <User className="text-white" />
                  </div>

                  {/* MENU */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white text-black shadow-xl rounded-2xl p-4 border border-gray-300">

                      {/* SAUDAÇÃO */}
                      <div className="mb-4">
                        <p className="text-black font-bold">
                          Olá, {profile?.first_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Navegue e gerencie conforme desejar.
                        </p>
                      </div>

                      {/* Meus Pedidos */}
                      <Link
                        href="/pedidos"
                        className="flex items-center justify-between py-3 border-b border-gray-300 text-black hover:text-green-600"
                      >
                        <span>Meus pedidos</span>
                        <ShoppingCart className="w-5 h-5 text-black" />
                      </Link>

                      {/* Dados Pessoais */}
                      <Link
                        href="/profile"
                        className="flex items-center justify-between py-3 border-b border-gray-300 text-black hover:text-green-600"
                      >
                        <span>Dados pessoais</span>
                        <User className="w-5 h-5 text-black" />
                      </Link>

                      {/* Notificações */}
                      <Link
                        href="/notificacoes"
                        className="flex items-center justify-between py-3 border-b border-gray-300 text-black hover:text-green-600"
                      >
                        <span>Notificações</span>
                        <Bell className="w-5 h-5 text-black" />
                      </Link>

                      {/* Meus Pontos */}
                      <Link
                        href="/pontos"
                        className="flex items-center justify-between py-3 border-b border-gray-300 text-black hover:text-green-600"
                      >
                        <span>Meus pontos</span>
                        <span className="font-bold text-black">
                          {profile?.points ?? 0}
                        </span>
                      </Link>

                      {/* Painel Admin */}
                      {profile?.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center justify-between py-3 border-b border-gray-300 text-black hover:text-green-600"
                        >
                          <span>Painel Admin</span>
                          <span className="font-bold text-black">★</span>
                        </Link>
                      )}

                      {/* Sair */}
                      <button
                        onClick={handleLogout}
                        className="mt-4 w-full py-3 bg-black text-white rounded-xl font-semibold hover:opacity-80 transition"
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

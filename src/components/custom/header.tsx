"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Bell, MoreVertical } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

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

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow-md transition-all">
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
              relative w-full rounded-full
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

            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white dark:text-black">
              <Search />
            </button>
          </div>
        </div>

        {/* DESKTOP ICONS */}
        <div className="hidden md:flex items-center gap-4 text-black dark:text-white">

          {user && (
            <>
              <Heart className="cursor-pointer hover:text-[#63783D]" />
              <ShoppingCart className="cursor-pointer hover:text-[#63783D]" />
            </>
          )}

          <ThemeToggle />

          {loading ? (
            <span className="text-sm text-gray-600">Carregando...</span>
          ) : (
            <>
              {!user && (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full bg-white text-black border border-black font-medium"
                >
                  Entrar / Registrar
                </Link>
              )}

              {/* AVATAR DESKTOP */}
              {user && (
                <div className="relative" ref={menuRef}>
                  <div
                    className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <User className="text-white dark:text-black" />
                  </div>

                  {menuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-xl rounded-2xl p-4 border border-gray-300">
                      <div className="mb-4">
                        <p className="font-bold">Olá, {profile?.first_name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Navegue e gerencie conforme desejar.
                        </p>
                      </div>

                      <Link href="/pedidos" className="flex items-center justify-between py-3 border-b">
                        Meus pedidos <ShoppingCart className="w-5 h-5" />
                      </Link>

                      <Link href="/profile" className="flex items-center justify-between py-3 border-b">
                        Dados pessoais <User className="w-5 h-5" />
                      </Link>

                      <Link href="/notificacoes" className="flex items-center justify-between py-3 border-b">
                        Notificações <Bell className="w-5 h-5" />
                      </Link>

                      <Link href="/pontos" className="flex items-center justify-between py-3 border-b">
                        Meus pontos <span className="font-bold">{profile?.points ?? 0}</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="mt-4 w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold"
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

        {/* MOBILE MENU BUTTON (⋮) */}
        <div className="flex md:hidden" ref={mobileRef}>
          <MoreVertical
            className="text-black dark:text-white w-8 h-8 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          {/* MOBILE DROPDOWN */}
          {mobileMenuOpen && (
            <div className="absolute right-4 top-20 w-64 bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-xl rounded-2xl p-4 border border-gray-300">

              {!user && (
                <Link
                  href="/login"
                  className="block w-full text-center py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold"
                >
                  Entrar / Registrar
                </Link>
              )}

              {user && (
                <>
                  <div className="mb-4">
                    <p className="font-bold">Olá, {profile?.first_name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Navegue e gerencie conforme desejar.
                    </p>
                  </div>

                  <Link href="/pedidos" className="flex items-center justify-between py-3 border-b">
                    Meus pedidos <ShoppingCart className="w-5 h-5" />
                  </Link>

                  <Link href="/profile" className="flex items-center justify-between py-3 border-b">
                    Dados pessoais <User className="w-5 h-5" />
                  </Link>

                  <Link href="/notificacoes" className="flex items-center justify-between py-3 border-b">
                    Notificações <Bell className="w-5 h-5" />
                  </Link>

                  <Link href="/pontos" className="flex items-center justify-between py-3 border-b">
                    Meus pontos <span className="font-bold">{profile?.points ?? 0}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold"
                  >
                    Sair
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

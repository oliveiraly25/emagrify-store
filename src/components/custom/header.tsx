"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Bell,
  MoreVertical,
} from "lucide-react";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Carregar usuário
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
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) setUser(session.user);
        else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Logout
  async function handleLogout() {
    await supabase.auth.signOut();
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="w-full px-6 py-3 flex items-center justify-between">

        {/* ESQUERDA — BARRA DE PESQUISA */}
        <div className="hidden md:flex flex-1 justify-start">
          <div className="
            relative w-[230px]
            bg-white dark:bg-black
            border border-black dark:border-white
            rounded-full
          ">
            <input
              type="text"
              placeholder="Buscar..."
              className="
                w-full px-4 py-1.5 pr-10 rounded-full
                bg-white dark:bg-black
                text-black dark:text-white
                placeholder-gray-600 dark:placeholder-gray-300
                text-sm
              "
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-white">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* CENTRO — LOGO */}
        <div className="flex-1 flex justify-center select-none">
          <picture>
            {/* LIGHT */}
            <Image
              src="/LOGOLIGHT.png"
              alt="Logo Emagrify"
              width={350}
              height={110}
              className="object-contain pointer-events-none dark:hidden"
            />

            {/* DARK */}
            <Image
              src="/LOGODARK.png"
              alt="Logo Emagrify Dark"
              width={350}
              height={110}
              className="object-contain pointer-events-none hidden dark:block"
            />
          </picture>
        </div>

        {/* DIREITA — ÍCONES */}
        <div className="flex-1 flex items-center justify-end gap-4 text-black dark:text-white">

          {user && (
            <>
              <Heart className="hidden sm:block cursor-pointer hover:text-[#63783D]" />
              <ShoppingCart className="hidden sm:block cursor-pointer hover:text-[#63783D]" />
            </>
          )}

          <ThemeToggle />

          <div className="relative" ref={menuRef}>

            {!user && (
              <Link
                href="/login"
                className="
                  hidden sm:block px-4 py-1.5 rounded-full
                  bg-black text-white
                  dark:bg-white dark:text-black
                  border border-black dark:border-white
                  text-sm
                "
              >
                Entrar / Registrar
              </Link>
            )}

            {user && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hidden sm:flex w-9 h-9 bg-black dark:bg-white rounded-full items-center justify-center"
              >
                <User className="text-white dark:text-black" />
              </button>
            )}

            {/* MOBILE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                sm:hidden p-2 rounded-full 
                border border-black dark:border-white
                hover:bg-black/10 dark:hover:bg-white/20
              "
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {/* MENU DROPDOWN */}
            {menuOpen && (
              <div className="
                absolute right-0 mt-3 w-64
                bg-white dark:bg-black
                text-black dark:text-white
                shadow-xl rounded-2xl p-4
                border border-gray-300 dark:border-gray-700
              ">
                {!user ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Acesse sua conta para ver pedidos e dados pessoais.
                    </p>
                    <Link
                      href="/login"
                      className="w-full text-center py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold"
                    >
                      Entrar / Registrar
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <p className="font-bold">Olá, {profile?.first_name}</p>
                    </div>

                    <Link
                      href="/pedidos"
                      className="flex items-center justify-between py-2 border-b border-gray-300 dark:border-gray-700 hover:text-green-600"
                    >
                      Meus pedidos <ShoppingCart className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center justify-between py-2 border-b border-gray-300 dark:border-gray-700 hover:text-green-600"
                    >
                      Dados pessoais <User className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/notificacoes"
                      className="flex items-center justify-between py-2 border-b border-gray-300 dark:border-gray-700 hover:text-green-600"
                    >
                      Notificações <Bell className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/pontos"
                      className="flex items-center justify-between py-2 border-b border-gray-300 dark:border-gray-700 hover:text-green-600"
                    >
                      Meus pontos <span>{profile?.points ?? 0}</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold"
                    >
                      Sair
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

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
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // =====================================
  // LOAD USER
  // =====================================
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
        if (session?.user) setUser(session.user);
        else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // =====================================
  // LOGOUT
  // =====================================
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  // =====================================
  // CLOSE MENU ON OUTSIDE CLICK
  // =====================================
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
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-300 dark:border-black shadow-sm">
      <div className="w-full px-6 py-4 flex items-center justify-between">

        {/* ================================
            ESQUERDA — BARRA DE PESQUISA
        ================================= */}
        <div className="hidden md:flex flex-1 justify-start">
          <div className="
            relative
            w-[260px]
            bg-white dark:bg-black
            border border-black dark:border-white
            rounded-full
          ">
            <input
              type="text"
              placeholder="Buscar..."
              className="
                w-full px-4 py-2 pr-10 rounded-full
                bg-white dark:bg-black
                text-black dark:text-white
                placeholder-gray-600 dark:placeholder-gray-300
                text-sm
              "
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-white"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* ================================
            CENTRO — LOGO
        ================================= */}
        <div className="flex-1 flex justify-center select-none">
          {/* LOGO QUE TROCA ENTRE MODO CLARO/ESCURO */}
          <picture>
            {/* LOGO MODO CLARO */}
            <source
              srcSet="/LOGOLIGHT.png"
              media="(prefers-color-scheme: light)"
            />
            {/* LOGO MODO ESCURO */}
            <source
              srcSet="/LOGODARK.png"
              media="(prefers-color-scheme: dark)"
            />
<Image
  src="/LOGOLIGHT.png"
  alt="Logo Emagrify"
  width={420}
  height={130}
  className="object-contain pointer-events-none dark:hidden"
/>

<Image
  src="/LOGODARK.png"
  alt="Logo Emagrify dark"
  width={420}
  height={130}
  className="object-contain pointer-events-none hidden dark:block"
/>

          </picture>
        </div>

        {/* ================================
            DIREITA — ÍCONES / LOGIN / MENU
        ================================= */}
        <div className="flex-1 flex items-center justify-end gap-4 text-black dark:text-white">

          {user && (
            <>
              <Heart className="hidden sm:block cursor-pointer hover:text-[#63783D]" />
              <ShoppingCart className="hidden sm:block cursor-pointer hover:text-[#63783D]" />
            </>
          )}

          <ThemeToggle />

          {/* MENU USER */}
          <div className="relative" ref={menuRef}>

            {!user && (
              <Link
                href="/login"
                className="
                  hidden sm:block px-4 py-2 rounded-full
                  bg-black text-white
                  dark:bg-white dark:text-black
                  border border-black dark:border-white
                "
              >
                Entrar / Registrar
              </Link>
            )}

            {user && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hidden sm:flex w-10 h-10 bg-black dark:bg-white rounded-full items-center justify-center"
              >
                <User className="text-white dark:text-black" />
              </button>
            )}

            {/* 3 pontinhos — MOBILE */}
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
                    <div className="mb-4">
                      <p className="font-bold">Olá, {profile?.first_name}</p>
                    </div>

                    <Link
                      href="/pedidos"
                      className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-green-600"
                    >
                      <span>Meus pedidos</span>
                      <ShoppingCart className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-green-600"
                    >
                      <span>Dados pessoais</span>
                      <User className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/notificacoes"
                      className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-green-600"
                    >
                      <span>Notificações</span>
                      <Bell className="w-5 h-5" />
                    </Link>

                    <Link
                      href="/pontos"
                      className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-green-600"
                    >
                      <span>Meus pontos</span>
                      <span>{profile?.points ?? 0}</span>
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
      </div>
    </header>
  );
}

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

  const menuRef = useRef<HTMLDivElement>(null);

  // ===============================
  // CARREGAR USUÁRIO + PROFILE
  // ===============================
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

  // Fecha menu ao clicar fora
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
    <header className="sticky top-0 z-50 bg-black dark:bg-black shadow-md transition-all">
      {/* Top Banner — invisível no momento */}
      <div className="bg-transparent text-transparent py-0 h-0 overflow-hidden">
        Ganhe 100 pontos no primeiro pedido! •
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <span
            className="text-3xl md:text-4xl tracking-wide text-white font-bold"
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
              bg-white
              border border-white
              transition-all
            "
          >
            <input
              type="text"
              placeholder="Busque por produtos em todo o site"
              className="
                w-full px-4 py-3 pr-12 
                rounded-full 
                bg-white
                text-black
                placeholder-gray-500
                font-semibold
              "
            />

            <button
              className="
                absolute right-3 top-1/2 -translate-y-1/2 
                text-black
              "
            >
              <Search />
            </button>
          </div>
        </div>

        {/* ICONS + LOGIN / MENU */}
        <div className="flex items-center gap-3 text-white">
          {/* ÍCONES DE LOGIN (SÓ QUANDO ESTÁ LOGADO) */}
          {user && (
            <>
              <Heart
                className="
                  hidden sm:block
                  cursor-pointer 
                  transition-colors 
                  hover:text-[#63783D]
                "
              />

              <ShoppingCart
                className="
                  hidden sm:block
                  cursor-pointer 
                  transition-colors 
                  hover:text-[#63783D]
                "
              />
            </>
          )}

          {/* DARK MODE */}
          <ThemeToggle />

          {/* ÁREA DO MENU (DESKTOP + MOBILE) */}
          <div className="relative" ref={menuRef}>
            {/* DESKTOP: botão Entrar / Registrar OU avatar */}
            {loading ? (
              <span className="hidden sm:inline text-sm text-gray-300">
                Carregando...
              </span>
            ) : (
              <>
                {/* DESLOGADO – botão aparece só em tela >= sm */}
                {!user && (
                  <Link
                    href="/login"
                    className="
                      px-4 py-2 rounded-full 
                      bg-white text-black 
                      border border-white font-medium 
                      hidden sm:block
                    "
                  >
                    Entrar / Registrar
                  </Link>
                )}

                {/* LOGADO – AVATAR (DESKTOP) */}
                {user && (
                  <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="
                      hidden sm:flex
                      w-10 h-10 bg-white rounded-full 
                      items-center justify-center cursor-pointer
                    "
                  >
                    <User className="text-black" />
                  </button>
                )}
              </>
            )}

            {/* MOBILE: ícone de 3 pontinhos (sempre aparece) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                sm:hidden
                p-2 rounded-full 
                border border-white/30 
                hover:bg-white/10 
                transition
              "
              aria-label="Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {/* MENU DROPDOWN (MESMO PARA DESKTOP E MOBILE) */}
            {menuOpen && (
              <div
                className="
                  absolute right-0 mt-3 w-64 
                  bg-white text-black shadow-xl 
                  rounded-2xl p-4 border border-gray-200
                "
              >
                {/* Se não estiver logado: só opção de entrar */}
                {!user && (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-gray-600">
                      Acesse sua conta para ver pedidos e dados pessoais.
                    </p>
                    <Link
                      href="/login"
                      className="
                        w-full py-2 rounded-xl 
                        bg-black text-white 
                        text-center font-semibold
                        hover:opacity-80 transition
                      "
                    >
                      Entrar / Registrar
                    </Link>
                  </div>
                )}

                {/* Se estiver logado: menu completo */}
                {user && (
                  <>
                    {/* SAUDAÇÃO */}
                    <div className="mb-4">
                      <p className="text-black font-bold">
                        Olá, {profile?.first_name || "Cliente"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Navegue e gerencie conforme desejar.
                      </p>
                    </div>

                    {/* Meus Pedidos */}
                    <Link
                      href="/pedidos"
                      className="flex items-center justify-between py-3 border-b border-gray-200 text-black hover:text-green-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>Meus pedidos</span>
                      <ShoppingCart className="w-5 h-5 text-black" />
                    </Link>

                    {/* Dados Pessoais */}
                    <Link
                      href="/profile"
                      className="flex items-center justify-between py-3 border-b border-gray-200 text-black hover:text-green-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>Dados pessoais</span>
                      <User className="w-5 h-5 text-black" />
                    </Link>

                    {/* Notificações */}
                    <Link
                      href="/notificacoes"
                      className="flex items-center justify-between py-3 border-b border-gray-200 text-black hover:text-green-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>Notificações</span>
                      <Bell className="w-5 h-5 text-black" />
                    </Link>

                    {/* Meus Pontos */}
                    <Link
                      href="/pontos"
                      className="flex items-center justify-between py-3 border-b border-gray-200 text-black hover:text-green-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>Meus pontos</span>
                      <span className="font-bold text-black">
                        {profile?.points ?? 0}
                      </span>
                    </Link>

                    {/* Painel Admin (se for admin) */}
                    {profile?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center justify-between py-3 border-b border-gray-200 text-black hover:text-green-600"
                        onClick={() => setMenuOpen(false)}
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

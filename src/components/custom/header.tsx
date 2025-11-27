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

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔍 busca expansível
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar busca ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* Faixa preta superior */}
      <div className="w-full bg-black text-white text-xs py-1 text-center tracking-widest">
        FRETE GRÁTIS NAS COMPRAS ACIMA DE R$149
      </div>

      {/* HEADER PRINCIPAL */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/10">
        <div className="w-full px-6 py-4 flex items-center justify-between">

          {/* 🔍 BUSCA EXPANSÍVEL (moderninha) */}
          <div className="hidden md:flex flex-1 justify-start">
            <div
              ref={searchRef}
              className="relative flex items-center transition-all"
            >
              {!searchOpen && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-black hover:text-[#406945] transition"
                >
                  <Search size={20} />
                </button>
              )}

              {searchOpen && (
                <div
                  className="
                    flex items-center bg-white border border-black/20
                    rounded-full px-3 py-1 shadow-sm
                    transition-all duration-300
                    w-[210px] sm:w-[250px]
                  "
                >
                  <Search size={17} className="mr-2 text-black" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    autoFocus
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>
              )}
            </div>
          </div>

{/* LOGO CENTRAL — TEXTO COM FONTE TUSCA */}
<div className="flex-1 flex justify-center select-none">
  <h1
    className="
      font-tusca 
      text-3xl 
      tracking-wide 
      font-semibold 
      cursor-pointer 
      select-none
      whitespace-nowrap
    "
    onClick={() => (window.location.href = "/")}
  >
    emagrify store
  </h1>
</div>


          {/* ÍCONES À DIREITA */}
          <div className="flex-1 flex items-center justify-end gap-5 text-black">

            {/* Ícones logada */}
{user && (
  <>
    <Heart
      onClick={() => (window.location.href = "/favoritos")}
      className="cursor-pointer hover:text-[#406945] transition"
      size={20}
    />

    <ShoppingCart
      onClick={() => (window.location.href = "/carrinho")}
      className="cursor-pointer hover:text-[#406945] transition"
      size={20}
    />
  </>
)}


            {/* MENU DO USUÁRIO */}
            <div className="relative" ref={menuRef}>

              {/* BOTÃO LOGIN */}
              {!user && (
                <Link
                  href="/login"
                  className="
                    hidden sm:block
                    px-5 py-1.5 rounded-full uppercase tracking-wide
                    text-xs bg-black text-white border border-black
                    hover:bg-[#406945] hover:border-[#406945] 
                    transition duration-200
                  "
                >
                  Entrar
                </Link>
              )}

              {/* AVATAR */}
              {user && (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="
                    hidden sm:flex w-9 h-9 bg-black rounded-full 
                    items-center justify-center hover:bg-[#406945] transition
                  "
                >
                  <User className="text-white" size={18} />
                </button>
              )}

              {/* MOBILE BUTTON */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="
                  sm:hidden p-2 rounded-full 
                  border border-black
                  hover:bg-black/10 transition
                "
              >
                <MoreVertical size={20} />
              </button>

              {/* DROPDOWN */}
              {menuOpen && (
                <div
                  className="
                    absolute right-0 mt-3 w-64
                    bg-white text-black
                    rounded-2xl p-4 shadow-xl
                    border border-gray-200
                  "
                >
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-gray-600">
                        Entre para acessar seus pedidos.
                      </p>
                      <Link
                        href="/login"
                        className="
                          w-full text-center py-2 rounded-xl bg-black text-white font-semibold
                          hover:bg-[#406945] transition
                        "
                      >
                        Entrar / Registrar
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <p className="font-bold text-sm">
                          Olá, {profile?.first_name}
                        </p>
                      </div>

{/* 👑 ADMIN */}
{profile?.role === "admin" && (
  <Link href="/admin" className="dropdown-item flex items-center gap-2">
    <Bell size={18} />
    <span>Painel Admin</span>
  </Link>
)}

<Link href="/pedidos" className="dropdown-item flex items-center gap-2">
  <ShoppingCart size={18} />
  <span>Meus pedidos</span>
</Link>

<Link href="/profile" className="dropdown-item flex items-center gap-2">
  <User size={18} />
  <span>Dados pessoais</span>
</Link>

<Link href="/notificacoes" className="dropdown-item flex items-center gap-2">
  <Bell size={18} />
  <span>Notificações</span>
</Link>

<div className="dropdown-item flex items-center gap-2">
  <User size={18} />
  <span>Meus pontos: {profile?.points ?? 0}</span>
</div>


                      <button
                        onClick={handleLogout}
                        className="
                          mt-4 w-full py-2 bg-black text-white rounded-xl
                          font-semibold hover:bg-[#406945] transition
                        "
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
    </>
  );
}

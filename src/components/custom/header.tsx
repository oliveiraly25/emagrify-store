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
    <>
      {/* ▬▬▬▬▬▬▬ FAIXA PRETA SUPERIOR ▬▬▬▬▬▬▬ */}
      <div className="w-full bg-black text-white text-xs py-1 text-center tracking-wide">
        FRETE GRÁTIS NAS COMPRAS ACIMA DE R$149
      </div>

      {/* ▬▬▬▬▬▬ HEADER PRINCIPAL (BRANCO, PREMIUM) ▬▬▬▬▬▬ */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="w-full px-6 py-3 flex items-center justify-between">

          {/* ESQUERDA — BARRA DE PESQUISA */}
          <div className="hidden md:flex flex-1 justify-start">
            <div
              className="
                relative w-[230px]
                bg-white border border-black/20 rounded-full
                hover:border-black transition-all
              "
            >
              <input
                type="text"
                placeholder="Buscar..."
                className="
                  w-full px-4 py-1.5 pr-10 rounded-full
                  bg-white text-black placeholder-gray-500
                  text-sm
                "
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-black">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* CENTRO — LOGO */}
          <div className="flex-1 flex justify-center select-none">
            <Image
              src="/LOGOLIGHT.png"
              alt="Logo Emagrify"
              width={320}
              height={90}
              className="object-contain pointer-events-none"
            />
          </div>

          {/* DIREITA — ÍCONES */}
          <div className="flex-1 flex items-center justify-end gap-4 text-black">

            {user && (
              <>
                <Heart className="hidden sm:block cursor-pointer hover:text-[#406945]" />
                <ShoppingCart className="hidden sm:block cursor-pointer hover:text-[#406945]" />
              </>
            )}

            {/* BOTÃO MENU / PERFIL */}
            <div className="relative" ref={menuRef}>

              {/* SE NÃO LOGADO: botão login */}
              {!user && (
                <Link
                  href="/login"
                  className="
                    hidden sm:block px-4 py-1.5 rounded-full
                    bg-black text-white border border-black
                    text-sm tracking-wide
                    hover:bg-[#406945] hover:border-[#406945] transition
                  "
                >
                  Entrar / Registrar
                </Link>
              )}

              {/* SE LOGADO: avatar */}
              {user && (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="
                    hidden sm:flex w-9 h-9 bg-black rounded-full 
                    items-center justify-center hover:bg-[#406945] transition
                  "
                >
                  <User className="text-white" />
                </button>
              )}

              {/* MOBILE */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="
                  sm:hidden p-2 rounded-full 
                  border border-black
                  hover:bg-black/10 transition
                "
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* DROPDOWN */}
              {menuOpen && (
                <div
                  className="
                    absolute right-0 mt-3 w-64
                    bg-white text-black
                    shadow-xl rounded-2xl p-4
                    border border-gray-200
                  "
                >
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-gray-600">
                        Acesse sua conta para ver pedidos e dados pessoais.
                      </p>
                      <Link
                        href="/login"
                        className="w-full text-center py-2 rounded-xl bg-black text-white font-semibold hover:bg-[#406945] transition"
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
                        className="dropdown-item"
                      >
                        Meus pedidos <ShoppingCart className="w-5 h-5" />
                      </Link>

                      <Link
                        href="/profile"
                        className="dropdown-item"
                      >
                        Dados pessoais <User className="w-5 h-5" />
                      </Link>

                      <Link
                        href="/notificacoes"
                        className="dropdown-item"
                      >
                        Notificações <Bell className="w-5 h-5" />
                      </Link>

                      <Link
                        href="/pontos"
                        className="dropdown-item"
                      >
                        Meus pontos <span>{profile?.points ?? 0}</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="mt-4 w-full py-2 bg-black text-white rounded-xl font-semibold hover:bg-[#406945] transition"
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

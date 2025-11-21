'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import supabase from '@/lib/supabaseClient';

type UserRole = 'admin' | 'user' | null;

export default function Header() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState<UserRole>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // 🔍 Carrega usuário logado + role no Supabase
  useEffect(() => {
    async function loadAuth() {
      try {
        const { data: userData } = await supabase.auth.getUser();

        if (!userData?.user) {
          setRole(null);
          setAuthChecked(true);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userData.user.id)
          .maybeSingle();

        if (profile?.role === 'admin') {
          setRole('admin');
        } else {
          setRole('user');
        }
      } catch (err) {
        console.error('Erro ao carregar autenticação:', err);
        setRole(null);
      } finally {
        setAuthChecked(true);
      }
    }

    loadAuth();
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setRole(null);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar - Promoção */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm font-medium">
          🎉 Frete Grátis em compras acima de R$ 99,90 | Ganhe 100 pontos no primeiro pedido!
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Emagrify Store
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos, marcas e muito mais..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-full border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Search */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Heart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Cart */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            {/* --------- BOTÕES DE LOGIN / CONTA / ADMIN --------- */}
            {/* Enquanto não terminou de checar, mostra nada pra não piscar */}
            {authChecked && (
              <>
                {/* Não logado → Entrar / Registrar (tela única) */}
                {!role && (
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white rounded-full hover:scale-105 transition-transform"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Entrar / Registrar</span>
                  </Link>
                )}

                {/* Usuário comum logado */}
                {role === 'user' && (
                  <>
                    <Link
                      href="/profile"
                      className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:scale-105 transition-transform"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Minha conta</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:scale-105 transition-transform"
                    >
                      <span className="text-sm font-medium">Sair</span>
                    </button>
                  </>
                )}

                {/* Admin logado */}
                {role === 'admin' && (
                  <>
                    <Link
                      href="/admin"
                      className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:scale-105 transition-transform"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Painel Admin</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:scale-105 transition-transform"
                    >
                      <span className="text-sm font-medium">Sair</span>
                    </button>
                  </>
                )}
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-full border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all text-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-1.5 rounded-full">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className="hidden md:block border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-3">
            {CATEGORIES.slice(0, 6).map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                >
                  {category.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors"
              >
                Ver Todas →
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

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

  useEffect(() => {
    async function loadAuth() {
      // pega usuário logado
      const { data: authData } = await supabase.auth.getUser();

      if (authData?.user) {
        
        // busca o perfil
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .maybeSingle();

        if (profile?.role === 'admin') {
          setRole('admin');
        } else {
          setRole('user'); // usuário comum
        }
      } else {
        setRole(null);
      }

      setAuthChecked(true);
    }

    loadAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setRole(null);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      
      {/* tudo igual daqui pra baixo */}
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Botões de Login / Usuário */}
          {authChecked && (
            <>
              {!role && (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#63783D] text-white rounded-full hover:scale-105 transition-transform"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Entrar / Registrar</span>
                </Link>
              )}

              {role === 'user' && (
                <>
                  <Link
                    href="/profile"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:scale-105 transition-transform"
                  >
                    <User className="w-4 h-4" />
                    Minha Conta
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:scale-105 transition-transform"
                  >
                    Sair
                  </button>
                </>
              )}

              {role === 'admin' && (
                <>
                  <Link
                    href="/admin"
                    className="hidden sm:flex px-4 py-2 bg-blue-600 text-white rounded-full hover:scale-105 transition-transform"
                  >
                    Painel Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex px-4 py-2 bg-red-500 text-white rounded-full hover:scale-105 transition-transform"
                  >
                    Sair
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

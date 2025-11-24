// src/app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkRole() {
      // Verifica se tem usuário logado
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.replace("/login");
        return;
      }

      // Busca role do usuário
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      // Se não tiver role ou não for admin, manda embora
      if (!profile?.role || profile.role !== "admin") {
        router.replace("/");
        return;
      }

      // Liberado
      setAllowed(true);
    }

    checkRole();
  }, [router]);

  // Tela de carregamento bonitinha enquanto verifica permissões
  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500/70 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-400">Verificando permissões…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

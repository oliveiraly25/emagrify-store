// src/app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkRole() {
      const { data: userData } = await supabase.auth.getUser();

      // Se não estiver logado → login
      if (!userData?.user) {
        router.replace("/login");
        return;
      }

      // Buscar role do usuário
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      // Se não for admin → home
      if (!profile?.role || profile.role !== "admin") {
        router.replace("/");
        return;
      }

      setAllowed(true);
    }

    checkRole();
  }, [router]);

  // ===============================
  // LOADING ELEGANTE
  // ===============================
  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] text-black">

        <div className="flex flex-col items-center gap-3">
          {/* Spinner verde-escuro */}
          <div className="w-10 h-10 border-2 border-[#406945] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-700">Verificando permissões…</p>
        </div>

      </div>
    );
  }

  // ===============================
  // CONTEÚDO DO ADMIN
  // ===============================
  return (
    <div className="min-h-screen bg-[#F7F7F7] text-black">
      {children}
    </div>
  );
}

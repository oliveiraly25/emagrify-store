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
      // Verifica login
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.push("/login");
        return;
      }

      // Busca role do usuário
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      // Se não existir perfil → bloqueia
      if (!profile?.role) {
        router.push("/");
        return;
      }

      // Se não for admin → bloqueia
      if (profile.role !== "admin") {
        router.push("/");
        return;
      }

      // Liberado
      setAllowed(true);
    }

    checkRole();
  }, []);

  if (allowed === null) {
    return <div style={{ padding: 20 }}>Carregando permissões...</div>;
  }

  return <>{children}</>;
}

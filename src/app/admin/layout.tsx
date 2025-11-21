"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkRole() {
      const { data: userData } = await supabase.auth.getUser();

      // Se não estiver logado → manda pro login
      if (!userData?.user) {
        router.push("/login");
        return;
      }

      const userId = userData.user.id;

      // Busca o perfil do usuário
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      // Se não existir perfil OU não for admin → manda para HOME
      if (!profile || profile.role !== "admin") {
        router.push("/");
        return;
      }

      // Se for admin → libera acesso
      setAllowed(true);
    }

    checkRole();
  }, [router]);

  if (allowed === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Verificando permissão...
      </div>
    );
  }

  return <>{children}</>;
}

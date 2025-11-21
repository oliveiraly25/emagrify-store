"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkRole() {
      // 1. Verifica usuário logado
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.push("/login");
        return;
      }

      const userId = userData.user.id;

      // 2. Busca o perfil no Supabase
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      // 3. Se o perfil não existir, nega acesso
      if (!profile) {
        router.push("/");
        return;
      }

      // 4. Somente ADMIN entra
      if (profile.role !== "admin") {
        router.push("/");
        return;
      }

      // Liberado
      setAllowed(true);
    }

    checkRole();
  }, [router]);

  if (allowed === null) {
    return (
      <div className="w-full text-center mt-10 text-gray-600">
        Verificando permissões...
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      // 1. Verifica usuário logado
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.push("/login");
        return;
      }

      // 2. Busca o perfil no Supabase
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      // 3. Bloqueia se não for admin
      if (!profile || profile.role !== "admin") {
        router.push("/");
        return;
      }

      setAllowed(true);
    }

    checkAdmin();
  }, [router]);

  if (allowed === null) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Verificando permissões...
      </p>
    );
  }

  return <>{children}</>;
}

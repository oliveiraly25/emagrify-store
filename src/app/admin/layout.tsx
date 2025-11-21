"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function validate() {
      // Verifica usuário logado
      const { data: session } = await supabase.auth.getUser();

      if (!session?.user) {
        router.push("/login");
        return;
      }

      const userId = session.user.id;

      // Busca perfil
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      // Bloqueia se não for admin
      if (!profile || profile.role !== "admin") {
        router.push("/");
        return;
      }

      setAllowed(true);
    }

    validate();
  }, [router]);

  if (allowed === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Verificando permissão...
      </div>
    );
  }

  return <>{children}</>;
}

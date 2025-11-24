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

      if (!userData?.user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      if (!profile?.role || profile.role !== "admin") {
        router.replace("/");
        return;
      }

      setAllowed(true);
    }

    checkRole();
  }, [router]);

  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#444] text-black dark:bg-[#222] dark:text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500/70 border-t-transparent animate-spin" />
          <p className="text-sm opacity-80">Verificando permissões…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#444] text-black dark:bg-[#222] dark:text-white">
      {children}
    </div>
  );
}

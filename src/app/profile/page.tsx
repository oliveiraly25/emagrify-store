"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import {
  ChevronRight,
  ShoppingCart,
  Heart,
  User,
  Truck,
  CreditCard,
  Headphones,
  Bell,
} from "lucide-react";

export default function ProfileDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth?.user) {
        router.push("/login");
        return;
      }

      setUser(auth.user);
      setLoading(false);
    }

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-black font-medium">
        Carregando...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 text-black">

      <h1 className="text-3xl font-bold mb-1 tracking-tight">
        Sua conta
      </h1>

      <p className="text-gray-600 mb-6">
        Olá {user.email}. Aqui tem tudo o que você precisa.
      </p>

      {/* ============================= */}
      {/*     SEÇÃO: SEUS DADOS         */}
      {/* ============================= */}
      <h2 className="text-lg font-semibold mt-8 mb-3 tracking-tight">
        Seus Dados
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        <button
          onClick={() => router.push("/dados-pessoais")}
          className="
            w-full flex justify-between items-center p-4 border-b
            hover:bg-[#f9fafb] transition
          "
        >
          <div className="flex items-center gap-3">
            <User size={20} className="text-black" />
            <span className="font-medium">Dados pessoais</span>
          </div>
          <ChevronRight className="text-black" />
        </button>

        <button
          onClick={() => router.push("/enderecos")}
          className="
            w-full flex justify-between items-center p-4 border-b
            hover:bg-[#f9fafb] transition
          "
        >
          <div className="flex items-center gap-3">
            <Truck size={20} className="text-black" />
            <span className="font-medium">Endereços de entrega</span>
          </div>
          <ChevronRight className="text-black" />
        </button>

        <button
          onClick={() => router.push("/pagamentos")}
          className="
            w-full flex justify-between items-center p-4
            hover:bg-[#f9fafb] transition
          "
        >
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-black" />
            <span className="font-medium">Formas de pagamento</span>
          </div>
          <ChevronRight className="text-black" />
        </button>

      </div>

      
      {/* ============================= */}
      {/*     SEÇÃO: PEDIDOS           */}
      {/* ============================= */}
      <h2 className="text-lg font-semibold mb-3 tracking-tight">
        Pedidos
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        <button
          onClick={() => router.push("/pedidos")}
          className="
            w-full flex justify-between items-center p-4 border-b
            hover:bg-[#f9fafb] transition
          "
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-black" />
            <span className="font-medium">Meus pedidos</span>
          </div>
          <ChevronRight className="text-black" />
        </button>

        <button
          onClick={() => router.push("/favoritos")}
          className="
            w-full flex justify-between items-center p-4
            hover:bg-[#f9fafb] transition
          "
        >
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-black" />
            <span className="font-medium">Favoritos</span>
          </div>
          <ChevronRight className="text-black" />
        </button>

      </div>

      {/* ============================= */}
      {/*     SEÇÃO: COMUNICAÇÃO       */}
      {/* ============================= */}
      <h2 className="text-lg font-semibold mt-8 mb-3 tracking-tight">
        Comunicação
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        <button
          onClick={() => router.push("/suporte")}
          className="
            w-full flex justify-between items-center p-4 border-b
            hover:bg-[#f9fafb] transition
          "
        >
          <div className="flex items-center gap-3">
            <Headphones size={20} className="text-black" />
            <span className="font-medium">Central de atendimento</span>
          </div>
          <ChevronRight className="text-black" />
        </button>

        <button
          onClick={() => router.push("/notificacoes")}
          className="
            w-full flex justify-between items-center p-4
            hover:bg-[#f9fafb] transition
          "
        >
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-black" />
            <span className="font-medium">Configuração de notificação</span>
          </div>
          <ChevronRight className="text-black" />
        </button>

      </div>

    </div>
  );
}

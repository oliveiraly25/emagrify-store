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
  Bell
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
    return <p className="text-center mt-10 text-black dark:text-white">Carregando...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 text-black dark:text-white">

      <h1 className="text-3xl font-bold mb-2">Sua conta</h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Olá {user.email}. Aqui tem tudo o que você precisa.
      </p>

      {/* ============================= */}
      {/*     PEDIDOS                  */}
      {/* ============================= */}
      <h2 className="text-lg font-semibold mb-3">Pedidos</h2>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow">

        <button
          onClick={() => router.push("/pedidos")}
          className="w-full flex justify-between items-center p-4 border-b 
            hover:bg-gray-50 dark:hover:bg-[#222]"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} />
            <span>Meus pedidos</span>
          </div>
          <ChevronRight />
        </button>

        <button
          onClick={() => router.push("/favoritos")}
          className="w-full flex justify-between items-center p-4 
            hover:bg-gray-50 dark:hover:bg-[#222]"
        >
          <div className="flex items-center gap-3">
            <Heart size={20} />
            <span>Favoritos</span>
          </div>
          <ChevronRight />
        </button>

      </div>

      {/* ============================= */}
      {/*     SEUS DADOS               */}
      {/* ============================= */}
      <h2 className="text-lg font-semibold mt-8 mb-3">Seus Dados</h2>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow">

        <button
          onClick={() => router.push("/dados-pessoais")}
          className="w-full flex justify-between items-center p-4 border-b 
            hover:bg-gray-50 dark:hover:bg-[#222]"
        >
          <div className="flex items-center gap-3">
            <User size={20} />
            <span>Dados pessoais</span>
          </div>
          <ChevronRight />
        </button>

        <button
          onClick={() => router.push("/enderecos")}
          className="w-full flex justify-between items-center p-4 border-b 
            hover:bg-gray-50 dark:hover:bg-[#222]"
        >
          <div className="flex items-center gap-3">
            <Truck size={20} />
            <span>Endereços de entrega</span>
          </div>
          <ChevronRight />
        </button>

        <button
          onClick={() => router.push("/pagamentos")}
          className="w-full flex justify-between items-center p-4 
            hover:bg-gray-50 dark:hover:bg-[#222]"
        >
          <div className="flex items-center gap-3">
            <CreditCard size={20} />
            <span>Formas de pagamento</span>
          </div>
          <ChevronRight />
        </button>

      </div>

      {/* ============================= */}
      {/*     COMUNICAÇÃO              */}
      {/* ============================= */}
      <h2 className="text-lg font-semibold mt-8 mb-3">Comunicação</h2>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow">

        <button
          onClick={() => router.push("/suporte")}
          className="w-full flex justify-between items-center p-4 border-b 
            hover:bg-gray-50 dark:hover:bg-[#222]"
        >
          <div className="flex items-center gap-3">
            <Headphones size={20} />
            <span>Central de atendimento</span>
          </div>
          <ChevronRight />
        </button>

        <button
          onClick={() => router.push("/notificacoes")}
          className="w-full flex justify-between items-center p-4 
            hover:bg-gray-50 dark:hover:bg-[#222]"
        >
          <div className="flex items-center gap-3">
            <Bell size={20} />
            <span>Configuração de notificação</span>
          </div>
          <ChevronRight />
        </button>

      </div>

    </div>
  );
}

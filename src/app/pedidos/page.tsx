"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadOrders() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.push("/login");
        return;
      }

      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!ordersData) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: items } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          return { ...order, items: items || [] };
        })
      );

      setOrders(ordersWithItems);
      setLoading(false);
    }

    loadOrders();
  }, [router]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-black font-medium">
        Carregando pedidos...
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-12 text-gray-600">
        <p className="text-lg font-semibold">
          Você ainda não fez nenhum pedido.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 text-black">
      <h1 className="text-3xl font-bold text-center mb-6 tracking-tight">
        Meus Pedidos
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              bg-white rounded-2xl p-5 
              border border-gray-200 shadow-sm
            "
          >
            {/* Cabeçalho do pedido */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Pedido realizado em{" "}
                <b>
                  {new Date(order.created_at).toLocaleDateString("pt-BR")}
                </b>
              </p>

              {/* Status Premium */}
              <span
                className={`
                  px-3 py-1 rounded-full text-sm font-semibold capitalize
                  ${
                    order.status === "entregue"
                      ? "bg-[#406945]/10 text-[#406945]"
                      : order.status === "enviado"
                      ? "bg-black/10 text-black"
                      : "bg-gray-200 text-gray-700"
                  }
                `}
              >
                {order.status}
              </span>
            </div>

            {/* Itens */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex items-center gap-4 
                    border-b border-gray-200 pb-4
                  "
                >
                  <img
                    src={item.product_image || "https://via.placeholder.com/80"}
                    className="w-20 h-20 rounded-xl border object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} unidade(s)
                    </p>
                    <p className="text-[#406945] font-bold mt-1">
                      R$ {item.product_price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-end mt-5">
              <p className="text-lg font-semibold">
                Total:{" "}
                <span className="text-[#406945]">
                  R$ {order.total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

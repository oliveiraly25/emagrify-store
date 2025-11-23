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

      // Buscar pedidos
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!ordersData) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Buscar itens de cada pedido
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
    return <p className="text-center mt-10">Carregando pedidos...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p className="text-lg">Você ainda não fez nenhum pedido 😔</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Meus Pedidos</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-5 shadow border"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                Pedido em{" "}
                <b>
                  {new Date(order.created_at).toLocaleDateString("pt-BR")}
                </b>
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "entregue"
                    ? "bg-green-100 text-green-700"
                    : order.status === "enviado"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={
                      item.product_image ||
                      "https://via.placeholder.com/80"
                    }
                    className="w-20 h-20 rounded-lg border object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} unidade(s)
                    </p>
                    <p className="text-pink-600 font-bold">
                      R$ {item.product_price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <p className="text-lg font-semibold">
                Total:{" "}
                <span className="text-pink-600">
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

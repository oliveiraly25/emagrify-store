"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    name: string;
    price: number;
    image_url: string | null;
  };
}

export default function CarrinhoPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar usuário e carrinho
  useEffect(() => {
    async function loadData() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) {
        router.push("/login");
        return;
      }

      setUser(auth.user);

      const { data: cartData } = await supabase
        .from("cart")
        .select(`id, product_id, quantity, products ( name, price, image_url )`)
        .eq("user_id", auth.user.id);

      setCart(cartData || []);
      setLoading(false);
    }

    loadData();
  }, [router]);

  // Calcular total do carrinho
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.products.price;
  }, 0);

  // Remover item
  async function removeItem(id: string) {
    await supabase.from("cart").delete().eq("id", id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  if (loading) {
    return (
      <p className="text-center mt-10 text-black font-medium">Carregando...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 text-black">

      <h1 className="text-3xl font-bold mb-4 tracking-tight">Seu carrinho</h1>

      {/* Carrinho vazio */}
      {cart.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-medium text-gray-600">
            Seu carrinho está vazio 🛍️
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-[#406945] transition"
          >
            Explorar produtos
          </button>
        </div>
      )}

      {/* Itens do carrinho */}
      {cart.length > 0 && (
        <div className="space-y-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.products.image_url || "/placeholder.png"}
                  alt={item.products.name}
                  width={70}
                  height={70}
                  className="rounded-lg object-cover border"
                />

                <div>
                  <p className="font-medium">{item.products.name}</p>
                  <p className="text-sm text-gray-600">
                    R$ {item.products.price.toFixed(2)}
                  </p>
                  <p className="text-xs mt-1">
                    Quantidade: <span className="font-semibold">{item.quantity}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="p-2 rounded-full hover:bg-red-50 transition"
              >
                <Trash2 className="text-red-500" />
              </button>
            </div>
          ))}

          {/* Resumo do carrinho */}
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => alert("Checkout em desenvolvimento")}
              className="
                mt-6 w-full py-3 rounded-full bg-black text-white
                hover:bg-[#406945] transition font-semibold tracking-wide
              "
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

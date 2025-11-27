"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CarrinhoPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = getCart();
    setItems(cart);
    setLoading(false);
  }, []);

  function handleRemove(id: number) {
    removeFromCart(id);
    setItems(getCart());
  }

  function handleQuantity(id: number, newQty: number) {
    if (newQty <= 0) return;
    updateQuantity(id, newQty);
    setItems(getCart());
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-black">
        Carregando carrinho...
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Seu carrinho</h1>

      {items.length === 0 ? (
        <p className="text-gray-600 text-lg">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-4 p-4 border rounded-xl bg-white"
            >
              <div className="relative w-20 h-20">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* NOME + PREÇO */}
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-500">
                  R$ {item.product.price.toFixed(2)}
                </p>

                {/* QUANTIDADE */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span className="px-3">{item.quantity}</span>

                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* REMOVER */}
              <button
                onClick={() => handleRemove(item.product.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {/* TOTAL */}
          <div className="p-4 bg-gray-100 rounded-xl border text-lg font-semibold flex justify-between">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          {/* FINALIZAR */}
          <button
            className="
              w-full mt-4 py-3 rounded-xl bg-black text-white font-semibold
              hover:bg-[#406945] transition
            "
          >
            Finalizar compra
          </button>
        </div>
      )}
    </div>
  );
}

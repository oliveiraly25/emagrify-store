"use client";

import { useEffect, useState } from "react";
import { getCart, clearCart } from "@/lib/cart";

export default function CarrinhoPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 font-tusca">Seu carrinho</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 mt-10">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-xl"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Qtd: {item.qty}</p>
                </div>
                <span className="font-bold">
                  R$ {(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              clearCart();
              setCart([]);
            }}
            className="mt-6 w-full py-3 bg-black text-white rounded-xl"
          >
            Limpar carrinho
          </button>
        </>
      )}
    </div>
  );
}

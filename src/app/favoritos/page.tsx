"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function FavoritosPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) {
        router.push("/login");
        return;
      }

      setUser(auth.user);

      // Buscar favoritos do usuário
      const { data } = await supabase
        .from("favoritos")
        .select("*, produtos(*)")
        .eq("user_id", auth.user.id);

      setFavoritos(data || []);
      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-black font-medium">
        Carregando favoritos...
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">

      <h1 className="text-3xl font-bold mb-4 text-black tracking-tight">
        Seus Favoritos ❤️
      </h1>

      {favoritos.length === 0 && (
        <p className="text-gray-600">Você ainda não favoritou nenhum produto.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
        {favoritos.map((item) => (
          <Link
            key={item.id}
            href={`/produto/${item.produtos.id}`}
            className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
          >
            <Image
              src={item.produtos.imagem_url}
              width={400}
              height={400}
              alt={item.produtos.nome}
              className="object-cover w-full h-48"
            />

            <div className="p-3">
              <p className="font-semibold">{item.produtos.nome}</p>

              <p className="text-[15px] text-gray-700 mt-1">
                R$ {item.produtos.preco}
              </p>

              <Heart className="mt-2 text-[#406945] fill-[#406945]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

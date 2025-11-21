'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erro ao carregar perfil:", error);
      }

      setProfile(data);
      setNewName(data?.name || "");
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function updateName() {
    if (!profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({ name: newName })
      .eq("id", profile.id);

    if (error) {
      alert("Erro ao atualizar nome: " + error.message);
      return;
    }

    setProfile({ ...profile, name: newName });
    alert("Nome atualizado com sucesso!");
  }

  if (loading) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Meu Perfil</h1>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Nome:</p>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            onClick={updateName}
            className="mt-2 w-full bg-pink-600 text-white py-2 rounded"
          >
            Atualizar Nome
          </button>
        </div>

        <div>
          <p className="text-sm text-gray-600">Email:</p>
          <p className="font-semibold">{profile?.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Pontos:</p>
          <p className="font-semibold">{profile?.points}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Conta criada em:</p>
          <p className="font-semibold">
            {new Date(profile?.created_at).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
}

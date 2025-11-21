"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

type ProfileRow = {
  id: string;
  name: string | null;
  phone: string | null;
  bio: string | null;
  avatar_url: string | null;
  email?: string | null;
  points?: number | null;
  created_at?: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        router.push("/login");
        return;
      }

      const id = userData.user.id;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Erro ao carregar perfil.");
        setLoading(false);
        return;
      }

      const p = data as ProfileRow;
      if (!p.email) {
        p.email = userData.user.email ?? "";
      }

      setProfile(p);
      setName(p.name ?? "");
      setPhone(p.phone ?? "");
      setBio(p.bio ?? "");
      setAvatar(p.avatar_url ?? "");
      setLoading(false);
    };

    load();
  }, [router]);

const handleUpdate = async () => {
  if (!profile) return;
  setError("");

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: name,
      phone: phone,
    })
    .eq("id", profile.id);

  if (error) {
    setError("Erro ao atualizar perfil.");
    return;
  }

  setProfile({
    ...profile,
    full_name: name,
    phone,
  });

  alert("Perfil atualizado com sucesso!");
};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10">Perfil não encontrado.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Meu Perfil</h1>

      <div className="flex flex-col items-center mb-6">
        <img
          src={
            avatar ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full object-cover border shadow"
        />
        <input
          type="text"
          placeholder="URL da foto de perfil"
          className="w-full border p-2 mt-3 rounded"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Nome completo</p>
          <input
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p className="text-sm text-gray-600">Telefone</p>
          <input
            className="w-full border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <p className="text-sm text-gray-600">Bio</p>
          <textarea
            className="w-full border p-2 rounded"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <p className="text-sm text-gray-600">Email</p>
          <p className="font-semibold bg-gray-100 p-2 rounded">
            {profile.email ?? ""}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Pontos acumulados</p>
          <p className="font-bold text-pink-600 text-xl">
            {profile.points ?? 0}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Conta criada em</p>
          <p className="font-semibold">
            {profile.created_at
              ? new Date(profile.created_at).toLocaleDateString("pt-BR")
              : "-"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          onClick={handleUpdate}
          className="w-full bg-pink-600 text-white py-3 rounded font-semibold"
        >
          Salvar alterações
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-gray-300 text-gray-800 py-3 rounded font-semibold"
        >
          Sair da conta
        </button>

        <button
          onClick={() => router.push("/pedidos")}
          className="w-full bg-purple-600 text-white py-3 rounded font-semibold"
        >
          Meus pedidos
        </button>
      </div>
    </div>
  );
}

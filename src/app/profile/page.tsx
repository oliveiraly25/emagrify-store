"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  // 🔹 Carrega o usuário logado e o perfil
  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const id = userData.user.id;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      setProfile(profileData);

      setName(profileData?.name || "");
      setPhone(profileData?.phone || "");
      setBio(profileData?.bio || "");
      setAvatar(profileData?.avatar_url || "");

      setLoading(false);
    }

    load();
  }, [router]);

  // 🔹 Atualizar perfil (nome, telefone, bio, foto)
  async function updateProfile() {
    const { error } = await supabase
      .from("profiles")
      .update({
        name,
        phone,
        bio,
        avatar_url: avatar,
      })
      .eq("id", profile.id);

    if (error) {
      alert("Erro ao atualizar perfil: " + error.message);
      return;
    }

    alert("Perfil atualizado com sucesso!");
  }

  // 🔹 Botão de sair da conta
  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-xl rounded-2xl">

      <h1 className="text-3xl font-bold text-center mb-6">
        Meu Perfil
      </h1>

      {/* FOTO DE PERFIL */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            avatar ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
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

      <div className="space-y-4">

        {/* Nome */}
        <div>
          <p className="text-sm text-gray-600">Nome completo:</p>
          <input
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Telefone */}
        <div>
          <p className="text-sm text-gray-600">Telefone:</p>
          <input
            className="w-full border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </di

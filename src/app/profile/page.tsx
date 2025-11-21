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


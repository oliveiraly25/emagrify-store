import { supabase } from "./supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Erro ao carregar produtos:", error);
    return [];
  }

  return data;
}

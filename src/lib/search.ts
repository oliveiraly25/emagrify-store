import { supabase } from "./supabaseClient";

export async function searchProducts(query: string) {
  if (!query || query.trim().length === 0) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }

  return data;
}

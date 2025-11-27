import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request, { params }: any) {
  const { id } = params;

  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("product_id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data.length) {
    return NextResponse.json({ average: 0 });
  }

  const avg =
    data.reduce((acc, r) => acc + r.rating, 0) / data.length;

  return NextResponse.json({ average: avg });
}

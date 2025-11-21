import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, senha } = await request.json();

  // Suas credenciais secretas (NÃO aparecem no frontend)
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_SENHA = process.env.ADMIN_SENHA;

  if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
    const response = NextResponse.json({ ok: true });

    // Cria cookie seguro
    response.cookies.set({
      name: "admintoken",
      value: "admin-autorizado",
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}

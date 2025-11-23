import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, senha } = await request.json();

  // Credenciais secretas (guardadas na Vercel)
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_SENHA = process.env.ADMIN_SENHA;

  // Se os dados estiverem corretos
  if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
    const response = NextResponse.json({ ok: true });

    // Criar cookie seguro SOMENTE quando o login é válido
    response.cookies.set({
      name: "admintoken",
      value: "admin-autorizado",
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  }

  // Se os dados estiverem errados
  return NextResponse.json({ ok: false }, { status: 401 });
}

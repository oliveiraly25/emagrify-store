import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const isAdminPage = url.pathname.startsWith("/admin");

  // Verifica cookie de admin
  const token = request.cookies.get("admintoken")?.value;

  if (isAdminPage && token !== "admin-autorizado") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

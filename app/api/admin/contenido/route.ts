import { NextResponse } from "next/server";
import { readAdminContent } from "@/lib/admin-content-storage";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return false;
  }

  const url = new URL(request.url);
  const providedPassword =
    request.headers.get("x-admin-password") ?? url.searchParams.get("password");

  return providedPassword === configuredPassword;
}

export async function GET(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Falta configurar ADMIN_PASSWORD." },
      { status: 500 }
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Contraseña inválida." }, { status: 401 });
  }

  try {
    const result = await readAdminContent();
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo leer el contenido.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

"use server";
import { cookies } from "next/headers";

// Tipado para rutas válidas del backend
type BackendRoute =
  | "/users/profile"
  | "/auth/refresh"
  | "/auth/login"
  | "/auth/register"
  | "/auth/logout"
  ;

// Fetch autenticado del lado del servidor, con intento de refresh automático si expira la sesión
export async function serverAuthFetchWithRefresh(route: BackendRoute, init: RequestInit = {}) {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";
  const url = `${backendUrl}${route}`;

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;

  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> || {}),
    "Content-Type": "application/json",
  };

  if (access || refresh) {
    headers["Cookie"] = [
      access ? `access=${access}` : null,
      refresh ? `refresh=${refresh}` : null,
    ].filter(Boolean).join("; ");
  }

  const opts: RequestInit = {
    ...init,
    headers,
  };

  // 1. Realiza la petición original
  let res = await fetch(url, opts);
  if (res.status !== 401) return res;

  // 2. Si la sesión expiró, intenta refrescar
  const refreshRes = await fetch(`${backendUrl}/auth/refresh`, {
    method: "POST",
    headers,
  });

  if (!refreshRes.ok) {
    return res;
  }

  // 3. Si el refresh fue exitoso, repite la petición original
  res = await fetch(url, opts);
  return res;
}

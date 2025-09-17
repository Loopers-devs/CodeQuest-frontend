import { LoginSchema, RegisterSchema } from "@/schema/auth";
import { getTranslations } from "next-intl/server";


export async function getSocialAuthUrl(provider: "google" | "discord") {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";
  if (provider === "google") return `${backendUrl}/auth/google`;
  if (provider === "discord") return `${backendUrl}/auth/discord`;
  const t = await getTranslations("auth");
  throw new Error(t("unsupportedProvider"));
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";
// Refresca la sesión del usuario llamando al endpoint /auth/refresh
export async function clientRefreshSession() {
  const resp = await fetch(`${backendUrl}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!resp.ok) {
    // Si falla el refresh, cerrar sesión
    await fetch(`${backendUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return false;
  }
  // Si tiene éxito, simplemente retorna true (sesión renovada)
  return true;
}

export async function clientRegister({ email, fullName, password }: RegisterSchema) {
  const resp = await fetch(`${backendUrl}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, fullName, password }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    return { error: data.error || "Error en el registro", message: null };
  }

  return { error: null, message: "Registro exitoso" };
}

export async function clientLogin(data: LoginSchema) {
  const resp = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    if (resp.status === 401) {
      return { error: "Credenciales inválidas", message: null };
    }
    return { error: "Error en el servidor", message: null };
  }

  return { error: null, message: "Inicio de sesión exitoso" };
}

export function buildSocialUrl(provider: 'google' | 'discord', opts?: { redirect?: string; locale?: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  const base = `${backendUrl}/auth/${provider}`;

  // redirect deseado: si no pasas, cae a dashboard del locale actual
  const redirect = opts?.redirect ?? `/${opts?.locale || 'es'}/dashboard`;

  // state codifica dónde volver; tu guard en Nest debe devolver state intacto en el callback
  const state = Buffer.from(JSON.stringify({ redirect }), 'utf-8').toString('base64');

  const url = new URL(base);
  url.searchParams.set('state', state);

  // Opcional: pedir offline access para Google si quieres refresh del proveedor (no necesario para tu sesión propia)
  // url.searchParams.set('access_type', 'offline');

  return url.toString();
}

export function clientLogout() {
  return fetch(`${backendUrl}/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  });
}

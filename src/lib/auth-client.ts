import { LoginSchema, RegisterSchema } from "@/schema/auth";

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

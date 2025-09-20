// Esta función realiza peticiones autenticadas y gestiona el refresh automático de sesión si expira el token.
export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  // 1. Prepara las opciones para fetch, asegurando que siempre se envíen las cookies (credentials: 'include')
  const opts: RequestInit = {
    ...init,
    credentials: 'include', // envía cookies cross-site (necesario para auth basada en cookies)
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  };

  // 2. Realiza la petición original
  const res = await fetch(input, opts);

  // 3. Si la respuesta NO es 401 (no expiró la sesión), retorna la respuesta tal cual
  if (res.status !== 401) return res;

  // 4. Si la respuesta es 401 (token expirado), intenta refrescar la sesión llamando al endpoint /auth/refresh
  const refreshRes = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  // 5. Si el refresh falla, retorna la respuesta original (no se pudo renovar sesión)
  if (!refreshRes.ok) {
    return res;
  }

  // 6. Si el refresh fue exitoso, repite la petición original (ahora con la sesión renovada)
  return await fetch(input, opts);
}
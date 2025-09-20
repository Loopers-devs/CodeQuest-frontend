/**
 * Helpers para leer y validar query/search params
 *
 * Uso general:
 * - Preferir estas funciones en lugar de `searchParams.get(name) ?? ''`.
 * - Devuelven `undefined` cuando el parámetro no existe o no es válido, lo que permite
 *   distinguir entre "ausente" y "valor vacío".
 * - Para Selects que no aceptan cadena vacía, usar `paramToSelectValue` para mapear `undefined`
 *   al sentinel `ALL_VALUE` (por ejemplo `__ALL__`).
 */

/**
 * Devuelve un parámetro de tipo string si existe y no es vacío (trimmed).
 * Retorna `undefined` si el parámetro no está en la URL o está vacío.
 *
 * Uso: ideal para inicializar inputs o valores opcionales.
 * Ejemplo:
 * const q = getStringParam(searchParams, 'search') ?? '';
 */
export function getStringParam(params: URLSearchParams, name: string): string | undefined {
  const v = params.get(name);
  if (v == null) return undefined;
  const trimmed = v.trim();
  return trimmed === "" ? undefined : trimmed;
}

/**
 * Parsea un parámetro numérico y devuelve `number` o `undefined` si no es válido.
 *
 * Uso: se recomienda para parámetros de paginación o tamaño (`page`, `take`).
 * Ejemplo:
 * const page = getNumberParam(searchParams, 'page') ?? 1;
 */
export function getNumberParam(params: URLSearchParams, name: string): number | undefined {
  const v = params.get(name);
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Valida que el parámetro esté dentro de los valores permitidos por un enum simple (objeto string->string).
 * Devuelve el valor (string) o `undefined` si no es válido/ausente.
 *
 * Uso: controlar opciones tipo `status` o `visibility` antes de pasarlas a componentes o queries.
 * Ejemplo:
 * const status = getEnumParam(searchParams, 'status', PostStatus);
 */
export function getEnumParam(
  params: URLSearchParams,
  name: string,
  enumObj: Record<string, string>
): string | undefined {
  const v = params.get(name);
  if (v == null) return undefined;
  const values = Object.values(enumObj) as string[];
  return values.includes(v) ? v : undefined;
}

/**
 * Convierte un `string | undefined` en el valor del Select esperando `allValue` como sentinel.
 * Usar sólo en la capa de UI para inicializar el `value` de componentes que no aceptan `undefined`.
 *
 * Ejemplo:
 * const [status, setStatus] = useState(paramToSelectValue(getEnumParam(...), '__ALL__'))
 */
export function paramToSelectValue(val: string | undefined, allValue = "__ALL__") {
  return val == null ? allValue : val;
}

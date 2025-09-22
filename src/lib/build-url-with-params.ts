export const buildUrlWithParams = (baseUrl: string, searchParams?: unknown) => {
  const params = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (!value) return;

    params.append(key, String(value));
  });

  const queryString = params.toString();

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
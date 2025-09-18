import { cookies } from 'next/headers';

export async function hasAccessCookie() {
  const store = await cookies();
  const access = store.get('access');
  return Boolean(access?.value);
}

"use server";
import { cookies } from 'next/headers';

export async function getSessionCookies() {
    const cookieStore = await cookies();
    const session = cookieStore.get('access');
    return session?.value ?? null;
}
"use server";
import { serverAuthFetchWithRefresh } from '@/lib/serverAuthFetch';

export async function profileAction() {
    const res = await serverAuthFetchWithRefresh('/users/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

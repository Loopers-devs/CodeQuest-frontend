"use server";
import { User } from '@/interfaces';
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

    return await res.json() as User;
}

export async function sessionAction() {
    const user = await profileAction();

    if (!user) throw new Error('No session');

    return user;
}

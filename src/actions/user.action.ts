"use server";
import { serverAuthFetchWithRefresh } from '@/lib/serverAuthFetch';
import { getTranslations } from 'next-intl/server';

export async function profileAction() {
    const res = await serverAuthFetchWithRefresh('/users/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        const t = await getTranslations('actions');
        throw new Error(t('profileError'));
    }

    return res.json();
}

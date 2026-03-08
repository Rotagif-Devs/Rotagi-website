import { apiFetch } from '../api';

export async function getPrograms() {
    const json = await apiFetch<{ success: boolean; data?: { programs?: Array<{ _id: string; slug: string; title: string }> } }>(
        '/programs',
    );
    return json?.data?.programs || [];
}

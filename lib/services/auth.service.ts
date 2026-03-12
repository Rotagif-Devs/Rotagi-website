import { apiFetch } from '../api';

export async function register(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    phone: string;
    birthDate: string;
    programId: string;
    termsAccepted: true;
    privacyAccepted: true;
    commsOptIn?: boolean;
}) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/register', { method: 'POST', body: payload });
}

export async function login(payload: { email: string; password: string; programSlug: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/login', { method: 'POST', body: payload });
}

export async function forgotPassword(payload: { email: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/forgot-password', { method: 'POST', body: payload });
}

export async function resendVerification(payload: { email: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/resend-verification', { method: 'POST', body: payload });
}

export async function verifyResetCode(payload: { email: string; code: string }) {
    return apiFetch<{ message?: string; token?: string; expiresAt?: string;[key: string]: any }>('/auth/verify-reset-code', { method: 'POST', body: payload });
}

export async function resetPassword(payload: { email: string; token: string; newPassword: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/reset-password', { method: 'POST', body: payload });
}

export async function createPassword(payload: { email: string; password: string; otp?: string; token?: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/create-password', { method: 'POST', body: payload });
}

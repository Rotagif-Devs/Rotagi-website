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

export async function login(payload: { email: string; password: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/login', { method: 'POST', body: payload });
}

export async function forgotPassword(payload: { email: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/forgot-password', { method: 'POST', body: payload });
}

export async function verifyOtp(payload: { email: string; otp: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/verify-otp', { method: 'POST', body: payload });
}

export async function resetPassword(payload: { email: string; password: string; otp?: string; token?: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/reset-password', { method: 'POST', body: payload });
}

export async function createPassword(payload: { email: string; password: string; otp?: string; token?: string }) {
    return apiFetch<{ message?: string;[key: string]: any }>('/auth/create-password', { method: 'POST', body: payload });
}

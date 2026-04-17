import { apiFetch } from '../api';

export type ApiResponse<T = any> = {
    success: boolean;
    data?: T;
    message?: string;
    errors?: any[];
    requestId?: string;
};

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
    return apiFetch<ApiResponse>('/auth/register', { method: 'POST', body: payload });
}

export async function login(payload: { email: string; password: string; programSlug: string }) {
    return apiFetch<ApiResponse<{ accessToken: string; [key: string]: any }>>('/auth/login', { method: 'POST', body: payload });
}

/** Admin login — same endpoint as regular login, programSlug is required by the backend. */
export async function adminLogin(payload: { email: string; password: string; programSlug: string }) {
    return apiFetch<ApiResponse<{ accessToken: string; [key: string]: any }>>('/auth/login', { method: 'POST', body: payload });
}

export async function forgotPassword(payload: { email: string }) {
    return apiFetch<ApiResponse>('/auth/forgot-password', { method: 'POST', body: payload });
}

export async function resendVerification(payload: { email: string }) {
    return apiFetch<ApiResponse>('/auth/resend-verification', { method: 'POST', body: payload });
}

export async function verifyResetCode(payload: { email: string; code: string }) {
    return apiFetch<ApiResponse<{ token?: string; expiresAt?: string }>>('/auth/verify-reset-code', { method: 'POST', body: payload });
}

export async function resetPassword(payload: { email: string; token: string; newPassword: string }) {
    return apiFetch<ApiResponse>('/auth/reset-password', { method: 'POST', body: payload });
}

export async function createPassword(payload: { email: string; password: string; otp?: string; token?: string }) {
    return apiFetch<ApiResponse>('/auth/create-password', { method: 'POST', body: payload });
}

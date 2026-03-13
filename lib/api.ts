import { getAccessToken } from './token.service';


export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || ''
).replace(/\/+$/, '');

type Json = Record<string, unknown>;

type ApiError = {
  success?: boolean;
  message?: string;
  errors?: unknown;
  requestId?: string;
};

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  options?: {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
    accessToken?: string;
    credentials?: RequestCredentials;
    cache?: RequestCache;
  },
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers: Record<string, string> = {
    ...(options?.headers || {}),
  };

  const token = options?.accessToken !== undefined ? options.accessToken : (typeof window !== 'undefined' ? getAccessToken() : null);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let body: BodyInit | undefined;
  if (options?.body !== undefined) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    body = JSON.stringify(options.body);
  }

  const res = await fetch(url, {
    method: options?.method || (options?.body !== undefined ? 'POST' : 'GET'),
    headers,
    body,
    credentials: options?.credentials ?? 'include',
    cache: options?.cache ?? 'no-store',
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    const err = (data && typeof data === 'object' ? (data as ApiError) : null);
    const msg = err?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data as T;
}
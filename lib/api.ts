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
    /** Timeout in ms. Defaults to 3000 for GET (SSR), 30000 for POST/PATCH/DELETE */
    timeout?: number;
    baseUrl?: string;
  },
): Promise<T> {
  const base = options?.baseUrl || API_BASE_URL;
  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers: Record<string, string> = {
    ...(options?.headers || {}),
  };

  const token = options?.accessToken !== undefined ? options.accessToken : (typeof window !== 'undefined' ? getAccessToken() : null);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let body: BodyInit | undefined;
  if (options?.body !== undefined) {
    if (options.body instanceof FormData) {
      body = options.body;
      // Do not set Content-Type header for FormData, 
      // the browser will set it with the correct boundary
    } else {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      body = JSON.stringify(options.body);
    }
  }

  const method = options?.method || (options?.body !== undefined ? 'POST' : 'GET');
  const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
  // Short timeout for background SSR fetches; long timeout for user-triggered actions
  const timeoutMs = options?.timeout ?? (isMutation ? 30_000 : 3_000);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body,
      credentials: options?.credentials ?? 'include',
      cache: options?.cache ?? 'no-store',
      signal: controller.signal,
    });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout to ${path}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    const err = (data && typeof data === 'object' ? (data as ApiError) : null);
    let msg = err?.message || `Request failed (${res.status})`;
    
    // Diagnostic info for common issues
    if (res.status === 401) {
      const hasToken = !!token;
      msg = `Unauthorized: ${hasToken ? 'Token was sent but rejected' : 'No token was found'} - ${msg}`;
      console.warn(`[apiFetch] 401 Unauthorized for ${path}. Token present: ${hasToken}`);
    } else if (res.status === 404) {
      console.warn(`[apiFetch] 404 Not Found for ${path}`);
    }
    
    throw new Error(msg);
  }

  return data as T;
}
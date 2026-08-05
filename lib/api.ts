import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from './token.service';


export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || ''
).replace(/\/+$/, '');

/** Fired when a refresh attempt fails so the admin session can be torn down (e.g. AdminContext logout + redirect). */
export const SESSION_EXPIRED_EVENT = 'auth:session-expired';
/** Fired when a refresh succeeds, so a listener can slide its own local session/idle timers forward. */
export const SESSION_REFRESHED_EVENT = 'auth:session-refreshed';

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

// Concurrent 401s should trigger exactly one refresh call, not one per request in flight.
let refreshPromise: Promise<string | null> | null = null;

async function performRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Refresh token rejected');

    const json = await res.json();
    const newAccessToken = json?.data?.accessToken as string | undefined;
    const newRefreshToken = json?.data?.refreshToken as string | undefined;
    if (!newAccessToken) throw new Error('Refresh response missing accessToken');

    setAccessToken(newAccessToken);
    if (newRefreshToken) setRefreshToken(newRefreshToken);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(SESSION_REFRESHED_EVENT));
    }
    return newAccessToken;
  } catch {
    // Refresh token is gone/expired/reused — the session is over, not retryable.
    clearTokens();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }
    return null;
  }
}

function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
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
    /** Internal: set when this call is itself the post-refresh retry, to prevent infinite loops. */
    _isRefreshRetry?: boolean;
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

  // Only the auto-attached admin token (options.accessToken left undefined) is
  // eligible for silent refresh — cohort/PIN tokens and explicit callers manage
  // their own lifecycle and should see the 401 as-is.
  const eligibleForRefresh =
    res.status === 401 &&
    options?.accessToken === undefined &&
    !!token &&
    !options?._isRefreshRetry &&
    !path.startsWith('/auth/');

  if (eligibleForRefresh) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      return apiFetch<T>(path, { ...options, accessToken: newAccessToken, _isRefreshRetry: true });
    }
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
    if (data && typeof data === 'object' && 'details' in data) {
      console.error(`[apiFetch] API Error Details for ${path}:`, (data as any).details);
    }
    
    throw new Error(msg);
  }

  return data as T;
}
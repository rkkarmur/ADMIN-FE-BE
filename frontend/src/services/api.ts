import { ENV } from '@config/env';
import { API_ENDPOINTS } from '@config/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${ENV.API_URL}${endpoint}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || res.statusText);
    }
    return res.json();
}

export interface LoginPayload { email: string; password: string; }
export interface LoginResponse { token: string; user: unknown; }
export interface ProfileResponse { token: string; user: unknown; }

export const api = {
    login: (data: LoginPayload) => request<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, { method: 'POST', body: JSON.stringify(data) }),
    logout: () => request<void>(API_ENDPOINTS.AUTH.LOGOUT, { method: 'POST' }),
    profile: () => request<ProfileResponse>(API_ENDPOINTS.AUTH.PROFILE),
};

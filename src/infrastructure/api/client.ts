import { Ok, Err, Result, ApiError } from '@/data/types/common';
import { env } from '@/infrastructure/config/env';

const API_URL = env.apiUrl;

function normalizePath(path: string): string {
    const [base, query] = path.split('?', 2);
    const normalized = base.endsWith('/') ? base : `${base}/`;
    return query ? `${normalized}?${query}` : normalized;
}

async function fetchApi<T = void>(path: string, options: RequestInit = {}): Promise<Result<T, ApiError>> {
    const defaultOptions: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    let response: Response;
    const url = `${API_URL}${normalizePath(path)}`;
    try {
        response = await fetch(url, {
            ...defaultOptions,
            ...options,
        });
    } catch (error) {
        return Err(new ApiError(0, error instanceof Error ? error.message : "Network error"));
    }

    if (!response.ok) {
        let detail: string;
        try {
            const errorBody = await response.text();
            const parsed = JSON.parse(errorBody);
            detail = parsed?.detail ?? errorBody;
        } catch {
            detail = `HTTP ${response.status}`;
        }
        return Err(new ApiError(response.status, detail));
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return Ok(data as T);
    }

    return Ok(undefined as T);
}

export default fetchApi;
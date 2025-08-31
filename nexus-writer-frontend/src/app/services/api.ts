// src/app/services/api.ts
const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

async function fetchApi(path: string, options: RequestInit = {}) {
    const defaultOptions: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const response = await fetch(`${API_URL}${path}`, {
        ...defaultOptions,
        ...options,
    });

    if (!response.ok) {
        // You can add more robust error handling here
        const errorBody = await response.text();
        throw new Error(`API Error (${response.status}): ${errorBody}`);
    }

    // Handle cases where there is no JSON body to parse
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    }
    return; 
}

export default fetchApi;
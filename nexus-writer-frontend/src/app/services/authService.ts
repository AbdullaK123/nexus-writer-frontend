/* eslint-disable @typescript-eslint/no-unused-vars */
import fetchApi from './api';
import { credentials, registrationInfo } from "@/app/types";

export const getMe = async () => {
    try {
        return await fetchApi('/auth/me');
    } catch (error) {
        // If the /me endpoint fails (e.g., 401 Unauthorized), return null
        // This is expected behavior for a user who is not logged in
        return null;
    }
};

export const login = (creds: credentials) => {
    return fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify(creds),
    });
};

export const register = (userInfo: registrationInfo) => {
    return fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userInfo),
    });
};

export const logout = () => {
    return fetchApi('/auth/logout', {
        method: 'POST',
    });
};
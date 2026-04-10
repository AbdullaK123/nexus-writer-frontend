import fetchApi from './api';
import { credentials, registrationInfo, User, Result, ApiError, Ok, None, Option, Some } from "@/app/types";

export const getMe = async (): Promise<Option<User>> => {
    const result = await fetchApi<User>('/auth/me');
    if (result._tag === "Ok") return Some(result.value);
    return None;
};

export const login = (creds: credentials): Promise<Result<void, ApiError>> => {
    return fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify(creds),
    });
};

export const register = (userInfo: registrationInfo): Promise<Result<void, ApiError>> => {
    return fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userInfo),
    });
};

export const logout = (): Promise<Result<void, ApiError>> => {
    return fetchApi('/auth/logout', {
        method: 'POST',
    });
};
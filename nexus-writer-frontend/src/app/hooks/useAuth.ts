import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { credentials, registrationInfo } from "../types/auth";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;


export function useAuth() {

    const queryClient = useQueryClient()

    const {data: user, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['auth'],
        queryFn: () => fetch(`${API_URL}/auth/me`).then((res) => res.json()),
        retry: false
    })

    const registerMutation = useMutation({
        mutationFn: (userInfo : registrationInfo) => fetch(
            `${API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userInfo)
            }
        ).then((res) => res.json()),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth'] })
    })

    const loginMutation = useMutation({
        mutationFn: (creds: credentials) => fetch(
            `${API_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(creds)
            }
        ).then((res) => res.json()),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth'] })
    })

    const logoutMutation = useMutation({
        mutationFn: () => fetch(`${API_URL}/auth/logout`, {
            method: 'POST'
        }),
        onSuccess: () => queryClient.setQueryData(['auth'], null)
    })

    return {
        user,
        isLoading,
        isError,
        isSuccess,
        register: registerMutation.mutate,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        logoutError: logoutMutation.error,
        isLoggingOut: logoutMutation.isPending,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error
    }

}
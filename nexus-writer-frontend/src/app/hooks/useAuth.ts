import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { credentials, registrationInfo } from "../types/auth";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;


export function useAuth() {

    const queryClient = useQueryClient()

    const {data: user, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['auth'],
        queryFn: () => fetch(
            `${API_URL}/auth/me`, {
                 credentials: 'include' 
            }
        ).then(
            (res) => {
                if (!res.ok) throw new Error("Not authenticated");
                return res.json()
            }
        ),
        retry: false,
        staleTime: 5*60*1000
    })

    const registerMutation = useMutation({
        mutationFn: (userInfo : registrationInfo) => fetch(
            `${API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(userInfo)
            }
        ).then(
            (res) => {
                if (!res.ok) throw new Error("Failed to register.");
                return res.json()
            }
        ),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth'] })
    })

    const loginMutation = useMutation({
        mutationFn: (creds: credentials) => fetch(
            `${API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(creds)
            }
        ).then((res) => {
            if (!res.ok) throw new Error("Invalid Credentials.")
            return res.json()
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth'] })
    })

    const logoutMutation = useMutation({
        mutationFn: () => fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        }),
        onSuccess: () => {
            queryClient.setQueryData(['auth'], null)
            queryClient.clear()
        }
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
        loginSuccess: loginMutation.isSuccess,
        logoutError: logoutMutation.error,
        isLoggingOut: logoutMutation.isPending,
        logoutSuccess: logoutMutation.isSuccess,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,
        registerSuccess: registerMutation.isSuccess
    }

}
// src/app/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from '@/app/services/authService';

export function useAuth() {
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['auth'],
        queryFn: authService.getMe, 
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: async (data, variables) => {
            loginMutation.mutate({
                email: variables.email,
                password: variables.password
            })
        }
    });

    const loginMutation = useMutation({
        mutationFn: authService.login, 
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth'] }),
    });

    const logoutMutation = useMutation({
        mutationFn: authService.logout, 
        onSuccess: () => {
            queryClient.setQueryData(['auth'], null);
            queryClient.clear();
        },
    });

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
        registerSuccess: registerMutation.isSuccess,
    };
}
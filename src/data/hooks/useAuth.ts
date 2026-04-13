// src/app/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from '@/infrastructure/api/auth';
import { credentials, registrationInfo, isSome, unwrapResult } from "@/data/types";

export function useAuth() {
    const queryClient = useQueryClient();

    const { data: userData, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['auth'],
        queryFn: authService.getMe, 
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const user = userData && isSome(userData) ? userData.value : null;

    const registerMutation = useMutation({
        mutationFn: (userInfo: registrationInfo) => authService.register(userInfo).then(unwrapResult),
        onSuccess: async (_data, variables) => {
            loginMutation.mutate({
                email: variables.email,
                password: variables.password
            })
        }
    });

    const loginMutation = useMutation({
        mutationFn: (creds: credentials) => authService.login(creds).then(unwrapResult),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth'] }),
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout().then(unwrapResult),
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
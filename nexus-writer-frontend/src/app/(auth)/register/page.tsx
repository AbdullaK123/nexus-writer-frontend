'use client'
import styles from '@/app/(auth)/AuthLayout.module.css'
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registrationFormSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be less than 50 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores"),
    email: z.string()
        .email("Please enter a valid email address")
        .min(1, "Email is required"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .regex(/(?=.*\d)/, "Password must contain at least one number")
        .regex(/(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>/?])/, "Password must contain at least one special character"),
    confirmPassword: z.string()
        .min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"] 
});

type RegistrationFormData = z.infer<typeof registrationFormSchema>;

export default function RegisterPage() {

    const {
        user, 
        register: registerUser, 
        isRegistering, 
        registerError,
        registerSuccess,
        isLoggingIn,
        loginSuccess,
        loginError
    } = useAuth()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationFormSchema)
    });

    // if we're logged in go to the dashboard
    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
    }, [user, router])

    useEffect(() => {
        console.log('Register success changed:', registerSuccess)
        if (registerSuccess) {
            console.log("Register success running!")
            reset()
        }
    }, [registerSuccess, reset])

    useEffect(() => {
        console.log('Login success changed:', loginSuccess)
        if (loginSuccess) {
            console.log("Login success! Rerouting to dashboard!")
            router.push('/dashboard')
        }
    }, [router, loginSuccess])

    const onSubmit = (data: RegistrationFormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...registrationData } = data
        registerUser(registrationData as { username: string; email: string; password: string })
    }

    const isProcessing = isRegistering || isLoggingIn

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Image
                src='./logo.svg'
                alt='Nexus Writer Logo'
                width={60} 
                height={60}
                className={styles.logo}
            />   
            <h1>Join the Nexus</h1>
            <div>
                <label
                    htmlFor='username'
                >
                    Username:
                </label>
                <Input
                    type='text'
                    id='username'
                    disabled={isProcessing}
                    {...register('username')}
                />
                {errors.username && (<span className={styles['error-badge']}>{errors.username.message}</span>)}
            </div>
            <div>
                 <label
                    htmlFor='email'
                >
                    Email:
                </label>
                <Input
                    type='email'
                    id='email'
                    disabled={isProcessing}
                    {...register('email')}
                />
                {errors.email && (<span className={styles['error-badge']}>{errors.email.message}</span>)}
            </div>
            <div>
                 <label
                    htmlFor='password'
                >
                    Password:
                </label>
                <Input
                    type='password'
                    id='password'
                    disabled={isProcessing}
                    {...register('password')}
                />
                {errors.password && (<span className={styles['error-badge']}>{errors.password.message}</span>)}
            </div>
            <div>
                 <label
                    htmlFor='confirm-password'
                >
                    Confirm Password:
                </label>
                <Input
                    type='password'
                    id='confirm-password'
                    disabled={isProcessing}
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && (<span className={styles['error-badge']}>{errors.confirmPassword.message}</span>)}
            </div>
            <Button 
                variant="primary"
                disabled={isProcessing}
            >
                {isProcessing ? 'Processing...' : 'Submit'}
            </Button>
            {isRegistering && !registerError && (
                <span className={styles['info-badge']}>Creating your account...</span>
            )}

            {isLoggingIn && (
                <span className={styles['info-badge']}>Account created! Logging you in...</span>
            )}

            {registerSuccess && loginError && (
                <span className={styles['success-badge']}>
                    Account created! Please log in on the <Link href="/login">login page</Link>.
                </span>
            )}
            {registerError && (
                <span className={styles['error-badge']}>
                    Registration failed. The server might be experiencing issues.
                </span>
            )}
        </form>
    )
}
'use client'
import styles from '@/app/(auth)/AuthLayout.module.css'
import React, { useEffect } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z.string()
        .min(1, "Password is required")
}).strict();

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {

    const {login, isLoggingIn, loginError, loginSuccess} = useAuth()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    useEffect(() => {
        if (loginSuccess) {
            reset()
            router.push('/dashboard')
        }
    }, [loginSuccess, router, reset])

    const onSubmit = (data: LoginFormData) => {
        login(data as { email: string; password: string })
    }

    return (
       <form className={styles['card']} onSubmit={handleSubmit(onSubmit)}>
             <Image
                src='./logo.svg'
                alt='Nexus Writer Logo'
                width={60} 
                height={60}
                className={styles.logo}
            />   
            <h1>Login</h1>
            <div>
                <label
                    htmlFor='email'
                >
                    Email:
                </label>
                <Input
                    type='email'
                    id='email'
                    disabled={isLoggingIn}
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
                    disabled={isLoggingIn}
                    {...register('password')}
                />
                {errors.password && (<span className={styles['error-badge']}>{errors.password.message}</span>)}
            </div>
            <Button variant="primary" type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Submit'}
            </Button>
            {loginError && (<span className={styles['error-badge']}>{loginError.message}</span>)}
            {isLoggingIn && (<span className={styles['info-badge']}>Logging you in...</span>)}
            {loginSuccess && (<span className={styles['success-badge']}>Success. Redirecting to dashboard...</span>)}
        </form>
    )
}
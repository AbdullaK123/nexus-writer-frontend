'use client'
import styles from '@/app/(auth)/AuthLayout.module.css'
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { registrationInfo } from '@/app/types/auth';
import { z } from 'zod';
import { spawn } from 'child_process';

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

export default function RegisterPage() {

    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const {user, register, isRegistering, registerError} = useAuth()
    const [errors, setErrors] = useState<Record<string, string>>({})
    const router = useRouter()

    // if we're logged in go to the dashboard
    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
    }, [user, router])

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target

        setUserInfo((prev) => {
           return {
                ...prev,
                [name]: value
           }
        })

        if (errors[name]) {
             setErrors((prev) => {
                return {
                    ...prev,
                    [name]: ""
                }
            })
        }

    }

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();

        // do zod validation
        const result = registrationFormSchema.safeParse(userInfo)

        if (!result.success) {
            const validationErrors : Record<string, string> = {} 
            result.error.errors.forEach((error) => {
                const field = error.path[0] as string
                validationErrors[field] = error.message
            })
            setErrors(validationErrors)
            return
        }

        const {confirmPassword, ...registrationData} = userInfo
        register(registrationData)
    }


    return (
        <form className={styles.card} onSubmit={handleSubmit}>
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
                <input
                    type='text'
                    name='username'
                    id='username'
                    value={userInfo.username}
                    onChange={handleOnChange}
                    disabled={isRegistering}
                />
                {errors.username && (<span className={styles['error-badge']}>{errors.username}</span>)}
            </div>
            <div>
                 <label
                    htmlFor='email'
                >
                    Email:
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={userInfo.email}
                    onChange={handleOnChange}
                    disabled={isRegistering}
                />
                {errors.email && (<span className={styles['error-badge']}>{errors.email}</span>)}
            </div>
            <div>
                 <label
                    htmlFor='password'
                >
                    Password:
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={userInfo.password}
                    onChange={handleOnChange}
                    disabled={isRegistering}
                />
                {errors.password && (<span className={styles['error-badge']}>{errors.password}</span>)}
            </div>
            <div>
                 <label
                    htmlFor='confirm-password'
                >
                    Confirm Password:
                </label>
                <input
                    type='password'
                    name='confirmPassword'
                    id='confirm-password'
                    value={userInfo.confirmPassword}
                    onChange={handleOnChange}
                    disabled={isRegistering}
                />
                {errors.confirmPassword && (<span className={styles['error-badge']}>{errors.confirmPassword}</span>)}
            </div>
            <button 
                className='btn-primary'
            >
                Submit
            </button>
            {isRegistering && (
                <span className={styles['info-badge']}>Registering...</span>
            )}
            {registerError && (
                <span className={styles['error-badge']}>Error registering you to nexus writer. The server might be experiencing issues</span>
            )}
        </form>
    )
}
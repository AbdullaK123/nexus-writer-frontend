'use client'
import styles from '@/app/(auth)/AuthLayout.module.css'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    const {login, isLoggingIn, loginError, loginSuccess} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (loginSuccess) {
            setCredentials({email: "", password: ""})
            router.push('/dashboard')
        }
    }, [loginSuccess, router])

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target

        setCredentials((prev) => {
           return {
                ...prev,
                [name]: value
           }
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(credentials)
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
            <h1>Login</h1>
            <div>
                <label
                    htmlFor='email'
                >
                    Email:
                </label>
                <Input
                    type='email'
                    name='email'
                    id='email'
                    value={credentials.email}
                    onChange={handleOnChange}
                    disabled={isLoggingIn}
                />
            </div>
            <div>
                 <label
                    htmlFor='password'
                >
                    Password:
                </label>
                <Input
                    type='password'
                    name='password'
                    id='password'
                    value={credentials.password}
                    onChange={handleOnChange}
                    disabled={isLoggingIn}
                />
            </div>
            <Button variant="primary">
                Submit
            </Button>
            {loginError && (<span className={styles['error-badge']}>{loginError.message}</span>)}
            {isLoggingIn && (<span className={styles['info-badge']}>Logging you in...</span>)}
            {loginSuccess && (<span className={styles['success-badge']}>Success. Redirecting to dashboard...</span>)}
        </form>
    )
}
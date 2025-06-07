import React from 'react';
import styles from '@/app/(auth)/AuthLayout.module.css'

export default function AuthLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <div className='auth-layout'>
            <main className={styles['auth-body']}>
                {children}
            </main>
        </div>
    )
}
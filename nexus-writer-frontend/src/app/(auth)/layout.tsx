import React from 'react';
import styles from '@/app/(auth)/AuthLayout.module.css'
import HolographicBackground from '@/components/ui/Background/HolographicBackground';

export default function AuthLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <div className='auth-layout'>
            <main className={styles['auth-body']}>
                <HolographicBackground/>
                {children}
            </main>
        </div>
    )
}
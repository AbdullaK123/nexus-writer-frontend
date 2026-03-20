'use client'
import React from 'react';
import styles from './AppLayout.module.css'
import AuthWrapper from '@/components/features/AuthWrapper/AuthWrapper';

export default function AppLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <AuthWrapper>
            <div className='app-layout'>
                <main className={styles['app-body']}>
                    {children}
                </main>
            </div>
        </AuthWrapper>
    )
}
'use client'
import React from 'react';
import styles from './AppLayout.module.css'
import AuthWrapper from '@/components/features/AuthWrapper/AuthWrapper';
import { ToastProvider } from '@/app/hooks/useToast';
import JobStatusWatcher from '@/components/features/JobStatusWatcher/JobStatusWatcher';

export default function AppLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <AuthWrapper>
            <ToastProvider>
                <div className='app-layout'>
                    <main className={styles['app-body']}>
                        {children}
                    </main>
                </div>
            </ToastProvider>
        </AuthWrapper>
    )
}
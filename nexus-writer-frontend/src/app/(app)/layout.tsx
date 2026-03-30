'use client'
import React from 'react';
import styles from './AppLayout.module.css'
import AuthWrapper from '@/components/features/AuthWrapper/AuthWrapper';
import { SocketProvider } from '@/app/hooks/useWebsocket';
import JobStatusWatcher from '@/components/features/JobStatusWatcher/JobStatusWatcher';

export default function AppLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <AuthWrapper>
            <SocketProvider>
                <JobStatusWatcher />
                <div className='app-layout'>
                    <main className={styles['app-body']}>
                        {children}
                    </main>
                </div>
            </SocketProvider>
        </AuthWrapper>
    )
}
'use client'
import React from 'react';
import styles from './AppLayout.module.css'
import AuthWrapper from '@/components/auth/AuthWrapper/AuthWrapper';
import { SocketProvider } from '@/app/hooks/common/useWebsocket';
import JobStatusWatcher from '@/components/jobs/JobStatusWatcher/JobStatusWatcher';

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
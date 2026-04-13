import React from 'react';
import styles from './AppLayout.module.css'
import AuthWrapper from '@/features/auth/AuthWrapper/AuthWrapper';
import { SocketProvider } from '@/shared/providers/SocketProvider';
import JobStatusWatcher from '@/features/jobs/JobStatusWatcher/JobStatusWatcher';

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
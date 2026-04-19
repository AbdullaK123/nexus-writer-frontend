import React from 'react';
import styles from './AppLayout.module.css'
import { SocketProvider } from '@/shared/providers/SocketProvider';

export default function AppLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <SocketProvider>
            <div className='app-layout'>
                <main className={styles['app-body']}>
                    {children}
                </main>
            </div>
        </SocketProvider>
    )
}
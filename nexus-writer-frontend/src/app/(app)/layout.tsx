'use client'
import React from 'react';
import styles from './AppLayout.module.css'

export default function AppLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <div className='app-layout'>
            <main className={styles['app-body']}>
                {children}
            </main>
        </div>
    )
}
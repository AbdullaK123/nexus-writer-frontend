'use client'
import React from 'react';
import styles from './AppLayout.module.css'
import DashboardToolbar from '@/components/ui/DashboardToolbar/DashboardToolbar';
import { StoryCreateRequest } from '../types/stories';

export default function AppLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <div className='app-layout'>
            <main className={styles['app-body']}>
                <DashboardToolbar
                    username="placeholder"
                    onCreateStory={(story : StoryCreateRequest) => {}}
                    onLayoutChange={() => {}}
                />
                {children}
            </main>
        </div>
    )
}
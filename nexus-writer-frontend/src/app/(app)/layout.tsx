import React from 'react';

export default function AppLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <div className='app-layout'>
            <main className='app-body'>
                {children}
            </main>
        </div>
    )
}
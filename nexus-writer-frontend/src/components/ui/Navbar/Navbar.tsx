'use client'
import styles from '@/components/ui/Navbar/Navbar.module.css'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import { usePathname } from 'next/navigation';

export default function Navbar() {

    const { user, logout, isLoggingOut } = useAuth() 
    const path = usePathname()

    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
                <Image
                    src='/logo.svg'
                    alt='Nexus Writer Logo'
                    width={40} 
                    height={40}
                    className={styles.logo}
                />
                <h2>Nexus Writer</h2>
            </div>
            {user ? (
                <div className={styles['links-container']}>
                    <span className={styles['welcome-text']}>
                        Welcome, {user.username}
                    </span>
                    <Link className={`${styles['navbar-link']} ${(path === '/dashboard') ? styles['active'] : undefined}`} href={'/dashboard'}>
                        Dashboard
                    </Link>
                    <Link className={`${styles['navbar-link']} ${(path === '/stories/analytics') ? styles['active'] : undefined}`} href={'/stories/analytics'}>
                        Analytics
                    </Link>
                    <a
                        onClick={() => logout()} 
                        className={styles['logout-btn']}
                    >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </a>
                </div>
            ) : (
                <div className={styles['links-container']}>
                    <Link className={`${styles['navbar-link']} ${(path === '/login') ? styles['active'] : undefined}`} href={'/login'}>Login</Link>
                    <Link className={`${styles['navbar-link']} ${(path === '/register') ? styles['active'] : undefined}`} href={'/register'}>Register</Link>
                </div>
            )}
        </nav>
    )
}
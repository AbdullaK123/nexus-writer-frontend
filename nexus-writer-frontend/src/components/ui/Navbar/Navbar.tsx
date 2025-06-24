'use client'
import styles from '@/components/ui/Navbar/Navbar.module.css'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';

export default function Navbar() {

    const { user, logout, isLoggingOut } = useAuth() 

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
                    <span className={styles['navbar-link']}>
                        Welcome, {user.username}
                    </span>
                    <Link className={styles['navbar-link']} href={'/dashboard'}>
                        Dashboard
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
                    <Link className={styles['navbar-link']} href={'/login'}>Login</Link>
                    <Link className={styles['navbar-link']} href={'/register'}>Register</Link>
                </div>
            )}
        </nav>
    )
}
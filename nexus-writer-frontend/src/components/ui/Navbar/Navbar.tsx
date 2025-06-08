'use client'
import styles from '@/components/ui/Navbar/Navbar.module.css'
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
                <h2>Nexus Writer</h2>
            </div>
            <div className={styles['links-container']}>
                <Link className={styles['navbar-link']} href={'/dashboard'}>Dashboard</Link>
                <Link className={styles['navbar-link']} href={'/login'}>Login</Link>
                <Link className={styles['navbar-link']} href={'/register'}>Register</Link>
            </div>
        </nav>
    )
}
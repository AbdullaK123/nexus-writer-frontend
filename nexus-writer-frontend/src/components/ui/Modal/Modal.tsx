import React from 'react';
import styles from './Modal.module.css'

export default function Modal({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
                {children}
            </div>
        </div>
    )
}
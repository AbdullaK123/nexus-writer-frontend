'use client'
import { useEffect } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, isOpen, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.icon}>
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'warning' && '⚠'}
        {type === 'info' && 'i'}
      </div>
      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  );
}

import React from 'react';
import styles from './Modal.module.css'
import { ModalProps } from '@/app/types/interfaces';

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div 
        className={styles['modal-content']} 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
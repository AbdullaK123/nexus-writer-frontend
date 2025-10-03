'use client'
import React from 'react'
import { Modal } from '../Modal'
import { Button } from '../Button'
import styles from './ConfirmDialog.module.css'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info'
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return React.createElement(Modal, { isOpen, onClose, title },
    React.createElement('div', { className: `${styles.container} ${styles[variant]}` },
      React.createElement('p', { className: styles.message }, message),
      React.createElement('div', { className: styles.actions },
        React.createElement(Button, { variant: 'secondary', onClick: onClose }, cancelText),
        React.createElement(Button, { variant: 'primary', onClick: handleConfirm }, confirmText)
      )
    )
  )
}

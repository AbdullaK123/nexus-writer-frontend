'use client'
import React from 'react'
import { Modal } from '../Modal'
import { Button } from '../Button'
import styles from './AlertDialog.module.css'

interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

export function AlertDialog({ 
  isOpen, 
  onClose, 
  title,
  message,
  type = 'info'
}: AlertDialogProps) {
  const getIcon = () => {
    switch (type) {
      case 'success': return '✓'
      case 'warning': return '⚠'
      case 'error': return '✕'
      default: return 'ℹ'
    }
  }

  const defaultTitle = title || {
    info: 'Information',
    success: 'Success',
    warning: 'Warning',
    error: 'Error'
  }[type]

  return React.createElement(Modal, { isOpen, onClose, title: defaultTitle },
    React.createElement('div', { className: `${styles.container} ${styles[type]}` },
      React.createElement('div', { className: styles.icon }, getIcon()),
      React.createElement('p', { className: styles.message }, message),
      React.createElement('div', { className: styles.actions },
        React.createElement(Button, { variant: 'primary', onClick: onClose }, 'OK')
      )
    )
  )
}

'use client'
import { useState, useCallback } from 'react'

interface ConfirmState {
  isOpen: boolean
  title?: string
  message: string
  onConfirm: () => void
  variant: 'danger' | 'warning' | 'info'
  confirmText?: string
  cancelText?: string
}

export function useConfirm() {
  const [confirm, setConfirm] = useState<ConfirmState>({
    isOpen: false,
    message: '',
    onConfirm: () => {},
    variant: 'info'
  })

  const showConfirm = useCallback((
    message: string,
    onConfirm: () => void,
    options?: {
      title?: string
      variant?: 'danger' | 'warning' | 'info'
      confirmText?: string
      cancelText?: string
    }
  ) => {
    setConfirm({
      isOpen: true,
      message,
      onConfirm,
      variant: options?.variant || 'info',
      title: options?.title,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText
    })
  }, [])

  const hideConfirm = useCallback(() => {
    setConfirm(prev => ({ ...prev, isOpen: false }))
  }, [])

  return {
    confirm,
    showConfirm,
    hideConfirm
  }
}

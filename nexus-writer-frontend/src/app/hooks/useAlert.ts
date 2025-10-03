'use client'
import { useState, useCallback } from 'react'

interface AlertState {
  isOpen: boolean
  title?: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export function useAlert() {
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    message: '',
    type: 'info'
  })

  const showAlert = useCallback((
    message: string, 
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    title?: string
  ) => {
    setAlert({ isOpen: true, message, type, title })
  }, [])

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, isOpen: false }))
  }, [])

  return {
    alert,
    showAlert,
    hideAlert
  }
}

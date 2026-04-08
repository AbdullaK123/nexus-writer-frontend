'use client'
import * as RadixToast from '@radix-ui/react-toast'
import styles from './Toast.module.css'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type: ToastType
  isOpen: boolean
  onClose: () => void
  duration?: number
}

const icons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'i',
}

export function Toast({ message, type, isOpen, onClose, duration = 3000 }: ToastProps) {
  return (
    <RadixToast.Root
      className={`${styles.toast} ${styles[type]}`}
      open={isOpen}
      onOpenChange={(open) => { if (!open) onClose() }}
      duration={duration}
    >
      <div className={styles.icon}>{icons[type]}</div>
      <RadixToast.Description className={styles.message}>
        {message}
      </RadixToast.Description>
      <RadixToast.Close asChild>
        <button className={styles.closeButton} aria-label="Close">
          ✕
        </button>
      </RadixToast.Close>
    </RadixToast.Root>
  )
}

export function ToastViewport() {
  return <RadixToast.Viewport className={styles.viewport} />
}

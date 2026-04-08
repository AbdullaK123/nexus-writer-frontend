'use client'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import styles from './Modal.module.css'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  showCloseButton?: boolean
}

export function Modal({ 
  isOpen, 
  onClose, 
  title,
  children,
  showCloseButton = true 
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modal}>
          {title && (
            <div className={styles.header}>
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              {showCloseButton && (
                <Dialog.Close asChild>
                  <button
                    className={styles.closeButton}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}
          {!title && (
            <VisuallyHidden.Root asChild>
              <Dialog.Title>Dialog</Dialog.Title>
            </VisuallyHidden.Root>
          )}
          <div className={styles.content}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
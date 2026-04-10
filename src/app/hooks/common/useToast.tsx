'use client'
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { Toast, ToastViewport } from '@/components/common/Toast';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType; isOpen: boolean }>({
    message: '',
    type: 'info',
    isOpen: false,
  });

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type, isOpen: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isOpen: false }));
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <RadixToast.Provider swipeDirection="right">
      <ToastContext.Provider value={contextValue}>
        {children}
        <Toast
          message={toast.message}
          type={toast.type}
          isOpen={toast.isOpen}
          onClose={hideToast}
        />
        <ToastViewport />
      </ToastContext.Provider>
    </RadixToast.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

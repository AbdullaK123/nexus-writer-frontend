'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '@/components/ui/Toast';

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

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isOpen={toast.isOpen}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

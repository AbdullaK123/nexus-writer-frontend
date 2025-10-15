import React from 'react'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  className,
  children,
  ...props 
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ')

  return React.createElement('button', { className: classes, ...props }, children)
}

import React from 'react'
import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ 
  className,
  error,
  ...props 
}, ref) => {
  const classes = [
    styles.input,
    error && styles.error,
    className
  ].filter(Boolean).join(' ')

  return React.createElement('input', { className: classes, ref, ...props })
})

Input.displayName = 'Input'

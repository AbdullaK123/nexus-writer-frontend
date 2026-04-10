'use client'
import * as RadixContextMenu from '@radix-ui/react-context-menu'
import styles from './ContextMenu.module.css'

interface MenuItemProps {
  icon?: string
  label: string
  meta?: string
  onClick?: () => void
  danger?: boolean
  disabled?: boolean
}

export default function MenuItem({ 
  icon, 
  label, 
  meta, 
  onClick, 
  danger, 
  disabled,
}: MenuItemProps) {
  return (
    <RadixContextMenu.Item
      className={`${styles.menuItem} ${danger ? styles.danger : ''}`}
      onSelect={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
      {meta && <span className={styles.meta}>{meta}</span>}
    </RadixContextMenu.Item>
  )
}
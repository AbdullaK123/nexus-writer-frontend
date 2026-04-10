'use client'
import * as RadixContextMenu from '@radix-ui/react-context-menu'
import styles from './ContextMenu.module.css'

// Root wrapper — use this around the trigger + content
export const ContextMenuRoot = RadixContextMenu.Root

// Wrap the element that should respond to right-click
export const ContextMenuTrigger = RadixContextMenu.Trigger

// The menu content panel
export function ContextMenuContent({ children }: { children: React.ReactNode }) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content className={styles.contextMenu}>
        {children}
      </RadixContextMenu.Content>
    </RadixContextMenu.Portal>
  )
}

// A submenu trigger + content
export function SubMenu({ 
  icon, 
  label,
  children 
}: { 
  icon?: string
  label: string
  children: React.ReactNode 
}) {
  return (
    <RadixContextMenu.Sub>
      <RadixContextMenu.SubTrigger className={styles.menuItem}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
        <span className={styles.arrow}>▶</span>
      </RadixContextMenu.SubTrigger>
      <RadixContextMenu.Portal>
        <RadixContextMenu.SubContent className={styles.submenu}>
          {children}
        </RadixContextMenu.SubContent>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Sub>
  )
}
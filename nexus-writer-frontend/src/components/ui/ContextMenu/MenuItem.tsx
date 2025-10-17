'use client'
import { useSubmenu } from '@/app/hooks/useSubmenu'
import styles from './ContextMenu.module.css'

interface MenuItemProps {
  icon?: string
  label: string
  meta?: string
  onClick?: () => void
  danger?: boolean
  disabled?: boolean
  children?: React.ReactNode // For submenu items
}

export default function MenuItem({ 
  icon, 
  label, 
  meta, 
  onClick, 
  danger, 
  disabled,
  children 
}: MenuItemProps) {
  const hasSubmenu = !!children
  
  const {
    isOpen: submenuOpen,
    position: submenuPosition,
    elementRef,
    open,
    close,
    cancelClose,
    toggle
  } = useSubmenu<HTMLButtonElement>()

  const handleMouseEnter = () => {
    if (hasSubmenu) {
      open()
    }
  }

  const handleMouseLeave = () => {
    if (hasSubmenu) {
      close()
    }
  }

  const handleClick = () => {
    if (hasSubmenu) {
      toggle() // Click toggles submenu
    } else if (onClick && !disabled) {
      onClick() // Click executes action
    }
  }

  return (
    <>
      <button
        ref={elementRef}
        className={`${styles.menuItem} ${danger ? styles.danger : ''}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        aria-haspopup={hasSubmenu}
        aria-expanded={submenuOpen}
        role="menuitem"
        type="button"
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
        {meta && <span className={styles.meta}>{meta}</span>}
        {hasSubmenu && <span className={styles.arrow}>▶</span>}
      </button>

      {hasSubmenu && submenuOpen && (
        <div
          className={styles.submenu}
          style={{
            position: 'fixed',
            top: `${submenuPosition.y}px`,
            left: `${submenuPosition.x}px`,
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={handleMouseLeave}
          role="menu"
        >
          {children}
        </div>
      )}
    </>
  )
}
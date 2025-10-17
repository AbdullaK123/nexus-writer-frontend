'use client'
import { ContextMenuProps } from "@/app/types";
import { useShortcut } from "@/app/hooks/useShortcut";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import styles from './ContextMenu.module.css'


export default function ChapterContextMenu( {
    isOpen,
    x,
    y,
    onClose,
    children
}: ContextMenuProps ) {

    const elementRef = useClickOutside(onClose)
    const [mounted, setMounted] = useState(false)

    useShortcut([
        {key: "Escape", ctrlKey: false, callback: onClose}
    ])

    // Ensure component is mounted before rendering portal
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!isOpen || !mounted) return null;

    // Render context menu at document body level using portal
    // This completely escapes all parent overflow constraints
    return createPortal(
        <div 
            ref={elementRef}
            className={styles['contextMenu']}
            style={{
                position: 'fixed',
                left: x,
                top: y,
            }} 
            role="menu"
            aria-orientation="vertical" 
        >
            {children}
        </div>,
        document.body
    )
}
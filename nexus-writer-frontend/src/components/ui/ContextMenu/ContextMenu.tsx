'use client'
import { ContextMenuProps } from "./types";
import { useShortcut } from "@/app/hooks/useShortcut";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { createPortal } from 'react-dom';
import { useEffect, useState, useCallback } from 'react';
import styles from './ContextMenu.module.css'

const FOCUSABLE_MENU_ITEMS = 'button[role="menuitem"]:not([disabled])';

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

    // Focus first menu item when opened
    useEffect(() => {
        if (isOpen && mounted && elementRef.current) {
            requestAnimationFrame(() => {
                const firstItem = elementRef.current?.querySelector(FOCUSABLE_MENU_ITEMS) as HTMLElement;
                firstItem?.focus();
            });
        }
    }, [isOpen, mounted, elementRef])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        const menu = elementRef.current;
        if (!menu) return;

        const items = Array.from(menu.querySelectorAll(FOCUSABLE_MENU_ITEMS)) as HTMLElement[];
        const currentIndex = items.indexOf(document.activeElement as HTMLElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
            items[next]?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
            items[prev]?.focus();
        } else if (e.key === 'Home') {
            e.preventDefault();
            items[0]?.focus();
        } else if (e.key === 'End') {
            e.preventDefault();
            items[items.length - 1]?.focus();
        }
    }, [elementRef]);

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
            onKeyDown={handleKeyDown}
        >
            {children}
        </div>,
        document.body
    )
}
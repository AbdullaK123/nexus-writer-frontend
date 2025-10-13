'use client'
import { ContextMenuProps } from "@/app/types";
import { useShortcut } from "@/app/hooks/useShortcut";
import { useClickOutside } from "@/app/hooks/useClickOutside";


export default function ChapterContextMenu( {
    x,
    y,
    onClose,
    children
}: ContextMenuProps ) {

    const elementRef = useClickOutside(onClose)

    useShortcut([
        {key: "Escape", ctrlKey: false, callback: onClose}
    ])

    return (
        <div 
            ref={elementRef}
            style={{
                position: 'fixed',
                left: x,
                top: y,
                zIndex: 1000 
            }}  
        >
            {children}
        </div>
    )
}
import { useState, useRef, useCallback } from "react"


type Point = {
    x: number;
    y: number;
}

type SubmenuOptions = {
    hoverDelay?: number;
    closeDelay?: number;
}


export function useSubmenu<T extends HTMLElement>(
    options: SubmenuOptions = {}
) {
    const { hoverDelay = 150, closeDelay = 100 } = options
    const elementRef = useRef<T>(null)
    const hoverTimerRef = useRef<NodeJS.Timeout>(null)
    const closeTimerRef = useRef<NodeJS.Timeout>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState<Point>({ x: 0, y: 0 })

    const calculatePosition = useCallback(() => {
        if (!elementRef) return {x: 0, y: 0}

        const rect = elementRef.current.getBoundingClientRect()
        const subMenuHeight = 280
        const subMenuWidth = 300

        let x = rect.right + 4
        let y = rect.top

        if (x + subMenuWidth > window.innerWidth) {
            x = rect.left - subMenuWidth - 4
        }

        if (y + subMenuHeight > window.innerHeight) {
            y = window.innerHeight - subMenuHeight - 8
        }

        if (y < 8) {
            y = 8
        }

        return { x: x, y: y}
    }, [])

    const open = useCallback(() => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current)
        }
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current)
        }

        hoverTimerRef.current = setTimeout(() => {
            const pos = calculatePosition()
            setPosition(pos)
            setIsOpen(true)
        }, hoverDelay)
    }, [hoverDelay, calculatePosition])

    const close = useCallback(() => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current)
        }
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current)
        }

        closeTimerRef.current = setTimeout(() => {
            setIsOpen(false)
        }, closeDelay)

    }, [closeDelay])

    const cancelClose = useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current)
        }
    }, [])

    const toggle = useCallback(() => {
        if (isOpen) {
            close()
        } else {
            open()
        }
    }, [isOpen, open, close])

    return {
        isOpen,
        position,
        elementRef,
        open,
        close,
        cancelClose,
        toggle
    }

}
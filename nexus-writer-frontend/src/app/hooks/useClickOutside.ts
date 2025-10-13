import { useEffect, useRef } from "react";


export function useClickOutside(callback: () => void) {
    const elementRef = useRef<HTMLDivElement| null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (elementRef.current && !elementRef.current.contains(target)) {
                callback()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [callback])

    return elementRef    
}
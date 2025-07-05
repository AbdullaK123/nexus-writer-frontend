import { useState, useEffect, useRef } from "react";

export function useInView(threshold: number) {
    const [isInView, setIsInView] = useState(false)
    const elementRef = useRef(undefined)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting)
            },
            { threshold }
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [threshold])

    return [isInView, elementRef]
}
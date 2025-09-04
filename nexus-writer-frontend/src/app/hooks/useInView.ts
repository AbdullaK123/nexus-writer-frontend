import { useState, useEffect, useRef } from "react";

export function useInView(threshold: number, onIntersect: () => void) {
    const [isInView, setIsInView] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)

    // to prevent infinite loops
    const onIntersectRef = useRef(onIntersect)
    onIntersectRef.current = onIntersect

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

    useEffect(() => {
        console.log(`Are we in view?: ${isInView}`)
        if (!isInView) {
            onIntersectRef.current()
        }
    }, [isInView])

    return {
        isInView,
        elementRef
    }
}
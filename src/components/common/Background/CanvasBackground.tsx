'use client'
import { useEffect, useRef } from 'react'
import styles from './CanvasBackground.module.css'
import { createState, resizeState, startRenderLoop } from './canvas/renderer'
import type { BackgroundState } from './canvas/types'

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const stateRef = useRef<BackgroundState | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        function setSize() {
            const dpr = window.devicePixelRatio || 1
            const width = window.innerWidth
            const height = window.innerHeight

            canvas!.width = width * dpr
            canvas!.height = height * dpr

            const ctx = canvas!.getContext('2d')!
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            if (stateRef.current) {
                stateRef.current = resizeState(stateRef.current, width, height)
            } else {
                stateRef.current = createState(width, height)
            }
        }

        setSize()
        const cleanup = startRenderLoop(canvas, stateRef.current!, reducedMotion)

        let resizeTimer: ReturnType<typeof setTimeout>
        function handleResize() {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(() => {
                setSize()
            }, 200)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            cleanup()
            window.removeEventListener('resize', handleResize)
            clearTimeout(resizeTimer)
        }
    }, [])

    return (
        <div className={styles.canvasBackground}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    )
}

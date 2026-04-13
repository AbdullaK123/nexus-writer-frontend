import type { Point } from './types'

export function randomInRange(min: number, max: number): number {
    return min + Math.random() * (max - min)
}

export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

export function lerpPoint(a: Point, b: Point, t: number): Point {
    return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }
}

export function easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

export function getPointAlongPath(points: Point[], progress: number): Point {
    if (points.length === 0) return { x: 0, y: 0 }
    if (points.length === 1) return points[0]

    const clampedProgress = Math.max(0, Math.min(1, progress))
    const totalSegments = points.length - 1
    const exactIndex = clampedProgress * totalSegments
    const index = Math.floor(exactIndex)
    const segmentT = exactIndex - index

    if (index >= totalSegments) return points[points.length - 1]

    return lerpPoint(points[index], points[index + 1], segmentT)
}

export function packetOpacity(progress: number, baseOpacity: number): number {
    // Sine-based ease-in / ease-out over the path
    return baseOpacity * Math.sin(progress * Math.PI)
}

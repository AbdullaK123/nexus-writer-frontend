import { line, curveMonotoneX, curveMonotoneY } from 'd3-shape'
import type { Point, CircuitPath, CircuitNode } from './types'
import { randomInRange } from './utils'
import {
    HORIZONTAL_BANDS,
    VERTICAL_POSITIONS,
    CONTROL_POINTS_PER_PATH,
    PATH_Y_JITTER,
    PATH_X_JITTER_RATIO,
    PRIMARY_STROKE_WIDTH,
    SECONDARY_STROKE_WIDTH,
    PRIMARY_NODE_RADIUS,
    SECONDARY_NODE_RADIUS,
    ACCENT_PRIMARY,
    ACCENT_SECONDARY,
    DATA_GLOW_BLUR,
    SUBTLE_GLOW_BLUR,
    PULSE_SPEED,
    PULSE_MIN_OPACITY,
    PULSE_MAX_OPACITY,
} from './config'

// --- Generation ---

function generateHorizontalControlPoints(width: number, bandY: number): Point[] {
    const points: Point[] = []
    const segmentWidth = width / (CONTROL_POINTS_PER_PATH - 1)

    for (let i = 0; i < CONTROL_POINTS_PER_PATH; i++) {
        const baseX = i * segmentWidth
        const jitterX = i === 0 || i === CONTROL_POINTS_PER_PATH - 1
            ? 0
            : randomInRange(-segmentWidth * PATH_X_JITTER_RATIO, segmentWidth * PATH_X_JITTER_RATIO)
        const jitterY = randomInRange(-PATH_Y_JITTER, PATH_Y_JITTER)

        points.push({ x: baseX + jitterX, y: bandY + jitterY })
    }

    // Clamp edges to viewport
    points[0].x = 0
    points[points.length - 1].x = width
    return points
}

function generateVerticalControlPoints(height: number, bandX: number): Point[] {
    const points: Point[] = []
    const segmentHeight = height / (CONTROL_POINTS_PER_PATH - 1)

    for (let i = 0; i < CONTROL_POINTS_PER_PATH; i++) {
        const baseY = i * segmentHeight
        const jitterX = randomInRange(-PATH_Y_JITTER, PATH_Y_JITTER)
        const jitterY = i === 0 || i === CONTROL_POINTS_PER_PATH - 1
            ? 0
            : randomInRange(-segmentHeight * PATH_X_JITTER_RATIO, segmentHeight * PATH_X_JITTER_RATIO)

        points.push({ x: bandX + jitterX, y: baseY + jitterY })
    }

    points[0].y = 0
    points[points.length - 1].y = height
    return points
}

function samplePath(controlPoints: Point[], isVertical: boolean): Point[] {
    const curveFactory = isVertical ? curveMonotoneY : curveMonotoneX
    const lineGen = line<Point>()
        .x(d => d.x)
        .y(d => d.y)
        .curve(curveFactory)

    const pathStr = lineGen(controlPoints)
    if (!pathStr) return controlPoints

    // Sample points along the SVG path string using a temporary SVG path
    const svgNs = 'http://www.w3.org/2000/svg'
    const svgEl = document.createElementNS(svgNs, 'svg')
    const pathEl = document.createElementNS(svgNs, 'path')
    pathEl.setAttribute('d', pathStr)
    svgEl.appendChild(pathEl)
    document.body.appendChild(svgEl)

    const totalLength = pathEl.getTotalLength()
    const sampleCount = Math.max(Math.ceil(totalLength / 4), 50)
    const sampled: Point[] = []

    for (let i = 0; i <= sampleCount; i++) {
        const pt = pathEl.getPointAtLength((i / sampleCount) * totalLength)
        sampled.push({ x: pt.x, y: pt.y })
    }

    document.body.removeChild(svgEl)
    return sampled
}

export function generateCircuits(width: number, height: number): { paths: CircuitPath[], nodes: CircuitNode[] } {
    const paths: CircuitPath[] = []
    const nodes: CircuitNode[] = []

    // Horizontal paths
    HORIZONTAL_BANDS.forEach((band, i) => {
        const bandY = band * height
        const isPrimary = i % 2 === 0
        const controlPoints = generateHorizontalControlPoints(width, bandY)
        const points = samplePath(controlPoints, false)

        paths.push({
            points,
            controlPoints,
            strokeWidth: isPrimary ? PRIMARY_STROKE_WIDTH : SECONDARY_STROKE_WIDTH,
            isPrimary,
            opacity: 1,
            targetOpacity: 1,
        })

        // Place nodes at control points (skipping edges)
        controlPoints.slice(1, -1).forEach((cp, j) => {
            const isNodePrimary = j % 2 === 0
            nodes.push({
                x: cp.x,
                y: cp.y,
                baseRadius: isNodePrimary ? PRIMARY_NODE_RADIUS : SECONDARY_NODE_RADIUS,
                phaseOffset: Math.random() * Math.PI * 2,
                isPrimary: isNodePrimary,
            })
        })
    })

    // Vertical paths
    VERTICAL_POSITIONS.forEach(pos => {
        const bandX = pos * width
        const controlPoints = generateVerticalControlPoints(height, bandX)
        const points = samplePath(controlPoints, true)

        paths.push({
            points,
            controlPoints,
            strokeWidth: 1,
            isPrimary: false,
            opacity: 0.6,
            targetOpacity: 0.6,
        })

        controlPoints.slice(1, -1).forEach(cp => {
            nodes.push({
                x: cp.x,
                y: cp.y,
                baseRadius: SECONDARY_NODE_RADIUS,
                phaseOffset: Math.random() * Math.PI * 2,
                isPrimary: false,
            })
        })
    })

    return { paths, nodes }
}

// --- Rendering ---

function createGradient(ctx: CanvasRenderingContext2D, points: Point[], isPrimary: boolean): CanvasGradient {
    const first = points[0]
    const last = points[points.length - 1]
    const grad = ctx.createLinearGradient(first.x, first.y, last.x, last.y)

    if (isPrimary) {
        grad.addColorStop(0, 'rgba(0, 77, 102, 0.4)')
        grad.addColorStop(0.3, 'rgba(0, 212, 255, 0.8)')
        grad.addColorStop(0.7, 'rgba(0, 255, 255, 1)')
        grad.addColorStop(1, 'rgba(0, 77, 102, 0.4)')
    } else {
        grad.addColorStop(0, 'rgba(0, 26, 38, 0.3)')
        grad.addColorStop(0.5, 'rgba(0, 212, 255, 0.6)')
        grad.addColorStop(1, 'rgba(0, 26, 38, 0.3)')
    }

    return grad
}

export function drawCircuits(ctx: CanvasRenderingContext2D, paths: CircuitPath[], time: number): void {
    for (const path of paths) {
        if (path.points.length < 2) continue

        // Pulsing opacity
        const pulsePhase = path.isPrimary ? 0 : Math.PI * 0.5
        const pulse = PULSE_MIN_OPACITY + (PULSE_MAX_OPACITY - PULSE_MIN_OPACITY) *
            (0.5 + 0.5 * Math.sin(time * PULSE_SPEED + pulsePhase))

        ctx.save()
        ctx.globalAlpha = path.opacity * pulse
        ctx.strokeStyle = createGradient(ctx, path.points, path.isPrimary)
        ctx.lineWidth = path.strokeWidth
        ctx.shadowColor = path.isPrimary ? ACCENT_PRIMARY : ACCENT_SECONDARY
        ctx.shadowBlur = path.isPrimary ? DATA_GLOW_BLUR : SUBTLE_GLOW_BLUR

        ctx.beginPath()
        ctx.moveTo(path.points[0].x, path.points[0].y)
        for (let i = 1; i < path.points.length; i++) {
            ctx.lineTo(path.points[i].x, path.points[i].y)
        }
        ctx.stroke()
        ctx.restore()
    }
}

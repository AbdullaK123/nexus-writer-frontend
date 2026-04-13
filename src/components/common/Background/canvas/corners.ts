import {
    CORNER_SIZE,
    CORNER_INSET,
    CORNER_OPACITY,
    CORNER_STROKE_WIDTH,
    CORNER_NODE_RADIUS,
    ACCENT_CORNER,
} from './config'

let cornerCache: HTMLCanvasElement | null = null
let cachedWidth = 0
let cachedHeight = 0

function buildCornerCanvas(width: number, height: number): HTMLCanvasElement {
    const offscreen = document.createElement('canvas')
    offscreen.width = width
    offscreen.height = height
    const ctx = offscreen.getContext('2d')!

    ctx.strokeStyle = ACCENT_CORNER
    ctx.fillStyle = ACCENT_CORNER
    ctx.lineWidth = CORNER_STROKE_WIDTH
    ctx.globalAlpha = CORNER_OPACITY

    const s = CORNER_SIZE
    const ins = CORNER_INSET

    // Top left
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(s * 0.75, 0)
    ctx.lineTo(s, ins)
    ctx.lineTo(s, s * 0.75)
    ctx.stroke()
    drawNode(ctx, s, ins)

    // Top right
    ctx.beginPath()
    ctx.moveTo(width, 0)
    ctx.lineTo(width - s * 0.75, 0)
    ctx.lineTo(width - s, ins)
    ctx.lineTo(width - s, s * 0.75)
    ctx.stroke()
    drawNode(ctx, width - s, ins)

    // Bottom left
    ctx.beginPath()
    ctx.moveTo(0, height)
    ctx.lineTo(s * 0.75, height)
    ctx.lineTo(s, height - ins)
    ctx.lineTo(s, height - s * 0.75)
    ctx.stroke()
    drawNode(ctx, s, height - ins)

    // Bottom right
    ctx.beginPath()
    ctx.moveTo(width, height)
    ctx.lineTo(width - s * 0.75, height)
    ctx.lineTo(width - s, height - ins)
    ctx.lineTo(width - s, height - s * 0.75)
    ctx.stroke()
    drawNode(ctx, width - s, height - ins)

    return offscreen
}

function drawNode(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.beginPath()
    ctx.arc(x, y, CORNER_NODE_RADIUS, 0, Math.PI * 2)
    ctx.fill()
}

export function drawCorners(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    if (!cornerCache || cachedWidth !== width || cachedHeight !== height) {
        cornerCache = buildCornerCanvas(width, height)
        cachedWidth = width
        cachedHeight = height
    }
    ctx.drawImage(cornerCache, 0, 0)
}

export function invalidateCornerCache(): void {
    cornerCache = null
}

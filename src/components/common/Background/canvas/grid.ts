import { GRID_SIZE, GRID_STROKE, GRID_LINE_WIDTH } from './config'

let gridCache: HTMLCanvasElement | null = null
let cachedWidth = 0
let cachedHeight = 0

function buildGridCanvas(width: number, height: number): HTMLCanvasElement {
    const offscreen = document.createElement('canvas')
    offscreen.width = width
    offscreen.height = height
    const ctx = offscreen.getContext('2d')!

    ctx.strokeStyle = GRID_STROKE
    ctx.lineWidth = GRID_LINE_WIDTH
    ctx.beginPath()

    for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
    }
    for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
    }

    ctx.stroke()
    return offscreen
}

export function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    if (!gridCache || cachedWidth !== width || cachedHeight !== height) {
        gridCache = buildGridCanvas(width, height)
        cachedWidth = width
        cachedHeight = height
    }
    ctx.drawImage(gridCache, 0, 0)
}

export function invalidateGridCache(): void {
    gridCache = null
}

import type { CircuitNode } from './types'
import {
    NODE_PULSE_SPEED,
    NODE_PULSE_AMPLITUDE,
    NODE_OPACITY_BASE,
    NODE_OPACITY_AMPLITUDE,
    ACCENT_PRIMARY,
    ACCENT_SECONDARY,
    DATA_GLOW_BLUR,
    SUBTLE_GLOW_BLUR,
} from './config'

export function drawNodes(ctx: CanvasRenderingContext2D, nodes: CircuitNode[], time: number): void {
    for (const node of nodes) {
        const pulse = Math.sin(time * NODE_PULSE_SPEED + node.phaseOffset)
        const radius = node.baseRadius + pulse * NODE_PULSE_AMPLITUDE
        const opacity = NODE_OPACITY_BASE + pulse * NODE_OPACITY_AMPLITUDE

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity))

        const glowColor = node.isPrimary ? ACCENT_PRIMARY : ACCENT_SECONDARY
        ctx.shadowColor = glowColor
        ctx.shadowBlur = node.isPrimary ? DATA_GLOW_BLUR : SUBTLE_GLOW_BLUR

        // Radial gradient fill
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, Math.max(radius, 0.1))
        grad.addColorStop(0, 'rgba(0, 255, 255, 1)')
        grad.addColorStop(0.7, 'rgba(0, 212, 255, 0.8)')
        grad.addColorStop(1, 'rgba(0, 128, 255, 0.4)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(node.x, node.y, Math.max(radius, 0.1), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
    }
}

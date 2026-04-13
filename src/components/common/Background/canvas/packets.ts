import type { DataPacket, CircuitPath } from './types'
import { getPointAlongPath, packetOpacity, randomInRange } from './utils'
import {
    PACKET_COUNT,
    PACKET_MIN_SPEED,
    PACKET_MAX_SPEED,
    PACKET_MIN_RADIUS,
    PACKET_MAX_RADIUS,
    PACKET_GLOW_BLUR,
    ACCENT_PRIMARY,
    ACCENT_SECONDARY,
    ACCENT_TERTIARY,
} from './config'

const PACKET_COLORS = [ACCENT_SECONDARY, ACCENT_PRIMARY, ACCENT_TERTIARY]

export function generatePackets(pathCount: number): DataPacket[] {
    const packets: DataPacket[] = []
    for (let i = 0; i < PACKET_COUNT; i++) {
        packets.push({
            pathIndex: Math.floor(Math.random() * pathCount),
            progress: Math.random(),
            speed: randomInRange(PACKET_MIN_SPEED, PACKET_MAX_SPEED),
            radius: randomInRange(PACKET_MIN_RADIUS, PACKET_MAX_RADIUS),
            baseOpacity: randomInRange(0.7, 1),
        })
    }
    return packets
}

export function updatePackets(packets: DataPacket[], pathCount: number, deltaTime: number): void {
    for (const packet of packets) {
        packet.progress += packet.speed * deltaTime
        if (packet.progress > 1) {
            packet.progress = 0
            packet.pathIndex = Math.floor(Math.random() * pathCount)
            packet.speed = randomInRange(PACKET_MIN_SPEED, PACKET_MAX_SPEED)
        }
    }
}

export function drawPackets(
    ctx: CanvasRenderingContext2D,
    packets: DataPacket[],
    paths: CircuitPath[]
): void {
    for (let i = 0; i < packets.length; i++) {
        const packet = packets[i]
        if (packet.pathIndex >= paths.length) continue

        const path = paths[packet.pathIndex]
        const pos = getPointAlongPath(path.points, packet.progress)
        const opacity = packetOpacity(packet.progress, packet.baseOpacity)

        if (opacity <= 0) continue

        const color = PACKET_COLORS[i % PACKET_COLORS.length]

        ctx.save()
        ctx.globalAlpha = opacity
        ctx.shadowColor = color
        ctx.shadowBlur = PACKET_GLOW_BLUR
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, packet.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
    }
}

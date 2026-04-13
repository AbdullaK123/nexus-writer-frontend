import type { BackgroundState } from './types'
import { drawGrid, invalidateGridCache } from './grid'
import { generateCircuits, drawCircuits } from './circuits'
import { drawNodes } from './nodes'
import { generatePackets, updatePackets, drawPackets } from './packets'
import { drawCorners, invalidateCornerCache } from './corners'
import { lerp } from './utils'
import { REGEN_INTERVAL_MS, TRANSITION_DURATION_MS } from './config'

export function createState(width: number, height: number): BackgroundState {
    const { paths, nodes } = generateCircuits(width, height)
    const packets = generatePackets(paths.length)

    return {
        width,
        height,
        circuits: paths,
        nodes,
        packets,
        nextCircuits: null,
        nextNodes: null,
        transitionProgress: 0,
        isTransitioning: false,
    }
}

export function resizeState(state: BackgroundState, width: number, height: number): BackgroundState {
    invalidateGridCache()
    invalidateCornerCache()
    const { paths, nodes } = generateCircuits(width, height)
    return {
        ...state,
        width,
        height,
        circuits: paths,
        nodes,
        packets: generatePackets(paths.length),
        nextCircuits: null,
        nextNodes: null,
        transitionProgress: 0,
        isTransitioning: false,
    }
}

function startTransition(state: BackgroundState): void {
    const { paths, nodes } = generateCircuits(state.width, state.height)
    state.nextCircuits = paths
    state.nextNodes = nodes
    state.transitionProgress = 0
    state.isTransitioning = true
}

function updateTransition(state: BackgroundState, deltaTime: number): void {
    if (!state.isTransitioning || !state.nextCircuits || !state.nextNodes) return

    state.transitionProgress += deltaTime / TRANSITION_DURATION_MS

    if (state.transitionProgress >= 1) {
        // Swap in the new circuits
        state.circuits = state.nextCircuits
        state.nodes = state.nextNodes
        state.packets = generatePackets(state.circuits.length)
        state.nextCircuits = null
        state.nextNodes = null
        state.transitionProgress = 0
        state.isTransitioning = false
        return
    }

    // Crossfade opacities
    const t = state.transitionProgress
    for (const path of state.circuits) {
        path.opacity = lerp(path.targetOpacity, 0, t)
    }
    for (const path of state.nextCircuits) {
        path.opacity = lerp(0, path.targetOpacity, t)
    }
}

export function startRenderLoop(
    canvas: HTMLCanvasElement,
    state: BackgroundState,
    reducedMotion: boolean
): () => void {
    const ctx = canvas.getContext('2d')!
    let rafId: number
    let lastTime = 0
    let timeSinceRegen = 0

    function render(time: number) {
        const deltaTime = lastTime === 0 ? 16 : time - lastTime
        lastTime = time

        ctx.clearRect(0, 0, state.width, state.height)

        // Layer 1: Grid
        drawGrid(ctx, state.width, state.height)

        // Layer 2: Corners
        drawCorners(ctx, state.width, state.height)

        // Layer 3: Circuits (current)
        drawCircuits(ctx, state.circuits, time)

        // Layer 3b: Circuits (next, during transition)
        if (state.isTransitioning && state.nextCircuits) {
            drawCircuits(ctx, state.nextCircuits, time)
        }

        // Layer 4: Nodes (current)
        drawNodes(ctx, state.nodes, time)

        // Layer 4b: Nodes (next, during transition — fade in)
        if (state.isTransitioning && state.nextNodes) {
            ctx.save()
            ctx.globalAlpha = state.transitionProgress
            drawNodes(ctx, state.nextNodes, time)
            ctx.restore()
        }

        if (!reducedMotion) {
            // Layer 5: Packets
            updatePackets(state.packets, state.circuits.length, deltaTime)
            drawPackets(ctx, state.packets, state.circuits)

            // Regeneration timer
            timeSinceRegen += deltaTime
            if (timeSinceRegen >= REGEN_INTERVAL_MS && !state.isTransitioning) {
                startTransition(state)
                timeSinceRegen = 0
            }

            updateTransition(state, deltaTime)
        }

        rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => cancelAnimationFrame(rafId)
}

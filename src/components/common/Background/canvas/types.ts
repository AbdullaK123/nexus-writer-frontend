export interface Point {
    x: number
    y: number
}

export interface CircuitPath {
    points: Point[]
    controlPoints: Point[]
    strokeWidth: number
    isPrimary: boolean
    opacity: number
    targetOpacity: number
}

export interface CircuitNode {
    x: number
    y: number
    baseRadius: number
    phaseOffset: number
    isPrimary: boolean
}

export interface DataPacket {
    pathIndex: number
    progress: number
    speed: number
    radius: number
    baseOpacity: number
}

export interface BackgroundState {
    width: number
    height: number
    circuits: CircuitPath[]
    nodes: CircuitNode[]
    packets: DataPacket[]
    nextCircuits: CircuitPath[] | null
    nextNodes: CircuitNode[] | null
    transitionProgress: number
    isTransitioning: boolean
}

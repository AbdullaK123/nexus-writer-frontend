export const CHART_HEIGHT = 400

export const CHART_MARGIN = { top: 20, right: 30, left: 20, bottom: 60 }

const AXIS_TICK_STYLE = { fill: '#ffffff', fontFamily: 'var(--font-body)', fontSize: 12 }
const AXIS_STROKE = 'rgba(0, 212, 255, 0.3)'
const AXIS_LABEL_STYLE = { fill: '#ffffff', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }

export const GRID_PROPS = {
    strokeDasharray: '3 3',
    stroke: 'rgba(255, 255, 255, 0.05)',
} as const

export const X_AXIS_PROPS = {
    dataKey: 'name',
    tick: AXIS_TICK_STYLE,
    stroke: AXIS_STROKE,
} as const

export const getXAxisLabel = (label: string) => ({
    value: label,
    position: 'insideBottom' as const,
    offset: -10,
    style: AXIS_LABEL_STYLE,
})

export const Y_AXIS_PROPS = {
    tick: AXIS_TICK_STYLE,
    stroke: AXIS_STROKE,
    label: {
        value: 'Words Written',
        angle: -90,
        position: 'insideLeft' as const,
        style: AXIS_LABEL_STYLE,
    },
} as const

export const TOOLTIP_PROPS = {
    cursor: { fill: 'transparent' },
    contentStyle: {
        backgroundColor: 'rgba(16, 16, 16, 0.95)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '8px',
        color: '#ffffff',
        fontFamily: 'var(--font-body)',
    },
    labelStyle: { color: '#00d4ff' },
} as const

export const LEGEND_PROPS = {
    wrapperStyle: {
        color: '#ffffff',
        fontFamily: 'var(--font-body)',
        paddingTop: '20px',
    },
    iconType: 'rect' as const,
} as const

export const REFERENCE_LINE_PROPS = {
    stroke: '#00ff41',
    strokeWidth: 2,
    strokeDasharray: '5 5',
    label: {
        value: 'Target',
        fill: '#ffffff',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        position: 'right' as const,
    },
} as const

export const BAR_PROPS = {
    dataKey: 'words',
    fill: '#00d4ff',
    name: 'Total Words',
    radius: [8, 8, 0, 0] as [number, number, number, number],
    activeBar: {
        fill: '#00ffff',
        stroke: '#00ff41',
        strokeWidth: 3,
        filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 1))',
    },
} as const

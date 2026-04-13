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
    dataKey: 'chapterNumber',
    tick: AXIS_TICK_STYLE,
    stroke: AXIS_STROKE,
    label: {
        value: 'Chapter',
        position: 'insideBottom' as const,
        offset: -10,
        style: AXIS_LABEL_STYLE,
    },
} as const

export const Y_AXIS_PROPS = {
    dataKey: 'count',
    tick: AXIS_TICK_STYLE,
    stroke: AXIS_STROKE,
    allowDecimals: false,
    label: {
        value: 'Facts',
        angle: -90,
        position: 'insideLeft' as const,
        style: AXIS_LABEL_STYLE,
    },
} as const

export const TOOLTIP_CONTENT_STYLE = {
    backgroundColor: 'rgba(16, 16, 16, 0.95)',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'var(--font-body)',
    padding: '12px',
} as const

export const AREA_PROPS = {
    type: 'monotone' as const,
    dataKey: 'count',
    stroke: '#00ff41',
    strokeWidth: 2,
    fill: 'rgba(0, 255, 65, 0.1)',
    dot: { fill: '#00ff41', r: 4 },
    activeDot: { fill: '#33ff66', stroke: '#00ff41', strokeWidth: 2, r: 6 },
    name: 'Facts',
} as const

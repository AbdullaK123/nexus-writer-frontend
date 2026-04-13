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
    tick: AXIS_TICK_STYLE,
    stroke: AXIS_STROKE,
    allowDecimals: false,
    label: {
        value: 'Count',
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

export const LINES = [
    { type: 'monotone' as const, dataKey: 'eventCount', stroke: '#00d4ff', strokeWidth: 2, name: 'Events', dot: { r: 3, fill: '#00d4ff' }, activeDot: { r: 5 } },
    { type: 'monotone' as const, dataKey: 'setupCount', stroke: '#00ff41', strokeWidth: 2, name: 'Setups', dot: { r: 3, fill: '#00ff41' }, activeDot: { r: 5 } },
    { type: 'monotone' as const, dataKey: 'payoffCount', stroke: '#ff8000', strokeWidth: 2, name: 'Payoffs', dot: { r: 3, fill: '#ff8000' }, activeDot: { r: 5 } },
    { type: 'monotone' as const, dataKey: 'questionCount', stroke: '#8000ff', strokeWidth: 2, name: 'Questions', dot: { r: 3, fill: '#8000ff' }, activeDot: { r: 5 } },
] as const

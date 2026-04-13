export const CHART_MARGIN = { top: 20, right: 30, left: 20, bottom: 20 }

const AXIS_TICK_STYLE = { fill: '#ffffff', fontFamily: 'var(--font-body)', fontSize: 12 }
const AXIS_STROKE = 'rgba(0, 212, 255, 0.3)'

export const GRID_PROPS = {
    strokeDasharray: '3 3',
    stroke: 'rgba(255, 255, 255, 0.05)',
} as const

export const X_AXIS_PROPS = {
    type: 'number' as const,
    tick: AXIS_TICK_STYLE,
    stroke: AXIS_STROKE,
    allowDecimals: false,
} as const

export const Y_AXIS_PROPS = {
    type: 'category' as const,
    dataKey: 'theme',
    tick: AXIS_TICK_STYLE,
    stroke: AXIS_STROKE,
    width: 140,
} as const

export const TOOLTIP_CONTENT_STYLE = {
    backgroundColor: 'rgba(16, 16, 16, 0.95)',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'var(--font-body)',
    padding: '12px',
} as const

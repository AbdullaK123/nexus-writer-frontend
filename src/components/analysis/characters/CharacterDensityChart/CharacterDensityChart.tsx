import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts'
import Link from 'next/link'
import {
    CHART_HEIGHT, CHART_MARGIN, GRID_PROPS,
    X_AXIS_PROPS, Y_AXIS_PROPS, TOOLTIP_CONTENT_STYLE, AREA_PROPS,
} from './config'
import { CharacterDensityChartProps, DensityTooltipProps } from './types'
import styles from './CharacterDensityChart.module.css'


function DensityTooltip({ active, payload, storyId }: DensityTooltipProps) {
    if (!active || !payload?.length) return null
    const data = payload[0].payload
    return (
        <div style={TOOLTIP_CONTENT_STYLE} className={styles.tooltip}>
            <p>Chapter {data.chapterNumber}</p>
            <p>{data.charactersPresent} characters present</p>
            <Link href={`/chapters/${storyId}/${data.chapterId}`} className={styles['tooltip-link']}>
                Open in editor →
            </Link>
        </div>
    )
}

export default function CharacterDensityChart({ storyId, counts }: CharacterDensityChartProps) {
    const hasData = counts.length > 0
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Cast Density</h3>
            {!hasData ? (
                <div className={styles.empty}><p>No density data yet.</p></div>
            ) : (
                <div className={styles['chart-wrapper']}>
                    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                        <AreaChart data={counts} margin={CHART_MARGIN}>
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip content={<DensityTooltip storyId={storyId} />} />
                            <Area {...AREA_PROPS} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}

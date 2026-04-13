import { 
    ResponsiveContainer, 
    XAxis, 
    YAxis, 
    LineChart,
    Line,
    CartesianGrid,
    Tooltip
 } from 'recharts'
import Link from 'next/link'
import {
    CHART_HEIGHT,
    CHART_MARGIN,
    GRID_PROPS,
    X_AXIS_PROPS,
    Y_AXIS_PROPS,
    TOOLTIP_CONTENT_STYLE,
    LINE_PROPS,
} from './config'
import { CharacterCountLineChartProps, ChapterTooltipProps } from './types'
import styles from './CharacterCountLineChart.module.css'



function ChapterTooltip({ active, payload, storyId }: ChapterTooltipProps) {
    if (!active || !payload?.length) return null
    const data = payload[0].payload

    return (
        <div style={TOOLTIP_CONTENT_STYLE} className={styles.tooltip}>
            <p>Chapter {data.chapterNumber}</p>
            <p>{data.charactersIntroduced} characters introduced</p>
            <Link
                href={`/chapters/${storyId}/${data.chapterId}`}
                className={styles['tooltip-link']}
            >
                Open in editor →
            </Link>
        </div>
    )
}

export default function CharacterCountLineChart({ counts, storyId }: CharacterCountLineChartProps) {

    const hasData = counts.length > 0

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Character Introductions By Chapter</h3>
            {!hasData ? (
                <div className={styles.empty}>
                    <p>No characters found yet.</p>
                </div>
            ) : (
                <div className={styles['chart-wrapper']}>
                    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                        <LineChart data={counts} margin={CHART_MARGIN}>
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip content={<ChapterTooltip storyId={storyId} />} />
                            <Line {...LINE_PROPS} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}


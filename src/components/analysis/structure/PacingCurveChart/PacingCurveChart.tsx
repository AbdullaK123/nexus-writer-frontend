import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Link from "next/link";
import { PacingCurveChartProps } from "./types";
import { CHART_HEIGHT, CHART_MARGIN, GRID_PROPS, X_AXIS_PROPS, Y_AXIS_PROPS, TOOLTIP_CONTENT_STYLE, PACING_LINES } from "./config";
import styles from "./PacingCurveChart.module.css";

interface PacingTooltipProps {
    active?: boolean;
    payload?: Array<{ color: string; name: string; value: number; payload: { chapterNumber: number; chapterId: string; pace: string } }>;
    storyId: string;
}

function PacingTooltip({ active, payload, storyId }: PacingTooltipProps) {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    return (
        <div style={TOOLTIP_CONTENT_STYLE} className={styles.tooltip}>
            <p>Chapter {data.chapterNumber} — {data.pace}</p>
            {payload.map(entry => (
                <p key={entry.name} style={{ color: entry.color }}>{entry.name}: {entry.value}%</p>
            ))}
            <Link href={`/chapters/${storyId}/${data.chapterId}`} className={styles["tooltip-link"]}>
                Open in editor →
            </Link>
        </div>
    );
}

export default function PacingCurveChart({ storyId, distributions }: PacingCurveChartProps) {
    const hasData = distributions.length > 0;
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Pacing Curve</h3>
            {!hasData ? (
                <div className={styles.empty}><p>No pacing data yet.</p></div>
            ) : (
                <div className={styles["chart-wrapper"]}>
                    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                        <LineChart data={distributions} margin={CHART_MARGIN}>
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip content={<PacingTooltip storyId={storyId} />} />
                            <Legend wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: '12px' }} />
                            {PACING_LINES.map(line => (
                                <Line key={line.dataKey} {...line} />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

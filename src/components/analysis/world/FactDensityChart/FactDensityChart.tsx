import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Link from "next/link";
import { FactDensityChartProps } from "./types";
import { CHART_HEIGHT, CHART_MARGIN, GRID_PROPS, X_AXIS_PROPS, Y_AXIS_PROPS, TOOLTIP_CONTENT_STYLE, AREA_PROPS } from "./config";
import styles from "./FactDensityChart.module.css";

interface FactTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: { chapterNumber: number; chapterId: string; count: number } }>;
    storyId: string;
}

function FactTooltip({ active, payload, storyId }: FactTooltipProps) {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    return (
        <div style={TOOLTIP_CONTENT_STYLE} className={styles.tooltip}>
            <p>Chapter {data.chapterNumber}</p>
            <p>{data.count} facts</p>
            <Link href={`/chapters/${storyId}/${data.chapterId}`} className={styles["tooltip-link"]}>
                Open in editor →
            </Link>
        </div>
    );
}

export default function FactDensityChart({ storyId, counts }: FactDensityChartProps) {
    const hasData = counts.length > 0;
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Fact Density</h3>
            {!hasData ? (
                <div className={styles.empty}><p>No fact data yet.</p></div>
            ) : (
                <div className={styles["chart-wrapper"]}>
                    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                        <AreaChart data={counts} margin={CHART_MARGIN}>
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip content={<FactTooltip storyId={storyId} />} />
                            <Area {...AREA_PROPS} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

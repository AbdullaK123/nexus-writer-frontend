import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { EmotionalBeatsChartProps } from "./types";
import { CHART_HEIGHT, CHART_MARGIN, GRID_PROPS, X_AXIS_PROPS, Y_AXIS_PROPS, TOOLTIP_CONTENT_STYLE, BEAT_BARS } from "./config";
import styles from "./EmotionalBeatsChart.module.css";

export default function EmotionalBeatsChart({ distributions }: EmotionalBeatsChartProps) {
    const hasData = distributions.length > 0;
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Emotional Beats</h3>
            {!hasData ? (
                <div className={styles.empty}><p>No emotional beat data yet.</p></div>
            ) : (
                <div className={styles["chart-wrapper"]}>
                    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                        <BarChart data={distributions} margin={CHART_MARGIN}>
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
                            <Legend wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: '12px' }} />
                            {BEAT_BARS.map(bar => (
                                <Bar key={bar.dataKey} {...bar} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

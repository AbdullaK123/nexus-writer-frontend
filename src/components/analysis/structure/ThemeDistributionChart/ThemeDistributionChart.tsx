import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ThemeDistributionChartProps } from "./types";
import { CHART_MARGIN, GRID_PROPS, X_AXIS_PROPS, Y_AXIS_PROPS, TOOLTIP_CONTENT_STYLE } from "./config";
import styles from "./ThemeDistributionChart.module.css";

export default function ThemeDistributionChart({ distributions }: ThemeDistributionChartProps) {
    const hasData = distributions.length > 0;
    const chartHeight = Math.max(300, distributions.length * 40 + 60);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Theme Distribution</h3>
            {!hasData ? (
                <div className={styles.empty}><p>No theme data yet.</p></div>
            ) : (
                <div className={styles["chart-wrapper"]}>
                    <ResponsiveContainer width="100%" height={chartHeight}>
                        <BarChart data={distributions} margin={CHART_MARGIN} layout="vertical">
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
                            <Bar dataKey="count" fill="#00d4ff" name="Occurrences" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

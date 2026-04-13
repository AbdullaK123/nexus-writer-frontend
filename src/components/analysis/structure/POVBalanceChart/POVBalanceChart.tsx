import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { POVBalanceChartProps } from "./types";
import { CHART_HEIGHT, CHART_MARGIN, GRID_PROPS, X_AXIS_PROPS, Y_AXIS_PROPS, TOOLTIP_CONTENT_STYLE, POV_COLORS } from "./config";
import styles from "./POVBalanceChart.module.css";

export default function POVBalanceChart({ distributions }: POVBalanceChartProps) {
    const povs = Array.from(new Set(distributions.flatMap(d => d.distributions.map(dd => dd.pov))));

    const data = distributions.map(d => {
        const row: Record<string, number | string> = { chapterNumber: d.chapterNumber };
        for (const dist of d.distributions) {
            row[dist.pov] = dist.sceneCount;
        }
        return row;
    });

    const hasData = distributions.length > 0;

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>POV Balance</h3>
            {!hasData ? (
                <div className={styles.empty}><p>No POV data yet.</p></div>
            ) : (
                <div className={styles['chart-wrapper']}>
                    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                        <BarChart data={data} margin={CHART_MARGIN}>
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
                            <Legend wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: '12px' }} />
                            {povs.map((pov, i) => (
                                <Bar key={pov} dataKey={pov} stackId="pov" fill={POV_COLORS[i % POV_COLORS.length]} name={pov} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

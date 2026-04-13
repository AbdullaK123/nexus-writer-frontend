import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SceneTypeDistributionChartProps } from "./types";
import { CHART_HEIGHT, CHART_MARGIN, GRID_PROPS, X_AXIS_PROPS, Y_AXIS_PROPS, TOOLTIP_CONTENT_STYLE, SCENE_TYPE_COLORS } from "./config";
import styles from "./SceneTypeDistributionChart.module.css";

export default function SceneTypeDistributionChart({ distributions }: SceneTypeDistributionChartProps) {
    const sceneTypes = Array.from(new Set(distributions.flatMap(d => d.distributions.map(dd => dd.type))));

    const data = distributions.map(d => {
        const row: Record<string, number | string> = { chapterNumber: d.chapterNumber };
        for (const dist of d.distributions) {
            row[dist.type] = dist.sceneCount;
        }
        return row;
    });

    const hasData = distributions.length > 0;

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Scene Type Distribution</h3>
            {!hasData ? (
                <div className={styles.empty}><p>No scene data yet.</p></div>
            ) : (
                <div className={styles['chart-wrapper']}>
                    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                        <BarChart data={data} margin={CHART_MARGIN}>
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
                            <Legend wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: '12px' }} />
                            {sceneTypes.map(type => (
                                <Bar key={type} dataKey={type} stackId="scenes" fill={SCENE_TYPE_COLORS[type] ?? '#888'} name={type} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

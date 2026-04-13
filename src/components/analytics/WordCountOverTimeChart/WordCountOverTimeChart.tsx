import { type WordCountOverTimeChart } from "./types"
import {
     BarChart, 
     Bar, 
     XAxis, 
     YAxis, 
     CartesianGrid, 
     Tooltip, 
     Legend, 
     ReferenceLine, 
     ResponsiveContainer
 } from 'recharts'
import styles from './WordCountOverTimeChart.module.css'
import { getChartData } from "@/compatability/formatters";
import {
    CHART_HEIGHT,
    CHART_MARGIN,
    GRID_PROPS,
    X_AXIS_PROPS,
    getXAxisLabel,
    Y_AXIS_PROPS,
    TOOLTIP_PROPS,
    LEGEND_PROPS,
    REFERENCE_LINE_PROPS,
    BAR_PROPS,
} from './config'



export default function WordCountOverTimeChart({
    data,
    target,
    frequency
}: WordCountOverTimeChart) {

    const chartData = getChartData(data, frequency)
    const hasData = chartData.length > 0
    const xAxisLabel = frequency === 'Daily' ? 'Date' : frequency === 'Weekly' ? 'Week' : 'Month'

    return (
        <div className={styles['chart-container']}>
            <h3 className={styles['chart-title']}>Words Over Time</h3>
            {!hasData ? (
                <div className={styles['no-data-message']}>
                    <p>No writing data available for this period.</p>
                    <p className={styles['no-data-subtitle']}>Start writing to see your progress!</p>
                </div>
            ) : (
                <div className={styles['chart-wrapper']}>
                    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                        <BarChart data={chartData} margin={CHART_MARGIN}>
                            <CartesianGrid {...GRID_PROPS} />
                            <XAxis {...X_AXIS_PROPS} label={getXAxisLabel(xAxisLabel)} />
                            <YAxis {...Y_AXIS_PROPS} />
                            <Tooltip {...TOOLTIP_PROPS} />
                            <Legend {...LEGEND_PROPS} />
                            <ReferenceLine y={target} {...REFERENCE_LINE_PROPS} />
                            <Bar {...BAR_PROPS} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}
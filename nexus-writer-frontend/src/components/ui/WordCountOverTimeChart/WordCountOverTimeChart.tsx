import { DailyWordsWrittenRecord, Frequency, MonthlyWordsWrittenRecord, WeeklyWordsWrittenRecord, WordsWrittenTimeSeries } from "@/app/types"
import { BarChart } from "@mui/x-charts/BarChart"
import { ChartsReferenceLine } from "@mui/x-charts"
import styles from './WordCountOverTimeChart.module.css'

type WordCountOverTimeChart = {
    data: WordsWrittenTimeSeries;
    target: number;
    frequency: Frequency;
}

export default function WordCountOverTimeChart({
    data,
    target,
    frequency
}: WordCountOverTimeChart) {

    const formatDate = (dateString: string | Date) => {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    const getPropsFromData = (data: WordsWrittenTimeSeries, frequency: Frequency) => {
        if (frequency === "Daily")  {
            const dailyData = data as DailyWordsWrittenRecord[];
            return {
                xAxisData: dailyData.map((record: DailyWordsWrittenRecord) => formatDate(record.date)),
                yAxisData: dailyData.map((record: DailyWordsWrittenRecord) => record.totalWords)
            }
        }
        if (frequency === "Weekly")  {
            const weeklyData = data as WeeklyWordsWrittenRecord[];
            return {
                xAxisData: weeklyData.map((record: WeeklyWordsWrittenRecord) => `Week ${record.weekNum}`),
                yAxisData: weeklyData.map((record: WeeklyWordsWrittenRecord) => record.totalWords)
            }
        }
        if (frequency === "Monthly")  {
            const monthlyData = data as MonthlyWordsWrittenRecord[];
            return {
                xAxisData: monthlyData.map((record: MonthlyWordsWrittenRecord) => record.monthName),
                yAxisData: monthlyData.map((record: MonthlyWordsWrittenRecord) => record.totalWords)
            }
        }
        // Default fallback
        return {
            xAxisData: [],
            yAxisData: []
        }
    }

    const barChartProps = getPropsFromData(data, frequency)
    const hasData = barChartProps.xAxisData.length > 0

    return (
        <div className={styles['chart-container']}>
            <h3 className={styles['chart-title']}>Words Over Time</h3>
            {!hasData ? (
                <div className={styles['no-data-message']}>
                    <p>No writing data available for this period.</p>
                    <p className={styles['no-data-subtitle']}>Start writing to see your progress!</p>
                </div>
            ) : (
                <BarChart
                    height={400}
                    xAxis={[{
                        data: barChartProps.xAxisData,
                        scaleType: 'band',
                        label: frequency === 'Daily' ? 'Date' : frequency === 'Weekly' ? 'Week' : 'Month',
                        labelStyle: {
                            fill: 'var(--text-primary)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 14,
                            fontWeight: 600,
                        },
                    }]}
                    yAxis={[{
                        label: 'Words Written',
                        labelStyle: {
                            fill: 'var(--text-primary)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 14,
                            fontWeight: 600,
                        },
                    }]}
                    series={[{
                        data: barChartProps.yAxisData,
                        color: '#00d4ff',
                        label: 'Total Words',
                    }]}
                    sx={{
                        '& .MuiChartsAxis-line': {
                            stroke: 'rgba(0, 212, 255, 0.3)',
                        },
                        '& .MuiChartsAxis-tick': {
                            stroke: 'rgba(0, 212, 255, 0.3)',
                        },
                        '& .MuiChartsAxis-tickLabel': {
                            fill: '#ffffff',
                            fontFamily: 'var(--font-body)',
                            fontSize: 12,
                        },
                        '& .MuiChartsAxis-label': {
                            fill: '#ffffff',
                            fontFamily: 'var(--font-body)',
                        },
                        '& .MuiChartsLegend-root text': {
                            fill: '#ffffff !important',
                            fontFamily: 'var(--font-body)',
                        },
                        '& .MuiChartsLegend-label': {
                            fill: '#ffffff !important',
                            fontFamily: 'var(--font-body)',
                        },
                        '& .MuiChartsLegend-series text': {
                            fill: '#ffffff !important',
                        },
                        '& text': {
                            fill: '#ffffff',
                        },
                        '& .MuiChartsGrid-line': {
                            stroke: 'rgba(255, 255, 255, 0.05)',
                        },
                    }}
                >
                    <ChartsReferenceLine 
                        y={target} 
                        label="Target"
                        lineStyle={{
                            stroke: '#00ff41',
                            strokeWidth: 2,
                            strokeDasharray: '5 5',
                        }}
                        labelStyle={{
                            fill: '#ffffff',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                        }}
                    />
                </BarChart>
            )}
        </div>
    )
}
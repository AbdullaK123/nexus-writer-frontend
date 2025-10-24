import { DailyWordsWrittenRecord, Frequency, MonthlyWordsWrittenRecord, WeeklyWordsWrittenRecord, WordsWrittenTimeSeries } from "@/app/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'
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

    const getChartData = (data: WordsWrittenTimeSeries, frequency: Frequency) => {
        if (frequency === "Daily")  {
            const dailyData = data as DailyWordsWrittenRecord[];
            return dailyData.map((record: DailyWordsWrittenRecord) => ({
                name: formatDate(record.date),
                words: record.totalWords
            }))
        }
        if (frequency === "Weekly")  {
            const weeklyData = data as WeeklyWordsWrittenRecord[];
            return weeklyData.map((record: WeeklyWordsWrittenRecord) => ({
                name: `Week ${record.weekNum}`,
                words: record.totalWords
            }))
        }
        if (frequency === "Monthly")  {
            const monthlyData = data as MonthlyWordsWrittenRecord[];
            return monthlyData.map((record: MonthlyWordsWrittenRecord) => ({
                name: record.monthName,
                words: record.totalWords
            }))
        }
        // Default fallback
        return []
    }

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
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart 
                            data={chartData} 
                            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke="rgba(255, 255, 255, 0.05)" 
                            />
                            <XAxis 
                                dataKey="name"
                                tick={{ fill: '#ffffff', fontFamily: 'var(--font-body)', fontSize: 12 }}
                                stroke="rgba(0, 212, 255, 0.3)"
                                label={{ 
                                    value: xAxisLabel, 
                                    position: 'insideBottom', 
                                    offset: -10,
                                    style: { fill: '#ffffff', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }
                                }}
                            />
                            <YAxis 
                                tick={{ fill: '#ffffff', fontFamily: 'var(--font-body)', fontSize: 12 }}
                                stroke="rgba(0, 212, 255, 0.3)"
                                label={{ 
                                    value: 'Words Written', 
                                    angle: -90, 
                                    position: 'insideLeft',
                                    style: { fill: '#ffffff', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }
                                }}
                            />
                            <Tooltip 
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ 
                                    backgroundColor: 'rgba(16, 16, 16, 0.95)',
                                    border: '1px solid rgba(0, 212, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontFamily: 'var(--font-body)'
                                }}
                                labelStyle={{ color: '#00d4ff' }}
                            />
                            <Legend 
                                wrapperStyle={{ 
                                    color: '#ffffff',
                                    fontFamily: 'var(--font-body)',
                                    paddingTop: '20px'
                                }}
                                iconType="rect"
                            />
                            <ReferenceLine 
                                y={target} 
                                stroke="#00ff41" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                label={{ 
                                    value: 'Target', 
                                    fill: '#ffffff',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 600,
                                    position: 'right'
                                }}
                            />
                            <Bar 
                                dataKey="words" 
                                fill="#00d4ff" 
                                name="Total Words"
                                radius={[8, 8, 0, 0]}
                                activeBar={{ 
                                    fill: '#00ffff',  // Change this color for different hover background
                                    stroke: '#00ff41',
                                    strokeWidth: 3,
                                    filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 1))'
                                }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}
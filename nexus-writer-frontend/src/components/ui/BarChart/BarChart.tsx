import {BarChartProps} from "@/app/types";
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer
} from 'recharts';
import styles from './BarChart.module.css'

// Custom tooltip component
interface TooltipProps {
    active?: boolean
    payload?: Array<{ value: number }>
    label?: string
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles['custom-tooltip']}>
                <p className={styles['tooltip-label']}>{label}</p>
                <p className={styles['tooltip-value']}>
                    {payload[0].value.toLocaleString()} words
                </p>
            </div>
        );
    }
    return null;
};

export default function BarChart({
    data,
    config
}:BarChartProps) {
    const {dataKey, referenceLineConfig} = config;
    const {value, stroke, strokeWidth, strokeDashArray, label} = referenceLineConfig;
    
    return (
        <div className={styles['chart-container']}>
            <ResponsiveContainer width="100%" height={400}>
                <RechartsBarChart 
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity={0.3} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="rgba(0, 212, 255, 0.1)" 
                        vertical={false}
                    />
                    <XAxis 
                        dataKey="name"
                        stroke="var(--text-secondary)"
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis 
                        stroke="var(--text-secondary)"
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        label={{ 
                            value: 'Words Written', 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { fill: 'var(--text-secondary)', fontSize: 14 }
                        }}
                    />
                    <Tooltip 
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(0, 212, 255, 0.1)' }}
                    />
                    <Legend 
                        wrapperStyle={{ 
                            paddingTop: '20px',
                            fontFamily: 'var(--font-body)',
                            color: 'var(--text-primary)'
                        }}
                    />
                    <Bar 
                        dataKey={dataKey}
                        fill="url(#barGradient)"
                        radius={[8, 8, 0, 0]}
                        animationDuration={800}
                    />
                    {value > 0 && (
                        <ReferenceLine
                            y={value}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDashArray}
                            label={{
                                ...label,
                                fill: stroke,
                                fontFamily: 'var(--font-body)'
                            }}
                        />
                    )}
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    )
}


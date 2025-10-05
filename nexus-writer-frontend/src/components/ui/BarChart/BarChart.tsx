import {BarChartProps} from "@/app/types";
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine
} from 'recharts';

export default function BarChart({
    data,
    config
}:BarChartProps) {
    const {width, height, dataKey, barFill, referenceLineConfig} = config;
    const {value, stroke, strokeWidth, strokeDashArray, label} = referenceLineConfig;
    return (
        <RechartsBarChart width={width} height={height} data={data}>
            <CartesianGrid />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill={barFill} />
            <ReferenceLine
                y={value}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDashArray}
                label={label}
            />
        </RechartsBarChart>
    )
}


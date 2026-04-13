import { Frequency, WordsWrittenTimeSeries } from "@/data/types";

export type ReferenceLineLabelConfig = {
    value: string;
    position: 'top' | 'bottom' | 'left' | 'right' | 'inside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom' | 'insideTopLeft' | 'insideTopRight' | 'insideBottomLeft' | 'insideBottomRight' | 'center';
    fill: string;
    fontSize: number;
    fontWeight: number;
    fontFamily: string;
    offset: number;
}

export type ReferenceLineConfig = {
    value: number;
    stroke: string;
    strokeWidth: number;
    strokeDashArray: string;
    label: ReferenceLineLabelConfig;
}

export type BarChartConfig = {
    width: number;
    height: number;
    dataKey: string;
    barFill: string;
    referenceLineConfig: ReferenceLineConfig;
}

export type DataPoint = {
    name: string;
    [key: string]: number | string;
}

export type BarChartProps = {
    data: DataPoint[];
    config: BarChartConfig;
}

export type WordCountOverTimeChart = {
    data: WordsWrittenTimeSeries;
    target: number;
    frequency: Frequency;
}

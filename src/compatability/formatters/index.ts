import { DailyWordsWrittenRecord, Frequency, MonthlyWordsWrittenRecord, WeeklyWordsWrittenRecord, WordsWrittenTimeSeries } from "@/data/types";
import { formatDistanceToNow } from "date-fns";

export const getBadgeCss = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'published') return 'published-chapter-number-badge';
    if (normalizedStatus === 'draft') return 'draft-chapter-number-badge';
    return 'outline-chapter-number-badge';
}

export const getStatusIndicatorClass = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'published') return 'published';
    if (normalizedStatus === 'draft') return 'draft';
    return 'outline';
}

export const formatWordCount = (count: number) => {
    if (!count) return '0 words'
    if (count === 0) return '0 words';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k words`;
    return `${count} words`;
}

export const getDuration = (date: Date | string) => {
    const parsed = new Date(date)
    if (isNaN(parsed.getTime())) return 'Unknown'
    return formatDistanceToNow(parsed, { addSuffix: true })
}

export const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const getChartData = (data: WordsWrittenTimeSeries, frequency: Frequency) => {
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

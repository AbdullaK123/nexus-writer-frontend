import type { StoryAnalytics } from "./story"
import type { WordCountOverTimeChart as WordCountOverTimeChartProps } from "@/components/analytics/WordCountOverTimeChart/types"

// ─── useStoryAnalytics → Component Props ─────────────────────

export const toTotalWordsKpiCardProps = (
    analytics: StoryAnalytics,
): { totalWords: number; target: number; frequency: StoryAnalytics['target']['frequency'] } => ({
    totalWords: analytics.kpis.totalWords,
    target: analytics.target.quota,
    frequency: analytics.target.frequency,
})

export const toTotalDurationKpiCardProps = (
    analytics: StoryAnalytics,
): { duration: number } => ({
    duration: analytics.kpis.totalDuration,
})

export const toAverageWordsPerMinuteCardProps = (
    analytics: StoryAnalytics,
): { avgWordsPerMinute: number } => ({
    avgWordsPerMinute: analytics.kpis.avgWordsPerMinute,
})

export const toWordCountOverTimeChartProps = (
    analytics: StoryAnalytics,
): WordCountOverTimeChartProps => ({
    data: analytics.wordsOverTime,
    target: analytics.target.quota,
    frequency: analytics.target.frequency,
})

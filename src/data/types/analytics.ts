export type {
    KpisResponse,
    DailyWordsWrittenRecord,
    WeeklyWordsWrittenRecord,
    MonthlyWordsWrittenRecord,
    WordsWrittenTimeSeries,
    StoryAnalytics,
} from "@/compatability/transformers/story";

export type AnalyticsEvent = {
    sessionId: string;
    storyId: string;
    chapterId: string;
    userId: string;
    timestamp: string;
    wordCount: number
}


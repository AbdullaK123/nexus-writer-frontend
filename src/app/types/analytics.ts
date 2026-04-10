import { Frequency, TargetResponse } from "./targets";

export type AnalyticsEvent = {
    sessionId: string;
    storyId: string;
    chapterId: string;
    userId: string;
    timestamp: string;
    wordCount: number
}

export type KpisResponse = {
    totalWords: number;
    totalDuration: number;
    avgWordsPerMinute: number;
}

export type DailyWordsWrittenRecord = {
    date: Date;
    totalWords: number;
}

export type WeeklyWordsWrittenRecord = {
    weekStart: Date;
    weekNum: number;
    totalWords: number;
}

export type MonthlyWordsWrittenRecord = {
    monthStart: Date;
    monthName: string;
    totalWords: number;
}

export type WordsWrittenTimeSeries = DailyWordsWrittenRecord[] | WeeklyWordsWrittenRecord[] | MonthlyWordsWrittenRecord[];

export type StoryAnalytics = {
    kpis: KpisResponse;
    wordsOverTime: WordsWrittenTimeSeries;
    target: TargetResponse;
}
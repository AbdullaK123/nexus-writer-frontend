export type AnalyticsEvent = {
    sessionId: string;
    storyId: string;
    chapterId: string;
    userId: string;
    timestamp: string;
    wordCount: number
}

export type Callback = () => void;

export type TypingDetectorPluginProps = {
    storyId: string;
    chapterId: string;
    userId: string;
    delay: number;
}

export type CreateTargetRequest = {
    quota: number;
    frequency: "Daily" | "Weekly" | "Monthly";
    from_date: string;
    to_date: string;
}

export type UpdateTargetRequest = {
    quota?: number;
    frequency?: "Daily" | "Weekly" | "Monthly";
    from_date?: string;
    to_date?: string;
}

export type Frequency = "Daily" | "Weekly" | "Monthly";

export type TargetResponse = {
    quota: number;
    frequency: Frequency;
    fromDate: Date;
    toDate: Date;
    storyId: string;
    targetId: string;
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

export type StoryAnalytics = {
    kpis: KpisResponse;
    wordsOverTime: DailyWordsWrittenRecord[] | WeeklyWordsWrittenRecord[] | MonthlyWordsWrittenRecord[];
    target: TargetResponse;
}
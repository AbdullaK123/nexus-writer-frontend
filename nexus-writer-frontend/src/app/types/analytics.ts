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

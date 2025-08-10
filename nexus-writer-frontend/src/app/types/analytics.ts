export type AnalyticsEvent = {
    storyId: string;
    chapterId: string;
    userId: string;
    timestamp: Date
    wordCount: number
}

export type Callback = () => void;

export type TypingDetectorPluginProps = {
    onStart: Callback;
    onStop: Callback;
    delay: number;
}

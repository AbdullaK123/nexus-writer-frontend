export interface ApiTargetResponse {
    quota: number;
    frequency: "Daily" | "Weekly" | "Monthly";
    from_date: string;
    to_date: string;
    story_id: string;
    target_id: string;
}

export interface ApiKpisResponse {
    total_words: number;
    total_duration: number;
    avg_words_per_minute: number;
}

export type ApiDailyWordsWrittenRecord = {
    date: string;
    total_words: number;
}

export type ApiWeeklyWordsWrittenRecord = {
    week_start: string;
    week_num: number;
    total_words: number;
}

export type ApiMonthlyWordsWrittenRecord = {
    month_start: string;
    month_name: string;
    total_words: number;
}

export interface ApiStoryAnalyticsResponse {
    kpis: ApiKpisResponse;
    words_over_time: ApiDailyWordsWrittenRecord[] | ApiWeeklyWordsWrittenRecord[] | ApiMonthlyWordsWrittenRecord[];
    target: ApiTargetResponse;
}

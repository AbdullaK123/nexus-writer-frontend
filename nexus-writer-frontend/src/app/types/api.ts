export interface ApiStory {
    id: string;
    latest_chapter_id?: string;
    title: string;
    status: string;
    total_chapters: number;
    word_count: number;
    created_at: string;
    updated_at: string;
}

export interface ApiChapterListItem {
    id: string;
    title: string;
    published: boolean;
    word_count: number;
    updated_at: string;
}

export interface ApiChapterListResponse {
    story_id: string;
    story_title: string;
    story_status: "Complete" | "On Hiatus" | "Ongoing";
    story_last_updated: string;
    chapters: ApiChapterListItem[];
}

export interface ApiChapterContentResponse {
    id: string;
    title: string;
    content: string;
    published: boolean;
    story_id: string;
    story_title: string;
    created_at: string;
    updated_at: string;
    previous_chapter_id: string;
    next_chapter_id: string;
}

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

export interface ApiWordsWrittenRecord {
    date: string;
    total_words: number;
}

export interface ApiStoryAnalyticsResponse {
    kpis: ApiKpisResponse;
    words_over_time: ApiWordsWrittenRecord[];
    target: ApiTargetResponse;
}
import { ApiTargetResponse } from "./analytics";

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

export interface ApiStoryListItemResponse {
    id: string
    title: string
    word_count: number
    targets: ApiTargetResponse[]
}

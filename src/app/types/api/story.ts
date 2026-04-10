import { ApiTargetResponse } from "./analytics";
import { StoryStatus } from "../story";

export interface ApiStory {
    id: string;
    latest_chapter_id?: string;
    title: string;
    status: StoryStatus;
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

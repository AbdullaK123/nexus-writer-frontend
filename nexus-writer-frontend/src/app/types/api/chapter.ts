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

export type ApiLineEdit = {
    paragraph_idx: number;
    original_paragraph: string;
    edited_paragraph: string;   
    justification: string;
}

export type ApiChapterEdit = {
    edits: ApiLineEdit[];
    last_generated_at: string;
    is_stale: boolean
}

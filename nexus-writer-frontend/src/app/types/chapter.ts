import { ChapterListItemProps } from "./components";

export type ChapterStatus = "published" | "draft" | "outline";

export interface ChapterContentResponse {
  id: string;
  title: string;
  content: string;
  story_id: string;
  story_title: string;
  created_at: Date;
  updated_at: Date;
  previous_chapter_id?: string;
  next_chapter_id?: string;
}

export interface ChapterListResponse {
  story_id: string;
  story_title: string;
  chapters: ChapterListItemProps[];
}

export interface CreateChapterRequest {
  title: string;
  content?: string; // Optional, defaults to empty
}

export interface UpdateChapterRequest {
  title?: string;
  content?: string;
  published?: boolean;
}
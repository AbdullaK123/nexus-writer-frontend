import { TargetResponse } from "./analytics";
import { ChapterListItemProps, StoryCardProps } from "./components";

export type StoryStatus = "Complete" | "On Hiatus" | "Ongoing";

export type StoryCreateRequest = {
    title: string;
}

export type StoryUpdateRequestBody = {
    title?: string;
    status?:  "Complete" | "Ongoing" | "On Hiatus"
}

export type StoryUpdateRequest = {
    body?: StoryUpdateRequestBody;
    storyId: string;
}

export interface Story {
  id: string;
  user_id: string;
  title: string;
  status: "Complete" | "On Hiatus" | "Ongoing"; 
  path_array?: string[]; 
  created_at: Date;
  updated_at: Date;
}

export interface StoryDetailResponse {
  id: string;
  title: string;
  status: "Complete" | "On Hiatus" | "Ongoing";
  created_at: Date;
  updated_at: Date;
  chapters: ChapterListItemProps[];
}

export interface StoryGridResponse {
  stories: StoryCardProps[];
}

export interface CreateStoryRequest {
  title: string;
}

export interface UpdateStoryRequest {
  title?: string;
  status?: "Complete" | "On Hiatus" | "Ongoing";
}

export interface StoryListItemResponse {
  storyId: string
  title: string
  wordCount: number
  targets: TargetResponse[]
}

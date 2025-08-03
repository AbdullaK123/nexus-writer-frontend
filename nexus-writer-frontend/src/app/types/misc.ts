

import { UpdateChapterRequest } from "./chapter";

export interface UpdateMutationArgs {
  chapterId: string;
  requestBody: UpdateChapterRequest
}

export interface NavigationContext {
  currentStoryId?: string;
  currentChapterId?: string;
  previousChapterId?: string;
  nextChapterId?: string;
}

export interface EditorState {
  chapterId: string;
  title: string;
  content: string;
  wordCount: number;
  lastSaved?: Date;
  isDirty: boolean; // Has unsaved changes
}




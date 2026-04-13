import { CreateChapterRequest } from "@/data/types/chapter";

export interface StoryDetailHeaderProps {
  title: string;
  storyId: string; 
  onCreateChapter: (chapterInfo: CreateChapterRequest) => void;
  isCreating: boolean,
  creationSuccess: boolean,
  onShowSuccessToast: (msg: string) => void;
}

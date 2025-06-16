import { StoryCreateRequest } from "./stories";


export interface DashboardToolBarProps {
    username: string;
    onCreateStory: (story: StoryCreateRequest) => void;
}

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface StoryCardProps {
    title: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    totalChapters: number;
    wordCount: number;
    latestChapter: string;
}

export interface StoryDetailHeaderProps {
  title: string
}

export interface ChapterListItemProps {
  chapterNumber: number;
  title: string;
  wordCount: number;
  status: string;
}

export interface StoryInfoCardProps {
  status: string;
  totalChapters: number;
  wordCount: number;
  updatedAt: Date;
}

export interface StoryDetailSideBarProps {
  storyInfo: StoryInfoCardProps;
  chapters: ChapterListItemProps[];
}

export interface ChapterPreviewProps {
  title: string;
  status: string;
  wordCount: number;
  updatedAt: Date;
  previewContent: string;
}
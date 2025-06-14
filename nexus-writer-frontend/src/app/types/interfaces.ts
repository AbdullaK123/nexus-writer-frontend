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
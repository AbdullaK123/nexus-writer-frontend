import { CreateChapterRequest } from "./chapter"
import { StoryCreateRequest } from "./story";

export interface StoryDetailHeaderProps {
  title: string;
  storyId: string; 
  onCreateChapter: (chapterInfo: CreateChapterRequest) => void;
  onFilterChange: (filter: string) => void;
  isCreating: boolean,
  creationSuccess: boolean
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

export interface StoryCardProps {
  id: string; 
  latestChapterId?: string;
  title: string;
  status: "Complete" | "On Hiatus" | "Ongoing";
  createdAt: Date;
  updatedAt: Date;
  totalChapters?: number;
  wordCount?: number;
  latestChapter?: string;
}

export interface ChapterListItemProps {
  storyId: string;
  id: string;
  chapterNumber: number;
  title: string;
  wordCount: number;
  status: "published" | "draft" | "outline";
  published?: boolean;
  updatedAt?: Date;
  handleOnClick: () => void;
  handleClearSelection: () => void;
}

export interface ChapterPreviewProps {
  id?: string; // Chapter ID
  title?: string;
  status?: "published" | "draft" | "outline";
  wordCount?: number;
  updatedAt?: Date;
  previewContent?: string;
  storyId: string; // For navigation
  storyTitle?: string;
  previousChapterId?: string; // Navigation
  nextChapterId?: string; // Navigation
  onStatusUpdate: () => void;
}

export interface ChapterNavHeaderProps {
  storyId: string;
  chapterTitle: string;
  chapterId: string;
  prevChapterId?: string;
  nextChapterId?: string;
}


export interface DashboardToolBarProps {
  username: string;
  onCreateStory: (story: StoryCreateRequest) => void;
  onFilterChange: (filter: string) => void;
}

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: (filter: string) => void;
}

export interface AuthWrapperProps {
  children: React.ReactNode
  redirectTo?: string;
  requireAuth?: boolean;
}

export interface ChapterContextMenuProps {
  x: number;
  y: number;
  onAction: (action: string) => void;
  onClose: () => void;
}

export interface ManualSavePluginProps {
  storyId: string,
  chapterId: string
}

export interface AutoSavePluginProps {
    storyId: string;
    chapterId: string;
    intervalMs?: number;
}

export interface LexicalEditorProps {
    storyId: string;
    chapterId: string;
    initialContent?: string
}
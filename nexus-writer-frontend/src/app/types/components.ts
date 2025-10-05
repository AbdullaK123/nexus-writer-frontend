import { CreateChapterRequest } from "./chapter"
import { StoryCreateRequest } from "./story";
import {Frequency, TargetResponse, WordsWrittenRecord} from "@/app/types/analytics";
import {number, string} from "zod";

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

export interface StoryListItemProps {
  storyId: string;
  title: string;
  status: "Complete" | "On Hiatus" | "Ongoing";
  wordCount: number;
  handleOnClick: () => void;
  handleClearSelection: () => void;
  handleOnShowTargetForm: (mode: 'creating' | 'editing' | 'deleting', target?: TargetResponse) => void;
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

export interface ContextMenuProps {
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

export type EditableStoryTitleProps = {
    storyId: string;
    title: string;
};

export type TargetFormProps = {
  storyId: string
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
  mode: 'creating' | 'editing' | 'deleting'
  target?: TargetResponse
}

export type StoryListProps = {
  stories: StoryListItemProps[];
}

export type TotalWordsCardProps = {
  totalWords: number;
  quota: number;
}

export type DashboardFilter = {
    frequency: Frequency;
    fromDate: Date;
    toDate: Date;
}

export type DashboardFilterBarProps = {
    filter: DashboardFilter;
    onFilterChange: (filter: DashboardFilter) => void;
}

export type ReferenceLineLabelConfig = {
    value: string;
    position: 'top' | 'bottom' | 'left' | 'right' | 'inside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom' | 'insideTopLeft' | 'insideTopRight' | 'insideBottomLeft' | 'insideBottomRight' | 'center';
    fill: string;
    fontSize: number;
    fontWeight: number;
    fontFamily: string;
    offset: number;
}


export type ReferenceLineConfig = {
    value: number;
    stroke: string;
    strokeWidth: number;
    strokeDashArray: string;
    label: ReferenceLineLabelConfig;
}

export type BarChartConfig = {
    width: number;
    height: number;
    dataKey: string;
    barFill: string;
    referenceLineConfig: ReferenceLineConfig;
}

export type DataPoint = {
    name: string;
    [key: string]: number | string;
}

export type BarChartProps = {
    data: DataPoint[];
    config: BarChartConfig;
}

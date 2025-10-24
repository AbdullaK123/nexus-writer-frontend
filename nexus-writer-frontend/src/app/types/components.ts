import React, { RefObject } from "react";
import { CreateChapterRequest } from "./chapter"
import { StoryCreateRequest } from "./story";
import {Frequency, TargetResponse} from "@/app/types/analytics";

export interface StoryDetailHeaderProps {
  title: string;
  storyId: string; 
  onCreateChapter: (chapterInfo: CreateChapterRequest) => void;
  isCreating: boolean,
  creationSuccess: boolean,
  onShowSuccessToast: (msg: string) => void;
}

export interface StoryInfoCardProps {
  status: string;
  totalChapters: number;
  wordCount: number;
  updatedAt: Date;
}

export interface StoryDetailSideBarProps {
  storyInfo: StoryInfoCardProps;
  chapters: Omit<ChapterListItemProps, 'contextMenuRef'>[];
  onFilterChange: (filter: string) => void;
  contextMenuRef: RefObject<{ menuIsOpen: boolean, storyId?: string }>
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
  contextMenuRef: RefObject<{ menuIsOpen: boolean, storyId?: string }>
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
  contextMenuRef: RefObject<{ menuIsOpen: boolean, chapterId?: string }>
}

export type StoryListItemProps = {
  storyId: string;
  title: string;
  wordCount: number;
  isSelected: boolean;
  targets: TargetResponse[];
  handleOnContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

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
  onShowErrorToast: (msg: string) => void;
  onShowSuccessToast: (msg: string) => void;
}

export interface ChapterNavHeaderProps {
  storyId: string;
  chapterTitle: string;
  chapterId: string;
  prevChapterId?: string;
  nextChapterId?: string;
  onShowErrorToast: (msg: string) => void;
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
  isOpen: boolean;
  x: number;
  y: number;
  onClose: () => void;
  children: React.ReactNode
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

export type CreateTargetFormProps = {
  storyId: string
  isOpen: boolean
  frequency: Frequency
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}

export type EditTargetFormProps = {
  target: TargetResponse
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}

export type DeleteTargetFormProps = {
  target: TargetResponse
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}

export type StoryListProps = {
    storiesLoading: boolean;
    stories: StoryListItemProps[];
    selectedStoryId: string;
    onSelectStory: (storyId: string) => void;
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
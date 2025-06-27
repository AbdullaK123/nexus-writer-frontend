import React from "react";
import { StoryCreateRequest } from "./stories";

// ========================================
// USER INTERFACES
// ========================================

export interface User {
  id: string;
  username: string;
  email: string;
  profile_img?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserResponse {
  username: string;
  email: string;
  profile_img?: string;
}

// ========================================
// STORY INTERFACES (Updated to match backend)
// ========================================

export interface Story {
  id: string;
  user_id: string;
  title: string;
  status: "Complete" | "On Hiatus" | "Ongoing"; 
  path_array?: string[]; 
  created_at: Date;
  updated_at: Date;
}

export interface StoryCardProps {
  id: string; 
  title: string;
  status: "Complete" | "On Hiatus" | "Ongoing";
  createdAt: Date;
  updatedAt: Date;
  totalChapters?: number;
  wordCount?: number;
  latestChapter?: string;
}

export interface ApiStory {
    id: string;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
}

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

export interface StoryDetailHeaderProps {
  title: string;
  storyId: string; 
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

// ========================================
// CHAPTER INTERFACES (Updated to match backend)
// ========================================

export interface ApiChapterContentResponse {
    id: string;
    title: string;
    content: string;
    story_id: string;
    story_title: string;
    created_at: string;
    updated_at: string;
    previous_chapter_id?: string;
    next_chapter_id?: string;
}

export interface ChapterListItemProps {
  id?: string; // Chapter ID for navigation
  chapterNumber: number;
  title: string;
  wordCount: number;
  status: "published" | "draft" | "outline"; // Derived from published field
  getChapterFn: (chapterId: string) => any;
}

export interface ChapterPreviewProps {
  id?: string; // Chapter ID
  title: string;
  status: "published" | "draft" | "outline";
  wordCount: number;
  updatedAt: Date;
  previewContent: string;
  storyId?: string; // For navigation
  storyTitle?: string;
  previousChapterId?: string; // Navigation
  nextChapterId?: string; // Navigation
}

// ========================================
// FORM & REQUEST INTERFACES
// ========================================

export interface CreateChapterRequest {
  title: string;
  content?: string; // Optional, defaults to empty
}

export interface UpdateChapterRequest {
  title?: string;
  content?: string;
  published?: boolean;
}

export interface UpdateMutationArgs {
  chapterId: string;
  requestBody: UpdateChapterRequest
}

export interface CreateStoryRequest {
  title: string;
}

export interface UpdateStoryRequest {
  title?: string;
  status?: "Complete" | "On Hiatus" | "Ongoing";
}

// ========================================
// COMPONENT INTERFACES (Existing)
// ========================================

export interface DashboardToolBarProps {
  username: string;
  onCreateStory: (story: StoryCreateRequest) => void;
}

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface AuthWrapperProps {
  children: React.ReactNode
  redirectTo?: string;
  requireAuth?: boolean;
}

// ========================================
// API RESPONSE INTERFACES (Backend-aligned)
// ========================================

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

export interface StoryGridResponse {
  stories: StoryCardProps[];
}

export interface StoryDetailResponse {
  id: string;
  title: string;
  status: "Complete" | "On Hiatus" | "Ongoing";
  created_at: Date;
  updated_at: Date;
  chapters: ChapterListItemProps[];
}

// ========================================
// NAVIGATION & STATE INTERFACES
// ========================================

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

// ========================================
// UTILITY TYPES
// ========================================

export type ChapterStatus = "published" | "draft" | "outline";
export type StoryStatus = "Complete" | "On Hiatus" | "Ongoing";

// Helper for converting backend published boolean to frontend status
export function getChapterStatus(published: boolean, hasContent: boolean): ChapterStatus {
  if (published) return "published";
  if (hasContent && !published) return "draft";
  return "outline";
}

// Helper for calculating reading time
export function calculateReadingTime(wordCount: number): string {
  const minutes = Math.round(wordCount / 200); // 200 WPM average
  return minutes === 0 ? '< 1 min' : `${minutes} min`;
}

// Helper for formatting word count
export function formatWordCount(wordCount: number): string {
  if (wordCount >= 1000000) return `${(wordCount / 1000000).toFixed(1)}M`;
  if (wordCount >= 1000) return `${(wordCount / 1000).toFixed(1)}k`;
  return wordCount.toString();
}
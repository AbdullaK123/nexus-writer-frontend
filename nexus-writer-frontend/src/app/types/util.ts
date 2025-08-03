import { ApiChapterContentResponse } from "./api";
import { ChapterStatus } from "./chapter";
import { ChapterPreviewProps } from "./components";

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

export function transformChapterResponse(apiResponse: ApiChapterContentResponse): Omit<ChapterPreviewProps, 'onStatusUpdate'> {
    const wordCount = apiResponse.content ? apiResponse.content.split(' ').length : 0
    
    return {
        id: apiResponse.id,
        title: apiResponse.title,
        status: getChapterStatus(apiResponse.published, wordCount > 0),
        wordCount: wordCount,
        updatedAt: new Date(apiResponse.updated_at + 'Z'),
        previewContent: apiResponse.content,
        storyId: apiResponse.story_id,
        storyTitle: apiResponse.story_title,
        previousChapterId: apiResponse.previous_chapter_id,
        nextChapterId: apiResponse.next_chapter_id
    }
}
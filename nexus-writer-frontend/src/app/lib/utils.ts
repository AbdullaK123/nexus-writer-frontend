import { formatDistanceToNow } from "date-fns";
import {
    ApiChapterContentResponse,
    ApiStoryAnalyticsResponse,
    ApiTargetResponse,
    KpisResponse,
    TargetResponse
} from "@/app/types";
import { ChapterStatus } from "@/app/types";
import { ChapterPreviewProps } from "@/app/types";
import {StoryAnalytics} from "@/app/types";


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

export const transformTarget = (target: ApiTargetResponse): TargetResponse => ({
    quota: target.quota,
    frequency: target.frequency,
    fromDate: new Date(target.from_date + 'Z'),
    toDate: new Date(target.to_date + 'Z'),
    storyId: target.story_id,
    targetId: target.target_id
})

export function transformChapterResponse(apiResponse: ApiChapterContentResponse): Omit<ChapterPreviewProps, 'onStatusUpdate' | 'onShowErrorToast' | 'onShowSuccessToast'> {
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

export function transformStoryAnalyticResponse(apiResponse: ApiStoryAnalyticsResponse): StoryAnalytics {
    const kpisResponse: KpisResponse = {
        totalWords: apiResponse.kpis.total_words,
        totalDuration: apiResponse.kpis.total_duration,
        avgWordsPerMinute: apiResponse.kpis.avg_words_per_minute,
    }
    return {
        kpis: kpisResponse,
        wordsOverTime: apiResponse.words_over_time.map(
            (record) => {
                return {
                    date: new Date(record.date + 'Z'),
                    totalWords: record.total_words
                }
            }
        ),
        target: transformTarget(apiResponse.target)
    }

}

export const getBadgeCss = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'published') return 'published-chapter-number-badge';
    if (normalizedStatus === 'draft') return 'draft-chapter-number-badge';
    return 'outline-chapter-number-badge';
}

export const getStatusIndicatorClass = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'published') return 'published';
    if (normalizedStatus === 'draft') return 'draft';
    return 'outline';
}

export const formatWordCount = (count: number) => {
    if (!count) return '0 words'
    if (count === 0) return '0 words';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k words`;
    return `${count} words`;
}

export const getDuration = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true })
}

export const formatWordCountStory = (count: number | undefined) => {
    if (!count) return 0;

    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
}
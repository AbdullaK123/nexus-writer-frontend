import { formatDistanceToNow } from "date-fns";
import {
    ApiChapterContentResponse,
    ApiDailyWordsWrittenRecord,
    ApiMonthlyWordsWrittenRecord,
    ApiStoryAnalyticsResponse,
    ApiTargetResponse,
    ApiWeeklyWordsWrittenRecord,
    DailyWordsWrittenRecord,
    KpisResponse,
    MonthlyWordsWrittenRecord,
    TargetResponse,
    WeeklyWordsWrittenRecord
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
        totalDuration: Math.round(100*apiResponse.kpis.total_duration) / 100,
        avgWordsPerMinute: Math.round(100*apiResponse.kpis.avg_words_per_minute) / 100,
    }

    let wordsOverTime = []

    if (apiResponse.target && apiResponse.target.frequency === "Daily") {
        wordsOverTime = (apiResponse.words_over_time as ApiDailyWordsWrittenRecord[]).map((record): DailyWordsWrittenRecord => ({
            date: new Date(record.date + 'Z'),
            totalWords: record.total_words
        }))
    }

    if (apiResponse.target && apiResponse.target.frequency === "Weekly") {
        wordsOverTime = (apiResponse.words_over_time as ApiWeeklyWordsWrittenRecord[]).map((record): WeeklyWordsWrittenRecord => ({
            weekStart: new Date(record.week_start + 'Z'),
            weekNum: record.week_num,
            totalWords: record.total_words
        }))
    }

     if (apiResponse.target && apiResponse.target.frequency === "Monthly") {
        wordsOverTime = (apiResponse.words_over_time as ApiMonthlyWordsWrittenRecord[]).map((record): MonthlyWordsWrittenRecord => ({
            monthStart: new Date(record.month_start + 'Z'),
            monthName: record.month_name,
            totalWords: record.total_words
        }))
    }

    console.log("Raw api response was, ", JSON.stringify(apiResponse.words_over_time, null, 2))
    console.log("Words over time is now, ", JSON.stringify(wordsOverTime, null, 2))

    return {
        kpis: kpisResponse,
        wordsOverTime: wordsOverTime,
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
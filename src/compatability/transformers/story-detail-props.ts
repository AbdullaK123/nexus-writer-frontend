import type { TransformedChapterList } from "./chapter"
import { getChapterStatus } from "./chapter"
import type { StoryInfoCardProps } from "@/components/stories/StoryDetailSidebar/components/StoryInfoCard/types"
import type { ChapterListItemProps } from "@/components/stories/StoryDetailSidebar/components/ChapterListItem/types"

// ─── useChapters → Component Props ───────────────────────────

type TransformedChapter = TransformedChapterList['chapters'][number]

export const toStoryInfoCardProps = (
    chapterData: TransformedChapterList,
): StoryInfoCardProps => ({
    status: chapterData.storyStatus || "Ongoing",
    totalChapters: chapterData.chapters.length,
    wordCount: chapterData.chapters.reduce((acc, current) => acc + current.wordCount, 0),
    updatedAt: chapterData.storyLastUpdated || new Date(),
})

export const toChapterListItemProps = (
    chapter: TransformedChapter,
    storyId: string,
    index: number,
    onSelect: () => void,
    onClearSelection: () => void,
): ChapterListItemProps => ({
    ...chapter,
    storyId,
    chapterNumber: index + 1,
    status: getChapterStatus(chapter.published, chapter.wordCount > 0),
    handleOnClick: onSelect,
    handleClearSelection: onClearSelection,
})

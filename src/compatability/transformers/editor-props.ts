import type { TransformedChapterContent, ChapterEdit } from "./chapter"
import type { ChapterNavHeaderProps } from "@/features/chapters/ChapterNavHeader/types"

// ─── useChapter → Component Props ────────────────────────────

export const toChapterNavHeaderProps = (
    storyId: string,
    chapterId: string,
    chapter: TransformedChapterContent,
): Omit<ChapterNavHeaderProps, 'onShowErrorToast'> => ({
    storyId,
    chapterTitle: chapter.title,
    chapterId,
    prevChapterId: chapter.previousChapterId,
    nextChapterId: chapter.nextChapterId,
})

export const toTipTapEditorProps = (
    storyId: string,
    chapterId: string,
    chapter: TransformedChapterContent,
    isUpdating: boolean,
    userId: string,
    edits: ChapterEdit | null,
): {
    storyId: string;
    chapterId: string;
    userId: string;
    isSaving: boolean;
    content: string;
    edits: ChapterEdit | null;
} => ({
    storyId,
    chapterId,
    userId,
    isSaving: isUpdating,
    content: chapter.content,
    edits,
})

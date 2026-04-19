'use client'
import StoryDetailSidebar from "@/components/stories/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/stories/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/features/chapters/ChapterPreview/ChapterPreview";
import styles from './StoryDetailContent.module.css';
import { useStoryDetail } from '@/features/stories/hooks/useStoryDetail';
import { useToast } from "@/shared/providers/ToastProvider";
import { useCallback } from "react";
import { AsyncBoundary } from '@/components/common';
import StoryLoadingState from './components/StoryLoadingState';
import StoryErrorState from './components/StoryErrorState';
import StoryEmptyState from './components/StoryEmptyState';
import ChapterLoadingState from './components/ChapterLoadingState';
import ChapterEmptyState from './components/ChapterEmptyState';

export default function StoryDetailContent() {
    const {
        storyId,
        isLoading,
        isError,
        storyInfo,
        chaptersToShow,
        title,
        onFilterChange,
        onCreateChapter,
        isCreating,
        creationSuccess,
        selectedChapter,
        isLoadingChapter,
        handleChapterStatusUpdate,
    } = useStoryDetail();

    const { showToast } = useToast()

    const onShowErrorToast = useCallback((msg: string) => showToast(msg, "error"), [showToast])
    const onShowSuccessToast = useCallback((msg: string) => showToast(msg, "success"), [showToast])

    return (
        <AsyncBoundary
            data={storyInfo}
            isLoading={isLoading}
            isError={isError}
            errorMessage="Unable to load this story. Please check your connection and try again."
            loadingState={<StoryLoadingState />}
            errorState={<StoryErrorState />}
            emptyState={<StoryEmptyState />}
        >
            {() => (
                <div className={styles['story-detail-page']}>
                    <StoryDetailHeader 
                        storyId={storyId} 
                        title={title} 
                        onCreateChapter={onCreateChapter}
                        isCreating={isCreating}
                        creationSuccess={creationSuccess}
                        onShowSuccessToast={onShowSuccessToast}
                    />
                    <div className={styles['story-content-layout']}>
                        <StoryDetailSidebar
                            storyInfo={storyInfo}
                            chapters={chaptersToShow}
                            onFilterChange={onFilterChange}
                        />
                        <AsyncBoundary
                            data={selectedChapter}
                            isLoading={isLoadingChapter}
                            isError={false}
                            loadingState={<ChapterLoadingState />}
                            emptyState={<ChapterEmptyState />}
                        >
                            {(chapter) => (
                                <ChapterPreview 
                                    {...chapter} 
                                    onStatusUpdate={handleChapterStatusUpdate}
                                    onShowErrorToast={onShowErrorToast}
                                    onShowSuccessToast={onShowSuccessToast}
                                />
                            )}
                        </AsyncBoundary>
                    </div>
                </div>
            )}
        </AsyncBoundary>
    );
}

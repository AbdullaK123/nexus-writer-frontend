'use client'
import StoryDetailSidebar from "@/components/stories/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/stories/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/features/chapters/ChapterPreview/ChapterPreview";
import styles from './StoryDetailContent.module.css';
import { useStoryDetail } from '@/features/stories/hooks/useStoryDetail';
import { ClipLoader } from 'react-spinners';
import { useToast } from "@/shared/providers/ToastProvider";
import { useCallback } from "react";

export default function StoryDetailContent() {
    const {
        storyId,
        isLoading,
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

    if (isLoading) {
        return (
            <div className={styles['centered']}>
                <ClipLoader size={50} color="#00d4ff" />
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
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
                {isLoadingChapter ? (
                    <div className={styles['centered']}>
                        <ClipLoader size={50} color="#00d4ff" />
                        <h1>Loading chapter...</h1>
                    </div>
                ) : selectedChapter ? (
                    <ChapterPreview 
                        {...selectedChapter} 
                        onStatusUpdate={handleChapterStatusUpdate}
                        onShowErrorToast={onShowErrorToast}
                        onShowSuccessToast={onShowSuccessToast}
                    />
                ) : (
                    <div className={styles['centered']}>
                        <h1>Select a chapter to preview</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

'use client'
import StoryDetailSidebar from "@/components/ui/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/ui/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/components/ui/ChapterPreview/ChapterPreview";
import styles from './page.module.css';
import { useStoryDetail } from '@/app/hooks/useStoryDetail';
import { ClipLoader } from 'react-spinners';
import { useToast } from "@/app/hooks/useToast";
import { useCallback, useRef } from "react";

export default function Page() {
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
    const contextMenuRef = useRef({ menuIsOpen: false, storyId: null})

    if (isLoading) {
        return (
            <div className={styles['centered']}>
                <ClipLoader size={50} color="#666" />
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
                    contextMenuRef={contextMenuRef}
                />
                {isLoadingChapter ? (
                    <div className={styles['centered']}>
                        <ClipLoader size={50} color="#666" />
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
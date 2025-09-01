'use client'
import StoryDetailSidebar from "@/components/ui/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/ui/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/components/ui/ChapterPreview/ChapterPreview";
import styles from './page.module.css';
import { useStoryDetail } from '@/app/hooks/useStoryDetail';

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

    if (isLoading) {
        return (
            <div className={styles['centered']}>
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
                onFilterChange={onFilterChange}
                isCreating={isCreating}
                creationSuccess={creationSuccess}
            />
            <div className={styles['story-content-layout']}>
                <StoryDetailSidebar
                    storyInfo={storyInfo}
                    chapters={chaptersToShow}
                />
                {isLoadingChapter ? (
                    <div className={styles['centered']}>
                        <h1>Loading chapter...</h1>
                    </div>
                ) : selectedChapter ? (
                    <ChapterPreview 
                        {...selectedChapter} 
                        onStatusUpdate={handleChapterStatusUpdate}
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
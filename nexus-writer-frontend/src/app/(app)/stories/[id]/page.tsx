'use client'
import StoryDetailSidebar from "@/components/ui/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/ui/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/components/ui/ChapterPreview/ChapterPreview";
import styles from './page.module.css';
import { useChapters } from "@/app/hooks/useChapters";
import { useSelectedChapter } from "@/app/hooks/useSelectedChapter";
import { 
    CreateChapterRequest,
    StoryInfoCardProps, 
    getChapterStatus
 } from "@/app/types/interfaces";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function Page() {
    const router = useRouter()
    const params = useParams()
    const storyId = params?.id as string

    const {
        chapters,
        isLoading,
        isError,
        create,
        isCreating,
        creationError,
        creationSuccess
    } = useChapters(storyId)

    useEffect(() => {
        if (isError) {
            alert(`Error fetching chapters for story: ${storyId}. The server might be experiencing issues`)
            router.push('/dashboard')
        }
    }, [isError])

    useEffect(() => {
          if (creationError) {
              alert('Failed to create chapter. Please check the server logs')
              return
          }
    }, [creationError])

    const { 
        selectedChapter, 
        selectChapter, 
        isLoadingChapter
     } = useSelectedChapter(storyId)

    // Don't run this check until we have a storyId
    if (storyId && !chapters && !isLoading) {
        alert(`Story with id ${storyId} not found!`)
        router.push('/dashboard')
        return
    }

    // Show loading state while resolving params or loading chapters
    if (!storyId || isLoading) {
        return (
            <div className={styles['centered']}>
                <h1>Loading...</h1>
            </div>
        )
    }

    const numChapters = chapters.chapters.length 
    const wordCount = chapters.chapters.reduce((acc, current) => acc + current.wordCount, 0) 
    const chaptersWithStatusAndNumbers = chapters.chapters.map((chapter, index) => {
        return {
            ...chapter,
            chapterNumber: index + 1,
            status: getChapterStatus(chapter.published, chapter.wordCount > 0),
            handleOnClick: () => selectChapter(chapter.id)
        }
    })

    const storyInfo: StoryInfoCardProps = {
        status: chapters?.storyStatus || "Ongoing",
        totalChapters: numChapters,
        wordCount: wordCount,
        updatedAt: chapters?.storyLastUpdated || new Date()
    }

    const onCreateChapter = (chapterInfo: CreateChapterRequest) => {
        if(!chapterInfo.title.trim()) {
            alert('Chapter title can not be empty!')
            return
        }
        create(chapterInfo)
    }


    return (
        <div className={styles['story-detail-page']}>
            <StoryDetailHeader 
                storyId={storyId} 
                title={chapters.storyTitle} 
                onCreateChapter={onCreateChapter}
                isCreating={isCreating}
                creationSuccess={creationSuccess}
            />
            <div className={styles['story-content-layout']}>
                <StoryDetailSidebar
                    storyInfo={storyInfo}
                    chapters={chaptersWithStatusAndNumbers}
                />
                {isLoadingChapter ? (
                    <div className={styles['centered']}>
                        <h1>Loading chapter...</h1>
                    </div>
                ) : selectedChapter ? (
                    <ChapterPreview 
                        {...selectedChapter} 
                    />
                ) : (
                    <div className={styles['centered']}>
                        <h1>Select a chapter to preview</h1>
                    </div>
                )}
            </div>
        </div>
    )
}
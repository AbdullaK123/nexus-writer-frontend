'use client'
import StoryDetailSidebar from "@/components/ui/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/ui/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/components/ui/ChapterPreview/ChapterPreview";
import styles from './page.module.css';
import { mockStoryDetailSidebar, mockChapterPreview } from "@/app/lib/examples";
import { useChapters } from "@/app/hooks/useChapters";
import { StoryInfoCardProps, getChapterStatus } from "@/app/types/interfaces";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

// In stories/[id]/page.tsx - replace your current structure with:
export default async function Page({ params }: {params:any}) {

    const {id} = await params
    const router = useRouter()

    const {
        chapters,
        isSuccess,
        isLoading,
        isError
    } = useChapters(id)

    // THIS IS ONLY A PLACEHOLDER UNTIL I FIND A BETTER SOLUTION
    if (!chapters) {
        alert(`Story with id ${id} not found!`)
        router.push('/dashboard')
    }


    const numChapters = chapters.chapters.length 
    const wordCount = chapters.chapters.reduce((acc, current) => acc + current.wordCount, 0) 
    const chaptersWithStatusAndNumbers = chapters.chapters.map((chapter, index) => {
        return {
            ...chapter,
            chapterNumber: index + 1,
            status: getChapterStatus(chapter.published, chapter.wordCount > 0)
        }
    })

    const storyInfo: StoryInfoCardProps = {
        status: chapters?.storyStatus || "Ongoing",
        totalChapters: numChapters,
        wordCount: wordCount,
        updatedAt: chapters?.storyLastUpdated || new Date()
    }

    return (
        <div className={styles['story-detail-page']}>
            <StoryDetailHeader storyId={id} title={chapters.storyTitle} />
            <div className={styles['story-content-layout']}>
                <StoryDetailSidebar
                    storyInfo={storyInfo}
                    chapters={chaptersWithStatusAndNumbers}
                />
                <div className={styles['main-content-area']}>
                    <ChapterPreview {...mockChapterPreview} />
                </div>
            </div>
        </div>
    )
}
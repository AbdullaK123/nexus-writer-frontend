'use client'
import StoryDetailSidebar from "@/components/ui/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/ui/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/components/ui/ChapterPreview/ChapterPreview";
import styles from './page.module.css';
import { useChapters } from "@/app/hooks/useChapters";
import { useSelectedChapter } from "@/app/hooks/useSelectedChapter";
import { 
    StoryInfoCardProps, 
    getChapterStatus
 } from "@/app/types/interfaces";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function Page({ params }: {params:any}) {

    const router = useRouter()

    const [storyId, setStoryId] = useState<string>("")

    useEffect(() => {
        const resolveParams = async () => {
            const { id } = await params
            setStoryId(id)
        }
        resolveParams()
    }, [params])

    const {
        chapters,
        isSuccess,
        isLoading,
        isError
    } = useChapters(storyId)

    const { 
        selectedChapter, 
        selectChapter, 
        isLoadingChapter
     } = useSelectedChapter(storyId)

    // THIS IS ONLY A PLACEHOLDER UNTIL I FIND A BETTER SOLUTION
    if (!chapters) {
        alert(`Story with id ${storyId} not found!`)
        router.push('/dashboard')
        return
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

    return (
        <div className={styles['story-detail-page']}>
            <StoryDetailHeader storyId={storyId} title={chapters.storyTitle} />
            <div className={styles['story-content-layout']}>
                <StoryDetailSidebar
                    storyInfo={storyInfo}
                    chapters={chaptersWithStatusAndNumbers}
                />
                {isLoadingChapter ? (
                    <div>Loading chapter...</div>
                ) : selectedChapter ? (
                    <ChapterPreview 
                        {...selectedChapter} 
                    />
                ) : (
                    <div>
                        <h2>Select a chapter to preview</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
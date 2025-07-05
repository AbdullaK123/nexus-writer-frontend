'use client'
import LexicalEditor from '@/components/features/LexicalEditor/LexicalEditor'
import styles from './page.module.css'
import { useChapters } from '@/app/hooks/useChapters'
import { useParams } from 'next/navigation'
import ChapterNavHeader from '@/components/ui/ChapterNavHeader/ChapterNavHeader'

export default function Page() {

    const params = useParams()
    const [storyId, chapterId] = params.id as string[]
    const { getChapter } = useChapters(storyId)

    const {
        data: chapter,
        isSuccess,
        isError,
        isLoading
    } = getChapter(chapterId, true)

    // Handle missing params
    if (!storyId || !chapterId) {
        return (
            <div className={styles['content-container']}>
                <h1>Invalid chapter URL</h1>
                <p>Expected: /chapters/[storyId]/[chapterId]</p>
            </div>
        )
    }

    return (
        <div className={styles['content-container']}>
            {isLoading && (
                <h1>Loading Chapter...</h1>
            )}
            {isError && (
                <h1>Error loading chapter. Please try again.</h1>
            )}
            {isSuccess && chapter && (
                <>
                    <ChapterNavHeader 
                        storyId={storyId}
                        chapterTitle={chapter.title}
                        prevChapterId={chapter.previousChapterId}
                        nextChapterId={chapter.nextChapterId}
                    />
                    <LexicalEditor 
                        key={chapter.id}
                        initialContent={chapter.content}
                        storyId={storyId}
                        chapterId={chapterId}
                    />
                </>
            )}
        </div>
    )
}
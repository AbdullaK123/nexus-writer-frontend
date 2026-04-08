'use client'
import styles from './page.module.css'
import { useChapters } from '@/app/hooks/useChapters'
import { useParams } from 'next/navigation'
import ChapterNavHeader from '@/components/ui/ChapterNavHeader/ChapterNavHeader'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { debounce } from 'lodash'
import { useMemo } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import { ClipLoader } from 'react-spinners'
import { useToast } from '@/app/hooks/useToast'
import { useChapterEdits } from '@/app/hooks/useChapterEdits'
import { useBackgroundJobs } from '@/app/hooks/useBackgroundJobs'
import { useJobProgress } from '@/app/hooks/useJobProgress'

const TipTapEditor = dynamic(
    () => import('@/components/features/TipTapEditor/TipTapEditor'),
    { ssr: false, loading: () => <div className="loading-center"><ClipLoader size={50} color="#00d4ff" /></div> }
)

export default function ChapterEditorContent() {

    const params = useParams()
    const [storyId, chapterId] = params.id as string[]
    const { useChapter } = useChapters(storyId)
    const router = useRouter()
    const { user } = useAuth()
    const { showToast } = useToast()

    const {
        data: chapter,
        isSuccess,
        isError,
        isLoading
    } = useChapter(chapterId, true)

    const { update, isUpdating } = useChapters(storyId)

    const {
        data: edits,
        isError: editsError,
        isLoading: editsLoading,
        isSuccess: editsSuccess
    } = useChapterEdits(chapterId)

    // Create debounced update function once, memoized by chapterId
    const debouncedUpdate = useMemo(
        () => debounce((newContent: string) => {
            update({ chapterId: chapterId, requestBody: { content: newContent }})
        }, 1000),
        [chapterId, update]
    )

    const handleUpdate = (newContent: string) => {
        debouncedUpdate(newContent)
    }

    const onShowErrorToast = (msg: string) => showToast(msg, "error");

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
                <div className="loading-column">
                    <ClipLoader size={50} color="#00d4ff" />
                    <h1>Loading Chapter...</h1>
                </div>
            )}
            {isError && (
                <h1>Error loading chapter. Please try again.</h1>
            )}
            {isSuccess && chapter && (
                <div className={styles['back-to-stories-container']}>
                    <button 
                        onClick={() => router.push(`/stories/${storyId}`)}
                        className={styles['back-to-story-button']}
                    >
                        ← Back to story page
                    </button>
                </div>
            )}
            {isSuccess && chapter && user && user.id && (
                <>
                    <ChapterNavHeader 
                        storyId={storyId}
                        chapterTitle={chapter.title}
                        chapterId={chapterId}
                        prevChapterId={chapter.previousChapterId}
                        nextChapterId={chapter.nextChapterId}
                        onShowErrorToast={onShowErrorToast}
                    />
                    <TipTapEditor
                        storyId={storyId}
                        chapterId={chapterId}
                        isSaving={isUpdating}
                        userId={user.id}
                        content={chapter.content}
                        edits={!edits?.isStale ? edits : null}
                        onUpdateAction={handleUpdate}
                    />
                </>
            )}
        </div>
    )
}

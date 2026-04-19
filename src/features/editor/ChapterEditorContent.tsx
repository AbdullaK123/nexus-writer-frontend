'use client'
import styles from './ChapterEditorContent.module.css'
import { useChapters } from '@/data/hooks/useChapters'
import { useParams } from 'next/navigation'
import ChapterNavHeader from '@/features/chapters/ChapterNavHeader/ChapterNavHeader'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { debounce } from 'lodash'
import { useMemo } from 'react'
import { useAuth } from '@/data/hooks/useAuth'
import { ClipLoader } from 'react-spinners'
import { useToast } from '@/shared/providers/ToastProvider'
import { useChapterEdits } from '@/data/hooks/useChapterEdits'
import { AsyncBoundary } from '@/components/common'
import { toChapterNavHeaderProps, toTipTapEditorProps } from '@/compatability/transformers'
import EditorLoadingState from './components/EditorLoadingState'
import EditorErrorState from './components/EditorErrorState'
import EditorEmptyState from './components/EditorEmptyState'

const TipTapEditor = dynamic(
    () => import('@/features/editor/TipTapEditor/TipTapEditor'), { 
        ssr: false, 
        loading: () => (
            <div className="loading-center">
                <ClipLoader size={50} color="#00d4ff" />
            </div>
        ) 
    }
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
        isError,
        isLoading
    } = useChapter(chapterId, true)

    const { update, isUpdating } = useChapters(storyId)

    const {
        data: edits,
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
    
    const navigateToStory = () => router.push(`/stories/${storyId}`)

    return (
        <div className={styles['content-container']}>
            <AsyncBoundary
                data={chapter}
                isLoading={isLoading}
                isError={isError}
                errorMessage="Unable to load this chapter. Please check your connection and try again."
                loadingState={<EditorLoadingState />}
                errorState={<EditorErrorState onBackToStory={navigateToStory} />}
                emptyState={<EditorEmptyState onBackToStory={navigateToStory} />}
            >
                {(chapterData) => (
                    <>
                        <div className={styles['back-to-stories-container']}>
                            <button 
                                onClick={() => router.push(`/stories/${storyId}`)}
                                className={styles['back-to-story-button']}
                            >
                                ← Back to story page
                            </button>
                        </div>
                        {user?.id && (
                            <>
                                <ChapterNavHeader 
                                    {...toChapterNavHeaderProps(storyId, chapterId, chapterData)}
                                    onShowErrorToast={onShowErrorToast}
                                />
                                <TipTapEditor
                                    {...toTipTapEditorProps(storyId, chapterId, chapterData, isUpdating, user.id, !edits?.isStale ? edits : null)}
                                    onUpdateAction={handleUpdate}
                                />
                            </>
                        )}
                    </>
                )}
            </AsyncBoundary>
        </div>
    )
}

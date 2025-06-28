'use client'
import LexicalEditor from '@/components/features/LexicalEditor/LexicalEditor'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { useChapters } from '@/app/hooks/useChapters'

export default function Page({ params }) {

    const [storyId, setStoryId] = useState<string>("")
    const [chapterId, setChapterId] = useState<string>("")

    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await Promise.resolve(params)
            const { storyID, chapterID } = resolvedParams
            setStoryId(storyID)
            setChapterId(chapterID)
        }
        resolveParams()
    }, [params])

    const { getChapter } = useChapters(storyId)

    const {
        data: chapter,
        isSuccess,
        isError,
        isLoading
    } = getChapter(chapterId)

    return (
        <div className={styles['content-container']}>
            {isLoading ? (
                <h1>Loading Chapter...</h1>
            ): <LexicalEditor />}
        </div>
    )
}
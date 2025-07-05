import { useRouter } from "next/navigation";
import { ChapterNavHeaderProps } from "@/app/types/interfaces";
import styles from './ChapterNavHeader.module.css'
import { useChapters } from "@/app/hooks/useChapters";
import React, { useEffect, useState } from "react";

export default function ChapterNavHeader({
    storyId,
    chapterTitle,
    chapterId,
    prevChapterId,
    nextChapterId,
}: ChapterNavHeaderProps) {

    const [updatingTitle, setUpdatingTitle] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(chapterTitle)
    const router = useRouter()
    const {
        create,
        isCreating,
        creationError,
        creationSuccess,
        update,
        isUpdating,
        updateError,
        updateSuccess
    } = useChapters(storyId)

    const handleClickNext = () => {
        if (!nextChapterId) {
            create({ 
                title: "Double click to change the title...", 
                content: ""
             })
             return
        }
        router.push(`/chapters/${storyId}/${nextChapterId}`)
    }

    const handleDoubleClick = () => {
        setUpdatingTitle(true)
    }

    const handleOnKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setUpdatingTitle(false)
        }
        if (e.key === "Enter") {
            e.preventDefault();
            setUpdatingTitle(false)
            update({
                chapterId: chapterId,
                requestBody: {
                    title: currentTitle
                }
            })
        }
    }

    useEffect(() => {
        if (creationSuccess && nextChapterId) {
            router.push(`/chapters/${storyId}/${nextChapterId}`)
        }
    }, [creationSuccess, nextChapterId])

    useEffect(() => {
        if (updateSuccess) {
            setUpdatingTitle(false)
        }
    }, [updateSuccess])

    return (
        <div 
            onDoubleClick={handleDoubleClick}
            className={styles['chapter-nav-container']}
        >
            {prevChapterId && (
                <button
                    className={styles['nav-button']}
                    onClick={() => router.push(`/chapters/${storyId}/${prevChapterId}`)}
                >
                    ←
                </button>
            )}
            {updatingTitle ? (
                <input 
                    name="title"
                    onKeyDown={handleOnKeyDown}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentTitle(e.target.value)}
                    value={currentTitle}
                    type="text" 
                />
            ) : (
                <>
                    {isCreating && (<h2>Creating new chapter...</h2>)}
                    {isUpdating && (<h2>Updating title...</h2>)}
                    {(isCreating === false) && (isUpdating === false) && <h2>{chapterTitle}</h2>}
                </>
            )}
            <button
                className={nextChapterId ? styles['nav-button'] : styles['create-button']}
                onClick={handleClickNext}
            >
                {nextChapterId ? "→": "+"}
            </button>
        </div>
    )
}
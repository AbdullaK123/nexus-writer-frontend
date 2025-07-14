import { useRouter } from "next/navigation";
import { ChapterNavHeaderProps } from "@/app/types/interfaces";
import styles from './ChapterNavHeader.module.css'
import { useChapters } from "@/app/hooks/useChapters";
import React, { useEffect, useState, useCallback } from "react";

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
        createdChapter, // Add this to get the created chapter data
        update,
        isUpdating,
        updateError,
        updateSuccess
    } = useChapters(storyId)

    const handleClickNext = useCallback(() => {
        if (!nextChapterId) {
            create({ 
                title: "Double click to change the title...", 
                content: ""
             })
             return
        }
        router.push(`/chapters/${storyId}/${nextChapterId}`)
    }, [router, nextChapterId, storyId, create])

     // Navigate to next chapter (keyboard shortcut only)
    const handleNavigateNext = useCallback(() => {
        if (nextChapterId) {
            router.push(`/chapters/${storyId}/${nextChapterId}`)
        }
        // If no next chapter, do nothing for keyboard shortcut
    }, [router, nextChapterId, storyId])

    // Navigate to previous chapter (keyboard shortcut only)
    const handleNavigatePrev = useCallback(() => {
        if (prevChapterId) {
            router.push(`/chapters/${storyId}/${prevChapterId}`)
        }
    }, [router, prevChapterId, storyId])

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
        if (creationSuccess && createdChapter?.id) {
            router.push(`/chapters/${storyId}/${createdChapter.id}`)
        }
    }, [creationSuccess, createdChapter?.id, router, storyId])

    useEffect(() => {
        if (updateSuccess) {
            setUpdatingTitle(false)
        }
    }, [updateSuccess])

    useEffect(() => {
        if (creationError) {
            alert('Failed to create chapter. Check server logs')
            return
        }
    }, [creationError])

    useEffect(() => {
        if (updateError) {
            alert('Failed to update chapter. Check server logs')
            return
        }
    }, [updateError])

    useEffect(() => {
        const handleShortcut = (e) => {
             if (e.ctrlKey && e.key === "ArrowRight") {
                e.preventDefault()
                handleNavigateNext()
            }
            if (e.ctrlKey && e.key === "ArrowLeft") {
                e.preventDefault()
                handleNavigatePrev()
            }
        }
        document.addEventListener('keydown', handleShortcut)

        return () => document.removeEventListener('keydown', handleShortcut)
    }, [handleNavigatePrev, handleNavigateNext])

    return (
        <div 
            onDoubleClick={handleDoubleClick}
            className={styles['chapter-nav-container']}
        >
            {prevChapterId && (
                <button
                    className={styles['nav-button']}
                    onMouseEnter={() => router.prefetch(`/chapters/${storyId}/${prevChapterId}`)}
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
                    autoFocus
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
                onMouseEnter={ nextChapterId && (() => router.prefetch(`/chapters/${storyId}/${nextChapterId}`))}
            >
                {nextChapterId ? "→": "+"}
            </button>
        </div>
    )
}
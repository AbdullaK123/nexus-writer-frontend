import { useRouter } from "next/navigation";
import { ChapterNavHeaderProps } from "@/app/types"
import styles from './ChapterNavHeader.module.css'
import { useChapters } from "@/app/hooks/useChapters";
import React, { useEffect, useState, useCallback } from "react";
import { useShortcut } from "@/app/hooks/useShortcut"; // Import the new hook

export default function ChapterNavHeader({
    storyId,
    chapterTitle,
    chapterId,
    prevChapterId,
    nextChapterId,
}: ChapterNavHeaderProps) {
    const [updatingTitle, setUpdatingTitle] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(chapterTitle);
    const router = useRouter();
    const {
        create,
        isCreating,
        creationError,
        creationSuccess,
        createdChapter, 
        update,
        isUpdating,
        updateError,
        updateSuccess
    } = useChapters(storyId);

    // --- Navigation Logic ---
    const handleNavigateNext = useCallback(() => {
        if (nextChapterId) {
            router.push(`/chapters/${storyId}/${nextChapterId}`);
        }
    }, [router, nextChapterId, storyId]);

    const handleNavigatePrev = useCallback(() => {
        if (prevChapterId) {
            router.push(`/chapters/${storyId}/${prevChapterId}`);
        }
    }, [router, prevChapterId, storyId]);

    // ✅ Use the new hook for shortcuts
    useShortcut([
        { key: 'ArrowRight', ctrlKey: true, callback: handleNavigateNext },
        { key: 'ArrowLeft', ctrlKey: true, callback: handleNavigatePrev },
    ]);

    // --- Component Logic ---
    const handleClickNext = () => {
        if (!nextChapterId) {
            create({ title: "Double click to change the title...", content: "" });
        } else {
            handleNavigateNext();
        }
    };

    const handleDoubleClick = () => setUpdatingTitle(true);

    const handleOnKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setUpdatingTitle(false);
        }
        if (e.key === "Enter") {
            e.preventDefault();
            setUpdatingTitle(false);
            update({
                chapterId: chapterId,
                requestBody: { title: currentTitle }
            });
        }
    };

    // --- Effects ---
    useEffect(() => {
        if (creationSuccess && createdChapter?.id) {
            router.push(`/chapters/${storyId}/${createdChapter.id}`);
        }
    }, [creationSuccess, createdChapter?.id, router, storyId]);

    useEffect(() => {
        if (updateSuccess) setUpdatingTitle(false);
    }, [updateSuccess]);

    useEffect(() => {
        if (creationError) alert('Failed to create chapter. Check server logs');
    }, [creationError]);

    useEffect(() => {
        if (updateError) alert('Failed to update chapter. Check server logs');
    }, [updateError]);

    // The old useEffect for shortcuts has been removed.

    return (
        <div 
            onDoubleClick={handleDoubleClick}
            className={styles['chapter-nav-container']}
        >
            {prevChapterId && (
                <button
                    className={styles['nav-button']}
                    onMouseEnter={() => router.prefetch(`/chapters/${storyId}/${prevChapterId}`)}
                    onClick={handleNavigatePrev}
                >
                    ←
                </button>
            )}
            {updatingTitle ? (
                <input 
                    name="title"
                    onKeyDown={handleOnKeyDown}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    value={currentTitle}
                    type="text" 
                    autoFocus
                />
            ) : (
                <>
                    {isCreating && (<h2>Creating new chapter...</h2>)}
                    {isUpdating && (<h2>Updating title...</h2>)}
                    {!isCreating && !isUpdating && <h2>{chapterTitle}</h2>}
                </>
            )}
            <button
                className={nextChapterId ? styles['nav-button'] : styles['create-button']}
                onClick={handleClickNext}
                onMouseEnter={nextChapterId ? () => router.prefetch(`/chapters/${storyId}/${nextChapterId}`) : undefined}
            >
                {nextChapterId ? "→" : "+"}
            </button>
        </div>
    );
}
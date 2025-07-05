import { ChapterListItemProps } from "@/app/types/interfaces";
import styles from './ChapterListItem.module.css'
import ChapterContextMenu from "../ChapterContextMenu/ChapterContextMenu";
import { useContextMenu } from "@/app/hooks/useContextMenu";
import { useChapters } from "@/app/hooks/useChapters"; 
import React, { useState, useEffect, useRef } from "react";

export default function ChapterListItem({
    storyId,
    id,
    chapterNumber,
    title,
    wordCount,
    handleOnClick,
    handleClearSelection,
    status
}: ChapterListItemProps) {

    const { menu, openMenu, closeMenu } = useContextMenu()
    const { 
        deleteChapter,
        isDeleting,
        deleteError,
        deleteSuccess,
        update,
        isUpdating,
        updateError,
        updateSuccess
    } = useChapters(storyId)
    const [updatingTitle, setUpdatingTitle] = useState(false)
    const [chapterTitle, setChapterTitle] = useState(title)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (updatingTitle) {
            inputRef.current?.focus()
            inputRef.current?.select()
        }
    }, [updatingTitle])

    useEffect(() => {
        if (updateSuccess) {
            setUpdatingTitle(false)
            handleOnClick()
        }
    }, [updateSuccess])

    useEffect(() => {
        if (deleteSuccess) {
            handleClearSelection()
        }
    }, [deleteSuccess])

    const getBadgeCss = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === 'published') return 'published-chapter-number-badge';
        if (normalizedStatus === 'draft') return 'draft-chapter-number-badge';
        return 'outline-chapter-number-badge';
    }

    const getStatusIndicatorClass = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === 'published') return 'published';
        if (normalizedStatus === 'draft') return 'draft';
        return 'outline';
    }

    const formatWordCount = (count: number) => {
        if (count === 0) return '0 words';
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k words`;
        return `${count} words`;
    }

    const handleOnAction = (action: string) => {
        if (action !== 'delete') return;
        deleteChapter(id)
        closeMenu()
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterTitle(e.target.value)
    }

    const handleOnDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setUpdatingTitle(true)
    }

    const handleOnEnterDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            update({ chapterId: id, requestBody: { title: chapterTitle} })
        }
         if (e.key === "Escape") {
            setUpdatingTitle(false)
            setChapterTitle(title) // Reset to original
        }
    }

    return (
        <div onClick={closeMenu}>
            <div 
                onClick={handleOnClick} 
                className={`${styles['chapter-list-item-container']} ${menu.visible && styles['no-hover']}`}
                onContextMenu={openMenu}
                onDoubleClick={handleOnDoubleClick}
            > 
                <div className={`${styles['status-indicator']} ${styles[getStatusIndicatorClass(status)]}`} />
                <div className={styles['chapter-metadata-container']}> 
                    <span className={`${styles['chapter-number-badge']} ${styles[getBadgeCss(status)]}`}>
                        {chapterNumber}
                    </span>
                    <div className={styles['flex-col-container']}>
                        {updatingTitle ? (
                            <input 
                                ref={inputRef}
                                name="title"
                                type="text"
                                value={chapterTitle}
                                onChange={handleOnChange}
                                onKeyDown={handleOnEnterDown}
                            />
                        ): <h3>{title}</h3>}
                        {isUpdating && (<h3>Updating Title...</h3>)}
                        {isDeleting && (<h3>Deleting Chapter...</h3>)}
                        <div className={styles['chapter-stats']}>
                            <span>{formatWordCount(wordCount)}</span>
                            <span>{status}</span>
                        </div>
                    </div>
                </div>
                <div className={styles['arrow-icon']}>
                    →
                </div>
            </div>
            {menu.visible && (
                <ChapterContextMenu 
                    x={menu.x}
                    y={menu.y}
                    onClose={closeMenu}
                    onAction={handleOnAction}
                />
            )}
        </div>
    )
}
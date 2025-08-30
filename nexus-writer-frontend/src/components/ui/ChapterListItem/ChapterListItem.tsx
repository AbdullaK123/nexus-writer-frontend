import { ChapterListItemProps } from "@/app/types"
import styles from './ChapterListItem.module.css'
import ContextMenu from "../ContextMenu/ContextMenu";
import { useContextMenu } from "@/app/hooks/useContextMenu";
import { useChapters } from "@/app/hooks/useChapters"; 
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "@/app/hooks/useInView";
import { getStatusIndicatorClass, getBadgeCss, formatWordCount } from "@/app/lib/utils";


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
    const [isInView, elementRef] = useInView(1)

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

    useEffect(() => {
        if (!isInView) {
            closeMenu()
        }
    }, [isInView])

    useEffect(() => {
        if (updateError) {
            alert(`Failed to update chapter. Check server logs.`)
            return
        }
    }, [updateError])

    useEffect(() => {
        if (deleteError) {
            alert('Failed to delete chapter. Check server logs.')
            return
        }
    }, [deleteError])

    const handleOnAction = (action: string) => {
        if (action !== 'delete') return;
        deleteChapter(id)
        closeMenu()
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterTitle(e.target.value)
    }

    const handleOnDoubleClick = () => {
        setUpdatingTitle(true)
    }

    const handleOnEnterDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            setUpdatingTitle(false)
            update({ chapterId: id, requestBody: { title: chapterTitle} })
        }
        if (e.key === "Escape") {
            setUpdatingTitle(false)
            setChapterTitle(title) 
        }
    }

    return (
        <div
            ref={elementRef} 
            onClick={closeMenu}
        >
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
                        ): (isUpdating === false) && (isDeleting === false) && <h3>{title}</h3>}
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
                <ContextMenu 
                    x={menu.x}
                    y={menu.y}
                    onClose={closeMenu}
                    onAction={handleOnAction}
                />
            )}
        </div>
    )
}
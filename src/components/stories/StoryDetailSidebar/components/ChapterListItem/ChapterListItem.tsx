'use client'
import { ChapterListItemProps } from "./types";
import styles from './ChapterListItem.module.css';
import { ChapterListItemContextMenu } from "./components/ChapterListItemContextMenu";
import { ContextMenuRoot, ContextMenuTrigger } from "@/components/common/ContextMenu";
import { getStatusIndicatorClass, getBadgeCss, formatWordCount } from "@/compatability/formatters";
import { useChapterTitleActions } from "@/features/chapters/hooks/useChapterTitleActions";
import React, { useRef, useEffect } from "react";
import { Input } from "@/components/common/Input";

export default function ChapterListItem({
    storyId,
    id,
    chapterNumber,
    title,
    wordCount,
    handleOnClick,
    handleClearSelection,
    status,
}: ChapterListItemProps) {

    const {
        isEditingTitle,
        titleValue,
        setTitleValue,
        containerRef,
        isUpdating,
        isDeleting,
        handleOnAction,
        handleTitleDoubleClick,
        handleTitleKeyDown
    } = useChapterTitleActions(
        storyId, 
        id, 
        title, 
        handleOnClick, 
        handleClearSelection
    );
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus the input when editing starts
    useEffect(() => {
        if (isEditingTitle) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditingTitle]);

    return (
        <ContextMenuRoot>
            <ContextMenuTrigger asChild>
                <div ref={containerRef as React.RefObject<HTMLDivElement>}>
                    <div 
                        onClick={handleOnClick} 
                        className={styles['chapter-list-item-container']}
                        onDoubleClick={handleTitleDoubleClick}
                    > 
                        <div className={`${styles['status-indicator']} ${styles[getStatusIndicatorClass(status)]}`} />
                        <div className={styles['chapter-metadata-container']}> 
                            <span className={`${styles['chapter-number-badge']} ${styles[getBadgeCss(status)]}`}>
                                {chapterNumber}
                            </span>
                            <div className={styles['flex-col-container']}>
                                {isEditingTitle ? (
                                    <Input 
                                        ref={inputRef}
                                        name="title"
                                        type="text"
                                        value={titleValue}
                                        onChange={(e) => setTitleValue(e.target.value)}
                                        onKeyDown={handleTitleKeyDown}
                                    />
                                ) : (
                                <>
                                    {isUpdating && <h3>Updating Title...</h3>}
                                    {isDeleting && <h3>Deleting Chapter...</h3>}
                                    {!isUpdating && !isDeleting && <h3>{title}</h3>}
                                </>
                                )}
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
                </div>
            </ContextMenuTrigger>
            <ChapterListItemContextMenu 
                status={status}
                onDelete={() => handleOnAction('delete')}
            />
        </ContextMenuRoot>
    );
}
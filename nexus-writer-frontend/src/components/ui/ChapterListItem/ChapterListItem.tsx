import { ChapterListItemProps } from "@/app/types";
import styles from './ChapterListItem.module.css';
import { ChapterListItemContextMenu } from "../ChapterListItemContextMenu";
import { useInView } from "@/app/hooks/useInView";
import { getStatusIndicatorClass, getBadgeCss, formatWordCount } from "@/app/lib/utils";
import { useChapterTitleActions } from "@/app/hooks/useChapterTitleActions";
import React, { useCallback, useRef, useEffect } from "react";
import { Input } from "@/components/ui/Input";

export default function ChapterListItem({
    storyId,
    id,
    chapterNumber,
    title,
    wordCount,
    handleOnClick,
    handleClearSelection,
    status,
    contextMenuRef
}: ChapterListItemProps) {

    const {
        menu,
        openMenu,
        closeMenu,
        isEditingTitle,
        titleValue,
        setTitleValue,
        containerRef, // From useEditable
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

    const handleOnOpenContextMenu = (e: React.MouseEvent) => {
        if (contextMenuRef.current && contextMenuRef.current.menuIsOpen && contextMenuRef.current.chapterId !== id) {
            return
        }
        contextMenuRef.current = {
            menuIsOpen: true,
            chapterId: id
        }
        openMenu(e)
    }

    const handleOnCloseContextMenu = () => {
        closeMenu()
        contextMenuRef.current = {
            menuIsOpen: false,
            chapterId: null
        }
    }

    const { elementRef } = useInView(1, handleOnCloseContextMenu);

    const combinedRef = useCallback((node: HTMLDivElement) => {
        elementRef.current = node;
        (containerRef as React.RefObject<HTMLDivElement>).current = node;
    }, [elementRef, containerRef]);

    return (
        <>
            <div ref={combinedRef}>
                <div 
                    onClick={handleOnClick} 
                    className={`${styles['chapter-list-item-container']} ${menu.visible && styles['no-hover']}`}
                    onContextMenu={handleOnOpenContextMenu}
                    onDoubleClick={handleTitleDoubleClick} // Use the handler from the hook
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
                                    value={titleValue} // Use value from the hook
                                    onChange={(e) => setTitleValue(e.target.value)} // Use setter from the hook
                                    onKeyDown={handleTitleKeyDown} // Use the handler from the hook
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
            {menu.visible && (
                <ChapterListItemContextMenu 
                    isOpen={menu.visible}
                    x={menu.x}
                    y={menu.y}
                    status={status}
                    onClose={handleOnCloseContextMenu}
                    onDelete={() => handleOnAction('delete')}
                />
            )}
        </>
    );
}
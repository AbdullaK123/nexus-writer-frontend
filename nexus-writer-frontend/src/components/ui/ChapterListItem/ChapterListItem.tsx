import { ChapterListItemProps } from "@/app/types";
import styles from './ChapterListItem.module.css';
import ContextMenu from "../ContextMenu/ContextMenu";
import { useInView } from "@/app/hooks/useInView";
import { getStatusIndicatorClass, getBadgeCss, formatWordCount } from "@/app/lib/utils";
import { useChapterTitleActions } from "@/app/hooks/useChapterTitleActions";
import React, { useCallback, useRef, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Trash2 } from "lucide-react"
import { Button } from "../Button";

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

    const { elementRef } = useInView(1, closeMenu);
    const inputRef = useRef<HTMLInputElement>(null);

    // This callback ref assigns the DOM node to both refs
    const combinedRef = useCallback((node: HTMLDivElement) => {
        elementRef.current = node;
        (containerRef as React.RefObject<HTMLDivElement>).current = node;
    }, [elementRef, containerRef]);

    // Focus the input when editing starts
    useEffect(() => {
        if (isEditingTitle) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditingTitle]);

    return (
        <div ref={combinedRef}>
            <div 
                onClick={handleOnClick} 
                className={`${styles['chapter-list-item-container']} ${menu.visible && styles['no-hover']}`}
                onContextMenu={openMenu}
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
            {menu.visible && (
                <ContextMenu 
                    x={menu.x}
                    y={menu.y}
                    onClose={closeMenu}
                >
                    <Button
                        variant="secondary"
                        onClick={() => handleOnAction('delete')}
                    >
                        <Trash2 size={20} color={"#ff0000"}  />
                        Delete
                    </Button>
                </ContextMenu>
            )}
        </div>
    );
}
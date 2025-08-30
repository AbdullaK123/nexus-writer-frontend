import { ChapterListItemProps } from "@/app/types"
import styles from './ChapterListItem.module.css'
import ContextMenu from "../ContextMenu/ContextMenu";
import { useInView } from "@/app/hooks/useInView";
import { getStatusIndicatorClass, getBadgeCss, formatWordCount } from "@/app/lib/utils";
import { useChapterTitleActions } from "@/app/hooks/useChapterTitleActions";


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
        chapterTitle,
        updatingTitle,
        inputRef,
        isUpdating,
        isDeleting,
        handleOnChange,
        handleOnAction,
        handleOnDoubleClick,
        handleOnEnterDown
    } = useChapterTitleActions(
        storyId, 
        id, 
        title, 
        handleOnClick, 
        handleClearSelection
    )
    const { elementRef } = useInView(1, closeMenu)
    
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
                        ): (isUpdating === false) && 
                           (isDeleting === false) && 
                           <h3>{title}</h3>
                        }
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
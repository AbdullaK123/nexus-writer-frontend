'use client'
import { StoryCardProps } from "@/app/types";
import styles from './StoryCard.module.css'
import EditableStoryTitle from "../EditableTitle/EditableTitle";
import EditableStatus from "../EditableStatus/EditableStatus";
import ContextMenu from '../ContextMenu/ContextMenu'
import { formatWordCountStory, getDuration } from "@/app/lib/utils";
import { useStoryNavigation } from "@/app/hooks/useStoryNavigation";
import { useStoryContextMenuActions } from "@/app/hooks/useStoryContextMenuActions";


export default function StoryCard({ 
    id,
    latestChapterId,
    title, 
    status, 
    createdAt, 
    updatedAt,
    totalChapters,
    wordCount,
    latestChapter
 }: StoryCardProps) {

    const {
        getBtnProps
    } = useStoryNavigation(id, latestChapterId)

    const {
        menu,
        openMenu,
        closeMenu,
        containerRef,
        isDeleting,
        handleOnAction,
        elementRef
    } = useStoryContextMenuActions(id)

    return (
        <div ref={containerRef}>
             <div 
                ref={elementRef}
                onContextMenu={(e: React.MouseEvent) => openMenu(e)}
                className={`${styles['story-card-container']} ${menu.visible && styles['no-hover']}`}
            >
                {isDeleting ? (
                    <h2>Deleting story...</h2>
                ) : (
                    <EditableStoryTitle 
                        storyId={id}
                        title={title}
                    />  
                )}
                <div className={styles['metadata-row']}>
                    <div className={styles['status-row']}>
                        <EditableStatus 
                            storyId={id}
                            status={status}
                        />
                        <div className={styles['dates-container']}>
                            <p>Created {getDuration(createdAt)}</p>
                            <p>Updated {getDuration(updatedAt)}</p>
                        </div>
                    </div>
                </div>

                <div className={styles['story-stats-container']}>
                    <p>Chapters: {totalChapters || 0}</p>
                    <p>Words: {formatWordCountStory(wordCount)}</p>
                    <p>{latestChapter}</p>
                </div>

                <div className={styles['actions-container']}>
                    {getBtnProps(status).map((prop, key) => (
                        <button 
                            key={key} 
                            className={prop.css}
                            onClick={prop.onClick}
                            onMouseEnter={prop.onMouseEnter}
                        >
                            {prop.text}
                        </button>
                    ))}
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
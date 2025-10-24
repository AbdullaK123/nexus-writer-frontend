'use client'
import { StoryCardProps } from "@/app/types";
import styles from './StoryCard.module.css'
import EditableStoryTitle from "../EditableTitle/EditableTitle";
import EditableStatus from "../EditableStatus/EditableStatus";
import { StoryCardContextMenu } from '../StoryCardContextMenu'
import { formatWordCountStory, getDuration } from "@/app/lib/utils";
import { useStoryNavigation } from "@/app/hooks/useStoryNavigation";
import { useStoryContextMenuActions } from "@/app/hooks/useStoryContextMenuActions";
import { Button } from "@/components/ui/Button";
import React from "react";


export default function StoryCard({ 
    id,
    latestChapterId,
    title, 
    status, 
    createdAt, 
    updatedAt,
    totalChapters,
    wordCount,
    latestChapter,
    contextMenuRef
 }: StoryCardProps) {

    const {
        getBtnProps
    } = useStoryNavigation(id, latestChapterId)

    const {
        menu,
        openMenu,
        closeMenu,
        isDeleting,
        handleOnAction
    } = useStoryContextMenuActions(id)

    const handleOnOpenContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        if (contextMenuRef.current && contextMenuRef.current.menuIsOpen && contextMenuRef.current.storyId !== id) {
            return
        }
        contextMenuRef.current = {
            menuIsOpen: true,
            storyId: id
        }
        openMenu(e)
    }

    const handleOnCloseContextMenu = () => {
        closeMenu()
        contextMenuRef.current = {
            menuIsOpen: false,
            storyId: null
        }
    }

    return (
        <>
             <div 
                onContextMenu={handleOnOpenContextMenu}
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
                        <Button 
                            key={key} 
                            variant={prop.variant}
                            onClick={prop.onClick}
                            onMouseEnter={prop.onMouseEnter}
                        >
                            {prop.text}
                        </Button>
                    ))}
                </div>
            </div>
            {menu.visible && (
                <StoryCardContextMenu 
                    isOpen={menu.visible}
                    x={menu.x}
                    y={menu.y}
                    onClose={handleOnCloseContextMenu}
                    onDelete={() => handleOnAction('delete')}
                />
            )}
        </>
    )
}
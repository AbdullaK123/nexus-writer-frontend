'use client'
import { StoryCardProps } from "./types";
import styles from './StoryCard.module.css'
import EditableStoryTitle from "./components/EditableTitle/EditableTitle";
import EditableStatus from "./components/EditableStatus/EditableStatus";
import { StoryCardContextMenu } from './components/StoryCardContextMenu'
import { ContextMenuRoot, ContextMenuTrigger } from '@/components/common/ContextMenu'
import { formatWordCountStory } from "./utils";
import { getDuration } from "@/compatability/formatters";
import { useStoryNavigation } from "@/features/stories/hooks/useStoryNavigation";
import { useStoryContextMenuActions } from "@/features/stories/hooks/useStoryContextMenuActions";
import { Button } from "@/components/common/Button";
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
 }: StoryCardProps) {

    const {
        getBtnProps,
    } = useStoryNavigation(id, latestChapterId)

    const {
        isDeleting,
        handleOnAction
    } = useStoryContextMenuActions(id)

    return (
        <ContextMenuRoot>
            <ContextMenuTrigger asChild>
                <div 
                    className={styles['story-card-container']}
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
            </ContextMenuTrigger>
            <StoryCardContextMenu 
                onDelete={() => handleOnAction('delete')}
            />
        </ContextMenuRoot>
    )
}
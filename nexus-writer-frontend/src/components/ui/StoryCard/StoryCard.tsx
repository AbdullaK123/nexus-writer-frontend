'use client'
import { StoryCardProps } from "@/app/types/interfaces";
import styles from './StoryCard.module.css'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from "next/navigation";
import EditableStoryTitle from "../EditableTitle/EditableTitle";
import EditableStatus from "../EditableStatus/EditableStatus";
import { useContextMenu } from "@/app/hooks/useContextMenu";
import ContextMenu from '../ContextMenu/ContextMenu'
import { useStories } from "@/app/hooks/useStories";
import React, { useEffect } from "react";
import { useInView } from "@/app/hooks/useInView";


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

    const router = useRouter()
    const {menu, openMenu, closeMenu} = useContextMenu()
    const [isInView, elementRef] = useInView(1)
    const {
        deleteStory,
        isDeleting,
        isDeleted,
        deleteError
    } = useStories()

    useEffect(() => {
        if (deleteError) {
            alert('Failed to delete story. Check server logs')
            return
        }
    }, [deleteError])

    useEffect(() =>  {
        if (!isInView) {
            closeMenu()
        }
    }, [isInView])

    const goToStoryPage = () => {
        router.push(`/stories/${id}`)
    }

    const getDuration = (date: Date) => {
        return formatDistanceToNow(date, { addSuffix: true })
    }

    const formatWordCount = (count: number | undefined) => {
        if (!count) return 0;

        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`
        }
        return count.toString()
    }

    const goToLatestChapter = () => {
        if (latestChapterId) {
            router.push(`/chapters/${id}/${latestChapterId}`)
        }
    }

    const handlePrefetch = () => {
        if (latestChapterId) {
            console.log('🚀 Prefetching chapter:', latestChapterId)
            router.prefetch(`/chapters/${id}/${latestChapterId}`)
        }
    }

    const getBtnProps = (status: string) => {
        switch (status) {
            case 'Complete':
                return [
                    { text: 'Read', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'Chapters', css: 'btn-primary', onClick: goToStoryPage, onMouseEnter: undefined},
                    { text: 'Sequel', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'Publish', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined}
                ]
            case 'On Hiatus':
                return [
                    { text: 'Resume', css: 'btn-primary', onClick: goToLatestChapter, onMouseEnter: handlePrefetch },
                    { text: 'Outline', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'Research', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'AI', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined }
                ]
            default:
                return [
                    { text: 'Continue', css: 'btn-primary', onClick: goToLatestChapter, onMouseEnter: handlePrefetch },
                    { text: 'Chapters', css: 'btn-secondary', onClick: goToStoryPage, onMouseEnter: undefined },
                    { text: 'Settings', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'AI', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined  }
                ]
        }
    }

    const handleOnAction = (action: string) => {
        if (action === 'delete') {
            deleteStory(id)
            closeMenu()
        }
    }
    
    const handleOnClick = (e) => {
        if (elementRef.current && !elementRef.current.contains(e.target)) {
            closeMenu()
        }
    }

    return (
        <div 
            onClick={handleOnClick}
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
                <p>Words: {formatWordCount(wordCount)}</p>
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
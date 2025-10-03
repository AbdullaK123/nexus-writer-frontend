'use client'
import styles from './ChapterPreview.module.css'
import { ChapterPreviewProps } from '@/app/types'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useChapters } from '@/app/hooks/useChapters'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function ChapterPreview({ 
    id,
    title,
    status,
    wordCount,
    updatedAt,
    previewContent,
    storyId,
    onStatusUpdate
}: ChapterPreviewProps) {

    const router = useRouter()
    const {
        update,
        isUpdating,
        updateError,
        updateSuccess
    } = useChapters(storyId)

    useEffect(() => {
        if (updateError) {
            alert('Failed to publish / unpublish chapter. Check server logs')
            return
        }
    }, [updateError])

    useEffect(() => {
        if (updateSuccess) {
            alert('Successfully published / unpublished chapter.')
            onStatusUpdate()
        }
    }, [updateSuccess])

    const getReadingTime = (wordCount : number) => {
        const minutes = Math.round(wordCount / 200); // 200 WPM average
        return minutes === 0 ? '< 1 min' : `${minutes} min`;
    }

    const getDuration = (date: Date) => {
        return formatDistanceToNow(date, { addSuffix: true })
    }

    const getStatusClass = (status : string) => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === 'published') return 'published';
        if (normalizedStatus === 'draft') return 'draft';
        return 'outline';
    }

    const formatWordCount = (count: number) => {
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    }

    const handlePublish = () => {
        if (previewContent) {
            update({
                chapterId: id,
                requestBody: {
                    published: true
                }
            })
        }
    }

    const handleUnpublish = () => {
        if (previewContent) {
            update({
                chapterId: id,
                requestBody: {
                    published: false
                }
            })
        }
    }

    const getActionButtons = () => {

        const baseButtons = [
            { text: 'Edit Chapter', variant: 'primary' as const, onclick: () => router.push(`/chapters/${storyId}/${id}`) },
            { text: 'Chapter Settings', variant: 'secondary' as const, onclick: () => {} }
        ];

        if (status && status.toLowerCase() === 'published') {
            return [...baseButtons, {
                text: isUpdating ? 'Unpublishing...' : 'Unpublish', 
                variant: 'secondary' as const, 
                onclick: handleUnpublish
            }];
        } else {
            return [...baseButtons, { 
                text: isUpdating? 'Publishing...': 'Publish' , 
                variant: 'primary' as const, 
                onclick: handlePublish
             }];
        }
    }

    return (
        <div className={styles['chapter-preview-container']}>
            <div className={styles['chapter-header']}>
                <h2 className={`${styles['chapter-title']} ${status && styles[getStatusClass(status)]}`}>
                    {title}
                </h2>
                <div className={styles['chapter-metadata']}>
                    <div className={`${styles['metadata-item']} ${styles['word-count']}`}>
                        {wordCount && formatWordCount(wordCount)} words
                    </div>
                    <div className={`${styles['metadata-item']} ${styles['reading-time']}`}>
                        {wordCount && getReadingTime(wordCount)} read
                    </div>
                    <div className={`${styles['metadata-item']} ${styles['last-edited']}`}>
                        {updatedAt && getDuration(updatedAt)}
                    </div>
                    <div className={`${styles['metadata-item']} ${styles['status']}`}>
                        {status}
                    </div>
                </div>
            </div>

            <div className={styles['chapter-content-container']}>
                {previewContent ? (
                    <div className={styles['chapter-content']}>
                        {previewContent}
                    </div>
                ) : (
                    <div className={styles['empty-content']}>
                        No content available
                    </div>
                )}
            </div>

            <div className={styles['chapter-actions']}>
                {getActionButtons().map((button, index) => (
                    <Button 
                        key={index} 
                        variant={button.variant}
                        onClick={button.onclick}
                    >
                        {button.text}
                    </Button>
                ))}
            </div>
        </div>
    )
}
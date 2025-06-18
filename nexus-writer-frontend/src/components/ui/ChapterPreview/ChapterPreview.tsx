// src/components/ui/ChapterPreview/ChapterPreview.tsx
import styles from './ChapterPreview.module.css'
import { ChapterPreviewProps } from '@/app/types/interfaces'
import { formatDistanceToNow } from 'date-fns'

export default function ChapterPreview({ 
    title,
    status,
    wordCount,
    updatedAt,
    previewContent
}: ChapterPreviewProps) {

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

    const getActionButtons = () => {
        const baseButtons = [
            { text: 'Edit Chapter', class: 'btn-primary' },
            { text: 'Chapter Settings', class: 'btn-secondary' }
        ];

        if (status.toLowerCase() === 'published') {
            return [...baseButtons, { text: 'Unpublish', class: 'btn-secondary' }];
        } else {
            return [...baseButtons, { text: 'Publish', class: 'btn-primary' }];
        }
    }

    return (
        <div className={styles['chapter-preview-container']}>
            <div className={styles['chapter-header']}>
                <h2 className={`${styles['chapter-title']} ${styles[getStatusClass(status)]}`}>
                    {title}
                </h2>
                <div className={styles['chapter-metadata']}>
                    <div className={`${styles['metadata-item']} ${styles['word-count']}`}>
                        {formatWordCount(wordCount)} words
                    </div>
                    <div className={`${styles['metadata-item']} ${styles['reading-time']}`}>
                        {getReadingTime(wordCount)} read
                    </div>
                    <div className={`${styles['metadata-item']} ${styles['last-edited']}`}>
                        {getDuration(updatedAt)}
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
                    <button 
                        key={index} 
                        className={button.class}
                    >
                        {button.text}
                    </button>
                ))}
            </div>
        </div>
    )
}
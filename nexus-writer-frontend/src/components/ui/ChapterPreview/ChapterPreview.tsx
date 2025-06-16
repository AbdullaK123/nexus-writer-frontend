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
        return Math.round(wordCount / 200) // assuming 200wpm is the average reading speed
    }

    const getDuration = (date: Date) => {
        return formatDistanceToNow(date, { addSuffix: true })
    }

    const getStatusColor = (status : string) => {
        if (status.toLowerCase() === 'published') return 'published-text';
        if (status.toLowerCase() === 'in progress') return 'in-progress-text';
        return 'outline-text';
    }


    return (
        <div className={styles['flex-col-container']}>
            <h2 className={getStatusColor(status)}>{title}-{status}</h2>
            <p>
                {wordCount} words - {getReadingTime(wordCount)} min read - Last Edited {getDuration(updatedAt)} - {status}
            </p>
            <div className={styles['chapter-content-container']}>
                {previewContent}
            </div>
            <div className={styles['flex-row-container']}>
                <button>Edit Chapter</button>
                <button>Chapter Settings</button>
                <button>Publish / Unpublish</button>
            </div>
        </div>
    )
}
'use client'
import { StoryCardProps } from "@/app/types/interfaces";
import styles from './StoryCard.module.css'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from "next/navigation";
import { useStories } from "@/app/hooks/useStories";

export default function StoryCard({ 
    id,
    title, 
    status, 
    createdAt, 
    updatedAt,
    totalChapters,
    wordCount,
    latestChapter
 }: StoryCardProps) {

    const router = useRouter()

    const goToStoryPage = () => {
        router.push(`/stories/${id}`)
    }

    const getStatusSpan = (status: string) => {
        const baseClass = styles['status-badge'];
        
        switch(status) {
            case 'Complete':
                return <span className={`${baseClass} ${styles['completed-span']}`}>Complete</span>
            case 'On Hiatus':
                return <span className={`${baseClass} ${styles['onhaitus-span']}`}>On Hiatus</span>
            default:
                return <span className={`${baseClass} ${styles['ongoing-span']}`}>Ongoing</span>
        }
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

    const getBtnProps = (status: string) => {
        switch (status) {
            case 'Complete':
                return [
                    { text: 'Read', css: 'btn-secondary', onClick: undefined },
                    { text: 'Chapters', css: 'btn-primary', onClick: goToStoryPage },
                    { text: 'Sequel', css: 'btn-secondary', onClick: undefined },
                    { text: 'Publish', css: 'btn-secondary', onClick: undefined }
                ]
            case 'On Hiatus':
                return [
                    { text: 'Resume', css: 'btn-primary', onClick: undefined },
                    { text: 'Outline', css: 'btn-secondary', onClick: undefined },
                    { text: 'Research', css: 'btn-secondary', onClick: undefined },
                    { text: 'AI', css: 'btn-secondary', onClick: undefined }
                ]
            default:
                return [
                    { text: 'Continue', css: 'btn-primary', onClick: undefined },
                    { text: 'Chapters', css: 'btn-secondary', onClick: goToStoryPage },
                    { text: 'Settings', css: 'btn-secondary', onClick: undefined },
                    { text: 'AI', css: 'btn-secondary', onClick: undefined }
                ]
        }
    }

    return (
        <div className={styles['story-card-container']}>
            <h2>{title}</h2>
            
            <div className={styles['metadata-row']}>
                <div className={styles['status-row']}>
                    {getStatusSpan(status)}
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
                    >
                        {prop.text}
                    </button>
                ))}
            </div>
        </div>
    )
}
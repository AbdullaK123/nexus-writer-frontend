import { StoryCardProps } from "@/app/types/interfaces";
import styles from './StoryCard.module.css'
import { formatDistanceToNow } from 'date-fns'


export default function StoryCard({ 
    title, 
    status, 
    createdAt, 
    updatedAt,
    totalChapters,
    wordCount,
    latestChapter
 }: StoryCardProps) {

    const getStatusSpan = (status : string) => {
        switch(status) {
            case 'Complete':
                return <span className={styles['completed-span']}>Complete</span>
            case 'On Haitus':
                return <span className={styles['haitus-span']}>On Haitus</span>
            default:
                return <span className={styles['ongoing-span']}>Ongoing</span>
        }
    }

    const getDuration = (date: Date) => {
        return formatDistanceToNow(date, {addSuffix: true})
    }

    const getBtnProps = (status : string) => {
        switch (status) {
            case 'Complete':
                return [
                    {
                        text: 'Read',
                        css: 'btn-secondary'
                    },
                    {
                        text: 'Chapters',
                        css: 'btn-primary'
                    },
                    {
                        text: 'Sequel',
                        css: 'btn-secondary'
                    },
                    {
                        text: 'Publish',
                        css: 'btn-secondary'
                    }
                ]
            case 'On Haitus':
                return [
                    {
                        text: 'Resume',
                        css: 'btn-primary'
                    },
                    {
                        text: 'Outline',
                        css: 'btn-secondary'
                    },
                    {
                        text: 'Research',
                        css: 'btn-secondary'
                    },
                    {
                        text: 'AI',
                        css: 'btn-secondary'
                    }
                ]
            default:
                return [
                    {
                        text: 'Continue',
                        css: 'btn-primary'
                    },
                    {
                        text: 'Chapters',
                        css: 'btn-secondary'
                    },
                    {
                        text: 'Settings',
                        css: 'btn-secondary'
                    },
                    {
                        text: 'AI',
                        css: 'btn-secondary'
                    }
                ]
        }
    }


    return (
        <div className={styles['story-card-container']}>
            <h2>{title}</h2>
            <div className={styles['flex-row-container']}>
                {getStatusSpan(status)}
                <p>created: {getDuration(createdAt)}</p>
                <p>last updated: {getDuration(updatedAt)}</p>
            </div>
            <div className={styles['story-stats-container']}>
                <p>Chapters: {totalChapters}</p>
                <p>Word Count: {wordCount}</p>
                <p>Latest Chapter: {latestChapter}</p>
            </div>
            <div className={styles['flex-row-container']}>
                {getBtnProps(status).map((prop, key) => {
                    return (
                        <button key={key} className={prop.css}>
                            {prop.text}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
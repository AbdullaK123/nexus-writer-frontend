import { StoryInfoCardProps } from "@/app/types";
import { formatDistanceToNow } from "date-fns";
import styles from './StoryInfoCard.module.css'

export default function StoryInfoCard({
    status,
    totalChapters,
    wordCount,
    updatedAt
} : StoryInfoCardProps) {

    const getStatusClass = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === "complete" || normalizedStatus === "published") return "completed-text";
        if (normalizedStatus === "ongoing" || normalizedStatus === "draft") return "draft-text";
        return "haitus-text";
    }

    const formatWordCount = (wordCount: number) => {
        if (wordCount >= 1000000) {
            return `${(wordCount / 1000000).toFixed(1)}M`;
        }
        if (wordCount >= 1000) {
            return `${(wordCount / 1000).toFixed(1)}k`;
        }
        return wordCount.toString();
    }

    const getDuration = (date: Date) => {
         return formatDistanceToNow(date, { addSuffix: true })
    }

    const getStatusText = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
    
    return (
        <div className={styles['story-info-container']}>
            
            <div className={styles['status-info']}>
                <div className={`${styles['status-badge']} ${styles[getStatusClass(status)]}`}>
                    {getStatusText(status)}
                </div>
                
                <div className={styles['stats-grid']}>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-label']}>Chapters</div>
                        <div className={styles['stat-value']}>{totalChapters}</div>
                    </div>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-label']}>Words</div>
                        <div className={styles['stat-value']}>{formatWordCount(wordCount)}</div>
                    </div>
                </div>
            </div>
            
            <div className={styles['last-updated']}>
                <p>Last Updated {getDuration(updatedAt)}</p>
            </div>
        </div>
    )
}
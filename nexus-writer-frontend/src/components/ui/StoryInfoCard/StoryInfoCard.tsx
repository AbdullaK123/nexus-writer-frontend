import { StoryInfoCardProps } from "@/app/types/interfaces";
import { formatDistanceToNow } from "date-fns";
import styles from './StoryInfoCard.module.css'


export default function StoryInfoCard({
    status,
    totalChapters,
    wordCount,
    updatedAt
} : StoryInfoCardProps) {

    const getTextColor = (status: string) => {
        if (status === "published") return "completed-text";
        if (status === "draft") return "draft-text";
        return "haitus-text";
    }

    const getRoundedWordCount = (wordCount: number) => {
        const roundedCount = Math.round((wordCount/1000)*100)/100
        return `${roundedCount}k words`
    }

    const getDuration = (date: Date) => {
         return formatDistanceToNow(date, { addSuffix: true })
    }
    

    return (
        <div className={styles['story-info-container']}>
            <h3>Story Status</h3>
            <p className={styles[getTextColor(status)]}>
                {status} - {totalChapters} Chapters - {getRoundedWordCount(wordCount)}
            </p>
            <p>
                Last Updated: {getDuration(updatedAt)}
            </p>
        </div>
    )
}
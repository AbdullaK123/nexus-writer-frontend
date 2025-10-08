import {TotalWordsCardProps} from "@/app/types";
import {formatWordCount} from "@/app/lib/utils";
import styles from './TotalWordsCard.module.css'

const getTargetAnnotation = (totalWords: number, quota: number) => {
    const percentage = Math.round((totalWords / quota) * 100)
    if (totalWords >= quota) {
        const overPercentage = percentage - 100
        return {
            text: `+${overPercentage}% above target`,
            status: 'success' as const
        }
    } else {
        return {
            text: `${percentage}% of target`,
            status: percentage >= 75 ? 'warning' : 'error' as const
        }
    }
}

const getProgressPercentage = (totalWords: number, quota: number) => {
    return Math.min((totalWords / quota) * 100, 100)
}

export default function TotalWordsCard({
    totalWords,
    quota
}: TotalWordsCardProps) {
    const annotation = getTargetAnnotation(totalWords, quota)
    const progressPercentage = getProgressPercentage(totalWords, quota)

    return (
        <div className={styles['kpi-card-container']}>
            <div className={styles['card-header']}>
                <span className={styles['card-icon']}>📝</span>
                <h3 className={styles['card-title']}>Total Words</h3>
            </div>
            <div className={styles['card-value']}>
                {formatWordCount(totalWords)}
            </div>
            <div className={styles['progress-bar']}>
                <div 
                    className={`${styles['progress-fill']} ${styles[annotation.status]}`}
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <div className={`${styles['card-annotation']} ${styles[annotation.status]}`}>
                {annotation.text}
            </div>
            <div className={styles['card-target']}>
                Target: {formatWordCount(quota)}
            </div>
        </div>
    )
}
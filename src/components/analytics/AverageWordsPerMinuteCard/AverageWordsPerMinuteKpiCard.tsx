import styles from './AverageWordsPerMinuteKpiCard.module.css'

type AverageWordsPerMinuteCardProps = {
    avgWordsPerMinute: number
}

export default function AverageWordsPerMinuteCard({
    avgWordsPerMinute
}: AverageWordsPerMinuteCardProps) {

    const displayedAverageWordsPerMinute = Math.round(100*avgWordsPerMinute) / 100

    return (
        <div className={styles['kpi-card']}>
            <h3 className={styles['kpi-title']}>Average Words Per Minute</h3>
            <div className={styles['metrics-container']}>
                <span className={styles['kpi-value']}>{displayedAverageWordsPerMinute}</span>
                <span className={styles['kpi-label']}>words per minute</span>
            </div>
        </div>
    )
}
import styles from './AverageWordsPerMinuteCard.module.css';

const getRatingInfo = (wpm: number): { rating: string, emoji: string, color: string } => {
    if (wpm >= 50) return { rating: 'Excellent', emoji: '🚀', color: 'success' }
    if (wpm >= 40) return { rating: 'Great', emoji: '⭐', color: 'success' }
    if (wpm >= 30) return { rating: 'Good', emoji: '👍', color: 'warning' }
    if (wpm >= 20) return { rating: 'Fair', emoji: '📝', color: 'warning' }
    return { rating: 'Getting Started', emoji: '🌱', color: 'info' }
}

export default function AverageWordsPerMinuteCard({ averageWordsPerMinute  }: { averageWordsPerMinute: number}) {
    const wpm = Math.round(averageWordsPerMinute)
    const { rating, emoji, color } = getRatingInfo(wpm)

    return (
        <div className={styles['kpi-card-container']}>
            <div className={styles['card-header']}>
                <span className={styles['card-icon']}>⚡</span>
                <h3 className={styles['card-title']}>Average Speed</h3>
            </div>
            <div className={styles['card-value']}>
                {wpm}
                <span className={styles['card-unit']}>WPM</span>
            </div>
            <div className={`${styles['card-rating']} ${styles[color]}`}>
                <span className={styles['rating-emoji']}>{emoji}</span>
                <span>{rating}</span>
            </div>
            <div className={styles['card-annotation']}>
                Words per minute while writing
            </div>
        </div>
    )
}
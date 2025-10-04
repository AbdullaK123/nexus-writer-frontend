import styles from './AverageWordsPerMinuteCard.module.css';

export default function AverageWordsPerMinuteCard({ averageWordsPerMinute  }: { averageWordsPerMinute: number}) {
    return (
        <div className={styles['kpi-card-container']}>
            <h2>Average Words Per Minute</h2>
            <h1>{averageWordsPerMinute}</h1>
        </div>
    )
}
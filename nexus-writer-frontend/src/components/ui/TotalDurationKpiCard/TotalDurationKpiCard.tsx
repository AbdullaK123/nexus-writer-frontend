import styles from './TotalDurationKpiCard.module.css'

type TotalDurationKpiCard = {
    duration: number;
}

export default function TotalDurationKpiCard({
    duration
}: TotalDurationKpiCard) {

    const displayedDuration = Math.round(100*duration)/100

    return (
        <div className={styles['kpi-card']}>
            <h3 className={styles['kpi-title']}>Total Duration</h3>
            <div className={styles['metrics-container']}>
                <span className={styles['kpi-value']}>{displayedDuration}</span>
                <span className={styles['kpi-label']}>minutes</span>
            </div>
        </div>
    )
}
import styles from './TotalDurationCard.module.css'

const formatDuration = (seconds: number): { value: string, unit: string } => {
    if (seconds < 60) {
        return { value: seconds.toString(), unit: 'seconds' }
    }
    if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60)
        return { value: minutes.toString(), unit: minutes === 1 ? 'minute' : 'minutes' }
    }
    const hours = (seconds / 3600).toFixed(1)
    return { value: hours, unit: parseFloat(hours) === 1 ? 'hour' : 'hours' }
}

const getDurationDetails = (seconds: number): string => {
    if (seconds < 3600) {
        return '' // No additional details for less than an hour
    }
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
}

export default function TotalDurationCard({
    totalDuration
}: {totalDuration: number}) {
    const { value, unit } = formatDuration(totalDuration)
    const details = getDurationDetails(totalDuration)

    return (
        <div className={styles['kpi-card-container']}>
            <div className={styles['card-header']}>
                <span className={styles['card-icon']}>⏱️</span>
                <h3 className={styles['card-title']}>Writing Time</h3>
            </div>
            <div className={styles['card-value']}>
                {value}
                <span className={styles['card-unit']}>{unit}</span>
            </div>
            {details && (
                <div className={styles['card-details']}>
                    {details}
                </div>
            )}
            <div className={styles['card-annotation']}>
                Time spent actively writing
            </div>
        </div>
    )
}
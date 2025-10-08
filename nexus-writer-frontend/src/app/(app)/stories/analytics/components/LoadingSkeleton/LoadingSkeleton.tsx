import styles from './LoadingSkeleton.module.css'

type LoadingSkeletonProps = {
    type: 'kpi' | 'chart' | 'list'
}

export default function LoadingSkeleton({ type }: LoadingSkeletonProps) {
    if (type === 'kpi') {
        return (
            <div className={styles['kpi-skeleton']}>
                <div className={`${styles['skeleton-line']} ${styles['title']}`}></div>
                <div className={`${styles['skeleton-line']} ${styles['value']}`}></div>
                <div className={`${styles['skeleton-line']} ${styles['subtitle']}`}></div>
            </div>
        )
    }

    if (type === 'chart') {
        return (
            <div className={styles['chart-skeleton']}>
                <div className={styles['chart-bars']}>
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className={styles['skeleton-bar']}
                            style={{ height: `${Math.random() * 60 + 40}%` }}
                        ></div>
                    ))}
                </div>
            </div>
        )
    }

    if (type === 'list') {
        return (
            <div className={styles['list-skeleton']}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={styles['list-item-skeleton']}>
                        <div className={`${styles['skeleton-line']} ${styles['list-title']}`}></div>
                        <div className={`${styles['skeleton-line']} ${styles['list-subtitle']}`}></div>
                    </div>
                ))}
            </div>
        )
    }

    return null
}

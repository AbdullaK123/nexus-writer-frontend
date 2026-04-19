import styles from '@/app/(app)/AppLayout.module.css'

interface StoriesEmptyStateProps {
    hasStories: boolean
}

export default function StoriesEmptyState({ hasStories }: StoriesEmptyStateProps) {
    if (hasStories) {
        return (
            <div className={styles['flex-col-container']}>
                <h2>No stories match your filter</h2>
                <p>Try selecting a different status or clear the filter to see all your stories.</p>
            </div>
        )
    }

    return (
        <div className={styles['empty-state']}>
            <div className={styles['empty-state-icon']}>🚀</div>
            <h2>Ready to begin your first story?</h2>
            <p>Create a story above to start writing your sci-fi epic. Every great universe begins with a single idea.</p>
            <div className={styles['empty-state-cta']}>
                <div className={styles['empty-state-hint']}>
                    Start with a compelling title - you can always change it later
                </div>
            </div>
        </div>
    )
}

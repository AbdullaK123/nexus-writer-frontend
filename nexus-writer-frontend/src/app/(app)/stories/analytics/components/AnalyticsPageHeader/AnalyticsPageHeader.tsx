import styles from './AnalyticsPageHeader.module.css'
import { StoryCardProps } from '@/app/types'

type AnalyticsPageHeaderProps = {
    story?: StoryCardProps
    onSetTarget: () => void
    onViewStory: () => void
    hasTarget: boolean
    targetCount?: number
}

export default function AnalyticsPageHeader({
    story,
    onSetTarget,
    onViewStory,
    hasTarget,
    targetCount = 0
}: AnalyticsPageHeaderProps) {
    if (!story) {
        return (
            <div className={styles['header-container']}>
                <div className={styles['header-content']}>
                    <div className={styles['header-title']}>
                        <h1>📊 Analytics Dashboard</h1>
                        <p className={styles['header-subtitle']}>Select a story to view detailed analytics</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles['header-container']}>
            <div className={styles['header-content']}>
                <div className={styles['header-title']}>
                    <h1>{story.title}</h1>
                    <p className={styles['header-subtitle']}>
                        {story.wordCount?.toLocaleString() || 0} words • {story.status}
                        {targetCount > 0 && ` • ${targetCount} target${targetCount > 1 ? 's' : ''}`}
                    </p>
                </div>
                <div className={styles['header-actions']}>
                    <button 
                        className={styles['action-button']} 
                        onClick={onViewStory}
                        title="View Story"
                    >
                        📖 View Story
                    </button>
                    <button 
                        className={`${styles['action-button']} ${!hasTarget ? styles['primary'] : ''}`}
                        onClick={onSetTarget}
                        title={hasTarget ? "Add Another Target" : "Set Target"}
                    >
                        ➕ {hasTarget ? 'Add Target' : 'Set Target'}
                    </button>
                </div>
            </div>
        </div>
    )
}

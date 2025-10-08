import styles from './EmptyAnalyticsState.module.css'

type EmptyAnalyticsStateProps = {
    type: 'no-selection' | 'no-target' | 'no-data' | 'error'
    onAction?: () => void
    actionLabel?: string
    message?: string
}

export default function EmptyAnalyticsState({ 
    type, 
    onAction, 
    actionLabel = 'Take Action',
    message 
}: EmptyAnalyticsStateProps) {
    const getContent = () => {
        switch (type) {
            case 'no-selection':
                return {
                    icon: '📊',
                    title: 'Select a Story',
                    description: 'Choose a story from the sidebar to view its analytics and track your writing progress.',
                    showAction: false
                }
            case 'no-target':
                return {
                    icon: '🎯',
                    title: 'No Target Set',
                    description: 'Set a writing target to track your progress and see analytics for this story.',
                    showAction: true,
                    actionLabel: actionLabel || '➕ Set Target'
                }
            case 'no-data':
                return {
                    icon: '📝',
                    title: 'No Analytics Data Yet',
                    description: message || 'Start writing to generate analytics data for this story.',
                    showAction: false
                }
            case 'error':
                return {
                    icon: '⚠️',
                    title: 'Unable to Load Analytics',
                    description: message || 'There was an error loading the analytics. Please try again.',
                    showAction: true,
                    actionLabel: actionLabel || '🔄 Retry'
                }
        }
    }

    const content = getContent()

    return (
        <div className={styles['empty-state']}>
            <div className={styles['empty-state-icon']}>{content.icon}</div>
            <h2 className={styles['empty-state-title']}>{content.title}</h2>
            <p className={styles['empty-state-description']}>{content.description}</p>
            {content.showAction && onAction && (
                <button 
                    className={styles['empty-state-button']}
                    onClick={onAction}
                >
                    {content.actionLabel}
                </button>
            )}
        </div>
    )
}

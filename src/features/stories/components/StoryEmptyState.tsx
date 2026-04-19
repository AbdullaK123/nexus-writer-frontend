import styles from '../StoryDetailContent.module.css'

export default function StoryEmptyState() {
    return (
        <div className={styles['centered']}>
            <div style={{ textAlign: 'center' }}>
                <h2>Story not found</h2>
                <p>This story doesn&apos;t seem to exist. It may have been removed.</p>
            </div>
        </div>
    )
}

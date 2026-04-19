import styles from '../StoryDetailContent.module.css'

export default function StoryErrorState() {
    return (
        <div className={styles['centered']}>
            <div style={{ textAlign: 'center' }}>
                <h2>Could not load story</h2>
                <p>We ran into an issue loading this story. It may have been deleted or the server may be unavailable.</p>
            </div>
        </div>
    )
}

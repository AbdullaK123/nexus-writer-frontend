import styles from '../StoryDetailContent.module.css'

export default function ChapterEmptyState() {
    return (
        <div className={styles['centered']}>
            <h1>Select a chapter to preview</h1>
        </div>
    )
}

import styles from '../ChapterEditorContent.module.css'

interface EditorEmptyStateProps {
    onBackToStory: () => void
}

export default function EditorEmptyState({ onBackToStory }: EditorEmptyStateProps) {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Chapter not found</h2>
            <p>This chapter doesn&apos;t seem to exist. It may have been removed.</p>
            <button
                onClick={onBackToStory}
                className={styles['back-to-story-button']}
            >
                ← Back to story page
            </button>
        </div>
    )
}

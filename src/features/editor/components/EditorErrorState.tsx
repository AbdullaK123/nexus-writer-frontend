import styles from '../ChapterEditorContent.module.css'

interface EditorErrorStateProps {
    onBackToStory: () => void
}

export default function EditorErrorState({ onBackToStory }: EditorErrorStateProps) {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Could not load chapter</h2>
            <p>We ran into an issue loading this chapter. It may have been deleted or the server may be unavailable.</p>
            <button
                onClick={onBackToStory}
                className={styles['back-to-story-button']}
            >
                ← Back to story page
            </button>
        </div>
    )
}

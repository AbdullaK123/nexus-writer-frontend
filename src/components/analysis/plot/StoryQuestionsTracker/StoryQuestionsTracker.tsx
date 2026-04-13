import { StoryQuestionsTrackerProps } from "./types";
import styles from "./StoryQuestionsTracker.module.css";

const STATUS_CLASS: Record<string, string> = {
    raised: styles['status-raised'],
    answered: styles['status-answered'],
};

export default function StoryQuestionsTracker({
    questions
}: StoryQuestionsTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Story Questions</h3>
            <div className={styles.list}>
                {questions.map((question, idx) => (
                    <div key={idx} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <span className={styles['question-text']}>{question.question}</span>
                            <div className={styles['entry-meta']}>
                                <span className={`${styles.badge} ${STATUS_CLASS[question.status] ?? ''}`}>{question.status}</span>
                                <span className={styles.detail}>Importance: {question.importance}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
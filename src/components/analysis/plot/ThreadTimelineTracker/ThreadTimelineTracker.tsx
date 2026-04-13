import Link from "next/link";
import { ThreadTimelineTrackerProps } from "./types";
import styles from "./ThreadTimelineTracker.module.css";

const STATUS_CLASS: Record<string, string> = {
    introduced: styles['status-introduced'],
    active: styles['status-active'],
    resolved: styles['status-resolved'],
    dormant: styles['status-dormant'],
};

export default function ThreadTimelineTracker({ storyId, data }: ThreadTimelineTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Thread Timeline</h3>
            <p className={styles['thread-name']}>{data.name}</p>
            <div className={styles.list}>
                {data.states.map((state) => (
                    <div key={state.chapterId} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <span className={`${styles.badge} ${STATUS_CLASS[state.status] ?? ''}`}>{state.status}</span>
                            <span className={styles.detail}>Importance: {state.importance}</span>
                            {state.mustResolve && <span className={`${styles.badge} ${styles['status-introduced']}`}>Must Resolve</span>}
                        </div>
                        <Link href={`/chapters/${storyId}/${state.chapterId}`} className={styles['chapter-link']}>
                            Ch. {state.chapterNumber}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

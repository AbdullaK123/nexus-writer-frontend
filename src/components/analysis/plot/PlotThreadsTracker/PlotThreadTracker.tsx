import { PlotThreadsTrackerProps } from "./types";
import styles from "./PlotThreadTracker.module.css";

const STATUS_CLASS: Record<string, string> = {
    introduced: styles['status-introduced'],
    active: styles['status-active'],
    resolved: styles['status-resolved'],
    dormant: styles['status-dormant'],
};

export default function PlotThreadsTracker({
    threads
}: PlotThreadsTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Plot Threads</h3>
            <div className={styles.list}>
                {threads.map((thread) => (
                    <div key={thread.name} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <span className={styles['entry-name']}>{thread.name}</span>
                            <div className={styles['entry-meta']}>
                                <span className={`${styles.badge} ${STATUS_CLASS[thread.status] ?? ''}`}>{thread.status}</span>
                                <span className={styles.detail}>Importance: {thread.importance}</span>
                                {thread.mustResolve && <span className={`${styles.badge} ${styles['priority-badge']}`}>Must Resolve</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
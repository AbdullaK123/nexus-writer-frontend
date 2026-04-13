import Link from "next/link";
import { DormantThreadsTrackerProps } from "./types";
import styles from "./DormantThreadTracker.module.css";

export default function DormantThreadTracker({
    storyId,
    threads
}: DormantThreadsTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Dormant Threads</h3>
            <div className={styles.list}>
                {threads.map((thread) => (
                    <div key={thread.name} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <span className={styles['entry-name']}>{thread.name}</span>
                            <div className={styles['entry-meta']}>
                                <span className={styles.detail}>Importance: {thread.importance}</span>
                                <span className={`${styles.badge} ${thread.mustResolve ? styles['badge-required'] : styles['badge-ok']}`}>
                                    {thread.mustResolve ? 'Must Resolve' : 'Secondary'}
                                </span>
                                <span className={`${styles.badge} ${styles['badge-warn']}`}>
                                    {thread.chaptersDormant} ch. dormant
                                </span>
                            </div>
                        </div>
                        <div className={styles.links}>
                            <Link href={`/chapters/${storyId}/${thread.wentDormantChapterId}`} className={styles['chapter-link']}>
                                Dormant
                            </Link>
                            <Link href={`/chapters/${storyId}/${thread.reappearedChapterId}`} className={styles['chapter-link']}>
                                Reappeared
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
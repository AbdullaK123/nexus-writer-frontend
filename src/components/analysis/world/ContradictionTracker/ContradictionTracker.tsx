import Link from "next/link";
import { ContradictionTrackerProps } from "./types";
import styles from "./ContradictionTracker.module.css";

export default function ContradictionTracker({ storyId, contradictions }: ContradictionTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Contradictions</h3>
            {contradictions.length === 0 ? (
                <div className={styles.empty}><p>No contradictions detected.</p></div>
            ) : (
                <div className={styles.list}>
                    {contradictions.map((c, idx) => (
                        <div key={idx} className={styles.entry}>
                            <div className={styles['entry-header']}>
                                <span className={styles.entity}>{c.entity}</span>
                                <span className={styles.attribute}>{c.attribute}</span>
                            </div>
                            <div className={styles.occurrences}>
                                {c.occurrences.map((o) => (
                                    <div key={o.chapterId} className={styles.occurrence}>
                                        <span className={styles['occurrence-value']}>{o.value}</span>
                                        <Link href={`/chapters/${storyId}/${o.chapterId}`} className={styles['chapter-link']}>
                                            Ch. {o.chapterNumber}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

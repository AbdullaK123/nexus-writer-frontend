import Link from "next/link";
import { EntityTimelineProps } from "./types";
import styles from "./EntityTimeline.module.css";

export default function EntityTimeline({ storyId, chapterFacts }: EntityTimelineProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Entity Timeline</h3>
            {chapterFacts.length === 0 ? (
                <div className={styles.empty}><p>No timeline data yet.</p></div>
            ) : (
                <div className={styles.list}>
                    {chapterFacts.map((chapter) => (
                        <div key={chapter.chapterId} className={styles['chapter-group']}>
                            <Link href={`/chapters/${storyId}/${chapter.chapterId}`} className={styles['chapter-link']}>
                                Ch. {chapter.chapterNumber}
                            </Link>
                            <div className={styles.facts}>
                                {chapter.facts.map((fact, idx) => (
                                    <span key={idx} className={styles.tag}>{fact.attribute}: {fact.value}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

import Link from "next/link";
import { SceneCardProps } from "./types";
import styles from "./SceneCard.module.css";

const TYPE_CLASS: Record<string, string> = {
    action: styles['type-action'],
    dialogue: styles['type-dialogue'],
    introspection: styles['type-introspection'],
    exposition: styles['type-exposition'],
    transition: styles['type-transition'],
};

export default function SceneCard({ storyId, scene }: SceneCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={`${styles.badge} ${TYPE_CLASS[scene.type] ?? ''}`}>{scene.type}</span>
                <Link href={`/chapters/${storyId}/${scene.chapterId}`} className={styles['chapter-link']}>
                    Ch. {scene.chapterNumber}
                </Link>
            </div>
            <div className={styles.body}>
                <div className={styles.field}>
                    <span className={styles.label}>Location</span>
                    <span className={styles.value}>{scene.location}</span>
                </div>
                {scene.pov && (
                    <div className={styles.field}>
                        <span className={styles.label}>POV</span>
                        <span className={styles.value}>{scene.pov}</span>
                    </div>
                )}
                <div className={styles.field}>
                    <span className={styles.label}>Goal</span>
                    <span className={styles.value}>{scene.goal}</span>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Conflict</span>
                    <span className={styles.value}>{scene.conflict}</span>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Outcome</span>
                    <span className={styles.value}>{scene.outcome}</span>
                </div>
            </div>
            <div className={styles.footer}>
                <span className={styles['word-count']}>{scene.wordCount.toLocaleString()} words</span>
            </div>
        </div>
    );
}

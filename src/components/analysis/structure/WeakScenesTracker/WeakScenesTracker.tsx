import Link from "next/link";
import { WeakScenesTrackerProps } from "./types";
import styles from "./WeakScenesTracker.module.css";

export default function WeakScenesTracker({ storyId, weakScenes }: WeakScenesTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Weak Scenes</h3>
            {weakScenes.length === 0 ? (
                <div className={styles.empty}><p>No weak scenes detected.</p></div>
            ) : (
                <div className={styles.list}>
                    {weakScenes.map((chapter) => (
                        <div key={chapter.chapterId} className={styles['chapter-group']}>
                            <div className={styles['chapter-header']}>
                                <Link href={`/chapters/${storyId}/${chapter.chapterId}`} className={styles['chapter-link']}>
                                    Ch. {chapter.chapterNumber}
                                </Link>
                                <span className={styles['scene-count']}>
                                    {chapter.scenes.length} weak {chapter.scenes.length === 1 ? 'scene' : 'scenes'}
                                </span>
                            </div>
                            <div className={styles.scenes}>
                                {chapter.scenes.map((scene, idx) => (
                                    <div key={idx} className={styles.scene}>
                                        <span className={styles.badge}>{scene.type}</span>
                                        <span className={styles['scene-goal']}>{scene.goal}</span>
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

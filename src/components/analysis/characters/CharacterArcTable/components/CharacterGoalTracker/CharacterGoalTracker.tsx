import Link from "next/link";
import { CharacterGoalTrackerProps } from "./types";
import styles from "../Tracker.module.css";


export default function CharacterGoalTracker({
    storyId,
    goals
}: CharacterGoalTrackerProps) {
    return (
        <div className={styles.tracker}>
            <h3 className={styles['tracker-heading']}>Goals</h3>
            <div className={styles['entry-list']}>
                {goals.map((chapterMap) => (
                    <div key={chapterMap.chapterId} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <div className={styles['tag-row']}>
                                {chapterMap.goals.map((goal, idx) => (
                                    <span key={idx} className={styles.tag}>{goal}</span>
                                ))}
                            </div>
                        </div>
                        <Link
                            href={`/chapters/${storyId}/${chapterMap.chapterId}`}
                            className={styles['chapter-link']}
                        >
                            Ch. {chapterMap.chapterNumber}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
import Link from "next/link";
import { CharacterEmotionalStateTrackerProps } from "./types";
import styles from "../Tracker.module.css";


export default function CharacterEmotionalStateTracker({
    storyId,
    states
}: CharacterEmotionalStateTrackerProps) {
    return (
        <div className={styles.tracker}>
            <h3 className={styles['tracker-heading']}>Emotional Arc</h3>
            <div className={styles['entry-list']}>
                {states.map((state) => (
                    <div key={state.chapterId} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <span className={styles['entry-value']}>{state.emotionalState}</span>
                        </div>
                        <Link
                            href={`/chapters/${storyId}/${state.chapterId}`}
                            className={styles['chapter-link']}
                        >
                            Ch. {state.chapterNumber}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
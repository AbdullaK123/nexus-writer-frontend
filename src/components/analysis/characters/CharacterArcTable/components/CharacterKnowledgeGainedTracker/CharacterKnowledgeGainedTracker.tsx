import Link from "next/link";
import { CharacterKnowledgeGainedTrackerProps } from "./types";
import styles from "../Tracker.module.css";


export default function CharacterKnowledgeGainedTracker({
    storyId,
    knowledgeGained
}: CharacterKnowledgeGainedTrackerProps) {
    return (
        <div className={styles.tracker}>
            <h3 className={styles['tracker-heading']}>Knowledge Gained</h3>
            <div className={styles['entry-list']}>
                {knowledgeGained.map((knowledgeGainedItem) => (
                    <div key={knowledgeGainedItem.chapterId} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <div className={styles['tag-row']}>
                                {knowledgeGainedItem.knowledgeGained.map((knowledgeItem, idx) => (
                                    <span key={idx} className={styles.tag}>{knowledgeItem}</span>
                                ))}
                            </div>
                        </div>
                        <Link
                            href={`/chapters/${storyId}/${knowledgeGainedItem.chapterId}`}
                            className={styles['chapter-link']}
                        >
                            Ch. {knowledgeGainedItem.chapterNumber}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
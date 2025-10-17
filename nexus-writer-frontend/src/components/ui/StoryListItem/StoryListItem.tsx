'use client'
import { StoryListItemProps, TargetResponse } from "@/app/types";
import styles from "./StoryListItem.module.css";
import { formatWordCount } from "@/app/lib/utils";

export default function StoryListItem({
    title,
    wordCount,
    targets
}: StoryListItemProps) {
    return (
        <div
            className={styles['story-list-item-container']}
        >
            <div className={styles['flex-col-container']}>
                <div className={styles['story-title']}>{title}</div>
                <div className={styles['story-metadata-container']}>
                    <span>{formatWordCount(wordCount)}</span>
                </div>
                <div className={styles['story-target-badges-container']}>
                    {targets && targets.length > 0 && targets.map((target: TargetResponse) => (
                        <span key={target.targetId} className={styles['target-badge']}>
                            {`${target.frequency}: ${target.quota}`}
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles['arrow-icon']}>
                →
            </div>
        </div>
    )
}
'use client'
import { StoryListItemProps } from "@/app/types";
import styles from "./StoryListItem.module.css";
import { formatWordCount } from "@/app/lib/utils";

export default function StoryListItem({
    title,
    status,
    wordCount,
    handleOnClick,
}: StoryListItemProps) {
    return (
        <div
            onClick={handleOnClick}
            className={styles['story-list-item-container']}
        >
            <div className={styles['flex-col-container']}>
                <div className={styles['story-title']}>{title}</div>
                <div className={styles['story-metadata-container']}>
                    <span>{formatWordCount(wordCount)}</span>
                    <span>{status}</span>
                </div>
            </div>
            <div className={styles['arrow-icon']}>
                →
            </div>
        </div>
    )
}
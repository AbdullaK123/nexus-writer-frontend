import { StoryListItemProps } from "@/app/types";
import styles from "./StoryListItem.module.css";
import { formatWordCount } from "@/app/lib/utils";

export default function StoryListItem({
    id,
    title,
    status,
    wordCount,
    handleOnClick,
    handleClearSelection
}: StoryListItemProps) {
    return (
        <div>
            <div className={styles['story-metadata-container']}>
                <div className={styles['flex-col-container']}>
                    <h3>{title}</h3>
                    <div>
                        <span>{formatWordCount(wordCount)}</span>
                        <span>{status}</span>
                    </div>
                </div>
                <div className={styles['arrow-icon']}>
                    →
                </div>
            </div>
        </div>
    )
}
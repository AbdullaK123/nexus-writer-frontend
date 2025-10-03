import {StoryListProps} from "@/app/types";
import StoryListItem from "@/components/ui/StoryListItem/StoryListItem";
import styles from "./StoryList.module.css"

export default function StoryList({
    stories
}: StoryListProps) {
    return (
        <aside className={`${styles['side-bar-section']} ${styles['story-items-container']}`}>
            {(stories && stories.length > 0) ? (
                stories.map((story, index) => (
                    <StoryListItem
                        key={`story-${index}`}
                        {...story}
                    />
                ))
            ) : (
                <div>
                    No stories yet.
                </div>
            )}
        </aside>
    )
}
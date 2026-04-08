import {StoryListProps} from "./types";
import StoryListItem from "@/components/ui/StoryListItem/StoryListItem";
import styles from "./StoryList.module.css"
import { ClipLoader } from "react-spinners";

export default function StoryList({
    storiesLoading,
    onSelectStory,
    selectedStoryId,
    stories
}: StoryListProps) {
    return (
        <aside className={`${styles['sidebar-section']} ${styles['story-items-container']}`}>
            { storiesLoading && (
                <div className="loading-row-lg">
                    <ClipLoader size={20} color="#00d4ff" />
                    <span>Loading...</span>
                </div>
            )}
            {(stories && stories.length > 0) ? (
                stories.map((story) => (
                    <StoryListItem
                        key={story.storyId}
                        {...story}
                        isSelected={(story.storyId === selectedStoryId)}
                        onClick={() => onSelectStory(story.storyId)}
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
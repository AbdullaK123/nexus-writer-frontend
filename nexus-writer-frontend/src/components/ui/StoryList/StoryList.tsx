import {StoryListProps} from "@/app/types";
import StoryListItem from "@/components/ui/StoryListItem/StoryListItem";
import styles from "./StoryList.module.css"
import { ClipLoader } from "react-spinners";

export default function StoryList({
    storiesLoading,
    stories
}: StoryListProps) {
    return (
        <aside className={`${styles['sidebar-section']} ${styles['story-items-container']}`}>
            { storiesLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px' }}>
                    <ClipLoader size={20} color="#666" />
                    <span>Loading...</span>
                </div>
            )}
            {(stories && stories.length > 0) ? (
                stories.map((story) => (
                    <StoryListItem
                        key={story.storyId}
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
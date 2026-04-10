import { StoryListItemProps } from "./components/StoryListItem/types";

export type StoryListProps = {
    storiesLoading: boolean;
    stories: StoryListItemProps[];
    selectedStoryId: string;
    onSelectStory: (storyId: string) => void;
}

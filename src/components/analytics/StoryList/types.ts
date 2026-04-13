import { StoryListItemResponse } from "@/data/types";

export type StoryListProps = {
    storiesLoading: boolean;
    stories: StoryListItemResponse[];
    selectedStoryId: string;
    onSelectStory: (storyId: string) => void;
}

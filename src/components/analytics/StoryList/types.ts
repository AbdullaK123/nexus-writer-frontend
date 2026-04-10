import { StoryListItemResponse } from "@/app/types";

export type StoryListProps = {
    storiesLoading: boolean;
    stories: StoryListItemResponse[];
    selectedStoryId: string;
    onSelectStory: (storyId: string) => void;
}

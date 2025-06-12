import { StoryCreateRequest } from "./stories";


export interface DashboardToolBarProps {
    username: string;
    onCreateStory: (story: StoryCreateRequest) => void;
    onLayoutChange: () => void;
}
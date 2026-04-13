import { StoryCreateRequest } from "@/data/types/story";

export interface DashboardToolBarProps {
  username: string;
  onCreateStory: (story: StoryCreateRequest) => void;
  onFilterChange: (filter: string) => void;
}

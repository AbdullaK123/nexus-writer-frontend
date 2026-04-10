import { ChapterListItemProps } from "./components/ChapterListItem/types";
import { StoryInfoCardProps } from "./components/StoryInfoCard/types";

export interface StoryDetailSideBarProps {
  storyInfo: StoryInfoCardProps;
  chapters: ChapterListItemProps[];
  onFilterChange: (filter: string) => void;
}

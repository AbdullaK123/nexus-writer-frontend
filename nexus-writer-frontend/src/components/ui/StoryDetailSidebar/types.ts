import { ChapterListItemProps } from "@/components/ui/ChapterListItem/types";
import { StoryInfoCardProps } from "@/components/ui/StoryInfoCard/types";

export interface StoryDetailSideBarProps {
  storyInfo: StoryInfoCardProps;
  chapters: ChapterListItemProps[];
  onFilterChange: (filter: string) => void;
}

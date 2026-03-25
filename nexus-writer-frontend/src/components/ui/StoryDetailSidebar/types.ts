import { RefObject } from "react";
import { ChapterListItemProps } from "@/components/ui/ChapterListItem/types";
import { StoryInfoCardProps } from "@/components/ui/StoryInfoCard/types";

export interface StoryDetailSideBarProps {
  storyInfo: StoryInfoCardProps;
  chapters: Omit<ChapterListItemProps, 'contextMenuRef'>[];
  onFilterChange: (filter: string) => void;
  contextMenuRef: RefObject<{ menuIsOpen: boolean, storyId?: string }>
}

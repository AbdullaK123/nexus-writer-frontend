import React from "react";
import { TargetResponse } from "@/app/types/targets";

export type StoryListItemProps = {
  storyId: string;
  title: string;
  wordCount: number;
  isSelected: boolean;
  targets: TargetResponse[];
  handleOnContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

export interface ChapterListItemProps {
  storyId: string;
  id: string;
  chapterNumber: number;
  title: string;
  wordCount: number;
  status: "published" | "draft" | "outline";
  published?: boolean;
  updatedAt?: Date;
  handleOnClick: () => void;
  handleClearSelection: () => void;
}

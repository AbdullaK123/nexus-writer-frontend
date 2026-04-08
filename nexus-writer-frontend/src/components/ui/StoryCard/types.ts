export interface StoryCardProps {
  id: string; 
  latestChapterId?: string;
  title: string;
  status: "Complete" | "On Hiatus" | "Ongoing";
  createdAt: Date;
  updatedAt: Date;
  totalChapters?: number;
  wordCount?: number;
  latestChapter?: string;
}

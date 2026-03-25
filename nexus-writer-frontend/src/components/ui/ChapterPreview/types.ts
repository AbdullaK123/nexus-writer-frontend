export interface ChapterPreviewProps {
  id?: string;
  title?: string;
  status?: "published" | "draft" | "outline";
  wordCount?: number;
  updatedAt?: Date;
  previewContent?: string;
  storyId: string;
  storyTitle?: string;
  previousChapterId?: string;
  nextChapterId?: string;
  onStatusUpdate: () => void;
  onShowErrorToast: (msg: string) => void;
  onShowSuccessToast: (msg: string) => void;
}

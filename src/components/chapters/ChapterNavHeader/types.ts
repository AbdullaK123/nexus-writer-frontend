export interface ChapterNavHeaderProps {
  storyId: string;
  chapterTitle: string;
  chapterId: string;
  prevChapterId?: string;
  nextChapterId?: string;
  onShowErrorToast: (msg: string) => void;
}

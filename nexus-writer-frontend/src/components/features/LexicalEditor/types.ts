export interface LexicalEditorProps {
    storyId: string;
    chapterId: string;
    initialContent?: string
}

export interface ManualSavePluginProps {
  storyId: string,
  chapterId: string
}

export interface AutoSavePluginProps {
    storyId: string;
    chapterId: string;
    intervalMs?: number;
}

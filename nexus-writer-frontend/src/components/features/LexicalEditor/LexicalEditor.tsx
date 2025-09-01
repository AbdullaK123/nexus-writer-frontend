import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import styles from './LexicalEditor.module.css'
import IndentOnNewLinePlugin from './plugins/IndentOnNewLinePlugin'
import AutoSavePlugin from './plugins/AutoSavePlugin'
import LiveWordCountPlugin from './plugins/LiveWordCountPlugin'
import TypingDetectorPlugin from './plugins/TypingDetectorPlugin'
import MarkdownPastePlugin from './plugins/MarkdownPastePlugin'
import { RemoveIndentPlugin } from './plugins/RemoveIndentPlugin'
import { useAuth } from '@/app/hooks/useAuth'
import ManualSavePlugin from './plugins/ManualSavePlugin'
import { LexicalEditorProps } from '@/app/types'
import { getInitialConfig, MY_TRANSFORMERS } from './config'


export default function LexicalEditor({ 
    initialContent, 
    chapterId, 
    storyId
 }: LexicalEditorProps) {

    const { user } = useAuth()

    return (
        <div className={styles['lexical-editor-container']}>
            <LexicalComposer initialConfig={getInitialConfig(initialContent)}>
                <div className={styles['editor-shell']}>
                    <LiveWordCountPlugin />
                    <RichTextPlugin 
                        contentEditable={
                            <ContentEditable 
                                className={styles['editor-input']}
                            />
                        }
                        placeholder={
                            null
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <MarkdownShortcutPlugin 
                        transformers={MY_TRANSFORMERS} 
                    />
                    <MarkdownPastePlugin 
                        transformers={MY_TRANSFORMERS}
                    />
                    <IndentOnNewLinePlugin />
                    <RemoveIndentPlugin />
                    <AutoSavePlugin 
                        chapterId={chapterId}
                        storyId={storyId}
                    />
                    <ManualSavePlugin 
                        chapterId={chapterId}
                        storyId={storyId}
                    />
                    <TypingDetectorPlugin 
                        storyId={storyId}
                        chapterId={chapterId}
                        userId={user.id}
                        delay={500}
                    />
                </div>
            </LexicalComposer>
        </div>
    )
}
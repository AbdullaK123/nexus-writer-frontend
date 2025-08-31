import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { 
    BOLD_STAR, 
    BOLD_UNDERSCORE, 
    HEADING, 
    ITALIC_STAR, 
    QUOTE
} from '@lexical/markdown'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import styles from './LexicalEditor.module.css'
import IndentOnNewLinePlugin from './plugins/IndentOnNewLinePlugin'
import AutoSavePlugin from './plugins/AutoSavePlugin'
import LiveWordCountPlugin from './plugins/LiveWordCountPlugin'
import TypingDetectorPlugin from './plugins/TypingDetectorPlugin'
import { ListNode, ListItemNode } from "@lexical/list"
import MarkdownPastePlugin from './plugins/MarkdownPastePlugin'
import { RemoveIndentPlugin } from './plugins/RemoveIndentPlugin'
import { useAuth } from '@/app/hooks/useAuth'
import ManualSavePlugin from './plugins/ManualSavePlugin'

// Update the transformer array order - BOLD_STAR should come before ITALIC_STAR
const MY_TRANSFORMERS = [
    HEADING, 
    QUOTE, 
    BOLD_STAR,        // Move this before ITALIC_STAR
    ITALIC_STAR,      // This should come after BOLD_STAR
    BOLD_UNDERSCORE
]

// Sci-fi themed editor configuration
const sciFiTheme = {
  heading: {
    h1: 'lexical-h1',
    h2: 'lexical-h2', 
    h3: 'lexical-h3',
    h4: 'lexical-h4',
    h5: 'lexical-h5',
    h6: 'lexical-h6'
  },
  text: {
    bold: 'lexical-bold',
    italic: 'lexical-italic',
  },
  list: {
    nested: {
        listitem: 'lexical-listitem'
    },
    ul: 'lexical-list-ul'
  },
  link: 'lexical-link',
  paragraph: 'lexical-paragraph',
  root: 'lexical-root'
}

interface LexicalEditorProps {
    storyId: string;
    chapterId: string;
    initialContent?: string
}

function createInitialState(content?: string) {
    if (!content) return undefined

    // try to parse the lexical json
    try {
        const parsed = JSON.parse(content)

        if (parsed.root && parsed.root.children) {
            return content
        }

    } catch (error) {
        console.error(`Failed to parse content as lexical json: ${error}`)
    }
}

export default function LexicalEditor({ initialContent, chapterId, storyId }: LexicalEditorProps) {

    const { user } = useAuth()
    
    const initialConfig = {
        namespace: 'SciFiChapterEditor',
        theme: sciFiTheme,
        nodes: [
            HeadingNode,
            QuoteNode,
            ListNode,
            ListItemNode
        ],
        onError: (error: Error) => {
            console.error('Lexical Editor Error:', error)
        },
        editorState: createInitialState(initialContent)
    }

    return (
        <div className={styles['lexical-editor-container']}>
            <LexicalComposer initialConfig={initialConfig}>
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
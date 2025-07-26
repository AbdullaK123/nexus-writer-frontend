import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { HEADING } from '@lexical/markdown'
import { HeadingNode } from '@lexical/rich-text'
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical'
import styles from './LexicalEditor.module.css'
import EditorToolbar from '@/components/ui/EditorToolbar/EditorToolbar'
import IndentOnNewLinePlugin from './plugins/IndentOnNewLinePlugin'
import AutoSavePlugin from './plugins/AutoSavePlugin'
import LiveWordCountPlugin from './plugins/LiveWordCountPlugin'
import TypingDetectorPlugin from './plugins/TypingDetectorPlugin'

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
  paragraph: 'lexical-paragraph'
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

   return () => {
    const root = $getRoot()
    const paragraphs = content.split('\n\n')
    
    paragraphs.forEach(paragraphText => {
      if (paragraphText.trim()) {
        const paragraph = $createParagraphNode()
        const textNode = $createTextNode(paragraphText.trim())
        paragraph.append(textNode)
        root.append(paragraph)
      }
    })
  }

}

export default function LexicalEditor({ initialContent, chapterId, storyId }: LexicalEditorProps) {
    const initialConfig = {
        namespace: 'SciFiChapterEditor',
        theme: sciFiTheme,
        nodes: [
            HeadingNode
        ],
        onError: (error: Error) => {
            console.error('Lexical Editor Error:', error)
        },
        editorState: createInitialState(initialContent)
    }

    return (
        <div className={styles['lexical-editor-container']}>
            <LexicalComposer initialConfig={initialConfig}>
                <EditorToolbar />
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
                    <MarkdownShortcutPlugin transformers={[HEADING]} />
                    <IndentOnNewLinePlugin />
                    <AutoSavePlugin 
                        chapterId={chapterId}
                        storyId={storyId}
                    />
                    <TypingDetectorPlugin 
                        onStart={() => console.info("I am typing...")}
                        onStop={() => console.info("I am not typing anymore...")}
                        delay={500}
                    />
                </div>
            </LexicalComposer>
        </div>
    )
}
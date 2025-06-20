import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TRANSFORMERS } from '@lexical/markdown'
import { HeadingNode } from '@lexical/rich-text'
import { ListNode, ListItemNode } from '@lexical/list'
import { CodeNode } from '@lexical/code'
import { QuoteNode } from '@lexical/rich-text'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import styles from './LexicalEditor.module.css'
import EditorToolbar from '@/components/ui/EditorToolbar/EditorToolbar'
import IndentOnNewLinePlugin from './plugins/IndentOnNewLinePlugin'

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
    strikethrough: 'lexical-strikethrough',
    underline: 'lexical-underline',
    code: 'lexical-inline-code'
  },
  paragraph: 'lexical-paragraph',
  quote: 'lexical-quote',
  list: {
    nested: {
      listitem: 'lexical-nested-listitem'
    },
    ol: 'lexical-list-ol',
    ul: 'lexical-list-ul',
    listitem: 'lexical-listitem'
  },
  link: 'lexical-link',
  code: 'lexical-code'
}

export default function LexicalEditor() {
    const initialConfig = {
        namespace: 'SciFiChapterEditor',
        theme: sciFiTheme,
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            AutoLinkNode,
            LinkNode
        ],
        onError: (error: Error) => {
            console.error('Lexical Editor Error:', error)
        },
        editorState: undefined // Start with empty state
    }

    return (
        <div className={styles['lexical-editor-container']}>
            <LexicalComposer initialConfig={initialConfig}>
                <EditorToolbar />
                <div className={styles['editor-shell']}>
                    <RichTextPlugin 
                        contentEditable={
                            <ContentEditable 
                                className={styles['editor-input']}
                            />
                        }
                        placeholder={
                            <div className={styles['editor-placeholder']}>
                                Begin your sci-fi story...
                            </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    
                    {/* Essential plugins for writers */}
                    <HistoryPlugin />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                    <ListPlugin />
                    <LinkPlugin />
                    <CheckListPlugin />
                    <IndentOnNewLinePlugin />
                </div>
            </LexicalComposer>
        </div>
    )
}
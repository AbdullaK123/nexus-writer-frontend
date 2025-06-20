import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import styles from './LexicalEditor.module.css'


export default function LexicalEditor() {
    const initialConfig = {
        namespace: 'Chapter Editor',
        onError: (error: Error) => console.log(error)
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin 
                contentEditable={<ContentEditable/>}
                placeholder={<div>Start typing...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
        </LexicalComposer>
    )
}
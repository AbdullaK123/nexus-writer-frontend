import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useState } from "react";
import styles from './LiveWordCountPlugin.module.css'

const getWordCount = (text: string) => {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

export default function LiveWordCountPlugin() {
    const [editor] = useLexicalComposerContext()
    const [wordCount, setWordCount] = useState(() => {
        const startingWordCount = editor.read(() => {
            return getWordCount($getRoot().getTextContent())
        })
        return startingWordCount
    })
    
    editor.registerTextContentListener((editorContent: string) => {
        setWordCount(getWordCount(editorContent))
    })

    return (
        <div className={styles['flex-end-container']}>
            <h4>
                {wordCount} words
            </h4>
        </div>
    )
}   
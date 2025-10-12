'use client'
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react';
import styles from './TipTapEditor.module.css'
import { WordCounter } from './extensions/WordCounter';
import { useWritingSessionTracking } from '@/app/hooks/useWritingSessionTracking';

type TipTapEditorProps = {
    storyId: string;
    chapterId: string;
    userId: string;
    content: string;
    onUpdateAction: (newContent: string) => void
}


export default function TipTapEditor({
    storyId,
    chapterId,
    userId,
    content,
    onUpdateAction
}: TipTapEditorProps) {

    const [wordCount, setWordCount] = useState(0)

    const editor = useEditor({
        extensions: [
            StarterKit,
            WordCounter
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onUpdateAction(editor.getHTML())
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setWordCount((editor.storage as any).wordCounter?.words || 0)
        },
        onCreate: ({ editor }) => {
            // Set initial word count when editor is created
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setWordCount((editor.storage as any).wordCounter?.words || 0)
        },
        editorProps: {
            attributes: {
                class: styles['editor-content'],
            },
        },
    })

    useEffect(() => {
        if (!editor) return
        const current = editor.getHTML()
        if (current !== content) {
            editor.commands.setContent(content, { emitUpdate: false})
            // Update word count after setting content
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setWordCount((editor.storage as any).wordCounter?.words || 0)
        }
    }, [content, editor])

    useWritingSessionTracking(editor, storyId, chapterId, userId)

    return (
        <div className={styles['tiptap-editor-container']}>
            <div className={styles['flex-end-container']}>
                <h3>
                    {`${wordCount} words`}
                </h3>
            </div>
            <div className={styles['editor-shell']}>
                <EditorContent editor={editor} />
            </div>
        </div>
    )

}
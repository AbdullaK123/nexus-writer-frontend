'use client'
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react';
import styles from './TipTapEditor.module.css'
import { WordCounter } from './extensions/WordCounter';
import { useWritingSessionTracking } from '@/app/hooks/useWritingSessionTracking';
import { ClipLoader } from "react-spinners"
import { ChapterEdit } from '@/app/types';
import { AiEdit } from './marks/AiEdit';

type TipTapEditorProps = {
    storyId: string;
    chapterId: string;
    userId: string;
    isSaving: boolean;
    content: string;
    edits: ChapterEdit;
    onUpdateAction: (newContent: string) => void
}


export default function TipTapEditor({
    storyId,
    chapterId,
    userId,
    isSaving,
    content,
    edits,
    onUpdateAction
}: TipTapEditorProps) {

    const [wordCount, setWordCount] = useState(0)

    const editor = useEditor({
        extensions: [
            StarterKit,
            WordCounter,
            AiEdit
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
        if (!editor || !edits?.edits?.length) return
        
        const { doc } = editor.state
        let paragraphIndex = 0
        const tr = editor.state.tr
        
        doc.descendants((node, pos) => {
            if (node.type.name !== 'paragraph') return
            const edit = edits.edits.find(e => e.paragraphIdx === paragraphIndex)
            
            if (edit) {
                const from = pos + 1
                const to = pos + node.nodeSize - 1
                tr.addMark(from, to, editor.schema.marks.aiEdit.create(edit))
            }
            
            paragraphIndex++
        })
        
        editor.view.dispatch(tr)
    }, [editor, edits])

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
                    {isSaving && <ClipLoader size={16} color={"#00d4ff"} /> }
                </h3>
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
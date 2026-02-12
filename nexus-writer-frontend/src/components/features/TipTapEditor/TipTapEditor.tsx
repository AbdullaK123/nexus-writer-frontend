'use client'
import {useEditor, EditorContent, Editor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react';
import styles from './TipTapEditor.module.css'
import { WordCounter } from './extensions/WordCounter';
import { useWritingSessionTracking } from '@/app/hooks/useWritingSessionTracking';
import { ClipLoader } from "react-spinners"
import { ChapterEdit } from '@/app/types';
import { AiEdit } from './marks/AiEdit';
import { AiSuggestion } from './bubble-menus/AiSuggestion/AiSuggestion';
import { useBackgroundJobs } from '@/app/hooks/useBackgroundJobs';
import { useToast } from '@/app/hooks/useToast';
import { Button } from '@/components/ui/Button';
import { useJobCache } from '@/app/hooks/useJobCache';
import { useJobProgress } from '@/app/hooks/useJobProgress';
import { useChapterJobs } from '@/app/hooks/useChapterJobs';

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

    const {
        queueExtraction,
        queueBackgroundEdits
    } = useBackgroundJobs()

    const queueBackgroundEditsJob = (editor: Editor, chapterId: string) => {
        queueBackgroundEdits.mutate({ chapterId: chapterId, force: true})
    }

    const queueExtractionJob = (editor: Editor, chapterId: string) => {
        queueExtraction.mutate({ chapterId: chapterId, force: true})
    }

    const {
        chapterJobs,
        isEditing,
        isExtracting
    } = useChapterJobs(chapterId)

    const extractionJob = chapterJobs.find((job) => job.jobType === "extraction")
    const lineEditJob = chapterJobs.find((job) => job.jobType === "line-edit")

    const {
        statusMessage: extractionStatusMessage,
        progressPercent: extractionProgressPercent
    } = useJobProgress(extractionJob ? extractionJob.jobId : null)

    const {
        statusMessage: lineEditStatusMessage,
        progressPercent: lineEditProgressPercent
    } = useJobProgress(lineEditJob ? lineEditJob.jobId : null)
    

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
                <Button
                    variant='secondary'
                    onClick={() => queueBackgroundEditsJob(editor, chapterId)}
                    disabled={queueBackgroundEdits.isPending || isEditing}
                >
                    {isEditing ? `Generating edits...${lineEditProgressPercent}% ( ${lineEditStatusMessage} )` : "Start background edits"}
                </Button>
                <Button
                    variant='secondary'
                    onClick={() => queueExtractionJob(editor, chapterId)}
                    disabled={queueExtraction.isPending || isExtracting}
                >
                    {isExtracting ? `Extracting...${extractionProgressPercent}% ( ${extractionStatusMessage} )` : "Start entity extraction"}
                </Button>
                <h3>
                    {isSaving && <ClipLoader size={16} color={"#00d4ff"} /> }
                </h3>
                <h3>
                    {`${wordCount} words`}
                </h3>
            </div>
            {editor && <AiSuggestion editor={editor} />}
            <div className={styles['editor-shell']}>
                <EditorContent editor={editor} />
            </div>
        </div>
    )

}
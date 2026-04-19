'use client'
import {useEditor, EditorContent, Editor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useCallback, useRef, useState } from 'react';
import styles from './TipTapEditor.module.css'
import { WordCounter } from './extensions/WordCounter';
import { useWritingSessionTracking } from '@/features/editor/hooks/useWritingSessionTracking';
import { ClipLoader } from "react-spinners"
import { ChapterEdit, FlowEvent } from '@/data/types';
import { AiEdit } from './marks/AiEdit';
import { AiSuggestion } from './bubble-menus/AiSuggestion/AiSuggestion';
import { useBackgroundJobs } from '@/features/jobs/hooks/useBackgroundJobs';
import { useToast } from '@/shared/providers/ToastProvider';
import { Button } from '@/components/common/Button';
import { useChapterJobs } from '@/features/jobs/hooks/useChapterJobs';
import { useQuery } from '@tanstack/react-query';
import { drainJobEvents } from '@/infrastructure/api/jobs';

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
    const [editBtnText, setEditBtnText] = useState("Generate Edits")

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
        queueBackgroundEdits
    } = useBackgroundJobs()

    const queueBackgroundEditsJob = (editor: Editor, chapterId: string) => {
        queueBackgroundEdits.mutate({ chapterId: chapterId})
    }

    const {
        chapterJobs,
        isEditing
    } = useChapterJobs(chapterId)

    const { showToast } = useToast()

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

    const handleMessage = useCallback((e: FlowEvent) => {
        setEditBtnText(`${e.message} (${(100 * (e.step ?? 0) / (e.totalSteps ?? 1)).toFixed(0)}%)`)

        switch (e.eventType) {
            case 'flow_started':
                showToast(e.message ?? 'Edit generation started', 'info')
                break
            case 'flow_complete':
                showToast(e.message ?? 'Edits generated successfully', 'success')
                setEditBtnText('Generate Edits')
                break
            case 'flow_failed':
                showToast(e.message ?? 'Edit generation failed', 'error')
                setEditBtnText('Generate Edits')
                break
            case 'task_failed':
                showToast(e.message ?? 'A task failed', 'warning')
                break
        }
    }, [showToast])

    // Poll for job events every 2s via TanStack Query
    const { data: jobEvents } = useQuery({
        queryKey: ['job-events'],
        queryFn: drainJobEvents,
        refetchInterval: 2000,
    })

    const processedRef = useRef(0)
    useEffect(() => {
        if (!jobEvents?.length) return
        // Only process newly returned events (each drain is fresh from server,
        // but React Query may re-deliver the same data reference until next fetch)
        if (jobEvents.length === processedRef.current) return
        processedRef.current = jobEvents.length
        for (const event of jobEvents) {
            handleMessage(event)
        }
    }, [jobEvents, handleMessage])

    return (
        <div className={styles['tiptap-editor-container']}>
            <div className={styles['flex-end-container']}>
                <Button
                    variant='secondary'
                    onClick={() => queueBackgroundEditsJob(editor, chapterId)}
                    disabled={queueBackgroundEdits.isPending || isEditing}
                >
                    {editBtnText}
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
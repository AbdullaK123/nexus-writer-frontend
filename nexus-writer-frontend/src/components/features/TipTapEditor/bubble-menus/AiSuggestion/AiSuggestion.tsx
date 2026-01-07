import { LineEdit } from "@/app/types"
import { Editor } from "@tiptap/react"
import styles from './AiSuggestion.module.css'
import { BubbleMenu } from "@tiptap/react/menus"
import { Button } from "@/components/ui/Button"
import { useEffect, useState } from "react"
import { Console } from "console"


type AiSuggestionProps = {
    editor: Editor
}

function rejectAiEdit(editor: Editor) {
    // Get the full range of the paragraph with the mark BEFORE any changes
    const { state } = editor
    const { selection } = state
    const { $from } = selection
    
    // Find the parent paragraph
    const paragraph = $from.node($from.depth)
    const paragraphPos = $from.before($from.depth)
    
    // Remove the mark from the entire paragraph
    editor
        .chain()
        .focus()
        .setTextSelection({
            from: paragraphPos + 1,
            to: paragraphPos + paragraph.nodeSize - 1
        })
        .unsetMark('aiEdit')
        .run()
}

function applyAiEdit(editor: Editor) {
    const attrs = editor.getAttributes('aiEdit')
    const { state } = editor
    const { selection } = state
    
    // Get paragraph info BEFORE any changes
    const $pos = state.doc.resolve(selection.from)
    const paragraph = $pos.node($pos.depth)
    const paragraphPos = $pos.before($pos.depth)

    const from = paragraphPos + 1
    const to = paragraphPos + paragraph.nodeSize - 1

    // OPTION 1: Remove mark first, then replace content
    editor
        .chain()
        .focus()
        .setTextSelection({ from, to })
        .unsetMark('aiEdit')  // Remove mark BEFORE inserting
        .insertContent(attrs.editedParagraph)
        .run()
}

export function AiSuggestion({ editor }: AiSuggestionProps) {

    if (!editor) return null

    const [attrs, setAttrs] = useState(() => editor.getAttributes('aiEdit'))

    useEffect(() => {
        if (!editor) return

        const updateAttrs = () => {
            if (editor.isActive('aiEdit')) {
                setAttrs(editor.getAttributes('aiEdit'))
            }
        }

        editor.on('selectionUpdate', updateAttrs)
        editor.on('transaction', updateAttrs)

        return () => {
            editor.off('selectionUpdate', updateAttrs)
            editor.off('transaction', updateAttrs)
        }

    }, [editor])

    return (
        <BubbleMenu
            editor={editor}
            shouldShow={({editor, state}) => {
                try {
                    return editor.isActive('aiEdit')
                } catch {
                    return false  // If there's an error checking, hide the menu
                }
            }}
            options={{
                placement: 'top'
            }}
        >
            <div className={styles["suggestion-container"]}>
                <div className={styles["suggestion-field"]}>
                    Original: {attrs.originalParagraph}
                </div>
                <div className={styles["suggestion-field"]}>
                    Edited: {attrs.editedParagraph}
                </div>
                <div className={styles["suggestion-field"]}>
                    Justification: {attrs.justification}
                </div>
                <div className={styles["suggestion-btns"]}>
                    <Button
                        onMouseDown={(e) => {
                            e.preventDefault()
                            rejectAiEdit(editor)
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        onMouseDown={(e) => {
                            e.preventDefault()
                            applyAiEdit(editor)
                        }}
                    >
                        Apply Edit
                    </Button>
                </div>
            </div>
        </BubbleMenu>
    )
}
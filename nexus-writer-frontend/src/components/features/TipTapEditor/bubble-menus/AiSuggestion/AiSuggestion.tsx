import { LineEdit } from "@/app/types"
import { Editor } from "@tiptap/react"
import styles from './AiSuggestion.module.css'
import { BubbleMenu } from "@tiptap/react/menus"
import { Button } from "@/components/ui/Button"


type AiSuggestionProps = {
    editor: Editor
}

function rejectAiEdit(editor: Editor) {
    editor.chain().focus().unsetMark('aiEdit').run()
}

function applyAiEdit(editor: Editor) {

    const attrs = editor.getAttributes('aiEdit')
    const { state } = editor
    const { selection } = state

    const $pos = state.doc.resolve(selection.from)
    const paragraph = $pos.node($pos.depth)
    const paragraphPos = $pos.before($pos.depth)

    editor
        .chain()
        .focus()
        .setTextSelection({
            from: paragraphPos + 1,
            to: paragraphPos + paragraph.nodeSize - 1
        })
        .insertContent(attrs.editedParagraph)
        .run()

}

export function AiSuggestion({ editor }: AiSuggestionProps) {

    if (!editor) return null

    const attrs = editor.getAttributes('aiEdit')

    return (
        <BubbleMenu
            editor={editor}
            shouldShow={({editor, state}) => {
                return editor.isActive('aiEdit')  
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
                        onClick={() => rejectAiEdit(editor)}
                    >
                        Reject
                    </Button>
                    <Button
                        onClick={() => applyAiEdit(editor)}
                    >
                        Apply Edit
                    </Button>
                </div>
            </div>
        </BubbleMenu>
    )
}
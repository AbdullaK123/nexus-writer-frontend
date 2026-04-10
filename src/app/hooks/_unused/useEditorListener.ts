import { type LexicalEditor } from "lexical"
import { Callback } from "@/app/types"
import { useEffect } from "react"


export function useEditorListener(editor: LexicalEditor, callback: Callback) {
    useEffect(() => {
        const unregister = editor.registerUpdateListener(callback)
        return unregister
    }, [editor, callback])
}
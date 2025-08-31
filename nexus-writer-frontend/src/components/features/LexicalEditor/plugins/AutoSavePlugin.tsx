import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChapters } from "@/app/hooks/useChapters";
import { AutoSavePluginProps } from "@/app/types";

export default function AutoSavePlugin({ storyId, chapterId, intervalMs = 2000 }: AutoSavePluginProps) {
    const [editor] = useLexicalComposerContext();
    const lastContentRef = useRef<string>('')
    const {
        update,
        updateError,
        updateSuccess
    } = useChapters(storyId);

    useEffect(() => {
        if (updateSuccess) {
            console.log('The autosaving is working!')
        }
    }, [updateSuccess])

    useEffect(() => {
        if (updateError) {
            console.log('The plug in is not working! Check the logs!')
        }
    }, [updateError])

    useEffect(() => {
        editor.getEditorState().read(() => {
            lastContentRef.current = JSON.stringify(editor.getEditorState().toJSON())
        })

        const interval = setInterval(() => {
                const currentContent = JSON.stringify(editor.getEditorState().toJSON())

                if (currentContent !== lastContentRef.current) {
                    console.log('Saving changes...')
                    update({
                        chapterId: chapterId,
                        requestBody: {
                            content: currentContent
                        }
                    })
                    lastContentRef.current = currentContent
                }
        }, intervalMs)

        return () => clearInterval(interval)
    }, [editor, chapterId, update, intervalMs])

    return null;
}
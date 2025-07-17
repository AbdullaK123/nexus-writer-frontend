import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChapters } from "@/app/hooks/useChapters";

interface AutoSavePluginProps {
    storyId: string;
    chapterId: string;
    intervalMs?: number;
}

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

    // listen for updates
    useEffect(() => {

        // get current editor content and init the ref with its content
        editor.getEditorState().read(() => {
            lastContentRef.current = JSON.stringify(editor.getEditorState().toJSON())
        })

        // set up an interval to check if content has changed every 2s and if it has save the content and update the current content reference
        const interval = setInterval(() => {

                // get the current content
                const currentContent = JSON.stringify(editor.getEditorState().toJSON())

                // check if the content has changed
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

        // clean up the interval to prevent memory leaks
        return () => clearInterval(interval)

    }, [editor, chapterId, update, intervalMs])


    // manual listener for ctrl + S saving
    useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                console.log('Manual save detected. Updating content...')
                editor.getEditorState().read(() => {
                    const content = JSON.stringify(editor.getEditorState().toJSON())
                    update({
                        chapterId: chapterId,
                        requestBody: {
                            content: content
                        }
                    })
                    lastContentRef.current  = content
                })
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)

    }, [editor, update, chapterId])



    return null;
}
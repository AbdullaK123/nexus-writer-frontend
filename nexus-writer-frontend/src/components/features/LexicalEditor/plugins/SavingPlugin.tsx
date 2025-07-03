import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChapters } from "@/app/hooks/useChapters";
import { 
    KEY_DOWN_COMMAND,
    COMMAND_PRIORITY_HIGH
 } from "lexical";

interface SavePluginProps {
    storyId: string;
    chapterId: string;
}

export default function SavePlugin( { storyId, chapterId } : SavePluginProps ) {
    const [editor] = useLexicalComposerContext()
    const {
        update,
        isUpdating,
        updateError,
        updateSuccess
    } = useChapters(storyId)

    // define the handler func
    const handlerFn = (e: KeyboardEvent | null) => {
        if (e) e.preventDefault(); // no default behavoir

        if (e?.ctrlKey && e.key === 's') {
            // get current lexical json content of the editor
            const content = JSON.stringify(editor.getEditorState().toJSON())

            // call the update api endpoint
            update({
                chapterId: chapterId, 
                requestBody: {
                    content: content
                }
            })

            // return true if its handled otherwise false
            return true
        }

        return false

    }

    // register CTRL + S as a save command
    useEffect(() => {
        editor.registerCommand(
            KEY_DOWN_COMMAND,
            handlerFn,
            COMMAND_PRIORITY_HIGH
        )
    }, [editor])

    // return null because we don't want to render anything
    return null
}
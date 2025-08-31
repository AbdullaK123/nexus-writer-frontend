import { ManualSavePluginProps } from "@/app/types";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChapters } from "@/app/hooks/useChapters";
import { useEffect, useRef } from "react";


export default function ManualSavePlugin({ storyId, chapterId }: ManualSavePluginProps) {
    const [editor] = useLexicalComposerContext();
    const { update } = useChapters(storyId);
    const lastContentRef = useRef<string>('');


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
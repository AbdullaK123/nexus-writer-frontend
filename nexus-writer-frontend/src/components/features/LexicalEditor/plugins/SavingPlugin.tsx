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

export default function SavePlugin({ storyId, chapterId }: SavePluginProps) {
    const [editor] = useLexicalComposerContext();
    const {
        update,
        isUpdating,
        updateError,
        updateSuccess
    } = useChapters(storyId);

    // Register CTRL + S as a save command
    useEffect(() => {
        // Define handler function INSIDE useEffect to avoid stale closures
        const handlerFn = (e: KeyboardEvent | null) => {
            if (e?.ctrlKey && e.key === 's') {
                console.log('Ctrl+S detected, preventing default'); 
                e.preventDefault(); // Prevent browser's default save
                
                // Get current lexical json content of the editor
                const content = JSON.stringify(editor.getEditorState().toJSON());

                // Call the update api endpoint
                update({
                    chapterId: chapterId, 
                    requestBody: {
                        content: content
                    }
                });

                return true; // Command handled
            }
            return false; // Let other handlers process
        };

        // Register command and return cleanup function
        return editor.registerCommand(
            KEY_DOWN_COMMAND,
            handlerFn,
            COMMAND_PRIORITY_HIGH
        );
    }, [editor, chapterId, update]); // All dependencies are fresh

    // Debugging and user feedback
    useEffect(() => {
        if (updateSuccess) {
            console.log('Chapter saved successfully!');
            // Could show a toast notification here
        }
        if (updateError) {
            console.error('Failed to save chapter:', updateError);
            // Could show error notification here
        }
    }, [updateSuccess, updateError]);

    return null;
}
import { ManualSavePluginProps } from "@/app/types";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChapters } from "@/app/hooks/useChapters";
import { useShortcut } from "@/app/hooks/useShortcut";


export default function ManualSavePlugin({ storyId, chapterId }: ManualSavePluginProps) {
    const [editor] = useLexicalComposerContext();
    const { update } = useChapters(storyId);


     const handleManualSave = () => {
        console.log('Manual save detected. Updating content...');
        editor.getEditorState().read(() => {
            const content = JSON.stringify(editor.getEditorState().toJSON());
            update({
                chapterId: chapterId,
                requestBody: { content: content },
            });
        });
    };

    useShortcut([{ key: 's', ctrlKey: true, callback: handleManualSave }]);

    return null;
}
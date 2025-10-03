import { useStories } from "@/app/hooks/useStories"
import { EditableStoryTitleProps } from "@/app/types";
import { useEditable } from "@/app/hooks/useEditable";
import { Input } from "@/components/ui/Input";

export default function EditableStoryTitle({ storyId, title }: EditableStoryTitleProps) {
    const { update, isUpdating } = useStories();

    const handleSave = (newTitle: string) => {
        update({ storyId, body: { title: newTitle } });
    };

    const { isEditing, value, setValue, ref, handleDoubleClick, handleKeyDown } = useEditable({
        initialValue: title,
        onSave: handleSave,
    });

    return (
        <div onDoubleClick={handleDoubleClick} ref={ref}>
            {isEditing ? (
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <h2>{isUpdating ? 'Updating...' : title}</h2>
            )}
        </div>
    );
}
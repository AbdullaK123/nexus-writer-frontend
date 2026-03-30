'use client'
import { useStories } from "@/app/hooks/useStories"
import { EditableStoryTitleProps } from "./types";
import { useEditable } from "@/app/hooks/useEditable";
import { Input } from "@/components/ui/Input";
import styles from './EditableTitle.module.css';

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
        <div
            onDoubleClick={handleDoubleClick}
            ref={ref}
            className={styles['editable-container']}
            title="Double-click to edit"
        >
            {isEditing ? (
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <>
                    <h2>{isUpdating ? 'Updating...' : title}</h2>
                    <span className={styles['edit-hint']} aria-hidden="true">✎</span>
                </>
            )}
        </div>
    );
}
'use client'
import { useStories } from "@/app/hooks/useStories"
import { EditableStoryTitleProps } from "./types";
import { useEditable } from "@/app/hooks/useEditable";
import { Input } from "@/components/ui/Input";
import * as Tooltip from "@radix-ui/react-tooltip";
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
        <Tooltip.Provider delayDuration={400}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <div
                        onDoubleClick={handleDoubleClick}
                        ref={ref}
                        className={styles['editable-container']}
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
                </Tooltip.Trigger>
                {!isEditing && (
                    <Tooltip.Portal>
                        <Tooltip.Content className={styles['tooltip-content']} sideOffset={5}>
                            Double-click to edit
                            <Tooltip.Arrow className={styles['tooltip-arrow']} />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                )}
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
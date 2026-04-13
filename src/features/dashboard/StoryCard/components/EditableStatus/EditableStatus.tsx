'use client'
import React, { useState, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { useStories } from "@/data/hooks/useStories";
import styles from './EditableStatus.module.css'
import { useToast } from "@/shared/providers/ToastProvider";


type EditableStoryStatusProps = {
    storyId: string;
    status: "Complete" | "Ongoing" | "On Hiatus" ;
}

const statusOptions = [
    {value: "Complete", label: "Complete"},
    {value: "Ongoing", label: "Ongoing"},
    {value: "On Hiatus", label: "On Hiatus"}
]

export default function EditableStatus({
    storyId,
    status
}: EditableStoryStatusProps) {
    const { showToast } = useToast();
    const [storyStatus, setStoryStatus] = useState(status)
    const {
        update,
        updatedStory,
        isUpdated,
        isUpdating,
        updateError
    } = useStories()

    useEffect(() => {
        if (isUpdated && updatedStory?.status) {
            showToast('Successfully updated status!', 'success')
            setStoryStatus(updatedStory?.status)
        }
    }, [isUpdated, updatedStory, showToast])

    useEffect(() => {
        if (updateError) {
            showToast('Failed to update story status. Check server logs', 'error')
            return
        }
    }, [updateError, showToast])

    const getStatusClass = (s: string) => {
        switch(s) {
            case 'Complete': return 'status-completed'
            case 'On Hiatus': return 'status-onhiatus'
            default: return 'status-ongoing'
        }
    }

    const handleValueChange = (newStatus: string) => {
        const typedStatus = newStatus as "Complete" | "Ongoing" | "On Hiatus"
        setStoryStatus(typedStatus)
        update({
            storyId: storyId,
            body: { status: typedStatus }
        })
    }

    if (isUpdating) {
        return (
            <div className={styles['editable-status-container']}>
                <span className="status-badge status-ongoing">Updating status...</span>
            </div>
        )
    }

    return (
        <div className={styles['editable-status-container']}>
            <Select.Root value={storyStatus} onValueChange={handleValueChange}>
                <Select.Trigger className={`status-badge ${getStatusClass(storyStatus)} ${styles['select-trigger']}`}>
                    <Select.Value />
                    <Select.Icon className={styles['select-icon']}>
                        <span aria-hidden="true">▾</span>
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className="select-content" position="popper" sideOffset={4}>
                        <Select.Viewport className="select-viewport">
                            {statusOptions.map((item) => (
                                <Select.Item 
                                    key={item.value} 
                                    value={item.value} 
                                    className="select-item"
                                >
                                    <Select.ItemText>{item.label}</Select.ItemText>
                                    <Select.ItemIndicator className="select-indicator">
                                        ✓
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
}
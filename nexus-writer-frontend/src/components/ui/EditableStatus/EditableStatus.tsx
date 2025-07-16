import React, { useState, useRef, useEffect } from "react";
import { useStories } from "@/app/hooks/useStories";
import styles from './EditableStatus.module.css'


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
    const [isEdititing, setIsEditing] = useState(false)
    const [storyStatus, setStoryStatus] = useState(status)
    const componentRef = useRef(null)
    const {
        update,
        updatedStory,
        isUpdated,
        isUpdating,
        updateError
    } = useStories()

    useEffect(() => {
        if (isUpdated && updatedStory?.status) {
            alert('Successfully updated status!')
            setIsEditing(false)
            setStoryStatus(updatedStory?.status)
        }
    }, [isUpdated, updatedStory])

    useEffect(() => {
        if (updateError) {
            alert('Failed to update story status. Check server logs')
            return
        }
    }, [updateError])

    useEffect(() => {
        const handleClickOutside  = (e) => {
            if (!isEdititing) return;
            
            if (componentRef.current && !componentRef.current.contains(e.target)) {
                setIsEditing(false)
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isEdititing])

    const getStatusSpan = (status: string) => {
        const baseClass = styles['status-badge'];
        
        switch(status) {
            case 'Complete':
                return <span className={`${baseClass} ${styles['completed-span']}`}>Complete</span>
            case 'On Hiatus':
                return <span className={`${baseClass} ${styles['onhaitus-span']}`}>On Hiatus</span>
            default:
                return <span className={`${baseClass} ${styles['ongoing-span']}`}>Ongoing</span>
        }
    }

    const handleOnKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsEditing(false)
            setStoryStatus(status)
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as "Complete" | "Ongoing" | "On Hiatus"
        console.log(newStatus)
        setStoryStatus(newStatus)
        setIsEditing(false)

        update({
            storyId: storyId,
            body: {
                status: newStatus
            }
        })

    }

    return (
        <div
            ref={componentRef}
            onDoubleClick={() => setIsEditing(true)}
        >
            {isEdititing ? (
                <select
                    className={styles['status-select']}
                    value={storyStatus}
                    onKeyDown={handleOnKeyDown}
                    onChange={handleOnChange}
                    autoFocus
                >
                    {statusOptions.map((item) =>{
                        return (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        )
                    })}
                </select>
            ): (
                isUpdating ? (
                    <span className={`${styles['status-badge']} ${styles['ongoing-span']}`}>Updating status...</span>
                ) : (
                    getStatusSpan(storyStatus)
                )
            )}
        </div>
    )

}
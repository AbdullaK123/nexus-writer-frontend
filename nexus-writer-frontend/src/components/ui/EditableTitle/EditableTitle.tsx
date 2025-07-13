import { useState, useEffect, useRef } from "react"
import { useStories } from "@/app/hooks/useStories"

type EditableStoryTitleProps = {
    storyId: string;
    title: string;
}

export default function EditableStoryTitle({
    storyId,
    title
}: EditableStoryTitleProps) {

    const [storyTitle, setStoryTitle] = useState(title)
    const [isEdititing, setIsEditing] = useState(false)
    const componentRef = useRef(null)
    const {
        update,
        updatedStory,
        isUpdated,
        updateError,
        isUpdating
    } = useStories()

    useEffect(() => {
        if (updateError) {
            alert('Failed to update story title')
            return
        }
    }, [updateError])

    useEffect(() => {
        if (isUpdated) {
            alert('Successfully updated story title')
            return
        }
    }, [isUpdated])

    useEffect(() => {
        if (isUpdated && updatedStory?.title) {
            setStoryTitle(updatedStory?.title)
        }
    }, [isUpdated, updatedStory])

    useEffect(() => {

        if (!isEdititing) return;

        const handleClickOutside = (e) => {
            if (componentRef.current && !componentRef.current.contains(e.target)) {
                console.log('Clicked outside!')
                setIsEditing(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isEdititing])


    const handleOnKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setIsEditing(false)
            console.log('Updating story title...')
            update({
                storyId: storyId,
                body: {
                    title: storyTitle
                }
            })
        }
        if (e.key === "Escape") {
            setIsEditing(false)
            setStoryTitle(title)
        }
    }

    const handleOnDoubleClick = () => {
        setIsEditing(true)
    }

    return (
        <div
            onDoubleClick={handleOnDoubleClick}
            ref={componentRef} 
        >
           {isEdititing ? (
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={storyTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStoryTitle(e.target.value)}
                    onKeyDown={handleOnKeyDown}
                    autoFocus
                />
            ): (
                <h2>{isUpdating ? 'Updating story title...' : storyTitle}</h2>
            )}
        </div>
    )
}
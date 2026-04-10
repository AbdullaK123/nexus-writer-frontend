import { useCallback, useEffect } from "react"
import { useStories } from "./useStories"
import { useToast } from "@/app/hooks/common/useToast"

export function useStoryContextMenuActions(storyId: string) {
    const { showToast } = useToast()
    const {
        deleteStory,
        isDeleting,
        deleteError
    } = useStories()

    const onShowErrorToast = useCallback((msg: string) => showToast(msg, "error"), [showToast]);

    const handleOnAction = (action: string) => {
        if (action === 'delete') {
            deleteStory(storyId)
        }
    }

    useEffect(() => {
         if (deleteError) {
             onShowErrorToast('Failed to delete story. Check server logs')
             return
         }
     }, [deleteError, onShowErrorToast])

     return {
        isDeleting,
        handleOnAction
     }

}
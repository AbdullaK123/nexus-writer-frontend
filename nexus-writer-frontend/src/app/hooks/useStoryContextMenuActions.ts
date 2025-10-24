import { useContextMenu } from "./useContextMenu"
import { useCallback, useEffect } from "react"
import { useStories } from "./useStories"
import { useToast } from "./useToast"

export function useStoryContextMenuActions(storyId: string) {
    const {menu, openMenu, closeMenu} = useContextMenu()
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
            closeMenu()
        }
    }

    useEffect(() => {
         if (deleteError) {
             onShowErrorToast('Failed to delete story. Check server logs')
             return
         }
     }, [deleteError, onShowErrorToast])

     return {
        menu,
        openMenu,
        closeMenu,
        isDeleting,
        handleOnAction
     }

}
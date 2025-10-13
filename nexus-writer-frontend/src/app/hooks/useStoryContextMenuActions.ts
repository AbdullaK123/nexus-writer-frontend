import { useContextMenu } from "./useContextMenu"
import { useCallback, useEffect } from "react"
import { useInView } from "./useInView"
import { useStories } from "./useStories"
import { useToast } from "./useToast"

export function useStoryContextMenuActions(storyId: string) {
    const {menu, openMenu, closeMenu} = useContextMenu()
    const {isInView, elementRef} = useInView(1, closeMenu)
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

     useEffect(() =>  {
         if (!isInView) {
             closeMenu()
         }
     }, [isInView, closeMenu])

     return {
        menu,
        openMenu,
        closeMenu,
        isDeleting,
        handleOnAction,
        isInView,
        elementRef
     }

}
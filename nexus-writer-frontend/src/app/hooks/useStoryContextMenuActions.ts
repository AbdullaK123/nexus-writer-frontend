import { useContextMenu } from "./useContextMenu"
import { useRef, useEffect } from "react"
import { useInView } from "./useInView"
import { useStories } from "./useStories"

export function useStoryContextMenuActions(storyId: string) {
    const {menu, openMenu, closeMenu} = useContextMenu()
    const containerRef = useRef<HTMLDivElement>(null)
    const [isInView] = useInView(1)
    const {
        deleteStory,
        isDeleting,
        deleteError
    } = useStories()

    const handleOnAction = (action: string) => {
        if (action === 'delete') {
            deleteStory(storyId)
            closeMenu()
        }
    }

    useEffect(() => {
         if (deleteError) {
             alert('Failed to delete story. Check server logs')
             return
         }
     }, [deleteError])

     useEffect(() =>  {
         if (!isInView) {
             closeMenu()
         }
     }, [isInView, closeMenu])

     useEffect(() => {
         if (!menu.visible) return;

         const handleClickOutside = (e: MouseEvent) => {
             const target = e.target as HTMLElement;
             
             // Only close if click is outside the entire container
             if (containerRef.current && !containerRef.current.contains(target)) {
                 closeMenu();
             }
         };

         document.addEventListener('mousedown', handleClickOutside);
         return () => document.removeEventListener('mousedown', handleClickOutside);
     }, [menu.visible, closeMenu]);

     return {
        menu,
        openMenu,
        closeMenu,
        containerRef,
        isDeleting,
        handleOnAction,
        isInView
     }

}
import { useEffect, useState, useRef } from "react"
import { useChapters } from "./useChapters"
import { useContextMenu } from "./useContextMenu"

export function useChapterTitleActions(
    storyId: string, 
    chapterId: string,
    title: string,
    handleOnClick: () => void, 
    handleClearSelection: () => void
) {
    const { menu, openMenu, closeMenu } = useContextMenu()
    const { 
        deleteChapter,
        isDeleting,
        deleteError,
        deleteSuccess,
        update,
        isUpdating,
        updateError,
        updateSuccess
    } = useChapters(storyId)
    const [updatingTitle, setUpdatingTitle] = useState(false)
    const [chapterTitle, setChapterTitle] = useState(title)
    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
          if (updatingTitle) {
              inputRef.current?.focus()
              inputRef.current?.select()
          }
    }, [updatingTitle])

    useEffect(() => {
        if (updateSuccess) {
            setUpdatingTitle(false)
            handleOnClick()
        }
    }, [updateSuccess])
    
    useEffect(() => {
        if (deleteSuccess) {
            handleClearSelection()
        }
    }, [deleteSuccess])

    useEffect(() => {
        if (updateError) {
            alert(`Failed to update chapter. Check server logs.`)
            return
        }
    }, [updateError])
    
    useEffect(() => {
        if (deleteError) {
            alert('Failed to delete chapter. Check server logs.')
            return
        }
    }, [deleteError])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterTitle(e.target.value)
    }
    
    const handleOnDoubleClick = () => {
        setUpdatingTitle(true)
    }
    
    const handleOnEnterDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            setUpdatingTitle(false)
            update({ chapterId: chapterId, requestBody: { title: chapterTitle} })
        }
        if (e.key === "Escape") {
            setUpdatingTitle(false)
            setChapterTitle(title) 
        }
    }

    const handleOnAction = (action: string) => {
        if (action !== 'delete') return;
        deleteChapter(chapterId)
        closeMenu()
    }

    return {
        menu,
        openMenu,
        closeMenu,
        chapterTitle,
        updatingTitle,
        isUpdating,
        isDeleting,
        inputRef,
        handleOnChange,
        handleOnDoubleClick,
        handleOnEnterDown,
        handleOnAction
    }
}
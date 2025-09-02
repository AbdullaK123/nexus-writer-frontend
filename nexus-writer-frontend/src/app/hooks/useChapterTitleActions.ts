/* eslint-disable react-hooks/exhaustive-deps */
import { useChapters } from "./useChapters";
import { useContextMenu } from "./useContextMenu";
import { useEditable } from "./useEditable"; // Import the new hook
import { useEffect } from "react";

export function useChapterTitleActions(
    storyId: string, 
    chapterId: string,
    title: string,
    handleOnClick: () => void, 
    handleClearSelection: () => void
) {
    const { menu, openMenu, closeMenu } = useContextMenu();
    const { 
        deleteChapter, 
        isDeleting, 
        deleteError, 
        deleteSuccess, 
        update, 
        isUpdating,
        updateError, 
        updateSuccess
     } = useChapters(storyId);

    const handleSave = (newTitle: string) => {
        update({ chapterId, requestBody: { title: newTitle } });
    };

    const { 
        isEditing, 
        value, 
        setValue, 
        ref, 
        handleDoubleClick, 
        handleKeyDown
     } = useEditable({
        initialValue: title,
        onSave: handleSave,
    });

    useEffect(() => {
        if (updateSuccess) {
            handleOnClick();
        }
    }, [updateSuccess]);

    useEffect(() => {
        if (deleteSuccess) {
            handleClearSelection();
        }
    }, [deleteSuccess]);

    useEffect(() => {
        if (updateError) alert(`Failed to update chapter. Check server logs.`);
    }, [updateError]);

    useEffect(() => {
        if (deleteError) alert('Failed to delete chapter. Check server logs.');
    }, [deleteError]);

    const handleOnAction = (action: string) => {
        if (action === 'delete') {
            deleteChapter(chapterId);
            closeMenu();
        }
    };

    return {
        menu,
        openMenu,
        closeMenu,
        isEditingTitle: isEditing, 
        titleValue: value,        
        setTitleValue: setValue,  
        containerRef: ref,        
        isUpdating,
        isDeleting,
        handleOnAction,
        handleTitleDoubleClick: handleDoubleClick, 
        handleTitleKeyDown: handleKeyDown,         
    };
}
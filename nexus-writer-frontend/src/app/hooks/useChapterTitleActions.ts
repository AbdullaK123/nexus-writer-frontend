import { useChapters } from "./useChapters";
import { useContextMenu } from "./useContextMenu";
import { useEditable } from "./useEditable"; // Import the new hook
import { useEffect, useRef } from "react";
import { useToast } from "./useToast";

export function useChapterTitleActions(
    storyId: string, 
    chapterId: string,
    title: string,
    handleOnClick: () => void, 
    handleClearSelection: () => void
) {
    const { showToast } = useToast();
    const handleOnClickRef = useRef(handleOnClick);
    const handleClearSelectionRef = useRef(handleClearSelection);
    
    // Update refs when callbacks change
    handleOnClickRef.current = handleOnClick;
    handleClearSelectionRef.current = handleClearSelection;
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
            handleOnClickRef.current()
        }
    }, [updateSuccess]);

    useEffect(() => {
        if (deleteSuccess) {
            handleClearSelectionRef.current()
        }
    }, [deleteSuccess]);

    useEffect(() => {
        if (updateError) showToast('Failed to update chapter. Check server logs.', 'error');
    }, [updateError, showToast]);

    useEffect(() => {
        if (deleteError) showToast('Failed to delete chapter. Check server logs.', 'error');
    }, [deleteError, showToast]);

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
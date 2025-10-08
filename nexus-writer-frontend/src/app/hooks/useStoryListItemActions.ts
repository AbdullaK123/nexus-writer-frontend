import {useContextMenu} from "@/app/hooks/useContextMenu";
import {useRef} from "react";
import {TargetResponse} from "@/app/types";


export function useStoryListItemActions(
    storyId: string,
    handleOnClick: () => void,
    handleClearSelection: () => void,
    handleOnShowTargetForm: (mode: 'creating' | 'editing' | 'deleting', target?: TargetResponse, storyId?: string) => void
) {

    const {
        menu,
        openMenu: baseOpenMenu,
        closeMenu
    } = useContextMenu()

    const handleOnShowTargetFormRef = useRef(handleOnShowTargetForm);
    handleOnShowTargetFormRef.current = handleOnShowTargetForm;
    
    const handleOnClickRef = useRef(handleOnClick);
    handleOnClickRef.current = handleOnClick;

    // When opening the context menu, also select the story
    const openMenu = (e: React.MouseEvent) => {
        handleOnClickRef.current(); // Select this story first
        baseOpenMenu(e); // Then open the menu
    }

    const handleOnAction = (
        action: 'Create a Target' | 'Update a Target' | 'Delete a Target',
        target?: TargetResponse
    ) => {
        if (action === 'Create a Target') {
            // logic for showing modal form for creating target
            handleOnShowTargetFormRef.current('creating', undefined, storyId)
        } else if (action === 'Update a Target') {
            // logic for showing modal form for updating target
            handleOnShowTargetFormRef.current('editing', target, storyId)
        } else {
            // logic for showing target delete form
            handleOnShowTargetFormRef.current('deleting', target, storyId)
        }
        closeMenu();
    }

    return {
        menu,
        openMenu,
        closeMenu,
        handleOnAction
    }
}
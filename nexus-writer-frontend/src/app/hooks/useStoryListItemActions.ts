import {useContextMenu} from "@/app/hooks/useContextMenu";
import {useRef} from "react";


export function useStoryListItemActions(
    storyId: string,
    handleOnClick: () => void,
    handleClearSelection: () => void,
) {

    const {
        menu,
        openMenu,
        closeMenu
    } = useContextMenu()

    const handleOnClickRef = useRef(handleOnClick);
    const handleClearSelectionRef = useRef(handleClearSelection);
    handleOnClickRef.current = handleOnClick;
    handleClearSelectionRef.current = handleClearSelection;

    const handleOnAction = (action: string) => {
        if (action === 'Create Target') {
            // logic for showing modal form for creating target
        } else if (action === 'Update Target') {
            // logic for showing modal form for updating target
        } else {
            // logic for showing target delete form
        }
    }

    return {
        menu,
        openMenu,
        closeMenu,
        handleOnAction,
        handleOnClick: handleOnClickRef.current,
        handleClearSelection: handleClearSelectionRef.current
    }
}
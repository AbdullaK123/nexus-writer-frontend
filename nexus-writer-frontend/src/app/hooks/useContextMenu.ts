import React, { useState, useCallback } from "react";

export function useContextMenu() {
    // state with menu visibility and coordinates
    const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 })

    // handler to show the menu
    const openMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY
        })
    }

    // handler to close the menu
    const closeMenu = useCallback(() => {
        setMenu({
            visible: false,
            x: 0,
            y: 0
        })
    }, [])

    // return the state and the handlers
    return {
        menu: menu,
        openMenu: openMenu,
        closeMenu: closeMenu
    }
}
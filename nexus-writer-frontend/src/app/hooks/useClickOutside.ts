import React, { useEffect, useRef } from "react";


export function useOnClickOutside(componentRef, callback) {
    
    useEffect(() => {

        const handleClickOutside = (e) => {
            if (componentRef && !componentRef.current.contains(e.target)) {
                callback()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [callback])

    return componentRef
}
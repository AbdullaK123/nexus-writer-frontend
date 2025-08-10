import { Callback } from "../types"
import { useRef, useCallback } from "react"


export function useTypingState(onStart: Callback, onStop: Callback) {
    // state we want to track without rerenders
    const stateRef = useRef({
        isTyping: false,
        timer: null
    })

    const handleOnTyping = useCallback(() => {
        const { current } = stateRef
        if(!current.isTyping) {
            current.isTyping = true
            onStart()
        }
    }, [onStart])


    const scheduleStop = useCallback((delay: number) => {
        const { current } = stateRef
        clearTimeout(current.timer)
        current.timer = setTimeout(() => {
            current.isTyping = false 
            onStop()
        }, delay)
    }, [onStop])

    return {
        handleOnTyping,
        scheduleStop
    }
}
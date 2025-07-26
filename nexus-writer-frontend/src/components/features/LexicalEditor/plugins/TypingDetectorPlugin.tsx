import { LexicalEditor } from 'lexical';
import { useCallback, useEffect, useRef } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Callback = () => void;
type TypingDetectorPluginProps = {
    onStart: Callback;
    onStop: Callback;
    delay: number;
}

function useTypingState(onStart: Callback, onStop: Callback) {
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

function useEditorListener(editor: LexicalEditor, callback: Callback) {
    useEffect(() => {
        const unregister = editor.registerUpdateListener(callback)
        return unregister
    }, [editor, callback])
}

export default function TypingDetectorPlugin({ onStart, onStop, delay }: TypingDetectorPluginProps) {
    const [editor] = useLexicalComposerContext()
    const { handleOnTyping, scheduleStop } = useTypingState(onStart, onStop)

    const handleTypingEvents = useCallback(() => {
        handleOnTyping()
        scheduleStop(delay)
    }, [handleOnTyping, scheduleStop, delay])

    useEditorListener(editor, handleTypingEvents)

    return null
}
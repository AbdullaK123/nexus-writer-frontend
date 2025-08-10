/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTypingState } from '@/app/hooks/useTypingState';
import { useEditorListener } from '@/app/hooks/useEditorListener';
import { TypingDetectorPluginProps } from '@/app/types';
import { useCallback } from 'react';


export default function TypingDetectorPlugin({ 
    storyId,
    chapterId,
    onStart, 
    onStop, 
    delay
 }: TypingDetectorPluginProps) {
    const [editor] = useLexicalComposerContext()
    const { handleOnTyping, scheduleStop } = useTypingState(onStart, onStop)

    const handleTypingEvents = useCallback(() => {
        handleOnTyping()
        scheduleStop(delay)
    }, [handleOnTyping, scheduleStop, delay])

    useEditorListener(editor, handleTypingEvents)

    return null
}
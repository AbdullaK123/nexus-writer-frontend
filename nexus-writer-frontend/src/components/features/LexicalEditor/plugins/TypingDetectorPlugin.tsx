import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTypingState } from '@/app/hooks/useTypingState';
import { useEditorListener } from '@/app/hooks/useEditorListener';
import { TypingDetectorPluginProps } from '@/app/types';
import { useCallback } from 'react';
import { useWritingSessionTracking } from '@/app/hooks/useWritingSessionTracking';


export default function TypingDetectorPlugin({ 
    storyId,
    chapterId,
    userId,
    delay
 }: TypingDetectorPluginProps) {
    const [editor] = useLexicalComposerContext()
    const { handleWebSocketEvent } = useWritingSessionTracking(storyId, chapterId, userId)
    const onSessionStart = () => handleWebSocketEvent('session_start')
    const onSessionEnd = () => handleWebSocketEvent('session_end')
    const { handleOnTyping, scheduleStop } = useTypingState(onSessionStart, onSessionEnd)

    const handleTypingEvents = useCallback(() => {
        handleOnTyping()
        scheduleStop(delay)
    }, [handleOnTyping, scheduleStop, delay])

    useEditorListener(editor, handleTypingEvents)

    return null
}
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTypingState } from '@/app/hooks/useTypingState';
import { useEditorListener } from '@/app/hooks/useEditorListener';
import { useCallback } from 'react';

type TypingDetectorPluginProps = {
    storyId: string;
    chapterId: string;
    userId: string;
    delay: number;
}


export default function TypingDetectorPlugin({ 
    delay
 }: TypingDetectorPluginProps) {
    const [editor] = useLexicalComposerContext()
    // Legacy: useWritingSessionTracking doesn't work with Lexical, so we provide dummy handlers
    const onSessionStart = () => {}
    const onSessionEnd = () => {}
    const { handleOnTyping, scheduleStop } = useTypingState(onSessionStart, onSessionEnd)

    const handleTypingEvents = useCallback(() => {
        handleOnTyping()
        scheduleStop(delay)
    }, [handleOnTyping, scheduleStop, delay])

    useEditorListener(editor, handleTypingEvents)

    return null
}
import { useWebsocket } from "./useWebsocket";
import { AnalyticsEvent } from "../types";
import { v4 } from 'uuid'
import { $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useRef } from "react";

const getWordCount = (text: string) => {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

export function useWritingSessionTracking(storyId: string, chapterId: string, userId: string) {
    const socket = useWebsocket()
    const [editor] = useLexicalComposerContext()

    const sessionIdRef = useRef(v4())
    const sessionId = sessionIdRef.current

    const handleWebSocketEvent = (event: string) => {

        const wordCount = editor.read(() => {
            return getWordCount($getRoot().getTextContent())
        })

        const data: AnalyticsEvent = {
            sessionId: sessionId,
            storyId: storyId,
            chapterId: chapterId,
            userId: userId,
            timestamp: new Date().toISOString(),
            wordCount: wordCount
        }

        socket.emit(event, data)
    }

    return {
        sessionId,
        handleWebSocketEvent
    }
}   
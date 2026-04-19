import { useWebsocket } from "@/shared/providers/SocketProvider";
import { v4 } from 'uuid'
import { useRef, useEffect } from "react";
import { Editor } from "@tiptap/react";

type WritingSessionEvent = {
    sessionId: string;
    storyId: string;
    chapterId: string;
    userId: string;
    timestamp: string;
    wordCount: number;
}

const getWordCount = (text: string) => {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

export function useWritingSessionTracking(
  editor: Editor | null, 
  storyId: string, 
  chapterId: string, 
  userId: string
) {
    const socket = useWebsocket()
    const sessionIdRef = useRef(v4())
    
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null)
    const isTypingRef = useRef(false)

    useEffect(() => {
      if (!editor) return
      
      const handleUpdate = () => {
        // Started typing
        if (!isTypingRef.current) {
          isTypingRef.current = true
          
          socket.emit('session_start', {
            sessionId: sessionIdRef.current,
            storyId,
            chapterId,
            userId,
            timestamp: new Date().toISOString(),
            wordCount: getWordCount(editor.getText())
          } as WritingSessionEvent)
        }
        
        // Reset timer
        clearTimeout(typingTimerRef.current)
        
        // Set stop timer
        typingTimerRef.current = setTimeout(() => {
          isTypingRef.current = false
          
          socket.emit('session_end', {
            sessionId: sessionIdRef.current,
            storyId,
            chapterId,
            userId,
            timestamp: new Date().toISOString(),
            wordCount: getWordCount(editor.getText())
          } as WritingSessionEvent)
        }, 2000)
      }
      
      editor.on('update', handleUpdate)
      
      return () => {
        editor.off('update', handleUpdate)
        clearTimeout(typingTimerRef.current)
      }
    }, [editor, socket, storyId, chapterId, userId])
}
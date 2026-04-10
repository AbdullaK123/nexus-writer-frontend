import { Extension } from '@tiptap/core'

// Helper function to count words from editor text
const countWords = (text: string): number => {
    if (!text || text.trim().length === 0) {
        return 0
    }
    return text.split(/\s+/).filter(s => s.trim().length > 0).length
}

export const WordCounter = Extension.create({
    name: 'wordCounter',
    addStorage() {
        return {
            words: 0
        }
    },
    onCreate() {
        // Count words after editor is fully initialized with initial content
        const text = this.editor.getText()
        this.storage.words = countWords(text)
    },
    onUpdate() {
        // Count words on every update (typing, paste, etc.)
        const text = this.editor.getText()
        this.storage.words = countWords(text)
    }
})
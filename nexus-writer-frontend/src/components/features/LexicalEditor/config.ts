import { BOLD_STAR, BOLD_UNDERSCORE, HEADING, ITALIC_STAR, QUOTE } from "@lexical/markdown"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"


 // Sci-fi themed editor configuration
export const SCIFI_THEME = {
  heading: {
    h1: 'lexical-h1',
    h2: 'lexical-h2', 
    h3: 'lexical-h3',
    h4: 'lexical-h4',
    h5: 'lexical-h5',
    h6: 'lexical-h6'
  },
  text: {
    bold: 'lexical-bold',
    italic: 'lexical-italic',
  },
  list: {
    nested: {
        listitem: 'lexical-listitem'
    },
    ul: 'lexical-list-ul'
  },
  link: 'lexical-link',
  paragraph: 'lexical-paragraph',
  root: 'lexical-root'
}

// Update the transformer array order - BOLD_STAR should come before ITALIC_STAR
export const MY_TRANSFORMERS = [
    HEADING, 
    QUOTE, 
    BOLD_STAR,        // Move this before ITALIC_STAR
    ITALIC_STAR,      // This should come after BOLD_STAR
    BOLD_UNDERSCORE
]

function createInitialState(content?: string) {
    if (!content) return undefined

    // try to parse the lexical json
    try {
        const parsed = JSON.parse(content)

        if (parsed.root && parsed.root.children) {
            return content
        }

    } catch (error) {
        console.error(`Failed to parse content as lexical json: ${error}`)
    }
}

export const getInitialConfig = (initialContent: string) => {
    return {
        namespace: 'SciFiChapterEditor',
        theme: SCIFI_THEME,
        nodes: [
            HeadingNode,
            QuoteNode
        ],
        onError: (error: Error) => {
            console.error('Lexical Editor Error:', error)
        },
        editorState: createInitialState(initialContent)
    }
}
import { Mark } from "@tiptap/react";


export const AiEdit = Mark.create({
    name: 'aiEdit',
    addAttributes() {
        return {
            color: {
                default: "#e0d4ff"
            },
            paragraphIdx: {
                default: 0,
                parseHTML: element => parseInt(element.getAttribute('data-paragraph-idx') || '0'),
                renderHTML: attributes => ({
                    'data-paragraph-idx': attributes.paragraphIdx
                })
            },
            originalParagraph: {
                default: '',
                parseHTML: element => element.getAttribute('data-original') || '',
                renderHTML: attributes => ({
                    'data-original': attributes.originalParagraph
                })
            },
            editedParagraph: {
                default: '',
                parseHTML: element => element.getAttribute('data-edited') || '',
                renderHTML: attributes => ({
                    'data-edited': attributes.editedParagraph
                })
            },
            justification: {
                default: '',
                parseHTML: element => element.getAttribute('data-justification') || '',
                renderHTML: attributes => ({
                    'data-justification': attributes.justification
                })
            }
        }
    },
    parseHTML() {
        return [
            {tag: 'span[data-ai-edit]'}
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            {
                'data-ai-edit': 'true',
                style: `color: ${HTMLAttributes.color}`,
                ...HTMLAttributes
            },
            0
        ]
    }
})
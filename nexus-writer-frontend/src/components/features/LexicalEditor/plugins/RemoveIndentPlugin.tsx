import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, KEY_BACKSPACE_COMMAND, TextNode } from "lexical";
import { useEffect } from "react";


export function RemoveIndentPlugin() {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        return editor.registerCommand(
            KEY_BACKSPACE_COMMAND,
            (e: KeyboardEvent) => {
                editor.update(() => {
                    const selection = $getSelection()
                    if ($isRangeSelection(selection) && selection.isCollapsed()) {
                        const anchor = selection.anchor
                        const anchorNode = anchor.getNode() as TextNode
                        const anchorTextContent = anchorNode.getTextContent()
                        if (anchorTextContent === '\u00A0\u00A0\u00A0\u00A0') {
                            e.preventDefault()
                            anchorNode.setTextContent(anchorTextContent.slice(4))
                            selection.setTextNodeRange(anchorNode, 0, anchorNode, 0)
                        }
                    }
                })
                return true
            },
            COMMAND_PRIORITY_CRITICAL
        )
    }, [editor])

    return null
}
import React, { useEffect } from 'react';
import {
    $createTextNode,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_HIGH,
    INSERT_PARAGRAPH_COMMAND,
    KEY_ENTER_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function IndentOnNewLinePlugin() {

    const [editor] = useLexicalComposerContext();

    const handlerFn = (e: KeyboardEvent | null) => {

        /* Ignore Shift+Enter (soft break) */
        if (e?.shiftKey) return false;

        if (e) e.preventDefault();

        editor.update(() => {

            /* 1. split the current paragraph */
            editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);

            /* 2. insert indent into the new paragraph */
            const selection = $getSelection();

            if ($isRangeSelection(selection) && selection.isCollapsed()) {

                const indentText = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
                const indentNode = $createTextNode(indentText);
                selection.insertNodes([indentNode]);

                /* 3. move caret just after the indent */
                const offset = indentText.length;   // = 2
                selection.setTextNodeRange(
                    indentNode, offset,
                    indentNode, offset
                );
            }
        });

        return true;  // tell Lexical we handled this Enter
    };

    useEffect(() => {
        return editor.registerCommand(
            KEY_ENTER_COMMAND,
            handlerFn,
            COMMAND_PRIORITY_HIGH
        );
    }, [editor]);

    return null;
}

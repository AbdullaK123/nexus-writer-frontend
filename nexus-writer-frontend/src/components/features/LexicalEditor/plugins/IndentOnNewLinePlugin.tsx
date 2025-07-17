import { useEffect, useCallback } from 'react';
import {
    $createTabNode,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_HIGH,
    INSERT_PARAGRAPH_COMMAND,
    KEY_ENTER_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function IndentOnNewLinePlugin() {

    const [editor] = useLexicalComposerContext();

    const handlerFn = useCallback((e: KeyboardEvent | null) => {

        /* Ignore Shift+Enter (soft break) */
        if (e?.shiftKey) return false;

        if (e) e.preventDefault();

        editor.update(() => {

            /* 1. split the current paragraph */
            editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);

            /* 2. insert indent into the new paragraph */
            const selection = $getSelection();

            if ($isRangeSelection(selection) && selection.isCollapsed()) {

                const indentNode = $createTabNode()
                selection.insertNodes([indentNode]);

                /* 3. move caret just after the indent */
                selection.anchor.set(selection.anchor.key, selection.anchor.offset, 'text');
                selection.focus.set(selection.focus.key, selection.focus.offset, 'text');
            }
        });

        return true;  // tell Lexical we handled this Enter
    }, [editor])

    useEffect(() => {
        return editor.registerCommand(
            KEY_ENTER_COMMAND,
            handlerFn,
            COMMAND_PRIORITY_HIGH
        );
    }, [editor, handlerFn]);

    return null;
}

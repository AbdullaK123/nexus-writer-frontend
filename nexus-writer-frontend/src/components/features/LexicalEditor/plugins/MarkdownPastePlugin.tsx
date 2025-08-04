/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { useEffect } from 'react';
import { COMMAND_PRIORITY_HIGH, PASTE_COMMAND } from 'lexical';

interface MarkdownPastePluginProps {
  transformers: any[];
}

export default function MarkdownPastePlugin({ transformers }: MarkdownPastePluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const text = clipboardData.getData('text/plain');
        
        // Check if the pasted text looks like markdown
        const hasMarkdownSyntax = /(\*\*.*?\*\*)|(\*.*?\*)|(__.*?__)|(_.*?_)|(#{1,6}\s)|(>\s)|(`.*?`)|(\[.*?\]\(.*?\))/.test(text);
        
        if (hasMarkdownSyntax) {
          event.preventDefault();
          
          editor.update(() => {
            // Convert markdown string to Lexical nodes
            $convertFromMarkdownString(text, transformers);
          });
          
          return true; // Handled the paste event
        }
        
        return false; // Let default paste behavior handle it
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor, transformers]);

  return null;
}
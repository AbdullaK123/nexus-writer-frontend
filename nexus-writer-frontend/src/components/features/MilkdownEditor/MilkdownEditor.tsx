import { commonmark } from "@milkdown/kit/preset/commonmark";
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import React from 'react'
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/kit/core'

// Import theme CSS first
import '@milkdown/theme-nord/style.css'
// Then import custom styles
import styles from './MilkdownEditor.module.css'

const markdown =
`# Welcome to Nexus Writer

> The future of storytelling is here.

Start writing your next chapter...

## Features

- **Rich text editing** with Markdown support
- **Real-time preview** of your content
- **Cyberpunk-themed** interface
- **Advanced formatting** options

\`\`\`javascript
// Your code looks great too
function writeStory() {
  return "Amazing content";
}
\`\`\`

Ready to begin?`

const MilkdownEditor: React.FC = () => {
    const { get } = useEditor((root) =>
        Editor.make()
        .config((ctx) => {
            ctx.set(rootCtx, root)
            ctx.set(defaultValueCtx, markdown)
        })
        .use(commonmark),
    );

    return (
        <div className={styles['milkdown-editor']}>
            <Milkdown />
        </div>
    )
}

export const MilkdownEditorWrapper: React.FC = () => {
    return (
        <MilkdownProvider>
            <MilkdownEditor/>
        </MilkdownProvider>
    )
}
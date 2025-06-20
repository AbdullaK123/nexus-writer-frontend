import { commonmark } from "@milkdown/kit/preset/commonmark";
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import React from 'react'
import { nord } from "@milkdown/theme-nord";
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/kit/core'

const markdown =
`# Milkdown React Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **React**.`

const MilkdownEditor: React.FC = () => {
    const { get } = useEditor((root) =>
        Editor.make()
        .config(nord)
        .config((ctx) => {
            ctx.set(rootCtx, root)
            ctx.set(defaultValueCtx, markdown)
        })
        .use(commonmark),
    );


    return <Milkdown />
}

export const MilkdownEditorWrapper: React.FC = () => {
    return (
        <MilkdownProvider>
            <MilkdownEditor/>
        </MilkdownProvider>
    )
}
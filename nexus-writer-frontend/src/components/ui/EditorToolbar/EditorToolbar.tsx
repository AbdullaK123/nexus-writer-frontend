/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, $getSelection, $isRangeSelection, createCommand, LexicalCommand } from 'lexical'
import { $patchStyleText } from '@lexical/selection'
import styles from './EditorToolbar.module.css'

const CHANGE_FONT_SIZE_COMMAND: LexicalCommand<string> = createCommand();
const CHANGE_FONT_COMMAND: LexicalCommand<string> = createCommand();

const sciFiFonts = [
    { name: 'Inter', label: 'Inter (Default)' },
    { name: 'Orbitron', label: 'Orbitron (Futuristic)' },
    { name: 'Exo 2', label: 'Exo 2 (Modern)' },
    { name: 'JetBrains Mono', label: 'JetBrains Mono (Code)' }
]

function parseCSS(css: string): Record<string, string> {
    const styles: Record<string, string> = {};
    if (!css) return styles;
    
    const parts = css.split(";");
    parts.forEach((part) => {
        const [key, value] = part.split(":");
        if (key && value) {
            styles[key.trim()] = value.trim();
        }
    });
    return styles;
}

function getFont(rawFontValue: string): string {
    return rawFontValue ? rawFontValue.split(",")[0] : "Inter"
}

// function getFontSize(rawFontSize: string): number {
//     return rawFontSize ? parseInt(rawFontSize.replace(/[^\d]/g, '')) : 16;
// }

export default function EditorToolbar() {
    const [editor] = useLexicalComposerContext()
    // const [fontSize, setFontSize] = useState(16)
    const [font, setFont] = useState('Inter')
    // const [fontSizeDisplay, setFontSizeDisplay] = useState(16)
    const [fontDisplay, setFontDisplay] = useState('Inter')
    const [showToolbar, setShowToolbar] = useState(false)

    useEffect(() => {
        return editor.registerUpdateListener(() => {
            editor.read(() => {
                const hasContent = $getRoot().getTextContent().trim() !== "";
                setShowToolbar(hasContent);

                if (hasContent) {
                    const selection = $getSelection()
                    if ($isRangeSelection(selection)) {
                        const selectionStyles = parseCSS(selection.style)
                        const newFont = getFont(selectionStyles['font-family'])
                        // const newFontSize = getFontSize(selectionStyles['font-size'])
                        setFont(newFont)
                        // setFontSize(newFontSize)
                    }
                }
            })
        })
    }, [editor])

    // useEffect(() => {
    //     return editor.registerCommand(
    //         CHANGE_FONT_SIZE_COMMAND,
    //         (newSize: string) => {
    //             editor.update(() => {
    //                 const selection = $getSelection()
    //                 if ($isRangeSelection(selection)) {
    //                     $patchStyleText(selection, {
    //                         'font-size': newSize
    //                     })
    //                 }
    //             })
    //             return true
    //         },
    //         0
    //     )
    // }, [editor])

    useEffect(() => {
        return editor.registerCommand(
            CHANGE_FONT_COMMAND,
            (newFont: string) => {
                editor.update(() => {
                    const selection = $getSelection()
                    if ($isRangeSelection(selection)) {
                        $patchStyleText(selection, {
                            'font-family': newFont
                        })
                    }
                })
                return true
            },
            0
        )
    }, [editor])

    const handleOnFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fontLabel = e.currentTarget.value;
        const newFont = sciFiFonts.filter((font) => font.label === fontLabel)[0].name
        setFontDisplay(newFont)
        editor.dispatchCommand(CHANGE_FONT_COMMAND, newFont)
    }

    // const handleOnFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newSize = e.target.value + 'px';
    //     setFontSizeDisplay(parseInt(e.target.value))
    //     editor.dispatchCommand(CHANGE_FONT_SIZE_COMMAND, newSize)
    // }

    if (!showToolbar) {
        return null;
    }

    return (
        <div className={styles['toolbar-container']}>
            {/* <div className={styles['toolbar-element']}>
                <label htmlFor="fontsize">
                    Font Size: {fontSizeDisplay}px 
                </label>
                <input 
                    id="fontsize" 
                    type="range" 
                    min="12"
                    max="36"
                    className={styles['fontsize-slider']}
                    value={fontSizeDisplay} 
                    onChange={handleOnFontSizeChange}
                />
            </div> */}
            <div className={styles['toolbar-element']}>
                <label htmlFor="font">
                    Font:
                </label>
                <select 
                    id="font"
                    className={styles['font-selector']} 
                    onChange={handleOnFontChange}
                    value={sciFiFonts.find(f => f.name === fontDisplay)?.label || 'Inter (Default)'}
                >
                    {sciFiFonts.map((font, index) => {
                        return (
                            <option key={index} value={font.label}>
                                {font.label}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
'use client'
import React, { useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection } from 'lexical'
import { $patchStyleText } from '@lexical/selection'
import styles from './EditorToolbar.module.css'

const sciFiFonts = [
    { name: 'Inter', label: 'Inter (Default)' },
    { name: 'Orbitron', label: 'Orbitron (Futuristic)' },
    { name: 'Exo 2', label: 'Exo 2 (Modern)' },
    { name: 'Rajdhani', label: 'Rajdhani (Geometric)' },
    { name: 'Saira', label: 'Saira (Technical)' },
    { name: 'Space Mono', label: 'Space Mono (Terminal)' },
    { name: 'JetBrains Mono', label: 'JetBrains Mono (Code)' }
]

export default function EditorToolbar() {
    const [editor] = useLexicalComposerContext()
    const [fontSize, setFontSize] = useState(16)
    const [font, setFont] = useState('Inter (Default)')

    const handleOnFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fontLabel = e.currentTarget.value;
        const newFont = sciFiFonts.filter((font) => font.label === fontLabel)[0].name
        setFont(newFont)

        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {
                    'font-family': newFont
                })
            }
        })

    }

    const handleOnFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const size = e.target.value + 'px';
        setFontSize(parseInt(e.target.value)) 

        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {
                    'font-size': size
                })
            }

        })
    }

    return (
        <div className={styles['toolbar-container']}>
            <div className={styles['toolbar-element']}>
                <label htmlFor="fontsize">
                    Font Size: {fontSize}px 
                </label>
                <input 
                    id="fontsize" 
                    type="range" 
                    min="12"
                    max="36"
                    className={styles['fontsize-slider']}
                    value={fontSize} 
                    onChange={handleOnFontSizeChange}
                />
            </div>
            <div className={styles['toolbar-element']}>
                <label htmlFor="font">
                    Font:
                </label>
                <select 
                    id="font"
                    className={styles['font-selector']} 
                    onChange={handleOnFontChange}
                >
                    {sciFiFonts.map((font, index) => {
                        return (
                            <option key={index}>
                                {font.label}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
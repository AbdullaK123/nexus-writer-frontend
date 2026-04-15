'use client'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { type ReactNode } from 'react'
import styles from './Tooltip.module.css'

interface TooltipProps {
    children: ReactNode
    content: ReactNode
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    delayDuration?: number
    maxWidth?: number | string
}

export default function Tooltip({
    children,
    content,
    side = 'top',
    align = 'center',
    delayDuration = 200,
    maxWidth,
}: TooltipProps) {
    return (
        <RadixTooltip.Provider delayDuration={delayDuration}>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>
                    {children}
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className={styles.content}
                        side={side}
                        align={align}
                        sideOffset={6}
                        style={maxWidth ? { ['--tooltip-max-width' as string]: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : undefined}
                    >
                        {content}
                        <RadixTooltip.Arrow className={styles.arrow} />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}
